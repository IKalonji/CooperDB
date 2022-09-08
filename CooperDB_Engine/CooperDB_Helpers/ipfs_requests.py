import requests
import json
import subprocess


API_KEY = "KEY_HERE"
URL = "https://api-eu1.tatum.io/v3/ipfs"

def commit_db(db):
    """Commit the database to IPFS"""
    db_json_object = json.dumps(db, indent=4)
    with open('temp.json', 'w') as outfile:
        outfile.write(db_json_object)
    f = open('temp.json', 'rb')
    r = subprocess.run(["curl",
     "-i", "-X", "POST", f"{URL}", 
     "-H", f"x-api-key: {API_KEY}", 
     "-H", "Content-Type: multipart/form-data", 
     "-F", "file=@temp.json"], stdout=subprocess.PIPE)
    f.close()
    response_json = r.stdout.decode('utf-8')
    # print(response_json)
    response_json = response_json.split()
    # print(response_json)
    response_json = response_json[-1]
    if "ipfsHash" in response_json:
        return json.loads(response_json)["ipfsHash"]
    return "error committing to IPFS"
    

def load_db(cid):
    """Load the database from IPFS"""
    response = requests.get(f"{URL}/{cid}", headers={"x-api-key": API_KEY})
    if response.status_code == 200:
        print(response.text)