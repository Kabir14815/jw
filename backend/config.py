from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str = "garg-dev-secret-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 1 week
    mongodb_uri: str = (
        "mongodb+srv://Task:1234@cluster0.lnxh7gs.mongodb.net/rr_enterprise?retryWrites=true&w=majority"
    )

    class Config:
        env_file = ".env"


settings = Settings()
