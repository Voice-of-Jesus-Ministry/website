import os
from google.cloud import secretmanager
from dotenv import load_dotenv

# Load environment variables (project ID and secret name)
load_dotenv()
PROJECT_ID = os.getenv('GCP_PROJECT_ID')
SECRET_NAME = os.getenv('SERVICE_ACCOUNT_SECRET')
OUTPUT_PATH = os.path.abspath(os.path.join(__file__, '..', 'service_account.json'))

if not PROJECT_ID or not SECRET_NAME:
    raise EnvironmentError('GCP_PROJECT_ID and SERVICE_ACCOUNT_SECRET must be set in .env')

def fetch_secret():
    client = secretmanager.SecretManagerServiceClient()
    secret_path = f"projects/{PROJECT_ID}/secrets/{SECRET_NAME}/versions/latest"
    response = client.access_secret_version(name=secret_path)
    payload = response.payload.data.decode('UTF-8')
    return payload

def write_secret():
    secret_json = fetch_secret()
    # Write the JSON content to the expected location
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(secret_json)
    print(f'Service‑account JSON written to {OUTPUT_PATH}')

if __name__ == '__main__':
    write_secret()
