import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Course code is required'],
    trim: true,
    uppercase: true
  },
  unit: {
    type: Number,
    required: [true, 'Course unit is required'],
    min: [1, 'Course unit must be at least 1']
  },
  grade: {
    type: String,
    required: [true, 'Course grade is required'],
    enum: {
      values: ['A', 'B', 'C', 'D', 'E', 'F'],
      message: 'Grade must be one of A, B, C, D, E, or F'
    },
    uppercase: true
  }
});

const GPAResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  cgpa: {
    type: Number,
    required: [true, 'CGPA is required'],
    min: [0, 'CGPA cannot be less than 0'],
    max: [5, 'CGPA cannot be greater than 5']
  },
  courses: {
    type: [courseSchema],
    required: [true, 'Courses are required'],
    validate: {
      validator: function(courses) {
        return courses.length > 0;
      },
      message: 'At least one course is required'
    }
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: {
      values: ['100', '200', '300', '400', '500', '600'],
      message: 'Level must be one of 100, 200, 300, 400, 500, or 600'
    }
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: {
      values: ['first', 'second'],
      message: 'Semester must be either "first" or "second"'
    }
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be 2000 or later'],
    max: [2100, 'Year must be 2100 or earlier']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
GPAResultSchema.index({ user: 1, date: -1 });

const GPAResult = mongoose.model('GPAResult', GPAResultSchema);

export default GPAResult;