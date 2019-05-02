import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NotesService {

  notesUrl = 'http://localhost:3000/notes';
  constructor(private http: HttpClient) { }

  getNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(this.notesUrl);
  }

  addNote(note: Note): Observable<Note> {
      return this.http.post<Note>(this.notesUrl, note);
  }

}
