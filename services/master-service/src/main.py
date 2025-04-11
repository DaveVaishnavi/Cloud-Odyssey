from fastapi import FastAPI, UploadFile, WebSocket
from fastapi.responses import JSONResponse
import uuid

from app.handlers.compiler import compile_code
from app.handlers.runner import run_mpi
from app.handlers.scheduler import get_worker_hosts
from app.utils.file_ops import save_uploaded_file, get_paths

app = FastAPI()


@app.post("/submit/")
async def submit(file: UploadFile):
    job_id = str(uuid.uuid4())
    source_path, binary_path = get_paths(job_id)
    await save_uploaded_file(file, source_path)

    return JSONResponse(content={
        "job_id": job_id,
        "message": "Upload successful. Connect to WebSocket for execution."
    })


@app.websocket("/ws/{job_id}")
async def websocket_endpoint(websocket: WebSocket, job_id: str):
    await websocket.accept()
    source_path, binary_path = get_paths(job_id)

    await websocket.send_text("[status] Compiling code...")
    success, error = await compile_code(source_path, binary_path)
    if not success:
        await websocket.send_text(f"[error] Compilation failed:\n{error}")
        return

    await websocket.send_text("[status] Fetching workers from scheduler...")
    hosts = await get_worker_hosts(job_id)
    if not hosts:
        await websocket.send_text("[error] Could not get workers from task scheduler")
        return

    await websocket.send_text(f"[status] Running on hosts: {', '.join(hosts)}")
    await run_mpi(binary_path, websocket, hosts)

    await websocket.send_text("[status] Job complete.")
