
import Registration from '../models/RegistrationSchema.js'; // Adjust path if needed

// 1. Create a new registration
export const createRegistration = async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      data: newRegistration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong'
    });
  }
};

// 2. Get all registrations (with optional filters)
export const getAllRegistrations = async (req, res) => {
  try {
    // You can add filters later like ?status=Pending&city=Delhi
    const registrations = await Registration.find();
    
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// 3. Get single registration by ID
export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// 4. Update registration by ID
export const updateRegistrationById = async (req, res) => {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true returns updated doc, runValidators checks schema rules
    );
    
    if (!updatedRegistration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: updatedRegistration
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 5. Delete registration by ID
export const deleteRegistrationById = async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);
    
    if (!deletedRegistration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};