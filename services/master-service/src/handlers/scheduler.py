import httpx

TASK_SCHEDULER_URL = "http://localhost:9000/worker_list"  

async def get_worker_hosts(job_id: str) -> list[str]:
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(TASK_SCHEDULER_URL, json={"job_id": job_id})
            response.raise_for_status()
            data = response.json()
            return data.get("hosts", []) 
        except httpx.HTTPError as e:
            print(f"[scheduler error] {e}")
            return []
