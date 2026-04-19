import asyncio
import auth
from database import init_db
import models

async def seed_user():
    # Initialize the database connection
    await init_db()
    
    # Check if the user already exists
    user = await models.User.find_one(models.User.username == "jaso")
    
    if not user:
        hashed_password = auth.get_password_hash("1023")
        db_user = models.User(username="jaso", hashed_password=hashed_password)
        await db_user.insert()
        print("Admin user 'jaso' created with password '1023' in MongoDB!")
    else:
        print("User already exists in MongoDB.")

if __name__ == "__main__":
    asyncio.run(seed_user())
