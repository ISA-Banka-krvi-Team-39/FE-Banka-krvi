export class UserInfo {
    roles: string[];
    id: number;
    sub: string;
    constructor(roles:string[],id:number,sub:string) {
      this.roles = roles;
      this.id = id;
      this.sub = sub;
    }
  }