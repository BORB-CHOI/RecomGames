import pyfunction from "./controllers/pythonInit";
import app from "./app";

pyfunction();

const PORT = "9999";

const handlelistening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handlelistening);
