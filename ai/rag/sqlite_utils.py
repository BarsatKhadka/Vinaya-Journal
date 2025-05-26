import sqlite3
from pathlib import Path

user_home = Path.home()
database_path = user_home / "vinayadb" / "journalEntries.db"

def get_all_entries() -> list[tuple[str, str]]:
    """Returns all entries with content date from the database"""
    
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()
    cursor.execute("SELECT entry_date,content FROM entries")
    rows = cursor.fetchall()
    return rows