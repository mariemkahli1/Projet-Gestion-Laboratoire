import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
  
  constructor(private MS:MemberService,private router:Router,private dialog:MatDialog){}
  //pointer sur le tableau du service 
  displayedColumns: string[] = ['id', 'cin', 'name', 'cv', 'type', 'createdDate','action'];
  dataSource!: Member[] ;
  dataSource2 =new MatTableDataSource(this.dataSource);

  ngOnInit(): void {
    this.fetch()
  }
  fetch():void{
    this.MS.getMembers().subscribe((tab)=>{
      
      this.dataSource=tab
      this.dataSource2 = new MatTableDataSource(this.dataSource);
    })
    console.log(this.dataSource2);

  }
  deleteMember(id:string):void{
    //open the dialog component
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    // wait for the result of afterclosed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.deleteMemberByid(id).subscribe(()=>{this.fetch()})
      }
    }); 
    

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    
  }
}
