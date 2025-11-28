from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import agent_sdk

app = FastAPI(title="Agent SDK Backend")

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://raiatdoshi.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include agent SDK router
app.include_router(agent_sdk.router)
