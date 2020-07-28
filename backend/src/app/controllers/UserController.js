import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ message: 'Validation fails' });
      }

      const userExists = await User.findOne({ email: req.body.email });

      if (userExists) return res.status(400).json({ message: 'User already exists.' });

      const { id, name, email } = await User.create(req.body);

      return res.status(200).json({ id, name, email });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new UserController();
