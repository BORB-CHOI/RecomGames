import dotenv from "dotenv";
import pyFunction from "./controllers/js/scrapController";
import "./db";
import app from "./app";

dotenv.config();

const { PORT } = process.env;

const handleListening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

pyFunction();
