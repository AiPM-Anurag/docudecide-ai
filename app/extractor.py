import pdfplumber
import re


def extract_text_from_pdf(file_path):
    """
    Extract raw text from uploaded PDF using pdfplumber.
    This simulates OCR layer for now.
    """
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text


def extract_structured_data(text):
    """
    Convert unstructured document text into structured features.
    This simulates NLP extraction logic.
    """

    data = {}

    # Extract total bill amount (Example pattern: Total Bill: 450000)
    bill_match = re.search(r"Total Bill[:\s]+(\d+)", text, re.IGNORECASE)
    if bill_match:
        data["total_bill_amount"] = int(bill_match.group(1))
    else:
        data["total_bill_amount"] = 0

    # Check policy validation phrase
    if re.search(r"Policy Valid", text, re.IGNORECASE):
        data["policy_coverage_match"] = 1
    else:
        data["policy_coverage_match"] = 0

    # Basic completeness heuristic
    if len(text) > 200:
        data["document_completeness"] = 1
    else:
        data["document_completeness"] = 0

    return data