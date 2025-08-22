from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
from fastapi.responses import JSONResponse
from auth import get_current_user_id
from cloudinary_utils import upload_image, upload_video, delete_media, get_media_info
from models import CloudinaryUploadResponse
from typing import List
import io

router = APIRouter(prefix="/media", tags=["Media"])

@router.post("/upload/image", response_model=CloudinaryUploadResponse)
async def upload_user_image(
    file: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Upload a profile picture or event image
    """
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an image"
        )
    
    # Validate file size (max 10MB)
    if file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size must be less than 10MB"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Upload to Cloudinary
        result = await upload_image(
            file_content, 
            folder=f"dubai_community/users/{current_user_id}/images"
        )
        
        return CloudinaryUploadResponse(**result)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}"
        )

@router.post("/upload/video", response_model=CloudinaryUploadResponse)
async def upload_video_file(
    file: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Upload a video file
    """
    # Validate file type
    if not file.content_type.startswith('video/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a video"
        )
    
    # Validate file size (max 100MB)
    if file.size and file.size > 100 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size must be less than 100MB"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Upload to Cloudinary
        result = await upload_video(
            file_content, 
            folder=f"dubai_community/users/{current_user_id}/videos"
        )
        
        return CloudinaryUploadResponse(**result)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload video: {str(e)}"
        )

@router.post("/upload/event-image", response_model=CloudinaryUploadResponse)
async def upload_event_image(
    file: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Upload an event cover image
    """
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an image"
        )
    
    # Validate file size (max 10MB)
    if file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size must be less than 10MB"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Upload to Cloudinary
        result = await upload_image(
            file_content, 
            folder=f"dubai_community/events/images"
        )
        
        return CloudinaryUploadResponse(**result)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}"
        )

@router.delete("/delete/{public_id}")
async def delete_media_file(
    public_id: str,
    resource_type: str = "image",
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Delete a media file from Cloudinary
    """
    try:
        success = await delete_media(public_id, resource_type)
        if success:
            return {"message": "Media deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete media"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete media: {str(e)}"
        )

@router.get("/info/{public_id}")
async def get_media_information(
    public_id: str,
    resource_type: str = "image"
):
    """
    Get information about a media file
    """
    try:
        info = await get_media_info(public_id, resource_type)
        return info
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get media info: {str(e)}"
        )
