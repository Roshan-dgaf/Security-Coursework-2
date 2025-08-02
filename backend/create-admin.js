import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

// Update user role to admin
const makeUserAdmin = async (email) => {
    try {
        const User = mongoose.model('user', new mongoose.Schema({
            email: String,
            username: String,
            role: String
        }));

        const result = await User.findOneAndUpdate(
            { email: email },
            { role: "admin" },
            { new: true }
        );

        if (result) {
            console.log(`✅ Successfully made ${email} an admin`);
            console.log(`User: ${result.username} (${result.email})`);
            console.log(`Role: ${result.role}`);
        } else {
            console.log(`❌ User with email ${email} not found`);
        }
    } catch (error) {
        console.error("❌ Error updating user:", error);
    }
};

// Main function
const main = async () => {
    await connectDB();

    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
        console.log("❌ Please provide an email address");
        console.log("Usage: node create-admin.js <email>");
        console.log("Example: node create-admin.js admin@example.com");
        process.exit(1);
    }

    await makeUserAdmin(email);

    // Close connection
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
};

main().catch(console.error); 