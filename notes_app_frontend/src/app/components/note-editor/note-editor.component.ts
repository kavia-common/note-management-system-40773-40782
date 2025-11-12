import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService, Note } from '../../services/notes.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnChanges {
  @Input() note?: Note;
  @Output() saved = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  content = '';

  constructor(private notesService: NotesService) {}

  ngOnChanges(): void {
    if (this.note) {
      this.title = this.note.title;
      this.content = this.note.content;
    } else {
      this.title = '';
      this.content = '';
    }
  }

  onSubmit() {
    const payload = { title: this.title, content: this.content };
    if (this.note) {
      this.notesService.updateNote(this.note.id, payload).subscribe(n => this.saved.emit(n));
    } else {
      this.notesService.createNote(payload).subscribe(n => this.saved.emit(n));
    }
  }
}
