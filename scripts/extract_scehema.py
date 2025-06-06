import sqlite3

def extract_schema(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT name, sql FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    schema_text = "**Database Schema:**\n\n"
    for name, sql in tables:
        schema_text += f"**Table: {name}**\n{sql}\n\n"

    conn.close()
    return schema_text

# Change 'your_database.db' to your actual SQLite database file
db_path = "../data/woa-empty.db"  
schema = extract_schema(db_path)

# Print and save schema
print(schema)
with open("schema.txt", "w") as file:
    file.write(schema)
