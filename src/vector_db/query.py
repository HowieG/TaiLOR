import json
from helpers import create_client

def query():
    client = create_client()

    nearText = {"concepts": ["test"]}

    result = (
        client.query
        .get("Product", ["description"])
        .with_near_text(nearText)
        .with_limit(2)
        .do()
    )

    print(json.dumps(result, indent=4))