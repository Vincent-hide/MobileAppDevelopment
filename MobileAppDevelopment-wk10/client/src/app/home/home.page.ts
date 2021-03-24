import { Component, OnInit } from '@angular/core';
import { NoteService } from './../shared/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Notes: any = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.noteService.getNoteList().subscribe((res) => {
      console.log("[home.page.ts]", res)
      this.Notes = res;
    })
  }

  log(val) { console.log("CONSOLE.LOG METHOD:", val); }

  // deleteNote(note, i) {
  //   if (window.confirm('Do you want to delete user?')) {
  //     this.noteService.deleteNote(note._id)
  //       .subscribe(() => {
  //         this.Notes.splice(i, 1);
  //         console.log('Note deleted!')
  //       }
  //       )
  //   }
  // }
}
