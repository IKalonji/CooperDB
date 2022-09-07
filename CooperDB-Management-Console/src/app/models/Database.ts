interface ForeignKey {
    table: string,
    column: string
}

interface Attributes {
    primary_key: boolean,
    unique: boolean,
    foreign_key: ForeignKey
}

interface Column {
    name: string,
    type: string,
    attributes: Attributes
}

interface Table {
    columns: Column[],
    name: string,
    rows: {[key: string]: any}[]
}

interface Database {
    name: string,
    tables: Table[]
}

export {
    Column,
    Table,
    Database
}