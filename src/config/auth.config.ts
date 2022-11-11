import { DEFAULT_JWT_EXPIRES } from './constants';
import { AuthConfig } from './interfaces/auth.config';

export default (): { auth: AuthConfig } => ({
  auth: {
    secret: process.env.JWT_SECRET,
    expires: parseInt(process.env.JWT_EXPIRES) || DEFAULT_JWT_EXPIRES,
  },
});
