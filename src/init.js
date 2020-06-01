// import pyfunction from "./controllers/scrapController";
import app from "./app";

const PORT = "9999";

const handleListening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

// pyfunction();
