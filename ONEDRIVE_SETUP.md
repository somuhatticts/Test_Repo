# OneDrive Integration Setup Guide

This guide explains how to set up Microsoft Graph API integration to enable OneDrive file access in the Excel Data Visualizer.

## Prerequisites

1. A Microsoft Azure account
2. Access to Azure Active Directory
3. OneDrive account with Excel/CSV files

## Step 1: Register Application in Azure AD

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the application details:
   - **Name**: Excel Data Visualizer
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: 
     - Platform: Web
     - URI: `http://localhost:5000/auth/callback`
5. Click **Register**

## Step 2: Configure API Permissions

1. In your registered app, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Delegated permissions**
5. Add the following permissions:
   - `Files.Read`
   - `Files.Read.All`
6. Click **Add permissions**
7. Click **Grant admin consent** (if you have admin rights)

## Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and choose expiration
4. Click **Add**
5. **Copy the secret value immediately** (you won't be able to see it again)

## Step 4: Configure Environment Variables

Create a `.env` file in your project root or set environment variables:

```bash
# Required for OneDrive integration
MICROSOFT_CLIENT_ID=your-application-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret-value
MICROSOFT_TENANT_ID=your-tenant-id

# Session security
SECRET_KEY=your-random-secret-key-for-sessions
```

### Finding Your IDs:

- **Client ID**: Found in the app registration overview page
- **Tenant ID**: Found in the app registration overview page
- **Client Secret**: The value you copied in Step 3

## Step 5: Update Configuration

Update the `config.py` file with your actual values or ensure environment variables are set:

```python
import os

CLIENT_ID = os.getenv('MICROSOFT_CLIENT_ID', 'your-actual-client-id')
CLIENT_SECRET = os.getenv('MICROSOFT_CLIENT_SECRET', 'your-actual-client-secret')
TENANT_ID = os.getenv('MICROSOFT_TENANT_ID', 'your-actual-tenant-id')
SECRET_KEY = os.getenv('SECRET_KEY', 'your-actual-secret-key')
```

## Step 6: Test the Integration

1. Start your Flask application:
   ```bash
   python app.py
   ```

2. Open `http://localhost:5000` in your browser

3. Click on the **OneDrive** tab

4. Click **Connect to OneDrive**

5. Sign in with your Microsoft account

6. Grant permissions to the application

7. You should be redirected back to the app with access to your OneDrive files

## Demo Mode

If you don't want to set up the full OAuth flow, you can test the functionality using the **Demo** tab, which loads sample data without requiring OneDrive authentication.

## Troubleshooting

### Common Issues:

1. **"Invalid client" error**:
   - Check that your CLIENT_ID is correct
   - Ensure the redirect URI matches exactly

2. **"Invalid client secret" error**:
   - Verify your CLIENT_SECRET is correct
   - Make sure the secret hasn't expired

3. **Permission denied errors**:
   - Ensure you've granted the required permissions
   - Try granting admin consent

4. **Redirect URI mismatch**:
   - Make sure the redirect URI in Azure matches `http://localhost:5000/auth/callback`

### Testing Without Full Setup:

You can test the OneDrive functionality using the demo mode:
- Click the **Demo** tab
- Click **Load Demo Data**
- This will load sample CSV data without requiring OneDrive authentication

## Security Notes

- Never commit your client secret to version control
- Use environment variables for sensitive configuration
- Consider using Azure Key Vault for production deployments
- Regularly rotate your client secrets

## Production Deployment

For production deployment:

1. Update the redirect URI to your production domain
2. Use HTTPS for all endpoints
3. Store secrets securely (Azure Key Vault, environment variables)
4. Consider using managed identity for Azure deployments
5. Set up proper logging and monitoring

## API Limits

Microsoft Graph API has rate limits:
- 10,000 requests per 10 minutes per application
- Additional limits may apply based on your subscription

## Support

For issues with Microsoft Graph API:
- [Microsoft Graph documentation](https://docs.microsoft.com/en-us/graph/)
- [Azure AD app registration guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

For application-specific issues, check the Flask application logs for detailed error messages.