import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CooperDbService {

  private databases: string[] = [];

  constructor() { }

  getDatabases(){
    return this.databases;
  }

  addDatabase(name:string){
    this.databases.push(name);
  }

  getDatabase(name:string){
    return {
      database: name,
      tables: [
        {
          name: "one",
          columns:["id", "name", "surname"]
        },
        {
          name: "two",
          columns:["oneid", "address", "country"]
        }
      ]
    }
  }
}
