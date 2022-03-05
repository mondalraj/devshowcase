import connectDB from '../../middleware/mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
  
        
      
    } else {
      res.status(422).json({ message: 'req_method_not_supported' });
    }
  };
  
  export default connectDB(handler);