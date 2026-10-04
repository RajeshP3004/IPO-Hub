from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas import IPOCreate, IPORead
from app.services.ipo_service import IPOService


router = APIRouter(prefix="/api/ipos", tags=["ipos"])


def get_ipo_service(db: Session = Depends(get_db)) -> IPOService:
    return IPOService(db)


@router.post("/", response_model=IPORead, status_code=status.HTTP_201_CREATED)
def create_ipo(ipo: IPOCreate, service: IPOService = Depends(get_ipo_service)):
    return service.create_ipo(ipo.model_dump())


@router.get("/", response_model=list[IPORead])
def get_ipos(service: IPOService = Depends(get_ipo_service)):
    return service.get_all_ipos()


@router.get("/{ipo_id}", response_model=IPORead)
def get_ipo(ipo_id: int, service: IPOService = Depends(get_ipo_service)):
    return service.get_ipo_by_id(ipo_id)


@router.put("/{ipo_id}", response_model=IPORead)
def update_ipo(ipo_id: int, ipo: IPOCreate, service: IPOService = Depends(get_ipo_service)):
    return service.update_ipo(ipo_id, ipo.model_dump())


@router.delete("/{ipo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ipo(ipo_id: int, service: IPOService = Depends(get_ipo_service)):
    service.delete_ipo(ipo_id)
