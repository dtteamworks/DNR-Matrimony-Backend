import Profile from "../models/ProfileSchema.js";

// This function creates a new profile in the database.
const createProfile = async (req, res) => {
  try {
    // Get data from request body
    const profileData = req.body;

    // Calculate age from dateOfBirth if not provided
    if (
      profileData.dateOfBirth &&
      (!profileData.age || profileData.age === undefined)
    ) {
      const birthDate = new Date(profileData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      profileData.age = age;
    }

    // Generate slug from fullName if not provided
    if (!profileData.slug && profileData.fullName) {
      profileData.slug = profileData.fullName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special chars
        .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with single hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
    }

    // Create a new document using the model
    const newProfile = new Profile(profileData);

    // Save to database (this triggers validation)
    const savedProfile = await newProfile.save();

    // Send success response with the created profile
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    // If validation fails or other error, throw it to error middleware
    throw new Error(error.message || "Failed to create profile");
  }
};

// This function fetches all profiles from the database.
const getAllProfiles = async (req, res) => {
  try {
    // Fetch all profiles (you can add .select('field1 field2') to get only specific fields for optimization)
    const profiles = await Profile.find({}).sort({ createdAt: -1 }); // Sort by newest first

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch profiles");
  }
};

// This function fetches a single profile by their MongoDB _id.
const getProfileById = async (req, res) => {
  try {
    // Get id from URL params
    const { id } = req.params;

    // Find profile by id (if not found, returns null)
    const profile = await Profile.findById(id);

    // Check if profile exists
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch profile");
  }
};

const getProfileBySlug = async (req, res) => {
  try {
    // Get slug from URL params
    const { slug } = req.params;

    // Find profile by slug (if not found, returns null)
    const profile = await Profile.findOne({ slug });

    // Check if profile exists
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to fetch profile");
  }
};

// This function updates an existing profile by their _id.
// It only updates provided fields (for partial updates).
const updateProfileById = async (req, res) => {
  try {
    // Get id from URL params and data from body
    const { id } = req.params;
    const updateData = req.body;

    // Calculate age if dateOfBirth is updated
    if (updateData.dateOfBirth !== undefined) {
      const birthDate = new Date(updateData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      updateData.age = age;
    }

    // Update slug if fullName is updated and slug not provided
    if (updateData.fullName && !updateData.slug) {
      updateData.slug = updateData.fullName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Find and update profile (new: true returns updated doc)
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Re-run validation, return updated doc
    );

    // Check if profile exists
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update profile");
  }
};

// This function deletes a profile by their _id.
const deleteProfileById = async (req, res) => {
  try {
    // Get id from URL params
    const { id } = req.params;

    // Find and delete profile
    const deletedProfile = await Profile.findByIdAndDelete(id);

    // Check if profile exists
    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
      data: { deletedId: id },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to delete profile");
  }
};

export {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileBySlug ,
  updateProfileById,
  deleteProfileById,
};
