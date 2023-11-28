import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  constructor(private MS: MemberService,private router:Router,private activatedRoute:ActivatedRoute) { }
  form!: FormGroup;
  memberGlobal!:Member ;
  ngOnInit():void {
    //recupiration id
    const idcourant = this.activatedRoute.snapshot.params["id"] ;
    if(!!idcourant){
      this.MS.getMemberByid(idcourant).subscribe((item)=>{
        this.memberGlobal=item
        this.initForm2(item)
      })
    }
    else{
      this.initForm()
    }

  }
  initForm() {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }
  initForm2(item:Member):void {
    this.form = new FormGroup({
      cin: new FormControl(item.cin, [Validators.required]),
      name: new FormControl(item.name, [Validators.required]),
      cv: new FormControl(item.cv, [Validators.required]),
      type: new FormControl(item.type, [Validators.required]),
    });
  }
  OnSubmit() {
    
      console.log(this.form.value)
      const member1 = {
        ...this.memberGlobal,
        ...this.form.value,

      }
      //remove id 
      const member2 = {
        ...member1,
        id: member1.id ??Math.ceil(Math.random() * 1000),
        createdDate: member1.createdDate ?? new Date().toISOString().toString()
      }
      this.MS.SaveMember(member2).subscribe(()=>{this.router.navigate(['/members'])})
  }
}
