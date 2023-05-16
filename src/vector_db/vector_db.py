from tqdm import tqdm
from helpers import create_client

def vector_db():
    client = create_client()

    # ===== add schema =====
    class_obj = {
        "class": "Product",
        "vectorizer": "text2vec-openai"
    }

    client.schema.create_class(class_obj)

    # ===== import data =====
    # Load data
    data = []

    # Configure a batch process
    with client.batch as batch:
        batch.batch_size=100
        # Batch import all Questions
        for i, d in tqdm(enumerate(data)):

            properties = {
                "description": d["Description"],
            }

            client.batch.add_data_object(properties, "Product")