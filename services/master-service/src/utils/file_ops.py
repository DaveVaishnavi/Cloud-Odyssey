import os
from fastapi import UploadFile

TMP_DIR = "/tmp/mpi_jobs"

def get_paths(job_id: str):
    os.makedirs(TMP_DIR, exist_ok=True)
    source_path = os.path.join(TMP_DIR, f"{job_id}.cpp")
    binary_path = os.path.join(TMP_DIR, f"{job_id}.out")
    return source_path, binary_path

async def save_uploaded_file(file: UploadFile, dest_path: str):
    with open(dest_path, "wb") as f:
        content = await file.read()
        f.write(content)
