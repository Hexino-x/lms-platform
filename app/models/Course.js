import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  students: { type: Number, default: 0 },
  duration: String,
  level: { type: String, enum: ['مبتدی', 'متوسط', 'پیشرفته'], default: 'متوسط' },
  lessons: [{
    title: String,
    duration: String,
    free: { type: Boolean, default: false }
  }],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);