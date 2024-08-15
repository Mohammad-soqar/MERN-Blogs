const express = require("express");
const cors = require("cors");
const connectDB = require("./connect"); 
const posts = require("./middleware/postRoutes");
const users = require("./middleware/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use(posts);
app.use(users);

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
