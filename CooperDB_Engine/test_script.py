from terminaltables import DoubleTable
from CooperDB_Parser.CooperQL_parser import *
from pprint import pprint


def print_table(table):
    table_data = []
    headings = [column.name for column in table.columns]
    table_data.append(headings)
    for row in table.rows:
        row_data = []
        for column in headings:
            row_data.append(row[column])
        table_data.append(row_data)
    table = DoubleTable(table_data, table.name)
    print(table.table)

def print_database(database):
    print("Database: " + database.name)
    print("CID: " + database.cid)
    for table in database.tables:
        print_table(table)
    input("...continue...")


database = create_database({"database_name": "cooperDB_demo"})
print_database(database.database)

create_table({"database_name": "cooperDB_demo",
                    "name": "clients",
                    "columns": [
                        { "name": "name",
                        "type": "string",
                        "primary_key": True, 
                        "unique": True, 
                        "foreign_key": { "table": "address",
                        "column": "id" } },
                        { "name": "surname", 
                        "type": "string", 
                        "primary_key": False, 
                        "unique": False, 
                        "foreign_key": { "table": "address", 
                        "column": "id" } }]
                    })

create_table({"database_name": "cooperDB_demo",
                    "name": "addresses",
                    "columns": [
                        { "name": "name",
                        "type": "string",
                        "primary_key": True, 
                        "unique": True, 
                        "foreign_key": { "table": "clients",
                        "column": "name" } },
                        { "name": "address", 
                        "type": "string", 
                        "primary_key": False, 
                        "unique": True, 
                        "foreign_key": { "table": "", 
                        "column": "" } }]
                    })

print_database(database.database)

insert_into_table({
        "database_name": "cooperDB_demo",
        "table_name": "clients",
        "data": {
            "name": "issa",
            "surname": "kalonji"
        }
    })

insert_into_table({
        "database_name": "cooperDB_demo",
        "table_name": "clients",
        "data": {
            "name": "fil",
            "surname": "coin"
        }
    })

print_database(database.database)

insert_into_table({
    "database_name": "cooperDB_demo",
    "table_name": "clients",
    "data": {
        "name": "john",
        "surname": "doe"
    }
})

insert_into_table({
        "database_name": "cooperDB_demo",
        "table_name": "addresses",
        "data": {
            "name": "issa",
            "address": "0x123"
        }
    })

insert_into_table({
        "database_name": "cooperDB_demo",
        "table_name": "addresses",
        "data": {
            "name": "fil",
            "address": "0x456"
        }
    })

print_database(database.database)

pprint(join_tables({
        "database_name": "cooperDB_demo",
        "table_name": "clients",
        "join_table_name": "addresses",
        "join_column_name": "name",
        "join_type": "inner"
}))

print_database(database.database)


#print(DBCooper_Mapping["database_name"].database)

delete_row_from_table({
        "database_name": "cooperDB_demo",
        "table_name": "clients",
        "data": {
            "name": "john",
        }
    })

print_database(database.database)



update_table({ 
        "database_name": "cooperDB_demo",
        "table_name": "clients",
        "search_data": {
            "name": "issa"
        },
        "update_data": {
            "name": "issa",
            "surname": "winner"
        }
    })

print_database(database.database)

