import dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import artistRoutes from "./routes/artistRoutes.js";
import cors from "cors";

// starting the express server
const app = express();

// cors => secure cross-origin requests and data transfers between browsers and servers;
app.use(cors());

//  middleware in order for us to be able to read the “body” of an incoming JSON object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/artist", artistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
});
