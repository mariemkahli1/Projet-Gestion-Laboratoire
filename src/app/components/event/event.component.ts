import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Event} from 'src/models/event'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  
  constructor(private ES:EventService,private router:Router,private dialog:MatDialog){}
  //pointer sur le tableau du service 
  displayedColumns: string[] = ['id', 'titre', 'DateDebut', 'DateFin', 'lieu','action'];
  dataSource!: Event[] ;

  ngOnInit(): void {
    this.fetch()
  }
  fetch():void{
    this.ES.getEvents().subscribe((tab)=>{
      this.dataSource=tab
    })
    console.log(this.dataSource)
  }
  deleteEvent(id:string):void{
    //open the dialog component
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    // wait for the result of afterclosed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ES.deleteEventByid(id).subscribe(()=>{this.fetch()})
      }
    }); 
    

  }
  
}
