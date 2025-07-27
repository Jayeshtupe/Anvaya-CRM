const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const corsOptions = {
    origin: "*",
    credential: true
}
dotenv.config();

const initializeDatabase = require("./db/db.connect");
const leadRoutes = require("./routes/leadRoutes");
const agentRoutes = require("./routes/agentRoutes")
const commentRoutes = require("./routes/commentRoutes")
const tagRoutes = require("./routes/tagRoutes")

initializeDatabase()

const app = express();
app.use(express.json());
app.use(cors(corsOptions))

// API routes
app.use("/leads", leadRoutes);
app.use("/agents", agentRoutes);
app.use("/", commentRoutes);
app.use("/tags", tagRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})
