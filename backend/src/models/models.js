import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: ''
    },
    photo: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      required: true,
    }
  
  });
const Users = mongoose.model('Users', userSchema);


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
  });
  
  const Posts = mongoose.model('Posts', postSchema);
  
  export { Users, Posts };