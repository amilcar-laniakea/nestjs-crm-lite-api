import { AuthResponseDto } from '../../auth/dto/auth-response.dto';

declare global {
  namespace Express {
    interface Request {
      user: AuthResponseDto;
    }
  }
}
