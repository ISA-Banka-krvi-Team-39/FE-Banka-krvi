import jwt from 'jsonwebtoken';
import { UserInfo } from '../model/shared/userInfo';

const secret = 'isanajjacipredmet';
export function getDataFromToken(token: string):UserInfo {
  try {
    const data = jwt.verify(token, secret);
    var userTemp:UserInfo = data as UserInfo;
    var user:UserInfo = new UserInfo(userTemp.roles,userTemp.id,userTemp.sub);
    return user;
  } catch (error) {
    console.error(error);
    return null as unknown as UserInfo;
  }
}