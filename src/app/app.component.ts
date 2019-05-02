import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  note: Note = new Note(); // current note
  notes: Array<Note> = []; // all notes
  colorArray: string[] = ['#F08080', '#FFA07A', '#90EE90', '#20B2AA', '#E0FFFF', '#ADD8E6',
    '#87CEFA', '#FFB6C1', '#FAFAD2', '#FFFFE0', '#778899', '#B0C4DE']; // dynamically set the color for each card

  error404Message: string;
  mandatoryFieldsMessage: string;
  constructor(private notesService: NotesService) { }

  ngOnInit() {

    /**
     * Initialize the messages.
     * Done on ngOnInit because we want the notesService to be injected before we try to derive the notesUrl
     */
    this.error404Message = `Http failure response for ${this.notesService.notesUrl}: 404 Not Found`;
    this.mandatoryFieldsMessage = 'Title and Text both are required fields';

    /**
     * On load, GET all data from server
     */
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.notesService.getNotes().subscribe((response: Array<Note>) => this.notes = response, error => {
      this.errMessage = this.error404Message;
    });
  }

  takeNote(): void {
    /**
     * Clear any error
     */
    this.errMessage = '';
    if (!(this.note.title || this.note.text)) {
      /**
       * Empty note
       */
      this.errMessage = this.mandatoryFieldsMessage;
      return;
    }
    if (this.note.title.trim() === '' || this.note.text.trim() === '') {
      /**
       * Blank note
       */
      this.errMessage = this.mandatoryFieldsMessage;
      return;
    }
    /**
     * Optimistic save, add an element to the array
     */
    this.notes.push(this.note);
    /**
     * POST to json-server
     */
    this.notesService.addNote(this.note).subscribe((response: Note) => {
      /**
       * Set the last element of the array with the response returned from the server
       * so that we have the returned id, we can use this id later for PUT/DELETE operations
       */
      this.notes[this.notes.length - 1] = response;
    }, error => {
      this.errMessage = this.error404Message;
      /**
       * Optional: Remove note from the first position of the array
       */
      // this.notes.pop();
    });
    /**
    * Clear existing note
    */
    this.note = new Note();
  }
}
