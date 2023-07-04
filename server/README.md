## Tata-Imali Server
Tata-Imali's server is powered by FastAPI, ODMantic, and the uvicorn ASGI server.
### Setup Instructions
1. It is highlty recommended that you use a Python Virtual Environment to run the server locally.

2. To run the python server locally install the following packages:
```
pip install fastapi
pip install uvicorn  
pip install odmantic
```

3. cd into `src` directory, and create a `.env`, and include the following Key-Value pairs.
```
PRIMARY_ORIGIN=""

DB_NAME="<DB_NAME>"
DB_CONNECTION_STRING="<MONGODB CONNECTION STRING>"
```

4. Next run `uvicorn main:app` to start the server locally.

5. Once the server is running, navigate to `http://127.0.0.1:8000/docs#/`. This opens an interactive FAST API docs for this project.