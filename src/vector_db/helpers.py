import os
import weaviate

def create_client():
    api_key = os.environ.get("TAILOR_WEAVIATE")
    openai_api_key = os.environ.get("OPENAI_API_KEY")

    client = weaviate.Client(
        url = "https://tailor-wiu5z0lk.weaviate.network", 
        auth_client_secret=weaviate.AuthApiKey(api_key=api_key),
        additional_headers = {
            "X-OpenAI-Api-Key": openai_api_key  # Replace with your inference API key
        }
    )
    return client
