import os
import sys
from pathlib import Path
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI(title="API Gateway Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to backend service via Vercel service binding
client = httpx.AsyncClient(timeout=60.0)

# Import routes directly as well for hybrid resiliency
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT_DIR / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

try:
    from app.api.router import api_router
    app.include_router(api_router, prefix="/api")
except Exception as e:
    print(f"Direct route mount notice: {e}")

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
async def proxy_or_handle(request: Request, path: str):
    backend_url = os.environ.get("BACKEND_URL")
    if backend_url:
        target_path = f"/{path}" if path.startswith("api") else f"/api/{path}"
        url = f"{backend_url.rstrip('/')}{target_path}"
        body = await request.body()
        headers = dict(request.headers)
        headers.pop("host", None)

        try:
            response = await client.request(
                method=request.method,
                url=url,
                params=dict(request.query_params),
                headers=headers,
                content=body
            )
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers)
            )
        except Exception as err:
            return Response(
                content=f'{{"error": "Backend gateway error: {str(err)}"}}',
                status_code=502,
                media_type="application/json"
            )

    return Response(
        content='{"status": "online", "service": "api-gateway"}',
        status_code=200,
        media_type="application/json"
    )
