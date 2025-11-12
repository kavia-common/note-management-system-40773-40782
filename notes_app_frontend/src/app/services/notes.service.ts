import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class NotesService {
  /** This service talks to backend if apiBaseUrl is set, else uses in-memory store. */
  private memory: Note[] = [
    {
      id: '1',
      title: 'Welcome to Notes',
      content: 'This is your first note. Edit or delete it, or create a new one.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  private base = environment.apiBaseUrl?.trim();

  constructor(private http: HttpClient) {}

  private useApi() {
    return !!this.base;
  }

  // PUBLIC_INTERFACE
  listNotes(): Observable<Note[]> {
    if (this.useApi()) {
      return this.http.get<Note[]>(`${this.base}/notes`);
    }
    return of(this.memory.slice().sort((a, b) => (b.updatedAt.localeCompare(a.updatedAt))));
  }

  // PUBLIC_INTERFACE
  getNote(id: string): Observable<Note | undefined> {
    if (this.useApi()) {
      return this.http.get<Note>(`${this.base}/notes/${id}`);
    }
    return of(this.memory.find(n => n.id === id));
  }

  // PUBLIC_INTERFACE
  createNote(payload: Partial<Note>): Observable<Note> {
    if (this.useApi()) {
      return this.http.post<Note>(`${this.base}/notes`, payload);
    }
    const now = new Date().toISOString();
    const note: Note = {
      id: (Math.random() * 1e9).toFixed(0),
      title: payload.title || 'Untitled',
      content: payload.content || '',
      createdAt: now,
      updatedAt: now
    };
    this.memory.unshift(note);
    return of(note);
  }

  // PUBLIC_INTERFACE
  updateNote(id: string, payload: Partial<Note>): Observable<Note> {
    if (this.useApi()) {
      return this.http.put<Note>(`${this.base}/notes/${id}`, payload);
    }
    const idx = this.memory.findIndex(n => n.id === id);
    if (idx >= 0) {
      const updated = {
        ...this.memory[idx],
        ...payload,
        updatedAt: new Date().toISOString()
      } as Note;
      this.memory[idx] = updated;
      return of(updated);
    }
    return of(undefined as unknown as Note);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): Observable<{ success: boolean }> {
    if (this.useApi()) {
      return this.http.delete<{ success: boolean }>(`${this.base}/notes/${id}`);
    }
    const before = this.memory.length;
    this.memory = this.memory.filter(n => n.id !== id);
    return of({ success: this.memory.length < before });
  }
}
