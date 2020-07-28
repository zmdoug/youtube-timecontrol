import Time from '../models/Time';

class TimeController {

  async saveUserTime(req, res) {
    try {
      const { user_id } = req.params;
      const { timeConfig } = req.body;

      const userTime = await Time.findOneAndUpdate({ user_id }, { user_id, ...timeConfig }, { upsert: true, new: true });

      if (!userTime) return res.status(400).json({
        message: 'Cannot set user time config'
      });

      return res.status(200).json(userTime);

    } catch (err) {
      return res.status(400).json({ message: error });
    }
  }

  async getUserTime(req, res) {
    try {
      const { user_id } = req.params;

      const userTime = await Time.findOne({ user_id })

      return res.status(200).json({
        segunda: userTime.segunda || null,
        terca: userTime.terca || null,
        quarta: userTime.quarta || null,
        quinta: userTime.quinta || null,
        sexta: userTime.sexta || null,
        sabado: userTime.sabado || null,
        domingo: userTime.domingo || null,
      });

    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new TimeController();
