import { AbstractFormGroupDirective } from '@angular/forms';
import { Guid } from "guid-typescript";

export interface IContact{
  id?: number | null;
  name: string;
  lastName: string;
  photo?: string | null;
  role?: string;
  contactType?: ContactType;
  costPerHour: number;
  email: string;
  telephone1: string;
  telephone2: string;
  address: string;
  notes: string;
  company: string;
  website: string;
}

export class Contact implements IContact{

  id?: number | null;
  name: string;
  lastName: string;
  photo?: string | null;
  role?: string;
  contactType?: ContactType;
  costPerHour: number;
  email: string;
  telephone1: string;
  telephone2: string;
  address: string;
  notes: string;
  company: string;
  website: string;
}

export enum ContactType
{
  Internal,
  External
}
