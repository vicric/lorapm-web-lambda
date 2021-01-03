import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_services/contact.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IContact, Contact } from '../_models/contact';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-people',
  templateUrl: './configuration-people.component.html'
})
export class ConfigurationPeopleComponent implements OnInit {

  constructor(
    private contactService:ContactService,
    private router:Router,
    private _snackBar: MatSnackBar
    )
     { }

  title =""
  contacts: IContact[];

  ngOnInit(): void {
    this.refreshContacts();
  }

  deleteContact(event, item) {

    try {
      var contact = item as Contact;
      this.contactService.deleteContact(contact.id).subscribe(
        data => {
          this.refreshContacts();
          this._snackBar.open(contact.name + ' deleted', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  refreshContacts(){
    this.contactService.getContacts().subscribe(
      data => {this.contacts = data;
      },
      error =>{
        this.title = error
      });
  }
}
