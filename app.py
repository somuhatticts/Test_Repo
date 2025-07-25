from flask import Flask, render_template, request, jsonify
import os
import json
from werkzeug.utils import secure_filename
import openpyxl
import xlrd
import csv

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

ALLOWED_EXTENSIONS = {'xlsx', 'xls', 'csv'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def detect_cell_type(value):
    """Detect the type of a cell value"""
    if value is None or value == '':
        return 'empty'
    elif isinstance(value, (int, float)):
        return 'number'
    elif isinstance(value, str):
        # Try to convert to number
        try:
            float(value)
            return 'number'
        except (ValueError, TypeError):
            return 'text'
    else:
        return 'other'

def process_xlsx_file(filepath):
    """Process .xlsx file using openpyxl"""
    workbook = openpyxl.load_workbook(filepath)
    sheet = workbook.active
    
    # Get data dimensions
    max_row = min(sheet.max_row, 100)  # Limit to 100 rows
    max_col = min(sheet.max_column, 20)  # Limit to 20 columns
    
    # Extract column headers
    columns = []
    for col in range(1, max_col + 1):
        cell_value = sheet.cell(row=1, column=col).value
        columns.append(str(cell_value) if cell_value is not None else f'Column {col}')
    
    # Extract data
    data = []
    for row in range(2, max_row + 1):  # Start from row 2 (skip header)
        row_data = []
        for col in range(1, max_col + 1):
            cell_value = sheet.cell(row=row, column=col).value
            cell_type = detect_cell_type(cell_value)
            row_data.append({
                'value': cell_value if cell_value is not None else '',
                'type': cell_type
            })
        data.append(row_data)
    
    # Calculate statistics
    total_rows = max_row - 1  # Exclude header
    total_cols = max_col
    numeric_cols = 0
    text_cols = 0
    
    # Count column types based on first data row
    if data:
        for cell in data[0]:
            if cell['type'] == 'number':
                numeric_cols += 1
            elif cell['type'] == 'text':
                text_cols += 1
    
    return {
        'data': data,
        'columns': columns,
        'info': {
            'rows': total_rows,
            'columns': total_cols,
            'numeric_columns': numeric_cols,
            'text_columns': text_cols
        }
    }

def process_xls_file(filepath):
    """Process .xls file using xlrd"""
    workbook = xlrd.open_workbook(filepath)
    sheet = workbook.sheet_by_index(0)
    
    # Get data dimensions
    max_row = min(sheet.nrows, 100)  # Limit to 100 rows
    max_col = min(sheet.ncols, 20)  # Limit to 20 columns
    
    # Extract column headers
    columns = []
    if max_row > 0:
        for col in range(max_col):
            cell_value = sheet.cell_value(0, col)
            columns.append(str(cell_value) if cell_value else f'Column {col + 1}')
    
    # Extract data
    data = []
    for row in range(1, max_row):  # Start from row 1 (skip header)
        row_data = []
        for col in range(max_col):
            cell_value = sheet.cell_value(row, col)
            cell_type = detect_cell_type(cell_value)
            row_data.append({
                'value': cell_value if cell_value != '' else '',
                'type': cell_type
            })
        data.append(row_data)
    
    # Calculate statistics
    total_rows = max_row - 1 if max_row > 0 else 0
    total_cols = max_col
    numeric_cols = 0
    text_cols = 0
    
    # Count column types based on first data row
    if data:
        for cell in data[0]:
            if cell['type'] == 'number':
                numeric_cols += 1
            elif cell['type'] == 'text':
                text_cols += 1
    
    return {
        'data': data,
        'columns': columns,
        'info': {
            'rows': total_rows,
            'columns': total_cols,
            'numeric_columns': numeric_cols,
            'text_columns': text_cols
        }
    }

def process_csv_file(filepath):
    """Process .csv file"""
    data = []
    columns = []
    
    with open(filepath, 'r', encoding='utf-8', newline='') as csvfile:
        # Try to detect delimiter
        sample = csvfile.read(1024)
        csvfile.seek(0)
        sniffer = csv.Sniffer()
        delimiter = sniffer.sniff(sample).delimiter
        
        reader = csv.reader(csvfile, delimiter=delimiter)
        
        # Read header
        try:
            columns = next(reader)
            columns = [str(col) for col in columns[:20]]  # Limit to 20 columns
        except StopIteration:
            columns = []
        
        # Read data rows
        row_count = 0
        for row in reader:
            if row_count >= 99:  # Limit to 99 data rows + 1 header = 100 total
                break
            
            row_data = []
            for i, cell_value in enumerate(row[:20]):  # Limit to 20 columns
                cell_type = detect_cell_type(cell_value)
                row_data.append({
                    'value': cell_value if cell_value else '',
                    'type': cell_type
                })
            
            # Pad row if it has fewer columns than header
            while len(row_data) < len(columns):
                row_data.append({'value': '', 'type': 'empty'})
            
            data.append(row_data)
            row_count += 1
    
    # Calculate statistics
    total_rows = len(data)
    total_cols = len(columns)
    numeric_cols = 0
    text_cols = 0
    
    # Count column types based on first data row
    if data:
        for cell in data[0]:
            if cell['type'] == 'number':
                numeric_cols += 1
            elif cell['type'] == 'text':
                text_cols += 1
    
    return {
        'data': data,
        'columns': columns,
        'info': {
            'rows': total_rows,
            'columns': total_cols,
            'numeric_columns': numeric_cols,
            'text_columns': text_cols
        }
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        try:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Process the file based on extension
            file_ext = filename.rsplit('.', 1)[1].lower()
            
            if file_ext == 'xlsx':
                processed_data = process_xlsx_file(filepath)
            elif file_ext == 'xls':
                processed_data = process_xls_file(filepath)
            elif file_ext == 'csv':
                processed_data = process_csv_file(filepath)
            else:
                return jsonify({'error': 'Unsupported file format'}), 400
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify({
                'success': True,
                'data': processed_data
            })
            
        except Exception as e:
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500
    
    return jsonify({'error': 'Invalid file type. Please upload Excel (.xlsx, .xls) or CSV files.'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)