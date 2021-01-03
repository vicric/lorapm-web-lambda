import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-people-form',
  templateUrl: './configuration-people-form.component.html'
})
export class ConfigurationPeopleFormComponent implements OnInit {

  myForm: FormGroup;
  id: number;
  isAddMode: boolean;

  constructor(
    private fb: FormBuilder,
    private contactService:ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      role: '',
      costPerHour: [0, Validators.min(0)],
      email: '',
      telephone1: '',
      telephone2: '',
      address: '',
      company: '',
      website: '',
    });

    this.myForm.valueChanges.subscribe(console.log);

    if (!this.isAddMode){
      this.contactService.getContact(this.id).subscribe(
        data => this.myForm.patchValue(data),
        error => alert(error)
      );
    }
  }

  get name () {
    return this.myForm.get('name');
  }

  get lastName () {
    return this.myForm.get('lastName');
  }

  get role () {
    return this.myForm.get('role');
  }

  get costPerHour () {
    return this.myForm.get('costPerHour');
  }

  get email () {
    return this.myForm.get('email');
  }

  get telephone1 () {
    return this.myForm.get('telephone1');
  }

  get telephone2 () {
    return this.myForm.get('telephone2');
  }

  get address () {
    return this.myForm.get('address');
  }

  get company () {
    return this.myForm.get('company');
  }

  get website () {
    return this.myForm.get('website');
  }

  async submitHandler() {
    if (this.isAddMode) {
      this.createContact();
    } else {
      this.updateContact();
    }
  }

  private createContact() {
    const formValue = this.myForm.value;

    try {
      this.contactService.addContact(formValue).subscribe(
        data => {

          this.router.navigateByUrl('configuration-people');
          this._snackBar.open('Contact created', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  private updateContact() {
    const formValue = this.myForm.value;

    try {
      this.contactService.updateContact(this.id, formValue).subscribe(
        data => {

          this.router.navigateByUrl('configuration-people');
          this._snackBar.open('Contact updated', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

}
