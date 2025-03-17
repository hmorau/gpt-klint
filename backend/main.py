from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()
# Autoriser l'accès depuis votre application frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pour la prod, limitez cette valeur aux domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Définir le modèle de données pour la requête
class ChatRequest(BaseModel):
    question: str
@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    # Ici vous pouvez implémenter la logique de traitement
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