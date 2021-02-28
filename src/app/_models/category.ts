export interface ICategory{
  categoryId?: number | null;
  name: string;
  color: string;
}

// export class Category implements ICategory{

//   constructor(public id: string, public name: string, public color: string){
//   }
// }

export class Category implements ICategory {
  categoryId?: number | null;
  name: string;
  color: string;
}
