import { Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize';

export const setApiKey = (sequelize: Sequelize) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Allow access to GraphQL playground without API key
    if (req.method === 'GET' && req.path === '/playground') {
      return next();
    }

    const apiKey = req.headers['x-api-key'] as string;
    if (apiKey) {
      sequelize.query(`SET my.app.api_key = '${apiKey}'`).then(() => {
        next();
      }).catch(next);
    } else {
      res.status(400).send('API Key is required');
    }
  };
};

// export default setApiKey;
