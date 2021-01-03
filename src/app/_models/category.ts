export interface ICategory{
  id?: number | null;
  name: string;
  color: string;
}

// export class Category implements ICategory{

//   constructor(public id: string, public name: string, public color: string){
//   }
// }

export class Category implements ICategory {
  id?: number | null;
  name: string;
  color: string;
}
