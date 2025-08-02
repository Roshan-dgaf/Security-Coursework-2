import UserModel from "../models/user.model.js";
import catchErrors from "../utils/catchErrors.js";
import { CREATED } from "../utils/constants/http.js";

export const createAdminController = catchErrors(async (req, res) => {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        return res.status(400).json({
            message: "User with this email or username already exists"
        });
    }

    // Create admin user
    const adminUser = new UserModel({
        email,
        username,
        password,
        role: "admin",
        verified: true, // Auto-verify admin accounts
        mfaEnabled: false
    });

    await adminUser.save();

    // Return user without password
    const userResponse = adminUser.omitPassword();

    return res.status(CREATED).json({
        message: "Admin account created successfully",
        user: userResponse
    });
}); 