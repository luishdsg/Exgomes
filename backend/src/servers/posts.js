// postRoutes.js
import express from 'express';
import { Posts } from '../models/models.js';

const postRouter = express.Router();

postRouter.get('/posts', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
});

postRouter.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Posts({ title, content });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
});

export default postRouter;
