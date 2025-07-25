import os

# Microsoft Graph API Configuration
# You'll need to register an app in Azure AD to get these values
# Visit: https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade

# For development/demo purposes - these need to be replaced with actual values
CLIENT_ID = os.getenv('MICROSOFT_CLIENT_ID', 'your-client-id-here')
CLIENT_SECRET = os.getenv('MICROSOFT_CLIENT_SECRET', 'your-client-secret-here')
TENANT_ID = os.getenv('MICROSOFT_TENANT_ID', 'your-tenant-id-here')

# Microsoft Graph API endpoints
AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0"

# Scopes required for OneDrive access
SCOPES = [
    "https://graph.microsoft.com/Files.Read",
    "https://graph.microsoft.com/Files.Read.All"
]

# Redirect URI for OAuth flow
REDIRECT_URI = "http://localhost:5000/auth/callback"

# Session configuration
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-for-sessions')