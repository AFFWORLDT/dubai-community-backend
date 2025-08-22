import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGODB_URI: str = "mongodb+srv://affworldtechnologies:wMbiyR0ZM8JWfOYl@loc.6qmwn3p.mongodb.net/"
    DATABASE_NAME: str = "dubia_meetups"
    JWT_SECRET_KEY: str = "your-super-secret-jwt-key-change-this-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Cloudinary Settings
    CLOUDINARY_CLOUD_NAME: str = "dbk0iancm"
    CLOUDINARY_API_KEY: str = "xUDIPFGtlbFTd3ZoQttFDPVZ728"
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET", "demo-api-secret-placeholder")
    CLOUDINARY_IMAGE_UPLOAD_PRESET: str = "24booking"
    CLOUDINARY_UPLOAD_PRESET: str = "24booking"

settings = Settings()
