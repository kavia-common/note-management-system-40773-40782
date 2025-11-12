import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesService, Note } from '../../services/notes.service';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NoteEditorComponent, ConfirmDialogComponent],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  note?: Note;
  confirmOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.notesService.getNote(id).subscribe(n => this.note = n);
  }

  onSaved(n: Note) {
    this.note = n;
  }

  requestDelete() {
    this.confirmOpen = true;
  }

  onConfirmDelete(confirmed: boolean) {
    this.confirmOpen = false;
    if (confirmed && this.note) {
      this.notesService.deleteNote(this.note.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
