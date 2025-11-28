from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents import Agent, Runner, InputGuardrail, GuardrailFunctionOutput
from agents.exceptions import InputGuardrailTripwireTriggered
from dotenv import load_dotenv
import os
import asyncio

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

router = APIRouter(prefix="/agent", tags=["Agent SDK"])

# Request model


class PromptRequest(BaseModel):
    prompt: str

# Guardrail output model


class HomeworkOutput(BaseModel):
    is_homework: bool
    reasoning: str


# Create Agents
math_agent = Agent(
    name="Math Tutor",
    handoff_description="This agent answers math questions only",
    instructions="You are a math tutor that helps with only math homework."
)

history_agent = Agent(
    name="History Tutor",
    handoff_description="This agent answers history questions only",
    instructions="You are a history tutor that helps with only history homework."
)

guardrail_agent = Agent(
    name="Guardrail Check",
    instructions="Check if user is asking about homework",
    output_type=HomeworkOutput
)

# Guardrail function


async def homework_guardrail(ctx, agent, input_data):
    result = await Runner.run(guardrail_agent, input_data, context=ctx.context)
    final_output = result.final_output_as(HomeworkOutput)
    return GuardrailFunctionOutput(
        output_info=final_output,
        tripwire_triggered=final_output.is_homework
    )

# Triage agent
triage_agent = Agent(
    name="Triage Agent",
    instructions="You determine which agent to use based on the question",
    handoffs=[history_agent, math_agent],
    # input_guardrails=[InputGuardrail(guardrail_function=homework_guardrail)]
)

# POST endpoint


@router.post("/ask")
async def ask_agent(request: PromptRequest):
    try:
        result = await Runner.run(triage_agent, request.prompt)
        return {"response": str(result.final_output)}
    except InputGuardrailTripwireTriggered:
        return {"error": "Guardrail blocked this input"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
