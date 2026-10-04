from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class IPO(Base):
    __tablename__ = 'ipos'

    id = Column(Integer, primary_key=True, index=True)
    broker_ipo_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    symbol = Column(String, index=True)
    ISIN = Column(String, unique=True)
    segment = Column(String)  # MAINBOARD or SME
    exchange = Column(String)
    price_min = Column(Float)
    price_max = Column(Float)
    cutoff_price = Column(Float)
    lot_size = Column(Integer)
    minimum_lots = Column(Integer)
    maximum_lots = Column(Integer)
    open_date = Column(DateTime)
    close_date = Column(DateTime)
    listing_date = Column(DateTime)
    status = Column(String)  # UPCOMING, OPEN, CLOSED, LISTED
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)