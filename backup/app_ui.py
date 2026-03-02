import streamlit as st
import requests

st.set_page_config(page_title="DocuDecide AI", layout="centered")

st.title("📄 DocuDecide AI")
st.subheader("AI-Powered Decision Intelligence Engine")

uploaded_file = st.file_uploader("Upload Document (PDF)", type=["pdf"])

if uploaded_file is not None:
    st.write("Processing document...")

    files = {"file": uploaded_file}

    try:
        response = requests.post(
            "http://127.0.0.1:8000/process/",
            files=files
        )

        if response.status_code == 200:
            result = response.json()

            st.success("Decision Generated Successfully!")

            st.write("### 🧠 Decision:", result["decision"])
            st.write("### 📊 Risk Score:", result["score"])

            st.write("### 🔍 Extracted Features")
            st.json(result["features"])

            st.write("### 📖 Explanation")
            for explanation in result["explanations"]:
                st.write("-", explanation)

        else:
            st.error("Error processing document")

    except Exception as e:
        st.error(f"Connection error: {e}")