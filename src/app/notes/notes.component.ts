import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';

interface Note {
  id?: number;
  description: string;
  done: boolean;
}


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { description: '', done: false };

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe((data: Note[]) => {
      this.notes = data;
    });
  }

  addNote(): void {
    if (this.newNote.description.trim()) {
      this.notesService.addNote(this.newNote).subscribe(() => {
        this.newNote = { description: '', done: false };
        this.loadNotes();
      });
    }
  }

  updateNoteStatus(note: Note): void {
    note.done = !note.done;
    this.notesService.updateNote(note).subscribe(() => {
      this.loadNotes();
    });
  }
}
