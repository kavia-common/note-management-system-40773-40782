import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService, Note } from '../../services/notes.service';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NoteEditorComponent],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  filtered: Note[] = [];
  query = '';
  showCreate = false;

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.notesService.listNotes().subscribe(list => {
      this.notes = list;
      this.applyFilter();
    });
  }

  applyFilter() {
    const q = this.query.toLowerCase().trim();
    this.filtered = !q ? this.notes : this.notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }

  open(note: Note) {
    this.router.navigate(['/note', note.id]);
  }

  onCreated(note: Note) {
    this.showCreate = false;
    this.notes.unshift(note);
    this.applyFilter();
  }
}
