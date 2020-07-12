import dotenv from "dotenv";
import "./db";
import app from "./app";
import pyScraping from "./gameUpload";
import "./models/Game";
import "./models/User";
import "./models/Comment";

const runScrap = () => {
  const today = new Date();
  const currentHours = today.getHours();
  const currentMinutes = today.getMinutes();
  const currentSeconds = today.getSeconds();
  if (currentHours === 0 && currentMinutes === 0 && currentSeconds === 0) {
    pyScraping();
  }
};

dotenv.config();

pyScraping();
setInterval(runScrap, 1000);

const { PORT } = process.env;

const handleListening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
