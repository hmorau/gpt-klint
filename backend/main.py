from fastapi import FastAPI
from api import api
from fastapi.middleware.cors import CORSMiddleware
                  
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

app.include_router(api.router, prefix="/api", tags=["api"])


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}