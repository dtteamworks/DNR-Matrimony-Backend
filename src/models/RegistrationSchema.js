 import mongoose from 'mongoose';
const RegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v); // Indian phone number format
      },
      message: 'Please enter a valid 10-digit phone number'
    }
  },
  
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  educationQualification: {
    type: String,
    required: [true, 'Education qualification is required'],
    enum: [
      'High School',
      'Intermediate',
      'Graduate',
      'Post Graduate',
      'Diploma',
      'PhD',
      'Other'
    ]
  },
  
  EmployementType: {
    type: String,
    required: [true, 'Occupation is required'],
    trim: true,
    maxlength: [100, 'Occupation cannot exceed 100 characters']
  },
  
  marriageType: {
    type: String,
    required: [true, 'Marriage type is required'],
    enum: ['Love Marriage', 'Arranged Marriage', 'Court Marriage', 'Other']
  },
  
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(v) {
        const age = Math.floor((new Date() - new Date(v)) / 31557600000);
        return age >= 18 && age <= 100;
      },
      message: 'Age must be between 18 and 100 years'
    }
  },
  
  age: {
    type: Number,
    min: [18, 'Minimum age is 18'],
    max: [100, 'Maximum age is 100']
  },
  
  religion: {
    type: String,
    required: [true, 'Religion is required'],
    trim: true,
    maxlength: [50, 'Religion cannot exceed 50 characters']
  },
  
  caste: {
    type: String,
    required: [true, 'Caste is required'],
    trim: true,
    maxlength: [50, 'Caste cannot exceed 50 characters']
  },
  
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [100, 'City cannot exceed 100 characters']
  },
  
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Unavailable'],
    default: 'Available'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Index for faster queries
RegistrationSchema.index({ phoneNumber: 1 });
RegistrationSchema.index({ status: 1 });

// Create and export the model
const Registration = mongoose.model('Registration', RegistrationSchema);

export default Registration;