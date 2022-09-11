import json
from mcs.api import McsAPI
from mcs.contract import ContractAPI
import os

def filswan_MCS(address, private_key, db):

    wallet_info = {
        "wallet_address" : address,
        "private_key": private_key,
        "web3_api": "https://rpc-mumbai.matic.today/"
    }

    db_json_object = json.dumps(db, indent=4)
    with open(f'{address}.json', 'w') as outfile:
        outfile.write(db_json_object)
    path = os.path.abspath(f"CooperDB_Engine/CooperDB_Helpers/{address}.json")

    return commit_db(wallet_info["wallet_address"], path)


def commit_db(wallet_info, db_path):
    api = McsAPI()
    upload_result = json.dumps(api.upload_file(wallet_info["wallet_address"], db_path)) 
    pay_storage(wallet_info, upload_result)
    return upload_result["data"]["payload_cid"]

def pay_storage(wallet_info, file_data):
    wallet_address = wallet_info['wallet_address']
    private_key = wallet_info['private_key']
    web3_api = wallet_info['web3_api']

    w3_api = ContractAPI(web3_api)
    api = McsAPI()
    payload_cid, source_file_upload_id, nft_uri, file_size, w_cid = file_data['payload_cid'], file_data['source_file_upload_id'], file_data['ipfs_url'], file_data['file_size'], file_data['w_cid']
    # get the global variable
    params = api.get_params()["data"]
    # get filcoin price
    rate = api.get_price_rate()["data"]
    # upload_file_pay
    w3_api.upload_file_pay(wallet_address, private_key, file_size, w_cid, rate, params)

