import { DEFAULT_APP_PORT } from './constants';
import { AppConfig } from './interfaces/app.config.interface';

export default (): { app: AppConfig } => ({
  app: {
    port: parseInt(process.env.PORT, 10) || DEFAULT_APP_PORT,
  },
});
