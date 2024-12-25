import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbConfig.js';
import cors from 'cors';
import customerRouter from './routes/customerRoutes.js'
import { defineAssociations } from './model/customerAssociation.js';
import errorMiddleware from './middleware/errorHandler.js';


dotenv.config();

const app = express();

defineAssociations();

app.use(cors({
    origin: process.env.FRONT_URL             
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

app.use('/api/customer',customerRouter);

app.use(errorMiddleware);

  //server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});