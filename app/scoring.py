import json
from pathlib import Path


def load_config():
    config_path = Path(__file__).resolve().parent / "config.json"
    with config_path.open("r", encoding="utf-8") as f:
        return json.load(f)


def calculate_risk_score(features):
    config = load_config()
    score = 0
    explanations = []

    for feature in config["features"]:
        name = feature["name"]
        weight = feature["weight"]

        value = features.get(name, 0)

        # Special handling for bill amount
        if name == "total_bill_amount":
            threshold = feature["risk_threshold"]
            risk = 1 if value > threshold else 0
        else:
            # For binary features (1 = good, 0 = risky)
            risk = 1 - value

        weighted_risk = risk * weight
        score += weighted_risk

        explanations.append(
            f"{name}: value={value}, risk_contribution={round(weighted_risk, 3)}"
        )

    return round(score, 3), explanations
