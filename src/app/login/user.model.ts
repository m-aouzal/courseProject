export class User {
  constructor(
    public email: string,
    public password: string,
    private _token :string,
    private _tokenExpirationDate: Date,
    public status?: string,
    public id?: string,
    public username?: string
  ) {}

  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    else return this._token;
  } 
}

