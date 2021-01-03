import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { MatNativeDateModule } from '@angular/material/core';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMomentDateModule
    // MatNativeDateModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMomentDateModule
    // MatNativeDateModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'} },
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AppMaterialModule { }
