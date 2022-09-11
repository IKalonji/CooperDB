from curses import keyname
import requests



headers = {"x-api-key": "YOUR_API_KEY_HERE"}


def generate_wallet():
    url = "https://api-eu1.tatum.io/v3/polygon/wallet"
    response = requests.get(url, headers=headers)
    data = response.json()
    mnemonic, xpub = data["mnemonic"], data["xpub"]
    address = generate_address_from_xpub(xpub)
    private_key = generate_polygon_account_private_key(mnemonic)
    return address, private_key

def generate_address_from_xpub(xpub):
    index = 0
    url = "https://api-eu1.tatum.io/v3/polygon/address/" + xpub + "/" + index
    response = requests.get(url, headers=headers)
    address = response.json()["address"]
    return address

def generate_polygon_account_private_key(mnemonic):
    url = "https://api-eu1.tatum.io/v3/polygon/wallet/priv"
    payload = {
    "index": 0,
    "mnemonic": mnemonic
    }
    response = requests.post(url, json=payload, headers=headers)
    key = response.json()["key"]
    return key