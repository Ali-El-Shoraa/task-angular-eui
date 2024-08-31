import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Note {
  id?: number;
  description: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = 'https://ca263918e12ddbc5d096.free.beeceptor.com/api/users/';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(note: Note): Observable<Note> {
    if (!note.id) {
      throw new Error('Note ID is required for update');
    }
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
  }
}
