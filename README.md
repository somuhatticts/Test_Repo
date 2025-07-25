# Excel Visualizer Web App

This project is a lightweight Flask application that lets you upload an Excel spreadsheet and view its content in a colorful, responsive table right in your browser.

## Features

- Upload `.xls` or `.xlsx` files up to **10 MB**.
- Parses the sheet with `pandas` & `openpyxl` (first worksheet by default).
- Generates a vibrant, color-coded table using `pandas` Styler.
- Mobile-friendly UI powered by **Bootstrap 5**.

## Getting Started

1. **Create & activate** a virtual environment (optional but recommended):
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the server**:
   ```bash
   python app.py
   ```
   The app will start on [http://localhost:8000](http://localhost:8000).

## Usage

1. Open your browser and navigate to `http://localhost:8000`.
2. Click **Choose File** and select a valid Excel sheet.
3. Hit **Upload & View** and enjoy the colorful, interactive preview.

## Customization

- **Styling**: Modify the `styler` pipe in `app.py` or tweak CSS in `templates/display.html`.
- **File Size**: Adjust `app.config["MAX_CONTENT_LENGTH"]` in `app.py`.
- **Multiple Sheets**: If you want to select specific sheets, extend the upload route to expose sheet names and reload the preview accordingly.

## License

MIT