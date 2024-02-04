from flask import Flask, render_template, request, jsonify
import subprocess
from flask_cors import CORS
import os
import json
from subprocess import Popen, PIPE
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load data from JSON file
data_file_path = 'input_data.json'  # Replace with the actual path to your JSON file
collect_script_path = 'collect_data.js'  # Replace with the actual path to your collect.js script

def run_collect_script():
    try:
        password = get_password()

        # Run the collect.js script with sudo and provide the password
        command = f'echo {password} | sudo -S node {collect_script_path}'
        process = Popen(command, shell=True, stdin=PIPE, stdout=PIPE, stderr=PIPE)
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            print(f"Error running collect.js: {stderr.decode()}")
    except Exception as e:
        print(f"Error running collect.js: {e}")


# Load data from JSON file initially
with open(data_file_path, 'r') as f:
    data = json.load(f)


def get_password():
    return os.getenv('PASSWORD','default_password')


def execute_command(command):
    try:
        if command == '/proc/cpuinfo':
            with open(command, 'r') as file:
                result = file.read()
        elif command.startswith('timeout'):
            result = subprocess.check_output(command, shell=True, text=True, timeout=5)
        elif command.startswith('sudo netstat -anp'):
            result = execute_sudo_netstat(command)
        elif command.startswith('sudo'):
            result = execute_sudo_command(command)
        else:
            result = subprocess.check_output(command, shell=True, text=True)
        return result
    except subprocess.CalledProcessError as e:
        return f"Error: {e}"
    except subprocess.TimeoutExpired:
        return "Error: Command timed out."



def execute_sudo_netstat(command):
    # Handle the sudo netstat -anp command
    password = get_password()  # Use a default password for demonstration purposes (replace with more secure approach)
    return subprocess.check_output(f'echo {password} | sudo -S netstat -anp', shell=True, text=True)

def execute_sudo_ss(command):
    # Handle the sudo netstat -anp command
    password = get_password()  # Use a default password for demonstration purposes (replace with more secure approach)
    return subprocess.check_output(f'echo {password} | sudo -S ss -tunap', shell=True, text=True)

def execute_sudo_command(command):
    # Handle other sudo commands
    password =  get_password() # Use a default password for demonstration purposes (replace with more secure approach)
    return subprocess.check_output(f'echo {password} | sudo -S {command[5:]}', shell=True, text=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/collect')
def get_collect():
    # Run the collect script before serving the data
    run_collect_script()

    # Load data from JSON file
    with open(data_file_path, 'r') as f:
        data = json.load(f)
   
    return jsonify(data)

@app.route('/get_data')
def get_data():
    command = request.args.get('command', '/proc/cpuinfo')
    result = execute_command(command)
    return result
    
def execute_whois(command):
    try:
        result = subprocess.check_output(command, shell=True, text=True)
        return result
    except subprocess.CalledProcessError as e:
        return f"Error running whois: {e}"
    except subprocess.TimeoutExpired:
        return "Error: Command timed out."

if __name__ == '__main__':
    app.run(debug=True)

