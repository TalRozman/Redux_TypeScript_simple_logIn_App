export const MY_SERVER = 'https://redux-ts-login.onrender.com/';

export class credential{
    "userName":string = ''
    "password":string = ''
    constructor(userName:string,password:string){
        this.userName = userName;
        this.password = password
    }
}