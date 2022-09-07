import { Component, OnInit, Inject } from '@angular/core';
import { CooperDbService } from 'src/app/services/cooper-db.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Database } from 'src/app/models/Database';

export interface DeleteData {
  confirmed: boolean,
  database: string
}

export interface RenameData {
  oldName: string,
  newName: string
}

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent implements OnInit {

  databases: Database[] = [];

  newDB: string = "";

  constructor(private databaseService:CooperDbService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDBs();
  }

  getDBs(){
    this.databases = this.databaseService.getDatabases()
  }

  addDBs(){
    if (this.newDB) this.databaseService.addDatabase(this.newDB);
    this.getDBs()
  }

  openConfirmDeleteDialog(database: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '400px',
      data: {confirmed: false, database: database},
    });

    dialogRef.afterClosed().subscribe(results => {
      // Delete Database
      if(results && results.confirmed) {
        var index = this.databases.indexOf(results.database, 0);
        this.databases.splice(index, 1);
      }
    });
  }

  openRenameDatabaseDialog(name: string): void {
    const dialogRef = this.dialog.open(RenameDatabaseDialog, {
      width: '400px',
      data: {oldName: name, newName: name},
    });

    dialogRef.afterClosed().subscribe(results => {
      // Delete Database
      if(results) {
        if(this.databases.includes(results.newName)) {
          console.log("Name already exists!!!");
        } else {
          var index = this.databases.indexOf(results.oldName, 0);
          this.databases[index] = results.newName;
        }
      }
    });
  }

}

@Component({
  selector: 'rename-database-dialog',
  templateUrl: 'rename-database-dialog.html',
  styleUrls: ['./databases.component.css']
})
export class RenameDatabaseDialog {
  constructor(
    public dialogRef: MatDialogRef<RenameDatabaseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RenameData,
  ){}

  
  onConfirm(): void {
    this.dialogRef.close(this.data);
  }
  
  onCancel(): void{
    this.dialogRef.close();
  }
}

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.html',
  styleUrls: ['./databases.component.css']
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteData,
  ){}

  
  onConfirm(): void{
    this.data.confirmed = true;
    this.dialogRef.close(this.data);
  }
  
  onCancel(): void{
    this.dialogRef.close();
  }
}
