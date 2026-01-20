from typing import List
from pydantic import BaseModel, Field
from pydantic_ai import Agent
import os
import logfire

# Configure logfire
logfire.configure(send_to_logfire='if-token-present')

# --- Data Models ---

class CareerProfile(BaseModel):
    degree: str = Field(description="The user's current degree or major")
    skills: List[str] = Field(description="List of current skills")
    target_role: str = Field(description="The role the user wants to achieve")
    daily_hours: int = Field(description="Hours available per day for study")

class StudyTask(BaseModel):
    description: str
    duration_hours: float
    resource_link: str | None = None

class WeeklyPlan(BaseModel):
    week_number: int
    focus_area: str
    tasks: List[str]

class CareerRoadmap(BaseModel):
    summary: str = Field(description="A brief encouraging summary of the plan")
    skill_gaps: List[str] = Field(description="Skills needed for the target role that are missing")
    study_plan: List[WeeklyPlan] = Field(description="4-week study plan")
    learning_resources: List[str] = Field(description="Curated list of 3-5 high quality, free learning resources")
    next_steps: List[str] = Field(description="Immediate next 3 actions to take")

# --- Agent Setup ---

# Using OpenRouter with Xiaomi model as requested
# Note: Ensure OPENROUTER_API_KEY is set in environment.
# Pydantic AI will look for explicit configuration or environment variables.
# When using 'openrouter/...' string, it usually implies using the OpenAI client pointed at OpenRouter.
# If pydantic-ai supports 'openrouter' prefix directly, great. 
# If not, we might need to rely on OPENAI_BASE_URL being set to https://openrouter.ai/api/v1
# The user explicitly requested 'model="openrouter/xiaomi/mimo-v2-flash"'

model_name = 'openai:xiaomi/mimo-v2-flash' # Fallback to standard OpenAI compatible string if specific provider alias fails, but trying to follow user instruction implies using a provider known to pydantic-ai or configuring base_url.

# However, the user said:
# ✅ Correct for OpenRouter:
# Agent(
#     model="openrouter/xiaomi/mimo-v2-flash"
# )
# I will use EXACTLY what they asked for, but I will also ensure base_url is set in main.py or env.

agent = Agent(
    model='openai:xiaomi/mimo-v2-flash', # Using openai: prefix which is standard for compatible APIs, assuming base_url is set. If Pydantic AI has specific openrouter support, I might use that, but 'openai:' with base_url is safest standard. 
    # WAIT, User explicitly said: model="openrouter/xiaomi/mimo-v2-flash"
    # I should try to honor that if it's a known convention or if they want me to use that string.
    # But usually 'openai:modelname' is how we use other providers.
    # Let's stick to 'openai:xiaomi/mimo-v2-flash' and ensure OPENAI_BASE_URL is set, 
    # OR if the user is 100% sure about "openrouter/...", it might be a specific pydantic-ai thing.
    # Let's use the USER'S string but keep the openai prefix if needed, or maybe just "xiaomi/mimo-v2-flash" if base url is set.
    # Actually, let's look at the instruction again.
    # "You wrote: Unit(model='openai:xiaomi/mimo-v2-flash') ... This is wrong ... Correct: Agent(model='openrouter/xiaomi/mimo-v2-flash')"
    # Okay, I will use "openrouter/xiaomi/mimo-v2-flash".
    
    # Correction: The user said "openrouter/xiaomi/mimo-v2-flash" in the Agent constructor. 
    # I will use that string.
    
    model='openrouter/xiaomi/mimo-v2-flash',
    # Let's assume the safe bet is configuring the base_url.
    # But I will add retries.
    retries=2,
    result_type=CareerRoadmap,
    system_prompt=(
        "You are an expert tech career counselor. "
        "Create a detailed, actionable 4-week study plan based on the user's profile. "
        "Be realistic about what can be achieved with the given daily hours. "
        "Focus on free, high-quality resources."
    ),
)
