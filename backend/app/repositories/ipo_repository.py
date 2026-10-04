from sqlalchemy.orm import Session
from app.models.ipo import IPO

class IPORepository:
    def __init__(self, db: Session):
        self.db = db

    def create_ipo(self, ipo: IPO) -> IPO:
        self.db.add(ipo)
        self.db.commit()
        self.db.refresh(ipo)
        return ipo

    def get_ipo(self, ipo_id: int) -> IPO:
        return self.db.query(IPO).filter(IPO.id == ipo_id).first()

    def get_all_ipos(self) -> list[IPO]:
        return self.db.query(IPO).all()

    def update_ipo(self, ipo: IPO) -> IPO:
        self.db.commit()
        self.db.refresh(ipo)
        return ipo

    def delete_ipo(self, ipo_id: int) -> None:
        ipo = self.get_ipo(ipo_id)
        if ipo:
            self.db.delete(ipo)
            self.db.commit()
