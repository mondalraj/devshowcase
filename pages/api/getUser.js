import connectDB from '../../middleware/mongodb';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
import User from '../../models/user';

const handler = async (req, res) => {
    if (req.method === 'GET') {
  
      const token = getCookie('devshowcase_jwt', { req, res });
      if (token) {
        try {
            const user_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findOne({ _id: user_id.id });
            
            res.status(201).json({ status: "success", user: {
              id: user._id,
              username: user.username,
              email: user.email,
              profile_id: user.profile_id
            }, message: 'User is logged in' });
        } catch {
            res.status(201).json({ status: "fail", message: 'User not Authorized' });
        }
        
    } else {
        res.status(201).json({ status: "fail", message: 'User not Authenticated' });
        
    }
      
    } else {
      res.status(422).json({ message: 'req_method_not_supported' });
    }
  };
  
  export default connectDB(handler);