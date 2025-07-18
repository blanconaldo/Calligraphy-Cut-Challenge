import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://frontend-calligraphy-cut-chatbot.kindpebble-7abcd71b.germanywestcentral.azurecontainerapps.io"
        "https://frontend-calligraphy-cut-chatbot.kindpebble-7abcd71b.germanywestcentral.azurecontainerapps.io/chat"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get API key
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable not set")

# Initialize Groq client
client = Groq(api_key=groq_api_key)
print("Groq client initialized successfully")


# Define request and response models
class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    message: Message


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Groq chatbot API is running now"}


# Define the chat endpoint
@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        print("Received chat request")

        # Convert Pydantic messages to dict format for Groq API
        formatted_messages = []

        # Add system message if not present
        if not any(msg.role == "system" for msg in request.messages):
            formatted_messages.append({
                "role": "system",
                "content": "You are an AI chatbot for the company Calligraphy Cut dedicated to helping users with their queries. Provide concise and helpful responses. Calligraphy Cut is a hair salon that gives sells services for a new technique in hair styling by cutting the hair at a 21 degree using specialized blades and a gadget called the Calligraph which can only be brought from our company. The salon is located in the heart of the city and is known for its skilled stylists and welcoming atmosphere. Always reply to the customer mentioning that you are a AI chatbot for the company with name Calligraphy Cut."
            })

        # Add all messages from request
        for msg in request.messages:
            formatted_messages.append({
                "role": msg.role,
                "content": msg.content
            })

        print(f"Sending {len(formatted_messages)} messages to Groq API")

        chat_completion = client.chat.completions.create(
            messages=formatted_messages,
            model="llama-3.3-70b-versatile",
        )

        # Extract response content
        assistant_response = chat_completion.choices[0].message.content
        print("Received response from Groq API")

        # Return the response
        return {
            "message": {
                "role": "assistant",
                "content": assistant_response
            }
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)