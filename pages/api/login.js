import connectDB from '../../middleware/mongodb';
import jsonwebtoken from 'jsonwebtoken';
import { setCookies } from 'cookies-next';
import User from '../../models/user';

const MAX_AGE = 7 * 24 * 60 * 60;

const createJWT = (id) => {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: MAX_AGE
    });
}

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const { email, password } = req.body;
        const emailExist = await User.findOne({ email });
        if (!emailExist) {
            return res.status(400).json({ status: 'fail', error: 'emailError', message: 'Email is not registered, Sign Up first', isLoggedIn: false });
        }
        try {
            const user = await User.login(email, password);
            const token = createJWT(user._id);
            setCookies('devshowcase_jwt', token, { req, res, maxAge: 60 * 60 * 24 * 7 });
            res.status(201).json({ status: 'success', message: 'User has successfully Logged In', isLoggedIn: true, user: user });
        } catch (err) {
            if (err.message === 'incorrectPassword') {
                res.status(400).json({ status: 'fail', error: 'passwordError', message: 'Your password is incorrect', isLoggedIn: false })
            } else {
                res.status(400).json({ status: 'fail', error: 'error', message: `User cannot login. ${err.message}`, isLoggedIn: false })
            }
        }

    } else {
        res.status(422).json({ message: 'req_method_not_supported' });
    }
};

export default connectDB(handler);