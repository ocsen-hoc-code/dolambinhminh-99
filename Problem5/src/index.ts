import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import sequelize from './config/database';
import dotenv from 'dotenv';
import { log } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  log(`Unable to connect to the database: ${error}`);
});
