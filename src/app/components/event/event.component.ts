import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Event} from 'src/models/event'

import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  
  constructor(private ES:EventService,private MS:MemberService,private router:Router,private dialog:MatDialog){}
  // Define displayed columns for the table
  displayedColumns: string[] = ['id', 'titre', 'DateDebut', 'DateFin', 'description', 'action'];
  dataSource: Event[] = []; // Initialize dataSource as an empty array

  

  ngOnInit(): void {
    this.fetch(); // Fetch data when the component initializes
  }

  // Fetch events from the service
  fetch(): void {
    this.ES.getEvents().subscribe({
      next: (events) => {
        this.dataSource = events; // Update the dataSource with the fetched events
      },
      error: (error) => {
        console.error('Error fetching events:', error); // Handle errors
      }
    });
  }

  // Delete an event by ID
  deleteEvent(id: string): void {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    // Wait for the result of the dialog
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If the user confirms, delete the event
        this.ES.deleteEventByid(id).subscribe({
          next: () => {
            this.fetch(); // Refresh the list after deletion
          },
          error: (error) => {
            console.error('Error deleting event:', error); // Handle errors
          }
        });
      }
    });
  }
 // applyFilter(event: Event) {
   // const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    
  //}
  
}
