import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import signUpRouter from './src/auth/signup.js';
import postRouter from './src/servers/posts.js';
import loginRouter from './src/auth/login.js';
import {authMiddleware}  from './src/jwt/authMiddleware.js';


dotenv.config();
mongoose.set('strictQuery', false);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if (err) throw err;
  console.log('Connected to MongoDB!!!');
});

app.use(signUpRouter);
app.use(authMiddleware , postRouter);
app.use(loginRouter);


app.listen(port, () => {
  console.log(`Servidor rodando em http://192.168.1.8:${port}`);
});
