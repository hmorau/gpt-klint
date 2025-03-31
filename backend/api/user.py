
from fastapi import FastAPI, Header, HTTPException, Depends, APIRouter
from db import crud as db
from pydantic import BaseModel
from typing import Optional
import jwt

router = APIRouter()


async def get_current_user(x_ms_token_aad_access_token: str = Header(None)):
    """
    Récupère et décode le token d'accès Azure depuis l'en-tête "X-Ms-Token-Aad-Access-Token".
    En cas d'erreur ou d'absence de token, une exception HTTP est levée.
    """
    if not x_ms_token_aad_access_token:
        raise HTTPException(status_code=401, detail="Token manquant.")
    try:
        # Décodage du token sans vérification de signature pour simplifier (à ajuster en production)
        decoded = jwt.decode(x_ms_token_aad_access_token, options={"verify_signature": False}, algorithms=["RS256"])
    except:
        raise HTTPException(status_code=401, detail=f"Token invalide")
    
    # Extraction des informations de l'utilisateur
    oid = decoded.get("oid")
    name = decoded.get("name") or decoded.get("preferred_username") or decoded.get("upn")
    if not oid:
        raise HTTPException(status_code=401, detail="Les informations utilisateur sont incomplètes.")
    
    return {"oid": oid, "name": name}

@router.get("/profile")
async def profile(current_user: dict = Depends(get_current_user)):
    """
    Exemple d'endpoint protégée qui retourne les informations de l'utilisateur authentifié.
    """
    return {"message": f"Bonjour {current_user['name']} !", "user": current_user}

@router.get("/user")
def user_endpoint():
    return {"oid": "6861fc94-7897-4422-8241-89787d0d14f1", "name": "test"}