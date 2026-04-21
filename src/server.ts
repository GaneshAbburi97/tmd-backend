import cookieParser from 'cookie-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { connectDatabase, sequelize } from './config/database';
import { env } from './config/environment';
import { corsMiddleware } from './middleware/corsConfig';
import { csrfProtection, issueCsrfToken } from './middleware/csrfMiddleware';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import './models';
import routes from './routes';

const swaggerDoc = YAML.load(`${__dirname}/docs/openapi.yaml`);

export const createApp = () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(corsMiddleware);
  app.use(requestLogger);
  app.use(rateLimit({ windowMs: env.rateLimitWindowMs, max: env.rateLimitMax }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get('/health', (_req, res) => res.json({ success: true, message: 'OK' }));
  app.use(issueCsrfToken);
  app.use('/api', csrfProtection, routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export const app = createApp();

if (process.env.NODE_ENV !== 'test') {
  void (async () => {
    await connectDatabase();
    await sequelize.sync();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${env.port}`);
    });
  })();
}
