"""
CooperQL_parser - Handle the parsing of the CooperQL input.
"""

'''

DB-Cupa Domain specific language:








'''

import dataclasses
import re
from DBCooper import CooperDB
from DBCooper_Dataclasses import Database, Table, Column, ForeignKey, Attribute
from pprint import pprint

DBCooper_Mapping = {}


def parse_input(input_dict):
    """
    Parse the input string and return a list of tuples.
    """
    query_store = {
        "create_database": parse_create_database,
        "create_table": parse_create_table,
        "insert_into_table": parse_insert_into_table,
        "delete_database": parse_delete_database,
        "delete_all_from_table": parse_delete_all_from_table,
        "delete_row_from_table": parse_delete_row_from_table,
        "delete_all_from_database": parse_delete_all_from_database,
        "update_table": parse_update_table,
        "get_value": parse_get_value,
        "get_all_from_table": parse_get_all_from_table,
        "get_all_from_database": parse_get_all_from_database,
        "join_tables": parse_join_tables
    }

    query = input_dict['query']

    return query_store[query](input_dict)


def parse_create_database(input_dict):
    """
    Parse the input list and return a database object.
    example input list: Create a database
    {
        query: "create_database",
        database_name: "database_name"
    }
    """
    if input_dict['database_name'] in DBCooper_Mapping:
        raise Exception("Database already exists")
    else:
        DBCooper_Mapping[input_dict['database_name']] = CooperDB(input_dict['database_name'])
        return DBCooper_Mapping[input_dict['database_name']]


def parse_create_table(input_dict, database):
    """
    Parse the input list and return a table object.
    example input dict: Create a table in the database
    {
        query: "create_table",
        table_name: "table_name",
        columns: [
            {
                name: "name",
                type: "string",
                primary_key: true,
                unique: true,
                foreign_key: {
                    table: "address",
                    column: "id"
            }
        ]
    }
    """

    table_columns = []

    for table_column in input_dict['columns']:
        try:
            column = table_column['name'].lower()
            type = table_column['type']
            primary_key = table_column['primary_key']
            unique = table_column['unique']
            foreign_key_table = table_column['foreign_key']['table']
            foreign_key_column = table_column['foreign_key']['column']

            table_columns.append(
                Column(
                    name=column, 
                    type=type, 
                    attributes=Attribute(
                        primary_key=primary_key, 
                        unique=unique, 
                        foreign_key=ForeignKey(
                            reference_table=foreign_key_table, 
                            reference_column=foreign_key_column
                            )
                        )
                    )
                )
        except KeyError as e:
            raise Exception("Missing key: {}".format(e))


    if input_dict['name'] in database.database.tables:
        raise Exception("Table already exists")
    else:
        database.create_table(
            Table(
                name=input_dict['name'],
                columns=table_columns,
                row=[]
            )
        )
        return database.database.tables

def parse_insert_into_table(input_dict, database:CooperDB):
    """
    Parse the input list and return a table object.
    example input dict: Insert into table
    {
        query: "insert_into_table",
        table_name: "table_name",
        data: {
            <column>: "<data>"
        }   
    }
    """
    if input_dict['table_name'] not in database.tables:
        raise Exception("Table does not exist")
    else:
        #Check if all columns are in the table and if all the data columns correspond to the columns in the table
        for column in input_dict['data']:
            if column not in database.tables[input_dict['table_name']].columns:
                raise Exception("Column does not exist") 
        table = database.tables[input_dict['table_name']]
        table.insert_row(input_dict['data'])
        return table

def parse_delete_database(input_dict):
    """
    Parse the input list and return a table object.
    example input dict: Delete database
    {
        query: "delete_database",
        database_name: "database_name"
    }
    """
    database = input_dict["database_name"]
    if database not in DBCooper_Mapping:
        raise Exception("Database does not exists")
    DBCooper_Mapping.pop(database)
    return database

def parse_delete_all_from_table(input_dict, database):
    """
    Parse the input list and return a table object.
    example input dict: Delete all from table
    {
        query: "delete_all_from_table",
        table_name: "table_name"
    }
    """

    pass

def parse_delete_row_from_table(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Delete row from table
    {
        query: "delete_row_from_table",
        table_name: "table_name",
        data: {
            <column>: "<data>",
        }
    }
    """
    pass

def parse_delete_all_from_database(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Delete all from database
    {
        query: "delete_all_from_database",
        database_name: "database_name"
    }
    """
    pass

def parse_update_table(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Update table
    {
        query: "update_table",
        table_name: "table_name",
        data: {
            <column>: "<data>"
        }
    }
    """
    pass

def parse_get_value(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Get value
    {
        query: "get_value",
        table_name: "table_name",
        column_name: "column_name",
        value: "<data>"
    }
    """
    pass

def parse_get_all_from_table(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Get all from table
    {
        query: "get_all_from_table",
        table_name: "table_name"
    }
    """
    pass

def parse_get_all_from_database(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Get all from database
    {
        query: "get_all_from_database",
        database_name: "database_name"
    }
    """
    pass

def parse_join_tables(input_dict, database):
    """
    Parse the input list and return a table object.
    example input list: Join tables
    {
        query: "join_tables",
        table_name: "table_name",
        join_table_name: "join_table_name",
        join_column_name: "join_column_name",
        join_type: "inner"
    }
    """
    pass


parse_create_database({"query": "create_database",
        "database_name": "database_name"})
parse_create_table({"query": "create_table",
                    "name": "table_name",
                    "columns": [{ "name": "name", "type": "string", "primary_key": True, "unique": True, "foreign_key": { "table": "address", "column": "id" } }]
                    }
                , DBCooper_Mapping["database_name"])

pprint(dataclasses.asdict(DBCooper_Mapping['database_name'].database))