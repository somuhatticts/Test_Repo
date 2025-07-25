from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
from io import BytesIO
import os

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024  # 10 MB upload limit

ALLOWED_EXTENSIONS = {"xls", "xlsx"}

def allowed_file(filename: str) -> bool:
    """Check if uploaded file is an Excel sheet."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET"])
def index():
    """Render the upload form."""
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():
    """Handle file upload and display the styled Excel content."""
    if "file" not in request.files:
        return redirect(url_for("index"))

    file = request.files["file"]

    # No file selected
    if file.filename == "":
        return redirect(url_for("index"))

    # Invalid extension
    if not allowed_file(file.filename):
        return render_template(
            "index.html", error="Please upload a valid Excel file (.xls or .xlsx)"
        )

    try:
        # Read the uploaded file into a pandas DataFrame
        buffer = BytesIO(file.read())
        df = pd.read_excel(buffer, engine="openpyxl")
    except Exception as exc:
        return render_template(
            "index.html", error=f"Failed to process the Excel file: {exc}"
        )

    # Create a colorful representation using pandas Styler
    styler = (
        df.style.background_gradient(cmap="viridis")
        .set_table_attributes("class='table table-bordered table-hover table-sm'" )
    )
    html_table = styler.to_html()

    return render_template("display.html", table=html_table)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8000)), debug=True)