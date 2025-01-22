import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  constructor(private ES: EventService,private router:Router,private activatedRoute:ActivatedRoute) { }
  form : FormGroup = new FormGroup({
    titre: new FormControl(null, [Validators.required]),
    dateDebut: new FormControl<Date | null>(null),
    dateFin: new FormControl<Date | null>(null),
    description: new FormControl(null, [Validators.required]),
  });
  eventGlobal!:Event ;
  
  ngOnInit(): void {
    const currentId = this.activatedRoute.snapshot.params['id'];
    if (currentId) {
      this.ES.getEventByid(currentId).subscribe({
        next: (event) => {
          this.eventGlobal = event;
          this.initFormWithValues(event);
        },
        error: (err) => console.error('Error fetching event:', err),
      });
    } else {
      this.initEmptyForm();
    }
  }

  initEmptyForm(): void {
    this.form = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      dateDebut: new FormControl<Date | null>(null, [Validators.required]),
      dateFin: new FormControl<Date | null>(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  initFormWithValues(event: Event): void {
    this.form = new FormGroup({
      titre: new FormControl(event.titre, [Validators.required]),
      dateDebut: new FormControl(event.dateDebut, [Validators.required]),
      dateFin: new FormControl(event.dateFin, [Validators.required]),
      description: new FormControl(event.description, [Validators.required]),
    });
  }

  onSubmit(): void {
    const currentId = this.activatedRoute.snapshot.params['id'];
    const eventToSave = {
      ...this.eventGlobal,
      ...this.form.value,
    };

    if (currentId) {
      this.ES
        .UpdateEvent(currentId, eventToSave)
        .subscribe(() => this.router.navigate(['/events']));
    } else {
      this.ES
        .SaveEvent(eventToSave)
        .subscribe(() => this.router.navigate(['/events']));
    }
  }
}