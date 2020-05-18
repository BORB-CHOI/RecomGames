import app from "./app";

const PORT = "9999";

const handlelistening = () => {
  console.log(`✔ Your LocalHost : http://localhost:${PORT}`);
};

app.listen(PORT, handlelistening);
