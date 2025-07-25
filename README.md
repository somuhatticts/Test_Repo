# 📊 Excel Data Visualizer

A beautiful web application that accepts Excel files and displays them with colorful, interactive representations. Built with Flask (Python) backend and modern HTML/CSS/JavaScript frontend.

## Features

- 📁 **Drag & Drop Upload**: Simply drag and drop your Excel files or click to browse
- 🎨 **Colorful Data Visualization**: Different cell types are color-coded for easy identification
- 📊 **Data Summary**: Shows key statistics about your data (rows, columns, data types)
- 🔄 **Multiple Format Support**: Supports .xlsx, .xls, and .csv files
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- ⚡ **Fast Processing**: Optimized for quick file processing and display
- 🎯 **User-Friendly Interface**: Modern, intuitive design with smooth animations

## Color Coding System

- 🟢 **Green**: Numeric data (integers, floats)
- 🟡 **Orange**: Text data (strings)
- ⚪ **Gray**: Empty cells
- 🟣 **Purple**: Other data types (dates, special formats)

## Installation

1. **Clone or download this repository**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

1. **Upload a file**: 
   - Drag and drop an Excel file onto the upload area, or
   - Click "Choose File" to browse and select a file

2. **View your data**:
   - The app will process your file and display a colorful table
   - See data summary with row/column counts and data type breakdown
   - Scroll through your data with the interactive table

3. **Upload another file**:
   - Click "Upload Another File" to process a new file

## Technical Details

### Backend (Python/Flask)
- **Flask**: Web framework for handling HTTP requests
- **Pandas**: Data processing and Excel file reading
- **OpenPyXL**: Excel file format support (.xlsx)
- **XLRD**: Legacy Excel file format support (.xls)

### Frontend
- **Pure HTML/CSS/JavaScript**: No external frameworks required
- **Modern CSS**: Gradients, animations, and responsive design
- **Drag & Drop API**: Native browser file handling
- **Fetch API**: Asynchronous file upload

### File Processing
- Supports Excel (.xlsx, .xls) and CSV files
- Automatically detects data types (numbers, text, empty cells)
- Limits display to first 100 rows and 20 columns for performance
- Secure file handling with automatic cleanup

## File Structure

```
excel-visualizer/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Frontend HTML template
├── uploads/              # Temporary file storage (auto-created)
└── README.md            # This file
```

## Security Features

- File type validation
- Secure filename handling
- Automatic file cleanup after processing
- File size limits (16MB max)
- No permanent file storage

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License

This project is open source and available under the MIT License.

---

**Enjoy visualizing your Excel data! 🎉**