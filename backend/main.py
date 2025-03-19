import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

import db
                  
app = FastAPI()
# Autoriser l'accès depuis votre application frontend
origins = [
    "http://localhost:5173",
    # Vous pouvez ajouter d'autres domaines si nécessaire
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Autoriser ces origines spécifiques
    allow_credentials=True,
    allow_methods=["*"],             # Autoriser toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],             # Autoriser tous les headers
)
@app.get("/api/conversations")
def get_conversations():
    user_id = "6861fc94-7897-4422-8241-89787d0d14f1"
    conversations = db.get_conversations(user_id)
    return conversations

@app.delete("/api/conversations/{conversation_id}", status_code=204)
def delete_conversation(conversation_id: str):
    """
    Supprime une conversation identifiée par son id.
    """
    db.delete_conversation(conversation_id)
    # Pas de contenu à renvoyer, donc on renvoie une réponse vide avec le statut 204    
    return

@app.get("/api/conversations/{conversation_id}/messages")
def get_messages(conversation_id: str):
    messages = db.get_messages(conversation_id)
    return messages

@app.get("/api/user")
def user_endpoint():
    return {"oid": "6861fc94-7897-4422-8241-89787d0d14f1", "name": "test"}

# Définir le modèle de données pour la requête
class ChatRequest(BaseModel):
    question: str
    conversationId: Optional[str] = None # Optionnel, si non fourni, la conversation sera créée

@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    if request.conversationId:
        # Ici vous pouvez implémenter la logique de traitement
        db.insert_message(request.conversationId, role = "user", contenu = request.question) 
        reponse = f"Réponse pour : {request.question}"
        db.insert_message(request.conversationId, role = "assistant", contenu = reponse) 
        return {"answer": reponse, "conversationId": request.conversationId}
    else: 
        # enregistrement bdd de la nouvelle conversation
        nouvelle_conversation = db.insert_conversation("6861fc94-7897-4422-8241-89787d0d14f1",request.question)
        conversation_id = nouvelle_conversation["id"]
        # enregistrement du message
        db.insert_message(conversation_id, role = "user", contenu = request.question) 
        # enregistrement de la réponse 
        reponse= "Premiere reponse conversation"
        db.insert_message(conversation_id, role = "assistant", contenu = reponse) 
        #return {"answer": "", "conversationId": conversation_id}
        return {"answer": reponse, "conversationId": conversation_id}



# Définition du modèle de données qui sera utilisé pour la validation de la requête
class ModelSelection(BaseModel):
    modelId: str
@app.post("/api/select-model")
async def select_model(selection: ModelSelection):
    # Ici, vous pouvez effectuer d'autres traitements, par exemple,
    # enregistrer le modèle sélectionné dans une base de données, etc.
    print(f"Le modèle sélectionné est : {selection.modelId}")
    # Retour d'une réponse de confirmation
    return {"message": "Modèle reçu", "modelId": selection.modelId}

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}