import os
from azure.cosmos import CosmosClient
from datetime import datetime
import uuid
from dotenv import load_dotenv 

load_dotenv()

COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("AZE_COSMOSDB_DATABASE")
CONTAINER_NAME = os.getenv("AZE_COSMOSDB_CONVERSATION_CONTAINER")

client = CosmosClient(COSMOS_ENDPOINT, credential=COSMOS_KEY)
database = client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

CONVERSATION_CONTAINER_NAME = "Conversation"
MESSAGE_CONTAINER_NAME = "Message"
conversation_container = database.get_container_client(CONVERSATION_CONTAINER_NAME)
message_container = database.get_container_client(MESSAGE_CONTAINER_NAME)


def insert_message(conversation_id: str, role: str, contenu: str) -> dict:
    """
    Insère un message dans le conteneur Message.
La clé de partition est 'conversation_id' afin de regrouper les messages d'une même conversation.
    """
    message_document = {
        "id": str(uuid.uuid4()),  # Identifiant unique du message
        "conversation_id": conversation_id,
        "contenu": contenu,
        "role": role,  # Par exemple : "user" ou "assistant"
        "created_at": datetime.utcnow().isoformat()
    }
    message_container.create_item(body=message_document)
    print("Message inséré :", message_document)
    return message_document


def insert_conversation(user_id, subject):
    conversation_document = {
        "id": str(uuid.uuid4()),  # Identifiant unique de la conversation
        "user_id": user_id,
        "subject": subject,
        "created_at": datetime.utcnow().isoformat(),
        "status": "actif"
    }
    conversation_container.create_item(body=conversation_document)
    print("Conversation insérée :", conversation_document)
    return conversation_document 

def get_conversations(user_id):
    """
    Récupère la liste des conversations associées à un user_id donné.
    """
    query = "SELECT c.id, c.subject FROM c WHERE c.user_id = @user_id"
    parameters = [{"name": "@user_id", "value": user_id}]
    conversations = list(conversation_container.query_items(
        query=query,
        parameters=parameters,
        enable_cross_partition_query=True
    ))
    print(f"Conversations récupérées pour user_id {user_id}:", conversations)
    return conversations

def get_messages(conversation_id):
    """
    Récupère la liste des messages associés à une conversation identifiée par conversation_id.
    Les messages sont triés par ordre chronologique (du plus ancien au plus récent).
    """
    query = "SELECT * FROM c WHERE c.conversation_id = @conversation_id ORDER BY c.created_at ASC"
    parameters = [{"name": "@conversation_id", "value": conversation_id}]
    messages = list(message_container.query_items(
        query=query,
        parameters=parameters,
        enable_cross_partition_query=True
    ))
    print(f"Messages récupérés pour conversation_id {conversation_id}:", messages)
    return messages

def delete_conversation(conversation_id: str) -> dict:
    """
    Supprime une conversation identifiée par son id.
    Pour pouvoir supprimer un document, nous avons besoin de connaître la valeur de la clé de partition.
    Ici, on suppose que la clé de partition est "user_id".
    """
    # Récupération de la conversation afin d'obtenir la valeur de la clé de partition
    query = "SELECT * FROM c WHERE c.id = @conversation_id"
    parameters = [{"name": "@conversation_id", "value": conversation_id}]
    results = list(conversation_container.query_items(
        query=query,
        parameters=parameters,
        enable_cross_partition_query=True
    ))
    if not results:
        print(f"Aucune conversation trouvée avec l'id {conversation_id}.")
        raise ValueError(f"Aucune conversation trouvée avec l'id {conversation_id}.")
    
    conversation_document = results[0]
    partition_key_value = conversation_document["user_id"]
    # Suppression de la conversation
    conversation_container.delete_item(item=conversation_id, partition_key=partition_key_value)
    print(f"Conversation supprimée : {conversation_document}")
    return conversation_document
