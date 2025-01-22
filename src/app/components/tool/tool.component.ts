import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolsCreateComponent } from '../tools-form/tools-create.component';
import { ToolService } from 'src/services/tool.service';
import { Tool } from 'src/models/tool';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from 'src/services/member.service';


@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  constructor(private TS:ToolService, private MS:MemberService,private dialog: MatDialog) {}
  displayedColumns: string[] = ['id', 'Date', 'Source', 'action'];
  dataSource: Tool[] = [];
  dataSource2 = new MatTableDataSource<Tool>(this.dataSource);

  // Initialisation et récupération des outils
  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.TS.getTools().subscribe({
      next: (tools) => {
        this.dataSource = tools;
        this.dataSource2.data = this.dataSource; // Met à jour la table
      },
      error: (err) => {
        console.error('Error fetching tools:', err);
      }
    });
  }

  openDialog(id?: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ToolsCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const tool = { id, ...data };
        if (id) {
          this.TS.updateTool(id, tool).subscribe(() => this.fetch());
        } else {
          this.TS.saveTool(tool).subscribe(() => this.fetch());
        }
      }
    });
  }

  deleteTool(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.TS.deleteToolById(id).subscribe(() => this.fetch());
      }
    });
  }
}
