import httpx
import asyncio
import os

BASE_URL = "http://localhost:8000"

async def test_auth_flow():
    async with httpx.AsyncClient(base_url=BASE_URL, timeout=10.0) as client:
        # 1. Signup
        print("Testing Signup...")
        signup_data = {
            "name": "Dr. House",
            "email": "house@example.com",
            "competency_doc": "Diagnostic Medicine",
            "password": "vicodin"
        }
        # Use a random email to avoid conflict if re-running
        import random
        signup_data["email"] = f"house_{random.randint(1000, 9999)}@example.com"
        
        try:
            response = await client.post("/auth/signup", json=signup_data)
            if response.status_code == 200:
                print("Signup Success!")
                print(response.json())
            else:
                print(f"Signup Failed: {response.status_code} - {response.text}")
                return
        except Exception as e:
            print(f"Signup Error: {e}")
            return

        # 2. Login
        print("\nTesting Login...")
        login_data = {
            "username": signup_data["email"],
            "password": signup_data["password"]
        }
        try:
            response = await client.post("/auth/login", data=login_data)
            if response.status_code == 200:
                print("Login Success!")
                token_data = response.json()
                print(token_data)
                access_token = token_data["access_token"]
            else:
                print(f"Login Failed: {response.status_code} - {response.text}")
                return
        except Exception as e:
            print(f"Login Error: {e}")
            return

        # 3. Access Protected Route (Dashboard)
        print("\nTesting Dashboard Access...")
        headers = {"Authorization": f"Bearer {access_token}"}
        try:
            response = await client.get("/api/doctor/dashboard", headers=headers) # Note: diagnosis.py router doesn't have a prefix, but let's check main.py
            # In main.py: app.include_router(diagnosis_router) -> No prefix.
            # In diagnosis.py: @router.get("/doctor/dashboard")
            # So URL is /doctor/dashboard. Wait.
            # diagnosis.py router is created with `router = APIRouter()`.
            # verification: check URL path.
            
            # Correction: Let's check where the endpoint is mounted.
            # diagnosis.py: @router.get("/doctor/dashboard")
            # main.py: app.include_router(diagnosis_router)
            # So the path is /doctor/dashboard.
            
            response = await client.get("/doctor/dashboard", headers=headers)
            
            if response.status_code == 200:
                print("Dashboard Access Success!")
                print(response.json())
            else:
                print(f"Dashboard Access Failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Dashboard Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_auth_flow())
