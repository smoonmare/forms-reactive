import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenUsernames = [
    'Chris',
    'Bob',
    'Frank',
    'Putin'
  ]

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.isNameForbidden.bind(this)]),
          'email': new FormControl(null, [Validators.email, Validators.required, this.forbiddenEmails.bind(this)])
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      })
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  isNameForbidden(control: FormControl): {[s: string]: boolean} | null {
    if (this.forbiddenUsernames.indexOf(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
