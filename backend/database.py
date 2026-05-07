import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib

# Configuration for MS SQL Server
# Defaulting to 'ODBC Driver 17 for SQL Server' as requested by typical setups,
# but making it configurable via environment variable.
driver = os.getenv("DB_DRIVER", "{ODBC Driver 17 for SQL Server}")
server = "."
database = "ProjectSelect"
trusted_connection = "yes"
trust_server_certificate = "yes"

connection_string = (
    f"Driver={driver};"
    f"Server={server};"
    f"Database={database};"
    f"Trusted_Connection={trusted_connection};"
    f"TrustServerCertificate={trust_server_certificate};"
)

params = urllib.parse.quote_plus(connection_string)
SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"

# For local testing if MS SQL is not available
if os.getenv("DB_TYPE") == "sqlite":
    SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
