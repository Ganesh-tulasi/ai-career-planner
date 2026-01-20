from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load env vars
load_dotenv()

# Import agent
# Notice the import change
from career_agent import agent, CareerProfile, CareerRoadmap

app = FastAPI(title="AI Career Plan API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI Career Planner API is running"}

@app.post("/api/career-plan", response_model=CareerRoadmap)
async def create_career_plan(profile: CareerProfile):
    # Ensure OPENROUTER_API_KEY is present
    if not os.getenv("OPENROUTER_API_KEY"):
         raise HTTPException(status_code=500, detail="Configuration Error: OPENROUTER_API_KEY missing.")

    try:
        # Run agent with retries configured in agent definition
        result = await agent.run(
            f"User Profile:\n"
            f"Degree: {profile.degree}\n"
            f"Skills: {', '.join(profile.skills)}\n"
            f"Target Role: {profile.target_role}\n"
            f"Daily Hours: {profile.daily_hours}\n\n"
            f"Generate a career roadmap."
        )
        return result.data
        
    except Exception as e:
        print(f"Error generating plan: {e}")
        # Graceful fallback message structure
        # We can't return a partial CareerRoadmap easily if it failed, 
        # so we raise 500 but with a clean message.
        # Alternatively, the user suggested returning a dict with error, 
        # but our response_model is CareerRoadmap.
        # Changing return type to Union[CareerRoadmap, ErrorResponse] would be better,
        # but adhering to the user's request for "Graceful fallback message":
        raise HTTPException(
            status_code=500, 
            detail="Unable to generate plan right now. The AI service may be busy or unavailable. Please try again."
        )

if __name__ == "__main__":
    import uvicorn
    # Use environment port for deployment (Render)
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
