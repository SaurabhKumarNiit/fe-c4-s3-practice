import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.css']
})
export class LivestreamComponent implements OnInit {
  date = new FormControl(new Date());
  minDate: Date = new Date();

  times= ['00:00', '00:15', '00:30', '00:45', '01:00','01:15','01:30']
  // guestList:string[]|undefined[];
  guestList: any;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) { this.minDate.setDate(this.minDate.getDate() + 1); }

  liveStream = this.fb.group({
    appTitle: ['', Validators.required],
    formDate:['',Validators.required],
    formTime:['',Validators.required],
    toTime:['',Validators.required],
    toDate:['',Validators.required],
    description:['',Validators.required],
    guest:['',Validators.required,Validators.pattern(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)]
  },{Validators:[this.checkIfGuestEmailsAreValid]});

  ngOnInit(): void {​
    this.liveStream.controls['guests'].valueChanges.subscribe( (guestEmails) => { this.guestList = guestEmails?.split(',');​
    });​
    }



  get appTitle() { return this.liveStream.get("appTitle") }

  get formDate() { return this.liveStream.get("formDate") }

  get formTime() { return this.liveStream.get("formTime"); }

  get toTime() { return this.liveStream.get("toTime"); }

  get toDate() { return this.liveStream.get("toDate"); }

  get description() { return this.liveStream.get("description"); }

  get guest() { return this.liveStream.get("guest"); }

 

  onSubmit(): void {
    console.log(this.liveStream.value);
    this._snackBar.open('Congrats, you have submitted the form!!', 'success', {​
      duration: 5000,​
       panelClass: ['mat-toolbar', 'mat-primary']​
     })
     this.liveStream.reset();
    }


    checkIfGuestEmailsAreValid(c: AbstractControl) {
      if (c.value !== '') {
        const emailString = c.value;
        const emails = emailString.split(',').map((e: string) => e.trim());
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
        if (!anyInvalidEmail) {
          return { checkIfGuestEmailsAreValid: false }
        }
      }
      return null;
    }
  


}
