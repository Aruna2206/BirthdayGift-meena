import os
import json
import asyncio
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import models

load_dotenv()

async def seed_db():
    print("Starting database seeding...")
    # Load MongoDB URI from environment variable
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    db_name = os.getenv("DB_NAME", "mylove")
    
    # Class-level patch to fix Motor/Beanie compatibility issue
    if not hasattr(AsyncIOMotorClient, 'append_metadata'):
        AsyncIOMotorClient.append_metadata = lambda self, metadata: None

    client = AsyncIOMotorClient(mongodb_uri)
    database = client[db_name]
    
    # Initialize Beanie
    await init_beanie(
        database=database,
        document_models=[
            models.User,
            models.Image
        ]
    )
    
    # Check if images already exist
    count = await models.Image.count()
    if count > 0:
        print(f"Database already has {count} images. Skipping seeding.")
        return

    # Load data from birthday_db.images.json
    json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "birthday_db.images.json")
    
    if not os.path.exists(json_path):
        print(f"Seed file not found at {json_path}")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    images_to_insert = []
    for item in data:
        # Remove _id if it's there to let MongoDB generate its own
        if "_id" in item:
            del item["_id"]
        
        # Ensure fields match the model
        image = models.Image(**item)
        images_to_insert.append(image)

    if images_to_insert:
        await models.Image.insert_many(images_to_insert)
        print(f"Successfully seeded {len(images_to_insert)} images!")
    else:
        print("No images found in seed file.")

if __name__ == "__main__":
    asyncio.run(seed_db())
