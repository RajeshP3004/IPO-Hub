from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.ipo import IPO
from app.repositories.ipo_repository import IPORepository

class IPOService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = IPORepository(db)

    def create_ipo(self, ipo_data: dict) -> IPO:
        ipo = IPO(**ipo_data)
        return self.repository.create(ipo)

    def get_all_ipos(self) -> list[IPO]:
        return self.repository.get_all()

    def get_ipo_by_id(self, ipo_id: int) -> IPO:
        ipo = self.repository.get_ipo(ipo_id)
        if not ipo:
            raise HTTPException(status_code=404, detail="IPO not found")
        return ipo

    def update_ipo(self, ipo_id: int, ipo_data: dict) -> IPO:
        ipo = self.get_ipo_by_id(ipo_id)
        for key, value in ipo_data.items():
            setattr(ipo, key, value)
        return self.repository.update(ipo)

    def delete_ipo(self, ipo_id: int) -> None:
        ipo = self.get_ipo_by_id(ipo_id)
        self.repository.delete(ipo)
