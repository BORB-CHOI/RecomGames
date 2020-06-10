// import pyfunction from "./controllers/scrapController";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const { PORT } = process.env;

const handleListening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

// pyfunction();
