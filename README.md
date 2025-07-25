# 📊 Excel Data Visualizer

A beautiful web application that accepts Excel files and displays them with colorful, interactive representations. Built with Flask (Python) backend and modern HTML/CSS/JavaScript frontend.

## Features

- **Multiple Data Sources**: 
  - 📁 **Local Upload**: Drag & drop files or click to browse
  - ☁️ **OneDrive Integration**: Fetch files directly from Microsoft OneDrive
  - 🎯 **Demo Mode**: Test with sample data without setup
- 🎨 **Colorful Data Visualization**: Different cell types are color-coded for easy identification
- 📊 **Data Summary**: Shows key statistics about your data (rows, columns, data types)
- 🔄 **Multiple Format Support**: Supports .xlsx, .xls, and .csv files
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- ⚡ **Fast Processing**: Optimized for quick file processing and display
- 🎯 **User-Friendly Interface**: Modern, intuitive design with smooth animations
- 🔐 **Microsoft Graph API Integration**: Secure authentication and file access

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

### OneDrive Setup (Optional)

To enable OneDrive integration:

1. **Follow the detailed setup guide**: See [ONEDRIVE_SETUP.md](ONEDRIVE_SETUP.md) for complete instructions
2. **Register app in Azure AD**: Create a Microsoft Graph API application
3. **Configure environment variables**: Set your client credentials
4. **Test the connection**: Use the OneDrive tab in the webapp

**Note**: OneDrive integration is optional. You can use the app with local file upload and demo mode without any additional setup.

## Usage

### Option 1: Local File Upload
1. **Click the "📁 Local Upload" tab**
2. **Upload a file**: 
   - Drag and drop an Excel file onto the upload area, or
   - Click "Choose File" to browse and select a file

### Option 2: OneDrive Integration
1. **Click the "☁️ OneDrive" tab**
2. **Connect to OneDrive**:
   - Click "Connect to OneDrive"
   - Sign in with your Microsoft account
   - Grant permissions to access your files
3. **Select a file**:
   - Browse your OneDrive files
   - Click on any Excel or CSV file to process it

### Option 3: Demo Mode
1. **Click the "🎯 Demo" tab**
2. **Load sample data**:
   - Click "Load Demo Data" to see the app in action
   - No setup or files required

### Viewing Results
- The app will process your file and display a colorful table
- See data summary with row/column counts and data type breakdown
- Scroll through your data with the interactive table
- Click "Upload Another File" to process a new file

## Technical Details

### Backend (Python/Flask)
- **Flask**: Web framework for handling HTTP requests
- **OpenPyXL**: Excel file format support (.xlsx)
- **XLRD**: Legacy Excel file format support (.xls)
- **MSAL**: Microsoft Authentication Library for OneDrive integration
- **Requests**: HTTP library for Microsoft Graph API calls

### Frontend
- **Pure HTML/CSS/JavaScript**: No external frameworks required
- **Modern CSS**: Gradients, animations, and responsive design
- **Drag & Drop API**: Native browser file handling
- **Fetch API**: Asynchronous file upload

### File Processing
- Supports Excel (.xlsx, .xls) and CSV files
- Multiple data sources: local upload, OneDrive, and demo mode
- Automatically detects data types (numbers, text, empty cells)
- Limits display to first 100 rows and 20 columns for performance
- Secure file handling with automatic cleanup
- Microsoft Graph API integration for OneDrive access

## File Structure

```
excel-visualizer/
├── app.py                 # Flask backend application
├── onedrive_service.py    # OneDrive/Microsoft Graph API integration
├── config.py              # Configuration for Microsoft Graph API
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Frontend HTML template with OneDrive UI
├── uploads/              # Temporary file storage (auto-created)
├── ONEDRIVE_SETUP.md     # OneDrive integration setup guide
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