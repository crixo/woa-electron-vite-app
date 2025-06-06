import subprocess
import re
import sys
import os
from datetime import datetime

def load_schema(schema_path):
    """Load the database schema from a file."""
    try:
        with open(schema_path, "r") as file:
            return file.read().strip()
    except FileNotFoundError:
        print(f"Error: Schema file '{schema_path}' not found.")
        sys.exit(1)

def run_mistral(schema, user_request):
    """Run Mistral via Ollama with the provided schema and user request."""
    full_prompt = schema + "\n\n" + user_request

    result = subprocess.run(["ollama", "run", "mistral", full_prompt], capture_output=True, text=True)
    return result.stdout.strip()

def extract_sql(llm_output):
    """Extract SQL code from Mistral's response (inside ```sql ... ``` blocks)."""
    sql_match = re.search(r"```sql\s+(.*?)\s+```", llm_output, re.DOTALL)

    if sql_match:
        return sql_match.group(1).strip()
    return "No valid SQL statement found."

def save_output(output_folder, llm_output):
    """Save the full LLM output to a timestamped file."""
    os.makedirs(output_folder, exist_ok=True)  # Ensure folder exists
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_path = os.path.join(output_folder, f"mistral_output_{timestamp}.txt")

    with open(file_path, "w") as file:
        file.write(llm_output)

    return file_path

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python script.py '<user_request>' <schema_file_path> <output_folder_path>")
        sys.exit(1)

    user_request = sys.argv[1]
    schema_file = sys.argv[2]
    output_folder = sys.argv[3]

    schema = load_schema(schema_file)
    llm_output = run_mistral(schema, user_request)
    
    extracted_sql = extract_sql(llm_output)
    output_file = save_output(output_folder, llm_output)

    # print("\nExtracted SQL Query:\n", extracted_sql)
    # print(f"\nFull LLM output saved to: {output_file}")
    print(extracted_sql)
