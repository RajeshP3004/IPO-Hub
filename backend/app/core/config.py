import os


class Settings:
    app_name = "IPO Hub"
    database_url = os.getenv("DATABASE_URL", "sqlite:///./ipo_hub.db")


settings = Settings()
