from dataclasses import dataclass
import dataclasses
from pprint import pprint


@dataclass
class Database:
    name: str
    tables: list
    cid: str

@dataclass
class Table:
    name: str
    columns: list
    rows: list

@dataclass
class ForeignKey:
    reference_table: str
    reference_column: str

@dataclass
class Attribute:
    primary_key: bool
    unique: bool
    foreign_key: ForeignKey
    
@dataclass
class Column:
    name: str
    type: str
    attributes: Attribute

@dataclass
class DatabaseMapping:
    name: str
    database: Database
    admin_wallet: str
    funding_wallet: str
    private_key: str
