import { Component, OnInit } from '@angular/core';
import { TMEvent } from '../tmevent';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: TMEvent[] = [];
  displayedColumns: string[] = ['name', 'url', 'startTime'];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
        .subscribe(events => this.events = events);
  }

}
