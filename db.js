const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://tenzint:comp3133@comp3133.kztiu.mongodb.net/comp3133_101454475_assignment1",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connected to assignment1 database");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectDB;