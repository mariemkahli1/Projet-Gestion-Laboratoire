import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article';
import { Event } from 'src/models/event';
import { Member } from 'src/models/member';
import { Tool } from 'src/models/tool';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-full-member',
  templateUrl: './full-member.component.html',
  styleUrls: ['./full-member.component.css']
})
export class FullMemberComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'grade', 'etablissement', 'dateInscription', 'sujet', 'action'];
  dataSource = new MatTableDataSource<Member>(); // Unified data source for all members
  searchId: string = '';
  searchedMember: Member | null = null;

  constructor(
    private MS: MemberService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMembers(); // Fetch all members (students + teachers)
  }

  fetchMembers(): void {
    this.MS.getMembers().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Set data for the unified member list
      },
      error: (err) => {
        console.error('Error fetching members:', err);
      }
    });
  }

  deleteMember(id: string): void {
    // Open confirmation dialog before deleting
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.MS.deleteMemberById(id).subscribe({
          next: () => {
            // Refresh the list after deletion
            this.fetchMembers();
          },
          error: (err) => {
            console.error('Error deleting member:', err);
          }
        });
      }
    });
  }

  searchMember(): void {
    if (this.searchId.trim() === '') {
      this.searchedMember = null;
      this.dataSource.filter = ''; // Reset filter when search is empty
      return;
    }

    // Filter members based on search input
    this.dataSource.filter = this.searchId.trim().toLowerCase();
  }
}