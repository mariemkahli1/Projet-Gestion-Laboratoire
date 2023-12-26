import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolsCreateComponent } from '../tools-create/tools-create.component';
import { ToolService } from 'src/services/tool.service';
import { Tool } from 'src/models/tool';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  constructor(private TS:ToolService,private dialog: MatDialog) {}
  displayedColumns: string[] = ['id', 'Date', 'Source', 'Createur','action'];
  dataSource!: Tool[] ;
  ngOnInit(): void {
    this.fetch()
  }
  fetch():void{
    this.TS.getTools().subscribe((tab)=>{
      this.dataSource=tab
    })
    console.log(this.dataSource);
    
  }
  OpenDialog():void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef= this.dialog.open(ToolsCreateComponent, dialogConfig);
  
  dialogRef.afterClosed().subscribe(data => {
    
    if (data) {
      this.TS.SaveTool(data).subscribe(()=>{this.fetch()})
    }
  }); 
}
deleteOutil(id:string):void{
  //open the dialog component
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '300px',
  });
  // wait for the result of afterclosed
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.TS.deleteToolByid(id).subscribe(()=>{this.fetch()})
    }
  }); 
  

}
}
