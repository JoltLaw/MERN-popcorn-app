const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {});

if (mongoose.connection) {
  console.log("Database has been connected");
} else if (!mongoose.connection) {
  console.log("Failed to connect to the database");
}
