import msal
import requests
import json
import io
import csv
from config import CLIENT_ID, CLIENT_SECRET, AUTHORITY, SCOPES, GRAPH_ENDPOINT

class OneDriveService:
    def __init__(self):
        self.client_app = msal.ConfidentialClientApplication(
            CLIENT_ID,
            authority=AUTHORITY,
            client_credential=CLIENT_SECRET,
        )
        self.access_token = None
    
    def get_auth_url(self):
        """Get the authorization URL for OAuth flow"""
        auth_url = self.client_app.get_authorization_request_url(
            SCOPES,
            redirect_uri="http://localhost:5000/auth/callback"
        )
        return auth_url
    
    def get_token_from_code(self, auth_code):
        """Exchange authorization code for access token"""
        try:
            result = self.client_app.acquire_token_by_authorization_code(
                auth_code,
                scopes=SCOPES,
                redirect_uri="http://localhost:5000/auth/callback"
            )
            
            if "access_token" in result:
                self.access_token = result["access_token"]
                return True
            else:
                print(f"Token acquisition failed: {result.get('error_description', 'Unknown error')}")
                return False
        except Exception as e:
            print(f"Error getting token: {str(e)}")
            return False
    
    def get_token_from_client_credentials(self):
        """Get access token using client credentials flow (for app-only access)"""
        try:
            result = self.client_app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
            
            if "access_token" in result:
                self.access_token = result["access_token"]
                return True
            else:
                print(f"Token acquisition failed: {result.get('error_description', 'Unknown error')}")
                return False
        except Exception as e:
            print(f"Error getting token: {str(e)}")
            return False
    
    def _make_graph_request(self, endpoint, method="GET"):
        """Make a request to Microsoft Graph API"""
        if not self.access_token:
            raise Exception("No access token available. Please authenticate first.")
        
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }
        
        url = f"{GRAPH_ENDPOINT}{endpoint}"
        
        try:
            if method == "GET":
                response = requests.get(url, headers=headers)
            else:
                response = requests.request(method, url, headers=headers)
            
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Graph API request failed: {str(e)}")
            if hasattr(e.response, 'text'):
                print(f"Response: {e.response.text}")
            raise
    
    def list_files(self, folder_path=""):
        """List files in OneDrive folder"""
        try:
            if folder_path:
                endpoint = f"/me/drive/root:/{folder_path}:/children"
            else:
                endpoint = "/me/drive/root/children"
            
            result = self._make_graph_request(endpoint)
            return result.get('value', [])
        except Exception as e:
            print(f"Error listing files: {str(e)}")
            return []
    
    def search_files(self, query="", file_types=None, folder_path=""):
        """Search for files in OneDrive"""
        try:
            if query:
                endpoint = f"/me/drive/root/search(q='{query}')"
            else:
                # If no query, list all files in the specified folder or root
                if folder_path:
                    endpoint = f"/me/drive/root:/{folder_path}:/children"
                else:
                    endpoint = "/me/drive/root/children"
            
            result = self._make_graph_request(endpoint)
            files = result.get('value', [])
            
            # Filter by file types if specified
            if file_types:
                filtered_files = []
                for file in files:
                    if 'file' in file and file['name'].lower().endswith(tuple(file_types)):
                        filtered_files.append(file)
                return filtered_files
            
            return files
        except Exception as e:
            print(f"Error searching files: {str(e)}")
            return []
    
    def get_csv_files(self, folder_path=""):
        """Get specifically CSV files from OneDrive"""
        try:
            if folder_path:
                endpoint = f"/me/drive/root:/{folder_path}:/children"
            else:
                endpoint = "/me/drive/root/children"
            
            result = self._make_graph_request(endpoint)
            files = result.get('value', [])
            
            # Filter for CSV files only
            csv_files = []
            for file in files:
                if 'file' in file and file['name'].lower().endswith('.csv'):
                    csv_files.append(file)
            
            return csv_files
        except Exception as e:
            print(f"Error getting CSV files: {str(e)}")
            return []
    
    def get_folders(self, folder_path=""):
        """Get folders from OneDrive for navigation"""
        try:
            if folder_path:
                endpoint = f"/me/drive/root:/{folder_path}:/children"
            else:
                endpoint = "/me/drive/root/children"
            
            result = self._make_graph_request(endpoint)
            items = result.get('value', [])
            
            # Filter for folders only
            folders = []
            for item in items:
                if 'folder' in item:
                    folders.append({
                        'id': item['id'],
                        'name': item['name'],
                        'path': item.get('parentReference', {}).get('path', '') + '/' + item['name'],
                        'childCount': item.get('folder', {}).get('childCount', 0)
                    })
            
            return folders
        except Exception as e:
            print(f"Error getting folders: {str(e)}")
            return []
    
    def download_file(self, file_id):
        """Download a file from OneDrive and return its content"""
        try:
            endpoint = f"/me/drive/items/{file_id}/content"
            
            if not self.access_token:
                raise Exception("No access token available")
            
            headers = {
                'Authorization': f'Bearer {self.access_token}'
            }
            
            url = f"{GRAPH_ENDPOINT}{endpoint}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            return response.content
        except Exception as e:
            print(f"Error downloading file: {str(e)}")
            raise
    
    def download_file_by_path(self, file_path):
        """Download a file from OneDrive by its path"""
        try:
            endpoint = f"/me/drive/root:/{file_path}:/content"
            
            if not self.access_token:
                raise Exception("No access token available")
            
            headers = {
                'Authorization': f'Bearer {self.access_token}'
            }
            
            url = f"{GRAPH_ENDPOINT}{endpoint}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            return response.content
        except Exception as e:
            print(f"Error downloading file by path: {str(e)}")
            raise
    
    def get_file_info(self, file_path):
        """Get file information from OneDrive"""
        try:
            endpoint = f"/me/drive/root:/{file_path}"
            result = self._make_graph_request(endpoint)
            return result
        except Exception as e:
            print(f"Error getting file info: {str(e)}")
            return None

