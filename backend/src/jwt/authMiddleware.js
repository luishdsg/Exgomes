import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET

const generateSecretKey = (userId) => {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
    return token;
};


const authMiddleware  = (req, res, next) => {
    const token = req.headers.authorization || req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
      }
};

export {authMiddleware, generateSecretKey};
