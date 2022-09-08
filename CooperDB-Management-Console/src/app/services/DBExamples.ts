import { Database } from "../models/Database";

export class DBExamples {
    public databases: Database[] = [
        { 
            "name": "EmployeeDB",
            "tables": [
                {
                    "columns": 
                    [
                        {
                            "name": "Id2", 
                            "type": "Integer",
                            "attributes": 
                            {
                                "primary_key": true,
                                "unique": true,
                                "foreign_key": 
                                {
                                    "table": "",
                                    "column": ""
                                }
                            }
                        },
                        {
                            "name": "Name2", 
                            "type": "String",
                            "attributes": 
                            {
                                "primary_key": false,
                                "unique": false,
                                "foreign_key": 
                                {
                                    "table": "",
                                    "column": ""
                                }
                            }
                        }
                    ],
                    "rows": 
                    [
                        {"Id2": "1", "Name2": "Mothupi2"},
                        {"Id2": "2", "Name2": "Mike2"}
                    ],
                    "name": "EmployeeName2"
                },
                {
                    "columns": 
                    [
                        {
                            "name": "Id2", 
                            "type": "Integer",
                            "attributes": 
                            {
                                "primary_key": true,
                                "unique": true,
                                "foreign_key": 
                                {
                                    "table": "",
                                    "column": ""
                                }
                            }
                        },
                        {
                        "name": "NameId2", 
                        "type": "String",
                        "attributes": 
                        {
                            "primary_key": false,
                            "unique": false,
                            "foreign_key": 
                            {
                                "table": "EmployeeName2",
                                "column": "Id"
                            }
                        }
                        },
                        {
                        "name": "Surname2", 
                        "type": "String",
                        "attributes": 
                        {
                            "primary_key": false,
                            "unique": false,
                            "foreign_key": 
                            {
                                "table": "",
                                "column": ""
                            }
                        }
                        }
                    ],
                    "rows": 
                    [
                        {"Id2": 1, "NameId2": 1, "Surname2": "Ramogayana2"},
                        {"Id2": 2, "NameId2": 1 , "Surname2": "Rams2"},
                        {"Id2": 3, "NameId2": 2 , "Surname2": "May2"}
                    ],
                    "name": "EmployeeSurname2"
                }
            ]
        },
        { 
            "name": "StudentDB",
            "tables": [
                {
                    "columns": 
                    [
                        {
                            "name": "Id", 
                            "type": "Integer",
                            "attributes": 
                            {
                                "primary_key": true,
                                "unique": true,
                                "foreign_key": 
                                {
                                    "table": "",
                                    "column": ""
                                }
                            }
                        },
                        {
                            "name": "Name", 
                            "type": "String",
                            "attributes": 
                            {
                                "primary_key": false,
                                "unique": false,
                                "foreign_key": 
                                {
                                    "table": "",
                                    "column": ""
                                }
                            }
                        }
                    ],
                    "rows": 
                    [
                        {"Id": "1", "Name": "Mothupi"},
                        {"Id": "2", "Name": "Mike"}
                    ],
                    "name": "EmployeeName"
                },
                {
                    "columns": 
                    [
                        {
                            "name": "Id", 
                            "type": "Integer",
                            "attributes": 
                            {
                                "primary_key": true,
                                "unique": true,
                                "foreign_key": 
                                {
                                    "table": "",
                                    "column": ""
                                }
                            }
                        },
                        {
                        "name": "NameId", 
                        "type": "String",
                        "attributes": 
                        {
                            "primary_key": false,
                            "unique": false,
                            "foreign_key": 
                            {
                                "table": "EmployeeName",
                                "column": "Id"
                            }
                        }
                        },
                        {
                        "name": "Surname", 
                        "type": "String",
                        "attributes": 
                        {
                            "primary_key": false,
                            "unique": false,
                            "foreign_key": 
                            {
                                "table": "",
                                "column": ""
                            }
                        }
                        }
                    ],
                    "rows": 
                    [
                        {"Id": 1, "NameId": 1, "Surname": "Ramogayana"},
                        {"Id": 2, "NameId": 1 , "Surname": "Rams"},
                        {"Id": 3, "NameId": 2 , "Surname": "May"}
                    ],
                    "name": "EmployeeSurname"
                }
            ]
        }
    ];
}