import os
import sys
from pathlib import Path
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

BACKEND_URL = os.environ.get("BACKEND_URL")

if BACKEND_URL:
    import httpx
    app = FastAPI(title="API Gateway Service")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    client = httpx.AsyncClient(base_url=BACKEND_URL.rstrip("/"), timeout=60.0)

    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
    async def proxy_to_backend(request: Request, path: str):
        """Proxies requests to the internal backend service via BACKEND_URL."""
        # Ensure path retains /api prefix expected by backend
        target_path = f"/{path}" if path.startswith("api") else f"/api/{path}"
        url = httpx.URL(path=target_path, query=request.url.query.encode("utf-8"))
        body = await request.body()
        headers = dict(request.headers)
        headers.pop("host", None)

        response = await client.request(
            method=request.method,
            url=url,
            headers=headers,
            content=body
        )
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=dict(response.headers)
        )
else:
    # Direct fallback when running monolithically or in local dev
    ROOT_DIR = Path(__file__).resolve().parent.parent
    BACKEND_DIR = ROOT_DIR / "backend"
    if str(BACKEND_DIR) not in sys.path:
        sys.path.insert(0, str(BACKEND_DIR))
    from app.main import app
