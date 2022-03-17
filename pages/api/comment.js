import connectDB from '../../middleware/mongodb';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';
import Comment from '../../models/comment';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { project_id } = req.body;
        const token = getCookie('devshowcase_jwt', { req, res });
        
        if (token) {
            try {
                const user_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const comments_list = await Comment.find({ project_id });
                
                res.status(201).json({ status: "success", data: comments_list, message: 'Comments Successfully fetched' });
            } catch {
                res.status(201).json({ status: "fail", message: 'User not Authorized' });
            }
            
        } else {
            res.status(201).json({ status: "fail", message: 'User not Authenticated' });
            
        }
        
    } else if (req.method === 'POST') {
        const { project_id, content } = req.body;
        const token = getCookie('devshowcase_jwt', { req, res });
        
        if (token) {
            try {
                const user_id = jwt.verify(token, process.env.JWT_SECRET_KEY);

                const comment = await Comment.create({ 
                    project_id,
                    content
                  });
                
                res.status(201).json({ status: "success", user:user_id.id, comment:comment, message: 'Comment Successfully added' });
            } catch {
                res.status(201).json({ status: "fail", message: 'User not Authorized' });
            }
            
        } else {
            res.status(201).json({ status: "fail", message: 'User not Authenticated' });
            
        }
    }
};

export default connectDB(handler);