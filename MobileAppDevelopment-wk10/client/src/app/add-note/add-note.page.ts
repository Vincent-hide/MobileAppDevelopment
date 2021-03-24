import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from './../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  noteForm: FormGroup;

  constructor(
    private noteAPI: NoteService,
    private router: Router,
    private fb: FormBuilder,
    private zone: NgZone
  ) {
    this.noteForm = this.fb.group({
      note: [""]
    })
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.noteForm.valid) {
      return false;
    } else {
      this.noteAPI.addNote(this.noteForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log("[add-note.page.ts]", res)
            this.noteForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }
}
