from fastapi import APIRouter, HTTPException
from db import crud as db
from pydantic import BaseModel
from typing import Optional
router = APIRouter()

@router.get("/conversations")
def get_conversations():
    user_id = "6861fc94-7897-4422-8241-89787d0d14f1"
    conversations = db.list_conversations(user_id)
    return conversations

@router.delete("/conversations/{conversation_id}", status_code=204)
def delete_conversation(conversation_id: str):
    """
    Supprime une conversation identifiée par son id.
    """
    db.delete_conversation("6861fc94-7897-4422-8241-89787d0d14f1", conversation_id)
    # Pas de contenu à renvoyer, donc on renvoie une réponse vide avec le statut 204    
    return

@router.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id: str):
    messages = db.get_conversation("6861fc94-7897-4422-8241-89787d0d14f1", conversation_id)
    return messages

@router.get("/user")
def user_endpoint():
    return {"oid": "6861fc94-7897-4422-8241-89787d0d14f1", "name": "nom_utilisateur"}

# Définir le modèle de données pour la requête
class ChatRequest(BaseModel):
    question: str
    conversationId: Optional[str] = None # Optionnel, si non fourni, la conversation sera créée

@router.post("/chat")
def chat_endpoint(request: ChatRequest):
    if request.conversationId:
        # Conversation existante
        conversation = db.get_conversation("6861fc94-7897-4422-8241-89787d0d14f1", request.conversationId)
        conversation["messages"].append({"role": "user", "content": request.question})
        reponse = f"Réponse pour : {request.question}"
        conversation["messages"].append({"role": "assistant", "content": request.question})
        db.update_conversation(conversation)
        return {"answer": reponse, "conversationId": request.conversationId}
    else: 
        # Nouvelle conversation
        nouvelle_conversation = db.create_conversation("6861fc94-7897-4422-8241-89787d0d14f1",request.question)
        conversation_id = nouvelle_conversation["id"]
        reponse= "Premiere reponse conversation"
        nouvelle_conversation["messages"].append({"role": "assistant", "content": reponse})
        db.update_conversation(nouvelle_conversation)
        return {"answer": reponse, "conversationId": conversation_id}
    
# Définition du modèle de données qui sera utilisé pour la validation de la requête
class ModelSelection(BaseModel):
    modelId: str
@router.post("/select-model")
async def select_model(selection: ModelSelection):
    # Ici, vous pouvez effectuer d'autres traitements, par exemple,
    # enregistrer le modèle sélectionné dans une base de données, etc.
    print(f"Le modèle sélectionné est : {selection.modelId}")
    # Retour d'une réponse de confirmation
    return {"message": "Modèle reçu", "modelId": selection.modelId}