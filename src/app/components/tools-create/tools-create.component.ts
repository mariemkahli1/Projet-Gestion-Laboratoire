import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css']
})
export class ToolsCreateComponent  implements OnInit{
  constructor(private dialogRef: MatDialogRef<ToolsCreateComponent>,private fb: FormBuilder){}
  form!:FormGroup
  createurs = ["ddd","ssss","rrr"];
  ngOnInit(){
    this.form = this.fb.group({
      Date: new FormControl(null,[]),
      Source: new FormControl(null,[]),
      Createur: new FormControl(null,[])

    })
  }
  save():void{this.dialogRef.close(this.form.value)}
  close():void{this.dialogRef.close()}

}
