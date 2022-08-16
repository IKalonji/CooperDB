import dataclasses
from pprint import pprint
from DBCooper_Dataclasses import Database
from ipfs_requests import commit_db, load_db

class CooperDB():
    """ DB CUPA  Relational Database built on top of IPFS """

    def __init__(self, name):
        """Initialize the database with a name"""
        self.database = Database(name.lower(), tables=[], cid="")
        self.db_commit()

    def get_db(self):
        """Get the database"""
        return self.database

    def create_table(self, table):
        """Create a table in the database"""
        self.database.tables.append(table)
        self.db_commit()

    def delete_table(self, table):
        """Delete a table in the database"""
        self.database.tables.remove(table)

    def get_table(self, table):
        """Get a table in the database"""
        return self.database.tables[table]

    def insert_row(self, table, row):
        """Insert a row in the table"""
        self.database.tables[table].row.append(row)
        self.db_commit()

    def delete_row(self, table, row):
        """Delete a row in the table"""
        self.database.tables[table].row.remove(row)

    def update_row(self, table, row):
        """Update a row in the table"""
        self.database.tables[table].row.remove(row)
        self.database.tables[table].row.append(row)
        self.db_commit()

    def get_row(self, table, row):
        """Get a row in the table"""
        return self.database.tables[table].row[row]

    def db_commit(self):
        """Commit the database to IPFS"""
        self.database.cid = commit_db(dataclasses.asdict(self.database))
        return self.database.cid

    def db_load(self):
        """Load the database from IPFS"""
        self.database = load_db(self.database.cid)
        return self.database
    