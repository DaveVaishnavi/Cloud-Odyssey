import asyncio

async def compile_code(source_path: str, output_path: str):
    proc = await asyncio.create_subprocess_exec(
        "mpic++", source_path, "-o", output_path,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    _, stderr = await proc.communicate()
    if proc.returncode != 0:
        return False, stderr.decode()
    return True, ""