# Demo function for testing without full OAuth (uses public files or shared links)
def download_public_onedrive_file(share_url):
    """
    Download a file from a public OneDrive share URL
    This is for demo purposes when full OAuth setup isn't available
    """
    try:
        # For demo purposes, always return sample CSV content
        sample_csv = """Name,Age,City,Salary,Department,Join Date,Performance Rating
John Doe,28,New York,75000,Engineering,2022-01-15,4.5
Jane Smith,32,Los Angeles,85000,Marketing,2021-03-22,4.2
Bob Johnson,45,Chicago,95000,Sales,2020-07-10,4.8
Alice Brown,29,Houston,70000,Engineering,2022-05-18,4.1
Charlie Wilson,38,Phoenix,80000,HR,2021-11-03,4.6
Diana Davis,26,Philadelphia,65000,Marketing,2023-02-14,4.3
Frank Miller,41,San Antonio,90000,Sales,2020-12-08,4.7
Grace Lee,33,San Diego,78000,Engineering,2021-09-25,4.4
Henry Taylor,35,Dallas,82000,Finance,2021-06-12,4.5
Ivy Chen,27,San Jose,88000,Engineering,2022-08-30,4.9
Michael Brown,42,Columbus,92000,Sales,2020-04-18,4.6
Sarah Wilson,31,Charlotte,79000,Marketing,2021-12-05,4.2
David Miller,39,Detroit,86000,Finance,2020-09-14,4.4
Lisa Garcia,30,El Paso,74000,HR,2022-07-20,4.3
James Rodriguez,36,Memphis,81000,Engineering,2021-05-08,4.7"""
        return sample_csv.encode('utf-8')
    except Exception as e:
        print(f"Error downloading public file: {str(e)}")
        raise