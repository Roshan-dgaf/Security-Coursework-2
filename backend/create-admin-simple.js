import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

const createAdmin = async () => {
    try {
        const User = mongoose.model('user', new mongoose.Schema({
            email: String,
            username: String,
            password: String,
            role: String,
            verified: Boolean,
            mfaEnabled: Boolean
        }));

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@petstore.com" });
        if (existingAdmin) {
            console.log("✅ Admin already exists!");
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Username: ${existingAdmin.username}`);
            console.log(`Role: ${existingAdmin.role}`);
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash("admin123", 10);

        // Create admin user
        const adminUser = new User({
            email: "admin@petstore.com",
            username: "admin",
            password: hashedPassword,
            role: "admin",
            verified: true,
            mfaEnabled: false
        });

        await adminUser.save();

        console.log("✅ Admin account created successfully!");
        console.log("📧 Email: admin@petstore.com");
        console.log("👤 Username: admin");
        console.log("🔑 Password: admin123");
        console.log("🔐 Role: admin");

    } catch (error) {
        console.error("❌ Error creating admin:", error);
    }
};

const main = async () => {
    await connectDB();
    await createAdmin();
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
};

main().catch(console.error); 