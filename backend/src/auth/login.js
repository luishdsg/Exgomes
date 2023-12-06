import express from 'express';
import { Users } from '../models/models.js'
import { authMiddleware, generateSecretKey } from '../jwt/authMiddleware.js';
const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        const token = generateSecretKey(user._id);
        res.json({
            id: user._id,
            username: user.username,
            gender: user.gender,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no serviço de login' });
    }
});

loginRouter.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Perfil do usuário', user: req.user });
});
export default loginRouter;