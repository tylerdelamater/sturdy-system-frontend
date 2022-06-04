import { Injectable } from '@angular/core';
import { TMEvent } from './tmevent';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventUrl = environment.apiUrl + '/events';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getEvents(): Observable<TMEvent[]> {
    return this.http.get<TMEvent[]>(this.eventUrl)
      .pipe(
        tap(_ => this.log('fetched events')),
        catchError(this.handleError<TMEvent[]>('getEvents', []))
      );
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: string): Observable<TMEvent> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.get<TMEvent>(url).pipe(
      tap(_ => this.log(`fetched event id=${id}`)),
      catchError(this.handleError<TMEvent>(`getEvent id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`EventService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
