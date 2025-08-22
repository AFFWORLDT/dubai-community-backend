import math
from typing import Dict, List, Tuple
from datetime import datetime, timedelta

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the distance between two points using the Haversine formula
    Returns distance in kilometers
    """
    # Convert latitude and longitude from degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Haversine formula
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    # Earth's radius in kilometers
    r = 6371
    
    return c * r

def create_geospatial_query(latitude: float, longitude: float, radius_km: float) -> Dict:
    """
    Create a MongoDB geospatial query for finding users within a radius
    """
    # Convert radius from kilometers to degrees (approximate)
    # 1 degree ≈ 111 km at the equator
    radius_degrees = radius_km / 111.0
    
    return {
        "location": {
            "$geoWithin": {
                "$centerSphere": [
                    [longitude, latitude],  # MongoDB uses [longitude, latitude] order
                    radius_degrees / 6371  # Convert to radians
                ]
            }
        },
        "share_location": True
    }

def create_location_document(latitude: float, longitude: float, location_name: str = None) -> Dict:
    """
    Create a location document for MongoDB storage
    """
    return {
        "type": "Point",
        "coordinates": [longitude, latitude],  # MongoDB uses [longitude, latitude] order
        "location_name": location_name,
        "updated_at": datetime.utcnow()
    }

def get_location_filters(
    latitude: float,
    longitude: float,
    radius_km: float = 10.0,
    interests: List[str] = None,
    age_min: int = None,
    age_max: int = None,
    gender: str = None,
    online_only: bool = False
) -> Dict:
    """
    Create comprehensive filters for location-based user search
    """
    filters = create_geospatial_query(latitude, longitude, radius_km)
    
    # Add interest filter
    if interests:
        filters["interests"] = {"$in": interests}
    
    # Add age filter
    if age_min is not None or age_max is not None:
        age_filter = {}
        if age_min is not None:
            age_filter["$gte"] = age_min
        if age_max is not None:
            age_filter["$lte"] = age_max
        filters["age"] = age_filter
    
    # Add gender filter
    if gender:
        filters["gender"] = gender
    
    # Add online filter (users active in last 30 minutes)
    if online_only:
        filters["last_location_update"] = {
            "$gte": datetime.utcnow() - timedelta(minutes=30)
        }
    
    return filters

def sort_by_distance(latitude: float, longitude: float) -> List:
    """
    Create MongoDB sort criteria for sorting by distance
    """
    return [
        {
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "distanceField": "distance",
                "spherical": True,
                "distanceMultiplier": 0.001  # Convert to kilometers
            }
        }
    ]

def format_location_response(location_doc: Dict) -> Dict:
    """
    Format location document for API response
    """
    if not location_doc:
        return None
    
    return {
        "latitude": location_doc["coordinates"][1],  # MongoDB stores as [lon, lat]
        "longitude": location_doc["coordinates"][0],
        "location_name": location_doc.get("location_name"),
        "updated_at": location_doc.get("updated_at")
    }

def validate_coordinates(latitude: float, longitude: float) -> bool:
    """
    Validate that coordinates are within valid ranges
    """
    return -90 <= latitude <= 90 and -180 <= longitude <= 180

def get_dubai_regions() -> List[str]:
    """
    Get list of Dubai regions for filtering
    """
    return [
        "Dubai Marina",
        "Downtown Dubai",
        "Palm Jumeirah",
        "Jumeirah Beach Residence",
        "Business Bay",
        "Dubai Internet City",
        "Dubai Media City",
        "Dubai Knowledge Park",
        "Dubai Sports City",
        "Dubai Silicon Oasis",
        "Dubai International City",
        "Dubai Motor City",
        "Dubai Studio City",
        "Dubai Production City",
        "Dubai Academic City",
        "Dubai Healthcare City",
        "Dubai World Trade Centre",
        "Sheikh Zayed Road",
        "Al Barsha",
        "Al Quoz",
        "Al Safa",
        "Umm Suqeim",
        "Jumeirah",
        "Al Wasl",
        "Al Manara",
        "Al Satwa",
        "Al Karama",
        "Bur Dubai",
        "Deira",
        "Al Qusais",
        "Al Nahda",
        "Al Qouz",
        "Al Warqa",
        "Mirdif",
        "Dubai Hills Estate",
        "Emirates Hills",
        "Springs",
        "Meadows",
        "Lakes",
        "Arabian Ranches",
        "Dubai Investment Park",
        "Jebel Ali",
        "Al Furjan",
        "Discovery Gardens",
        "Garden",
        "Ibn Battuta",
        "Dubai Marina",
        "Jumeirah Lakes Towers"
    ]
