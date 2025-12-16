import EnquireProfile from "../models/EnquireProfileSchema.js"; 

// This function creates a new enquiry in the database.
const createEnquiry = async (req, res) => {
  try {
    // Get data from request body (ProfileID comes from frontend)
    const enquiryData = req.body;

    // Create a new document using the model
    const newEnquiry = new EnquireProfile(enquiryData);

    // Save to database (this triggers validation)
    const savedEnquiry = await newEnquiry.save();

    // Send success response with the created enquiry 
    res.status(201).json({
      success: true,
      message: "Enquiry created successfully",
      data: savedEnquiry,
    });
  } catch (error) {
    // If validation fails or other error, throw it to error middleware
    throw new Error(error.message || "Failed to create enquiry");
  }
};

// This function fetches all enquiries from the database.
const getAllEnquiries = async (req, res) => {
  try {
    // Fetch all enquiries (you can add .select('field1 field2') to get only specific fields for optimization)
    const enquiries = await EnquireProfile.find({}).sort({ submittedAt: -1 }); // Sort by newest first

    // Send success response
    res.status(200).json({
      success: true,
      message: "Enquiries fetched successfully",
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch enquiries");
  }
};

// This function fetches a single enquiry by their MongoDB _id.
const getEnquiryById = async (req, res) => {
  try {
    // Get id from URL params
    const { id } = req.params;

    // Find enquiry by id (if not found, returns null)
    const enquiry = await EnquireProfile.findById(id);

    // Check if enquiry exists
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Enquiry fetched successfully",
      data: enquiry,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch enquiry");
  }
};

// This function updates an existing enquiry by their _id.
// It only updates provided fields (for partial updates).
const updateEnquiryById = async (req, res) => {
  try {
    // Get id from URL params and data from body
    const { id } = req.params;
    const updateData = req.body;

    // Find and update enquiry (new: true returns updated doc)
    const updatedEnquiry = await EnquireProfile.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Re-run validation, return updated doc
    );

    // Check if enquiry exists
    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: updatedEnquiry,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update enquiry");
  }
};

// This function deletes an enquiry by their _id.
const deleteEnquiryById = async (req, res) => {
  try {
    // Get id from URL params
    const { id } = req.params;

    // Find and delete enquiry
    const deletedEnquiry = await EnquireProfile.findByIdAndDelete(id);

    // Check if enquiry exists
    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: { deletedId: id },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to delete enquiry");
  }
};

export { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiryById, deleteEnquiryById };