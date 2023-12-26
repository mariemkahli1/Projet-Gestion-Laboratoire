import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-enseignant-form',
  templateUrl: './enseignant-form.component.html',
  styleUrls: ['./enseignant-form.component.css']
})
export class EnseignantFormComponent implements OnInit {
  constructor(private MS: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }
  form!: FormGroup;
  memberGlobal!: Member;
  ngOnInit(): void {
    //recupiration id
    const idcourant = this.activatedRoute.snapshot.params["id"];
    if (!!idcourant) {
      this.MS.getMemberByid(idcourant).subscribe((item) => {
        this.memberGlobal = item
        this.updateForm(item)
      })
    }
    else {
      this.initForm()
    }

  }
  initForm() {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl("********", [Validators.required]),
      grade: new FormControl(null, [Validators.required]),
      etablissement: new FormControl(null, [Validators.required]),
    });
  }
  updateForm(item: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(item.cin, [Validators.required]),
      nom: new FormControl(item.nom, [Validators.required]),
      prenom: new FormControl(item.prenom, [Validators.required]),
      dateNaissance: new FormControl(item.dateNaissance, [Validators.required]),
      cv: new FormControl(item.cv, [Validators.required]),
      email: new FormControl(item.email, [Validators.required]),
      password: new FormControl("********", [Validators.required]),
      grade: new FormControl(item.sujet, [Validators.required]),
      etablissement: new FormControl(item.dateInscription, [Validators.required]),
    });
  }
  OnSubmit() {

    console.log(this.form.value)
    const member = {
      ...this.memberGlobal,
      ...this.form.value,

    }
    this.MS.SaveEnseignant(member).subscribe(() => { this.router.navigate(['/members']) })
  }
}