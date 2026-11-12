import os
from dotenv import load_dotenv
import re
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

BASE_DIR = os.path.abspath(os.path.join(__file__, "..", "..")) 
CREDENTIALS_PATH = os.path.join(BASE_DIR, "backend", "service_account.json")
LOG_FILE_PATH = os.path.join(BASE_DIR, "firestore-debug.log")

load_dotenv()

# Configuration variables
SHEET_ID = os.getenv('SHEET_ID')
SPREADSHEET_NAME = os.getenv('SPREADSHEET_NAME', 'Looker_Telemetry_Data')
WORKSHEET_NAME = os.getenv('WORKSHEET_NAME', 'Firestore_Logs')
USER_EMAIL = os.getenv('USER_EMAIL', 'nicholaimadias@gmail.com')

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------
def authenticate_gspread():
    if not os.path.isfile(CREDENTIALS_PATH):
        raise FileNotFoundError(
            f"Service‑account file not found at {CREDENTIALS_PATH}. "
            "Place your JSON key there and share the target Sheet with the "
            "client_email inside the file."
        )
    credentials = Credentials.from_service_account_file(
        CREDENTIALS_PATH, scopes=SCOPES
    )
    return gspread.authorize(credentials)

def parse_log_line(line: str):
    timestamp_match = re.search(r"^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)", line)
    level_match = re.search(r"\[(INFO|WARN|ERROR|DEBUG)\]", line)
    
    if not timestamp_match or not level_match:
        return None
        
    timestamp = timestamp_match.group(1)
    level = level_match.group(1)
    message = line.split("]", 1)[-1].strip()
    
    return [timestamp, level, message]

def parse_log_file(path: str):
    if not os.path.isfile(path):
        raise FileNotFoundError(f"Log file not found at {path}")
    
    rows = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            parsed = parse_log_line(line.strip())
            if parsed:
                rows.append(parsed)
    return rows

def update_google_sheet(data_rows):
    client = authenticate_gspread()
    sheet = None

    # 1. Prioritize opening by SHEET_ID if provided in .env
    if SHEET_ID:
        try:
            sheet = client.open_by_key(SHEET_ID)
            print(f"Successfully opened sheet by ID.")
        except gspread.exceptions.APIError:
            print(f"\n[ERROR] 404 Not Found. You must share your Google Sheet with:")
            print(f"-> firebase-adminsdk-fbsvc@amazing-grace-hl.iam.gserviceaccount.com\n")
            return
    else:
        # 2. Fallback to opening or creating by Name
        try:
            sheet = client.open(SPREADSHEET_NAME)
            print(f"Successfully opened sheet: {SPREADSHEET_NAME}")
        except gspread.exceptions.SpreadsheetNotFound:
            print(f"Spreadsheet not found. Creating '{SPREADSHEET_NAME}'...")
            sheet = client.create(SPREADSHEET_NAME)
            
            # CRITICAL: Share the newly created sheet so you can access it
            print(f"Sharing new sheet with {USER_EMAIL}...")
            sheet.share(USER_EMAIL, perm_type='user', role='writer')
            print(f"Sheet URL: {sheet.url}")

    if not sheet:
        return

    # 3. Handle the Worksheet
    try:
        worksheet = sheet.worksheet(WORKSHEET_NAME)
    except gspread.exceptions.WorksheetNotFound:
        worksheet = sheet.add_worksheet(title=WORKSHEET_NAME, rows="1000", cols="3")
    
    worksheet.clear()
    worksheet.append_row(["Timestamp", "Level", "Message"])
    
    if data_rows:
        worksheet.append_rows(data_rows)
        
    print(f"Successfully uploaded {len(data_rows)} log entries to '{WORKSHEET_NAME}'.")

# ---------------------------------------------------------------------------
# Main execution
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print("Parsing logs...")
    try:
        log_data = parse_log_file(LOG_FILE_PATH)
        print(f"Found {len(log_data)} entries.")
        print("Uploading to Google Sheets...")
        update_google_sheet(log_data)
    except FileNotFoundError as e:
        print(f"[ERROR] {e}")
