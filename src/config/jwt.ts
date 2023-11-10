import { JwtService } from '@nestjs/jwt';
import { decodeTokenType } from '../user/entities/interface.js';

export const decoToken = (token:string): decodeTokenType => {
  const jwtService = new JwtService();
  let data = jwtService.decode(token) as decodeTokenType;
  return data;
};
