from pathlib import Path

from sqlalchemy import create_engine, Column, Integer, String, Float, Text, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker

# Create SQLite database locally
DB_PATH = Path(__file__).resolve().parent / "decisions.db"
engine = create_engine(f"sqlite:///{DB_PATH}", echo=False)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class Decision(Base):
    __tablename__ = "decisions"

    id = Column(Integer, primary_key=True, index=True)

    # 🔑 Claim identity
    reference_id = Column(String, unique=True, index=True)
    policy_number = Column(String)
    role = Column(String)

    # 🤖 AI outputs
    risk_score = Column(Float)
    risk_explanation = Column(Text)

    # 👨‍⚖️ Investigator inputs
    status = Column(String, default="submitted")
    investigator_comment = Column(Text, nullable=True)
    escalation = Column(String, nullable=True)
    override_reason = Column(String, nullable=True)


def init_db():
    Base.metadata.create_all(bind=engine)

    # Keep old databases compatible when new columns are introduced later.
    inspector = inspect(engine)
    if "decisions" not in inspector.get_table_names():
        return

    existing_columns = {column["name"] for column in inspector.get_columns("decisions")}
    required_columns = {
        "investigator_comment": "TEXT",
        "escalation": "VARCHAR",
        "override_reason": "VARCHAR",
    }

    missing_columns = {
        name: col_type
        for name, col_type in required_columns.items()
        if name not in existing_columns
    }

    if not missing_columns:
        return

    with engine.begin() as connection:
        for name, col_type in missing_columns.items():
            connection.execute(text(f"ALTER TABLE decisions ADD COLUMN {name} {col_type}"))
