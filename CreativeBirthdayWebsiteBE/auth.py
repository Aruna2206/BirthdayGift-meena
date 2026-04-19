from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import models, schemas

SECRET_KEY = "supersecretromanticbirthdaykey"
ALGORITHM = "HS256"
# EXACTLY 5 MINUTES EXPIRATION TO FORCE LOGOUT
ACCESS_TOKEN_EXPIRE_MINUTES = 5

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
    if isinstance(plain_password, str):
        plain_password = plain_password.encode('utf-8')
    return bcrypt.checkpw(plain_password, hashed_password)

def get_password_hash(password):
    if isinstance(password, str):
        password = password.encode('utf-8')
    return bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials or token expired. Please log in again.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print(f"Decoding token: {token[:10]}...")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        print(f"Decoded username: {username}")
        if username is None:
            print("Username missing in payload")
            raise credentials_exception
    except JWTError as e:
        print(f"JWT Decoding failed: {str(e)}")
        raise credentials_exception
    except Exception as e:
        print(f"Unexpected error during token validation: {str(e)}")
        raise credentials_exception
        
    user = await models.User.find_one(models.User.username == username)
    if user is None:
        print(f"User {username} not found in database")
        raise credentials_exception
    return user

