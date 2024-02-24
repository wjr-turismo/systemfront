export interface EmployeeData {
     name :  string ,
     cpf : number,
     rg :  string,
     birth :  string ,
     password :  string ,
     role :  string ,
     commission : number,
     phone : [
      {
         whats :  string ,
         personal :  string 
      }
    ],
     email :  string 
  }

  export interface EmployeesResponse{
    id: number,
    name: string, 
    email: string,  
    phoneWhats: string, 
    role: string
  }