import dotenv from "dotenv";
import "./db";
import app from "./app";

import pyScraping from "./scrap";

import "./models/Game";
import "./models/User";
import "./models/Comment";

dotenv.config();

pyScraping();

const { PORT } = process.env;

const handleListening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
