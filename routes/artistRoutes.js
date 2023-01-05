import express from "express";
const router = express.Router();
import { getArtist } from "../controllers/artistController.js";

//http://localhost:5000/artist/
router.get("/:search", getArtist);

export default router;
