import cloudinary
import cloudinary.uploader
import cloudinary.api
from config import settings
from typing import Optional, List
import uuid

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

async def upload_image(file_data: bytes, folder: str = "dubai_community", public_id: Optional[str] = None) -> dict:
    """
    Upload an image to Cloudinary
    """
    if not public_id:
        public_id = f"{folder}/{uuid.uuid4()}"
    
    try:
        result = cloudinary.uploader.upload(
            file_data,
            public_id=public_id,
            folder=folder,
            resource_type="image",
            transformation=[
                {"width": 800, "height": 600, "crop": "limit"},
                {"quality": "auto", "fetch_format": "auto"}
            ]
        )
        return {
            "public_id": result["public_id"],
            "secure_url": result["secure_url"],
            "format": result["format"],
            "resource_type": result["resource_type"],
            "width": result.get("width"),
            "height": result.get("height")
        }
    except Exception as e:
        raise Exception(f"Failed to upload image: {str(e)}")

async def upload_video(file_data: bytes, folder: str = "dubai_community", public_id: Optional[str] = None) -> dict:
    """
    Upload a video to Cloudinary
    """
    if not public_id:
        public_id = f"{folder}/{uuid.uuid4()}"
    
    try:
        result = cloudinary.uploader.upload(
            file_data,
            public_id=public_id,
            folder=folder,
            resource_type="video",
            transformation=[
                {"width": 1280, "height": 720, "crop": "limit"},
                {"quality": "auto", "fetch_format": "auto"}
            ]
        )
        return {
            "public_id": result["public_id"],
            "secure_url": result["secure_url"],
            "format": result["format"],
            "resource_type": result["resource_type"],
            "width": result.get("width"),
            "height": result.get("height"),
            "duration": result.get("duration")
        }
    except Exception as e:
        raise Exception(f"Failed to upload video: {str(e)}")

async def delete_media(public_id: str, resource_type: str = "image") -> bool:
    """
    Delete media from Cloudinary
    """
    try:
        result = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        return result.get("result") == "ok"
    except Exception as e:
        print(f"Failed to delete media: {str(e)}")
        return False

async def get_media_info(public_id: str, resource_type: str = "image") -> dict:
    """
    Get media information from Cloudinary
    """
    try:
        result = cloudinary.api.resource(public_id, resource_type=resource_type)
        return {
            "public_id": result["public_id"],
            "secure_url": result["secure_url"],
            "format": result["format"],
            "resource_type": result["resource_type"],
            "width": result.get("width"),
            "height": result.get("height"),
            "created_at": result.get("created_at")
        }
    except Exception as e:
        raise Exception(f"Failed to get media info: {str(e)}")

def get_cloudinary_url(public_id: str, transformation: Optional[List[dict]] = None) -> str:
    """
    Generate a Cloudinary URL with optional transformations
    """
    if transformation:
        return cloudinary.CloudinaryImage(public_id).build_url(transformation=transformation)
    return cloudinary.CloudinaryImage(public_id).build_url()
