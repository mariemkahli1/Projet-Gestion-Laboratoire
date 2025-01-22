import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article';
import { Event } from 'src/models/event';
import { Member } from 'src/models/member';
import { Tool } from 'src/models/tool';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-full-member',
  templateUrl: './full-member.component.html',
  styleUrls: ['./full-member.component.css']
})
export class FullMemberComponent implements OnInit {
  constructor(private MS: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }
  displayedColumnsTools: string[] = ['id', 'Date', 'Source'];
  dataTool!: Tool[] ;
  dataTool2 =new MatTableDataSource(this.dataTool);

  displayedColumnsEvent: string[] = ['id', 'titre', 'DateDebut', 'DateFin', 'lieu'];
  dataEvent!: Event[] ;
  dataEvent2 =new MatTableDataSource(this.dataEvent);

  displayedColumnsArticle: string[] = ['id', 'titre', 'Date', 'type', 'sourcePdf'];
  dataArticle!: Article[] ;
  dataArticle2 =new MatTableDataSource(this.dataArticle);

  dataSource!: Member ;

  ngOnInit(): void {
    const idcourant = this.activatedRoute.snapshot.params["id"];
    if (!!idcourant) {
      this.fetch(idcourant)
    }
  }

  fetch(id:string):void{
    this.MS.getFullMember(id).subscribe((tab)=>{
      
      this.dataSource=tab
      
      if (tab.outils) {
        this.dataTool2=new MatTableDataSource(tab.outils)
      }
      if (tab.events) {
        this.dataEvent2=new MatTableDataSource(tab.events)
      }
      if (tab.pubs) {
        this.dataArticle2=new MatTableDataSource(tab.pubs)
      }
    })

  }
}
