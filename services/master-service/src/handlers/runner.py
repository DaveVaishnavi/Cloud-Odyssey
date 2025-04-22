import asyncio
from fastapi import WebSocket

async def run_mpi(binary_path: str, websocket: WebSocket, hosts: list[str], num_processes: int = 4):
    host_arg = ",".join(hosts)
    proc = await asyncio.create_subprocess_exec(
        "mpirun", "-np", str(num_processes),
        "--host", host_arg, 
        binary_path,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT
    )

    async for line in proc.stdout:
        await websocket.send_text(line.decode().strip())

    await proc.wait()
