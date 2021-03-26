import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';

const {Storage, Toast} = Plugins;

export class Note {
  id: number | string;
  title: string;

  constructor(id: number | string, title: string) {
    this.id = id;
    this.title = title;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  notes: Note[];

  newNote: Note;

  constructor() {
    this.newNote = {} as Note;
    this.readNotes();
  }

  ngOnInit() {
  }

  async addNote() {

    if (this.newNote.title === '') {
      return;
    }

    const note = new Note(`${Date.now()}`, this.newNote.title);
    // console.log(note);
    this.setObject(JSON.stringify(note.id), note);
    this.readNotes();
    await Toast.show({
      duration: 'long',
      position: 'bottom',
      text: 'new note added'
    });
    this.newNote.title = '';
  }

  async deleteNotes() {
    await Storage.clear();
    this.readNotes();
  }

  async deleteNote(id: string) {
    console.log(id);
    await Storage.remove({
      key: id
    });
    this.readNotes();
  }

  async setObject(key: string, value: any): Promise<any> {
    await Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async readNotes(): Promise<any> {
    this.notes = [];
    const {keys} = await Storage.keys();
    keys.forEach(this.getNote, this);
  }

  async getNote(key: string): Promise<any> {
    const item = await Storage.get({key});
    // console.log(key, item);
    const note = JSON.parse(item.value);
    this.notes.push(note);
  }

  debugger(key: string, val: any) {
    console.log(key, val);
  }
}
