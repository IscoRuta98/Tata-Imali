from fastapi import HTTPException

from common.types import Engine
from datetime import datetime, timedelta
from auth.schema.actions import (
    AuthenticateUser,
    AuthenticateUserResult,
    AuthenticateUserSuccess,
)
from auth.schema.entities import UserDetailStorable, UserInformation

from .create_user import argon2_context


def verify_password(password_attempt: str, hashed_password: str) -> bool:
    return argon2_context.verify(password_attempt, hashed_password)


async def authenticate_user(
    engine: Engine, params: AuthenticateUser
) -> AuthenticateUserResult:
    """
    Authenticate User
    """
    existing_user = await engine.find_one(
        UserDetailStorable, UserDetailStorable.userName == params.userName
    )
    if existing_user is None:
        raise HTTPException(status_code=404, detail="This user name does not exist.")

    if not verify_password(params.password, existing_user.hash_password):
        raise HTTPException(status_code=401, detail="Incorrect Password.")

    user_display = UserInformation(
        userId=str(existing_user.id),
        userName=existing_user.userName,
        phoneNumber=existing_user.phoneNumber,
        algorandAddress=existing_user.algorandAddress,
    )

    return AuthenticateUserSuccess(Opened=user_display)
