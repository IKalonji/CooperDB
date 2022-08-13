"""
CooperQL_parser - Handle the parsing of the CooperQL input.
"""

'''

DB-Cupa Domain specific language:








'''

from ast import Raise
import dataclasses
from itertools import count
from msilib.sequence import tables
import re
from DBCooper import CooperDB
from DBCooper_Dataclasses import Database, Table, Column, ForeignKey, Attribute
from pprint import pprint

DBCooper_Mapping = {}


def parse_input(query, input_dict):
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

    if query not in query_store:
        raise Exception("Provided query is invalid")
    return query_store[query](input_dict)


def parse_create_database(input_dict):
    """
    Parse the input list and return a database object.
    example input list: Create a database
    {
        database_name: "database_name"
    }
    """
    if input_dict['database_name'] in DBCooper_Mapping:
        raise Exception("Database already exists")
    else:
        DBCooper_Mapping[input_dict['database_name']] = CooperDB(input_dict['database_name'])
        return DBCooper_Mapping[input_dict['database_name']]

def parse_create_table(input_dict):
    """
    Parse the input list and return a table object.
    example input dict: Create a table in the database
    {
        databse_name: "database_name",
        "table_name": "table_name",
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
    database = input_dict['database_name']

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


    if input_dict['name'] in DBCooper_Mapping[database].database.tables:
        raise Exception("Table already exists")
    else:
        DBCooper_Mapping[database].create_table(
            Table(
                name=input_dict['name'],
                columns=table_columns,
                rows=[]
            )
        )
        return DBCooper_Mapping[database].database.tables

def parse_insert_into_table(input_dict):
    """
    Parse the input list and return a table object.
    example input dict: Insert into table
    {
        databse_name: "database_name",
        table_name: "table_name",
        data: {
            <column>: "<data>"
        }   
    }
    """
    database_name = input_dict["database_name"]
    table_name = input_dict["table_name"]
    rows = input_dict['data']
    for row in rows:
        if ColumnExists(database_name, table_name, row):
            tables = DBCooper_Mapping[database_name].database.tables
            for table in tables:
                if table.name == table_name:
                    table.rows.append(rows)
                    return table

def parse_delete_database(input_dict):
    """
    Parse the input list and return a table object.
    example input dict: Delete database
    {
        database_name: "database_name"
    }
    """
    database = input_dict["database_name"]
    if database not in DBCooper_Mapping:
        raise Exception("Database does not exists")
    DBCooper_Mapping.pop(database)
    return database

def parse_delete_all_from_table(input_dict):
    """
    Parse the input list and return a table object.
    example input dict: Delete all from table
    {
        database_name: "database_name",
        table_name: "table_name"
    }
    """
    database_name = input_dict["database_name"]
    table_name = input_dict["table_name"]
    if TableExists(database_name, table_name):
        tables = DBCooper_Mapping[database_name].database.tables
        for table in tables:
            if table.name == table_name:
                table.rows = []
                return table

def parse_delete_row_from_table(input_dict):
    """
    Parse the input list and return a table object.
    example input list: Delete row from table
    {
        database_name: "database_name",
        table_name: "table_name",
        data: {
            <column>: "<data>",
        }
    }
    """
    database_name = input_dict["database_name"]
    table_name = input_dict["table_name"]
    row = input_dict["data"]
    column_name = list(row.keys())[0]
    column_value = row[column_name]

    if ColumnExists(database_name, table_name, column_name):
        tables = DBCooper_Mapping[database_name].database.tables
        for table in tables:
            if table.name == table_name:
                rows = table.rows
                count = 0
                for row in rows:
                    count += 1
                    if row[column_name] == column_value:
                        rows.remove(row)
                        if count == len(rows):
                            return table

def parse_delete_all_from_database(input_dict):
    """
    Parse the input list and return a table list object.
    example input list: Delete all from database
    {
        database_name: "database_name"
    }
    """
    database_name = input_dict["database_name"]
    if DatabaseExists(database_name):
        tables = DBCooper_Mapping[database_name].database.tables
        count = 0
        for table in tables:
            count += 1
            table.rows = []
            if count == len(tables):
                return tables

def parse_update_table(input_dict):
    """
    Parse the input list and return a table object.
    example input list: Update table
    {
        database_name: "database_name",
        table_name: "table_name",
        data: {
            <column>: "<data>"
        }
    }
    """
    pass

def parse_get_value(input_dict):
    """
    Parse the input list and return a table object.
    example input list: Get value
    {
        database_name: "database_name",
        table_name: "table_name",
        column_name: "column_name",
        value: "<data>"
    }
    """
    pass

def parse_get_all_from_table(input_dict):
    """
    Parse the input list and return a table object.
    example input list: Get all from table
    {
        database_name: "database_name",
        table_name: "table_name"
    }
    """
    pass

def parse_get_all_from_database(input_dict):
    """
    Parse the input list and return a table list object.
    example input list: Get all from database
    {
        database_name: "database_name"
    }
    """
    pass

def parse_join_tables(input_dict):
    """
    Parse the input list and return a table object.
    example input list: Join tables
    {
        database_name: "database_name",
        table_name: "table_name",
        join_table_name: "join_table_name",
        join_column_name: "join_column_name",
        join_type: "inner"
    }
    """
    pass

def DatabaseExists(database_name):
    if database_name not in DBCooper_Mapping:
        raise Exception("Database '{}' does not exist".format(database_name))
    return True

def TableExists(database_name, table_name):
    DatabaseExists(database_name)
    for table in DBCooper_Mapping[database_name].database.tables:
        if table.name == table_name:
            return True
    raise Exception("Table '{}' does not exist".format(table_name))

def ColumnExists(database_name, table_name, column_name):
    TableExists(database_name, table_name)
    tables = DBCooper_Mapping[database_name].database.tables
    for table in tables:
        if table.name == table_name:
            for column in table.columns:
                if column_name == column.name:
                    return True
    raise Exception("Column '{}' does not exist".format(column_name))




parse_create_database({"database_name": "database_name"})
parse_create_table({"database_name": "database_name", "name": "table_name",
                    "columns": [{ "name": "name", "type": "string", "primary_key": True, "unique": True, "foreign_key": { "table": "address", "column": "id" } },
                    { "name": "surname", "type": "string", "primary_key": False, "unique": False, "foreign_key": { "table": "address", "column": "id" } }]
                    })

parse_create_table({"database_name": "database_name", "name": "table_name2",
                    "columns": [{ "name": "name", "type": "string", "primary_key": True, "unique": True, "foreign_key": { "table": "address", "column": "id" } },
                    { "name": "surname", "type": "string", "primary_key": False, "unique": False, "foreign_key": { "table": "address", "column": "id" } }]
                    })

print(DBCooper_Mapping["database_name"].database)

"""parse_delete_all_from_table({
        "database_name": "database_name",
        "table_name": "table_name"
    })"""

parse_insert_into_table({
        "database_name": "database_name",
        "table_name": "table_name",
        "data": {
            "name": "myname",
            "surname": "mysurname"
        }
    })

parse_insert_into_table({
        "database_name": "database_name",
        "table_name": "table_name",
        "data": {
            "name": "myname2",
            "surname": "mysurname2"
        }
    })

parse_insert_into_table({
        "database_name": "database_name",
        "table_name": "table_name",
        "data": {
            "name": "myname",
            "surname": "mysurname2"
        }
    })

parse_insert_into_table({
        "database_name": "database_name",
        "table_name": "table_name2",
        "data": {
            "name": "myname3",
            "surname": "mysurname3"
        }
    })

print(DBCooper_Mapping["database_name"].database)

parse_delete_row_from_table({
        "database_name": "database_name",
        "table_name": "table_name",
        "data": {
            "name": "myname",
        }
    })

parse_delete_all_from_database({
        "database_name": "database_name"
    })

print(DBCooper_Mapping["database_name"].database)

"""pprint(dataclasses.asdict(DBCooper_Mapping['database_name'].database))"""