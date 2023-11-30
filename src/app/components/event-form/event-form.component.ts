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
  form!: FormGroup;
  eventGlobal!:Event ;
  
  ngOnInit():void {
    //recupiration id
    const idcourant = this.activatedRoute.snapshot.params["id"] ;
    if(!!idcourant){
      this.ES.getEventByid(idcourant).subscribe((item)=>{
        this.eventGlobal=item
        this.initForm2(item)
      })
    }
    else{
      this.initForm()
    }

  }
  initForm() {
    this.form = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      DateDebut: new FormControl<Date | null>(null),
      DateFin: new FormControl<Date | null>(null),
      lieu: new FormControl(null, [Validators.required]),
    });
  }
  initForm2(item:Event):void {
    this.form = new FormGroup({
      titre: new FormControl(item.titre, [Validators.required]),
      DateDebut: new FormControl(item.DateDebut, [Validators.required]),
      DateFin: new FormControl(item.DateFin, [Validators.required]),
      lieu: new FormControl(item.lieu, [Validators.required]),
    });
  }
  OnSubmit() {
    
      const event1 = {
        ...this.eventGlobal,
        ...this.form.value,

      }
      //remove id 
      const event2 = {
        ...event1,
        id: event1.id ??Math.ceil(Math.random() * 1000),
      }
      this.ES.SaveEvent(event2).subscribe(()=>{this.router.navigate(['/events'])})
  }
}
