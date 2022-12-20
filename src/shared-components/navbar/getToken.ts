import jwt from 'jsonwebtoken';

const secret = 'isanajjacipredmet';
export async function getDataFromToken(token: string) {
  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}