export class Contact {
    ID: number;
    FirstName: string;
    LastName: string;

    constructor(id: number, name: string, lastName: string){
      this.ID = id;
      this.FirstName = name;
      this.LastName = lastName;
    }
  }