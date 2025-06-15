import sqlite3
from pathlib import Path
from rag.chromautils import get_existing_entry_dates

user_home = Path.home()
database_path = user_home / "vinayadb" / "journalEntries.db"

def get_all_entries() -> list[tuple[str, str]]:
    """Returns all entries with content date from the database"""
    
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()
    existing_dates, _ = get_existing_entry_dates()
    
    if existing_dates:
        existing_dates_list = list(existing_dates)  
        placeholders = ",".join("?" * len(existing_dates_list))
        cursor.execute(f"SELECT entry_date,content FROM entries WHERE entry_date NOT IN ({placeholders})", existing_dates_list)
    else:
        cursor.execute("SELECT entry_date,content FROM entries")
        
    rows = cursor.fetchall()
    return rows