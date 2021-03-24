import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './types';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: any): any {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }

  constructor(private http: HttpClient) { }

  addNote(note: Note): Observable<any> {
    return this.http.post<Note>('http://localhost:9030/note/add', note, this.httpOptions)
      .pipe(
        // catchError(this.handleError<Note>('Add Note'))
      );
  }

  // getSong(id): Observable<Song[]> {
  //   return this.http.get<Song[]>('http://localhost:3000/api/get-song/' + id)
  //     .pipe(
  //       tap(_ => console.log(`Song fetched: ${id}`)),
  //       catchError(this.handleError<Song[]>(`Get Song id=${id}`))
  //     );
  // }

  getNoteList(): Observable<Note[]> {
    return this.http.get<Note[]>('http://localhost:9030/note')
      .pipe(
        tap(songs => console.log('Notes fetched!')),
        // catchError(this.handleError<Note[]>('Get Songs', []))
      );
  }

  // updateSong(id, song: Song): Observable<any> {
  //   return this.http.put('http://localhost:3000/api/update-song/' + id, song, this.httpOptions)
  //     .pipe(
  //       tap(_ => console.log(`Song updated: ${id}`)),
  //       catchError(this.handleError<Song[]>('Update Song'))
  //     );
  // }

  // deleteSong(id): Observable<Song[]> {
  //   return this.http.delete<Song[]>('http://localhost:3000/api/delete-song/' + id, this.httpOptions)
  //     .pipe(
  //       tap(_ => console.log(`Song deleted: ${id}`)),
  //       catchError(this.handleError<Song[]>('Delete Song'))
  //     );
  // }
}
