import os
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile, Form, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import List

from dotenv import load_dotenv

import models, schemas, auth
from database import init_db

load_dotenv()

app = FastAPI(title="Romantic Birthday Website API")

# Setup CORS so the frontend can easily communicate
# Added the production origins jaso-023.vercel.app and jaso-23.vercel.app
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,https://jaso-023.vercel.app,https://jaso-23.vercel.app")
origins = [origin.strip() for origin in allowed_origins_env.split(",")]
if "*" in origins:
    # If * is present, we handle it specially if credentials are needed
    # but for simplicity, we'll just allow all for now if * is in env
    pass

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder to store images (relative to project root)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_FOLDER = os.path.join(BASE_DIR, "static")
os.makedirs(IMAGES_FOLDER, exist_ok=True)

# Custom route to serve images from Database (for Vercel) or Local File (for Local)
@app.get("/static/{filename}")
async def serve_static_image(filename: str):
    # Try to finding in DB first (For files uploaded while live on Vercel)
    db_image = await models.Image.find_one(models.Image.filename == filename)
    
    import mimetypes
    content_type, _ = mimetypes.guess_type(filename)
    content_type = content_type or "image/jpeg"

    if db_image and db_image.content:
        return Response(content=db_image.content, media_type=content_type)
    
    # Fallback: check if the file exists in the physical static folder
    # (For files that were pushed to GitHub inside the static folder)
    local_path = os.path.join(IMAGES_FOLDER, filename)
    if os.path.exists(local_path):
        from fastapi.responses import FileResponse
        return FileResponse(local_path)
    
    raise HTTPException(status_code=404, detail="Image not found")

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Romantic Birthday Website API",
        "documentation": "/docs",
        "status": "Running successfully on Vercel"
    }

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await models.User.find_one(models.User.username == form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # REQUIRE 5 MINUTE LOGOUT AS INSTRUCTED
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "expires_in": auth.ACCESS_TOKEN_EXPIRE_MINUTES * 60}

@app.post("/users/", response_model=schemas.UserCreate)
async def create_user(user: schemas.UserCreate):
    db_user = await models.User.find_one(models.User.username == user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    await db_user.insert()
    return user

@app.post("/images/", response_model=schemas.ImageOut)
async def upload_image(
    title: str = Form(...),
    description: str = Form(None),
    page: str = Form("gallery"),
    category: str = Form(None),
    is_favorite: bool = Form(False),
    is_special: bool = Form(False),
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Upload an image file and save its details to the database."""
    import uuid
    import shutil
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = f"{IMAGES_FOLDER}/{filename}"
    
    # Read content once for both storage methods
    file_content = await file.read()
    
    # Method 1: Save to local filesystem (Will work locally, will be skipped on Vercel gracefully)
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file_content)
    except Exception as e:
        print(f"Skipping local file save (expected on Vercel): {e}")

    # Method 2: Save to Database (Works on Vercel and keeps files permanent!)
    image_url = f"/static/{filename}"
    db_image = models.Image(
        title=title,
        description=description,
        url=image_url,
        filename=filename,
        content=file_content,
        page=page,
        category=category,
        is_favorite=is_favorite,
        is_special=is_special
    )
    await db_image.insert()
    return {**db_image.dict(), "id": str(db_image.id)}


@app.post("/bulk-images/", response_model=List[schemas.ImageOut])
async def upload_multiple_images(
    title: str = Form(""),
    description: str = Form(""),
    page: str = Form("gallery"),
    category: str = Form(None),
    is_favorite: bool = Form(False),
    is_special: bool = Form(False),
    files: List[UploadFile] = File(...),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Upload multiple image files and save their details to the database."""
    import uuid
    import shutil
    
    uploaded_images = []
    
    for file in files:
        file_extension = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"{IMAGES_FOLDER}/{filename}"
        
        file_content = await file.read()
        
        # Save to local filesystem if possible
        try:
            with open(file_path, "wb") as buffer:
                buffer.write(file_content)
        except Exception as e:
             print(f"Skipping local file save: {e}")
            
        # Create the db record with content
        image_url = f"/static/{filename}"
        db_image = models.Image(
            title=title if title else file.filename,
            description=description if description else "Bulk upload",
            url=image_url,
            filename=filename,
            content=file_content,
            page=page,
            category=category,
            is_favorite=is_favorite,
            is_special=is_special
        )
        await db_image.insert()
        uploaded_images.append({**db_image.dict(), "id": str(db_image.id)})
        
    return uploaded_images


@app.get("/images/{page}", response_model=List[schemas.ImageOut])
async def get_images_by_page(page: str):
    """
    Fetch images stored in DB for a specific page (e.g. 'gallery').
    """
    if page == "all":
        images = await models.Image.all().to_list()
    elif page == "favorites":
        images = await models.Image.find(models.Image.is_favorite == True).to_list()
    elif page == "special":
        images = await models.Image.find(models.Image.is_special == True).to_list()
    else:
        images = await models.Image.find(models.Image.page == page).to_list()
    
    return [{**img.dict(), "id": str(img.id)} for img in images]

@app.get("/images/filter/category/{category_name}", response_model=List[schemas.ImageOut])
async def get_images_by_category(category_name: str):
    """Fetch images by category name."""
    # Handle the URL encoding/decoding if needed, but uvicorn/fastapi handles spaces
    images = await models.Image.find(models.Image.category == category_name).to_list()
    return [{**img.dict(), "id": str(img.id)} for img in images]

@app.get("/images/", response_model=List[schemas.ImageOut])
async def get_all_images(
    category: str = None, 
    is_favorite: bool = None, 
    is_special: bool = None,
    search: str = None
):
    """Fetch stored images with optional filtering via query parameters."""
    criteria = []
    if category: 
        criteria.append(models.Image.category == category)
    if is_favorite is not None: 
        criteria.append(models.Image.is_favorite == is_favorite)
    if is_special is not None: 
        criteria.append(models.Image.is_special == is_special)
    if search:
        # Case insensitive search on title
        criteria.append({"title": {"$regex": search, "$options": "i"}})
        
    if not criteria:
        images = await models.Image.all().to_list()
    else:
        images = await models.Image.find(*criteria).to_list()
        
    return [{**img.dict(), "id": str(img.id)} for img in images]
