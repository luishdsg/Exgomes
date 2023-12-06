import express from 'express';
import { Users } from '../models/models.js';
import { generateSecretKey } from '../jwt/authMiddleware.js';
const signUpRouter = express.Router();
signUpRouter.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota para criar um novo usuário
signUpRouter.post('/users', async (req, res) => {
  const { username, password, gender } = req.body;
  try {
    const newUser = new Users({ username, password, gender });
    newUser.token = generateSecretKey(newUser._id);
    await newUser.save();
    res.json({
      id: newUser._id,
      username: newUser.username,
      gender: newUser.gender,
      token: newUser.token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});
export default signUpRouter;