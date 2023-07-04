"""
Entry point for the Tata-Imali server.
"""
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

from auth.operations.create_user import create_user
from auth.operations.authenticate_user import authenticate_user
from auth.schema.actions import (
    AuthenticateUser,
    AuthenticateUserResult,
    CreateUser,
    CreateUserResult,
)

from settings import AppSettings

app_settings = AppSettings()
mongo_client = AsyncIOMotorClient(app_settings.db_connection_string)
mongo_engine = AIOEngine(
    client=mongo_client,
    database=app_settings.db_name,
)

origins = [str(app_settings.primary_origin)]
if app_settings.staging_mode:
    origins.append("http://localhost:4200")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["GET", "POST", "HEAD", "DELETE"],
    allow_headers=["*"],
)


@app.post(
    "/auth/create", response_model=CreateUserResult, status_code=status.HTTP_201_CREATED
)
async def post_create_new_user(request: CreateUser) -> CreateUserResult:
    return await create_user(mongo_engine, request)


@app.post(
    "/auth/login", response_model=AuthenticateUserResult, status_code=status.HTTP_200_OK
)
async def post_authenticate_user(request: AuthenticateUser) -> AuthenticateUserResult:
    return await authenticate_user(mongo_engine, request)
