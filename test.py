from CooperQL_parser import *

def main(): 
    db = parse_input({
        "query": "create_database",
        "database_name": "mydb"
    })

    db2 = parse_input({
        "query": "create_database",
        "database_name": "mydb2"
    })

    """tbl = parse_input({
        "query": ""
    })"""

    print(db.database)
    print("\n")
    print(DBCooper_Mapping)


main()