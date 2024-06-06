import 'reflect-metadata';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import sequelize from './models'; // Adjust the import according to your setup
import { schema } from './graphql/schema'; // Adjust the import according to your setup
import dotenv from 'dotenv';
import {setApiKey} from './middleware/setApiKey';
import winston from 'winston';
import graphqlPlayground from 'graphql-playground-middleware-express';

dotenv.config();

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use(setApiKey(sequelize)); // Apply the API key middleware

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: false, // Disable built-in GraphiQL
}));

app.get('/playground', graphqlPlayground({
  endpoint: '/graphql',
}));

sequelize.sync().then(() => {
  app.listen(4000, () => {
    logger.info('Running a GraphQL API server at http://localhost:4000/playground');
  });
}).catch((error) => {
  logger.error('Failed to sync database:', error);
});
