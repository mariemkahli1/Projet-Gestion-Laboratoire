import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';
import { Member } from 'src/models/member';
@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css']
})
export class ToolsCreateComponent  implements OnInit{
  constructor(private MS:MemberService,private dialogRef: MatDialogRef<ToolsCreateComponent>,private fb: FormBuilder){}
  form!:FormGroup
  
  createurs !: Member[];
  ngOnInit(){
    this.form = this.fb.group({
      date: new FormControl<Date | null>(null),
      source: new FormControl(null,[]),
      Createur: new FormControl(null,[])

    })
    this.MS.getAllTeachers().subscribe((tab)=>{
      console.log(tab)
      this.createurs=tab  
    })
  }
  save():void{this.dialogRef.close(this.form.value)}
  close():void{this.dialogRef.close()}

}
