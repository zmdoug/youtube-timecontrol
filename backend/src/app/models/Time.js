import mongoose from 'mongoose';

const TimeSchema = new mongoose.Schema(
  {
    user_id: String,
    segunda: Number,
    terca: Number,
    quarta: Number,
    quinta: Number,
    sexta: Number,
    sabado: Number,
    domingo: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Time', TimeSchema);
