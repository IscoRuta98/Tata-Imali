from pydantic import BaseModel
from typing import Union

from auth.schema.entities import UserInformation


class CreateUser(BaseModel):
    """
    Wallet creation parameters.
    """

    userName: str
    phoneNumber: str
    password: str


class CreateUserSuccess(BaseModel):
    """
    Return Algorand Public address & other details upon successful wallet creation.
    """

    Created: UserInformation


class CreateUserFailed(BaseModel):
    """
    Return Failure if wallet is not created.
    """

    Failed: str


CreateUserResult = Union[CreateUserSuccess, CreateUserFailed]


class AuthenticateUser(BaseModel):
    """
    Open Wallet parameters.
    """

    userName: str
    password: str


class AuthenticateUserSuccess(BaseModel):
    """
    Successfull wallet Opened.
    """

    Opened: UserInformation


class AuthenticateUserFailure(BaseModel):
    """
    Failed wallet Opened.
    """

    Failed: str


AuthenticateUserResult = Union[AuthenticateUserSuccess, AuthenticateUserFailure]
