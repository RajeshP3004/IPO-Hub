from datetime import datetime

from pydantic import BaseModel, ConfigDict


class IPOBase(BaseModel):
    broker_ipo_id: str
    name: str
    symbol: str
    ISIN: str
    segment: str
    exchange: str
    price_min: float
    price_max: float
    cutoff_price: float
    lot_size: int
    minimum_lots: int
    maximum_lots: int
    open_date: datetime
    close_date: datetime
    listing_date: datetime | None = None
    status: str


class IPOCreate(IPOBase):
    pass


class IPORead(IPOBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
