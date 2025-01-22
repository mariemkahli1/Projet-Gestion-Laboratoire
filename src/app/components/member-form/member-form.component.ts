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
  form!: FormGroup;
  memberGlobal!: Member;
  type!: string;

  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.determineMemberType();
    const currentId = this.activatedRoute.snapshot.params['id'];
    if (currentId) {
      this.MS.getMemberById(currentId).subscribe({
        next: (member) => {
          this.memberGlobal = member;
          this.initializeForm(member);
        },
        error: (err) => console.error('Error fetching member:', err),
      });
    } else {
      this.initializeForm();
    }
  }


  /**
   * Determine the member type based on the URL or other logic.
   */
  determineMemberType(): void {
    const url = this.router.url.toLowerCase();
    this.type = url.includes('enseignant') ? 'Enseignant' : 'Etudiant';
  }

  /**
   * Initialize the form with default values or existing member data.
   * @param member Optional existing member data to prefill the form.
   */
  initializeForm(member?: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(member?.cin || null, [Validators.required]),
      nom: new FormControl(member?.nom || null, [Validators.required]),
      prenom: new FormControl(member?.prenom || null, [Validators.required]),
      dateNaissance: new FormControl(member?.dateNaissance || null, [Validators.required]),
      cv: new FormControl(member?.cv || null, [Validators.required]),
      email: new FormControl(member?.email || null, [Validators.required, Validators.email]),
      password: new FormControl('********', [Validators.required]),
      sujet: new FormControl(member?.sujet || null),
      dateInscription: new FormControl(member?.dateInscription || null),
      diplome: new FormControl(member?.diplome || null),
      grade: new FormControl(member?.grade || null),
      etablissement: new FormControl(member?.etablissement || null),
    });
  }

  /**
   * Submit the form data and save the member.
   */
  onSubmit(): void {
    if (this.form.invalid) {
      console.error('Form is invalid!');
      return;
    }

    const formData = this.form.value;
    const memberToSave: Member = {
      ...this.memberGlobal,
      ...formData,
      createdDate: this.memberGlobal?.createdDate || new Date().toISOString(),
    };

    // Save or update the member
    const saveObservable = this.memberGlobal?.id
      ? this.MS.updateMember(this.memberGlobal.id, memberToSave)
      : this.MS.saveMember(memberToSave);

    saveObservable.subscribe({
      next: () => {
        // Redirect after successful submission
        this.router.navigate(['/member']);
      },
      error: (err) => console.error('Error saving member:', err),
    });
  }
  saveMember(): void {
    if (this.form.valid) {
      const memberToSave: Member = this.form.value;  // Get member data from the form
  
      this.MS.saveMember(memberToSave).subscribe({
        next: (response) => {
          console.log('Member saved successfully:', response);
          this.router.navigate(['/members']);  // Navigate to another page after saving
        },
        error: (err) => {
          console.error('Error saving member:', err);  // Log the error
          alert('An error occurred while saving the member. Please try again.');  // Show user-friendly error
        }
      });
    } else {
      alert('Form is invalid. Please check the fields.');
    }
  }
}
