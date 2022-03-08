import { setCookies } from 'cookies-next';

const handler = async (req, res) => {
    if (req.method === 'GET') {
  
        setCookies('devshowcase_jwt', '', { req, res, maxAge: 1 });
  
        return res.status(200).json({ status: 'success', message: 'User has successfully Logged Out', isLoggedIn: false });
      
    } else {
      res.status(422).json({ message: 'req_method_not_supported' });
    }
  };
  
  export default handler;