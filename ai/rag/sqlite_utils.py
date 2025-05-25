import sqlite3
from pathlib import Path

user_home = Path.home()
database_path = user_home / "vinayadb" / "journalEntries.db"

def get_all_entries():
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()
    cursor.execute("SELECT content FROM entries")
    rows = cursor.fetchall()
    content = [i for i in rows]
    print(content)