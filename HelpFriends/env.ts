export const MY_SERVER = 'http://127.0.0.1:5000/';

export class credential{
    "userName":string = ''
    "password":string = ''
    constructor(userName:string,password:string){
        this.userName = userName;
        this.password = password
    }
}