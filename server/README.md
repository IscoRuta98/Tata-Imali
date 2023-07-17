## Tata-Imali Server

Tata-Imali's server is powered by FastAPI, ODMantic, and the uvicorn ASGI server. The aim of this is server is to receive and respond to HTTP cals from the client, and perform various tasks on behalf of the client (e.g. submit & broadcast transactions to the Algorand Blockchain and manage user's data).

### Setup Instructions
1. It is highlty recommended that you create a Python Virtual Environment before installing dependencies and running the server locally.

2. To run the python server locally, first install the following Python packages:
```
pip install fastapi
pip install uvicorn  
pip install odmantic
pip install passlib[argon2]
pip install tealish
pip install py-algorand-sdk
```

3. `cd` into the `src` directory, and create a `.env` file. Inside the  and include the following Key-Value pairs.
```
PRIMARY_ORIGIN=""

DB_NAME="<DB_NAME>"
DB_CONNECTION_STRING="<MONGODB CONNECTION STRING>"

ALGOD_ADDRESS="<INSET_ALGOD_ADDRESS>"
ALGOD_TOKEN="<INSERT_ALGOD_TOKEN>"
```

4. Next run `uvicorn main:app` to start the server locally.

5. Once the server is running, navigate to `http://127.0.0.1:8000/docs#/`, as this opens an interactive FAST API docs for this project.