import { User } from "../models/UserModel.js";

// Get user details by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch user details from the database
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error fetching user details : ", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, college } = req.body;

    // Update user details in the database
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, college },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error updating user details : ", error);
    res.status(500).json({
      success: false,
      message: "Error updating user details ",
    });
  }
};
