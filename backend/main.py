from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

@app.get("/api/conversations/{conversation_id}/messages")
def get_messages(conversation_id: str):
    messages = db.get_messages(conversation_id)
    return messages

@app.get("/api/user")
def user_endpoint():
    return {"oid": "test", "name": "test"}

# Définir le modèle de données pour la requête
class ChatRequest(BaseModel):
    question: str
@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    # Ici vous pouvez implémenter la logique de traitement
    input = request.question

    reponse = f"Réponse pour : {request.question}"
    return {"answer": reponse}

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