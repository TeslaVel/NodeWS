import '../../dotenv';
import jwt from 'jsonwebtoken';
const secretTk = process.env.SECRET_TK;

export function generateToken(obj: object, expire: string): string {
  return jwt.sign(obj, `${secretTk}`, { expiresIn: expire});
}

export function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, `${secretTk}`);
    return decoded;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return false;
  }
}
