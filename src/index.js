import express from "express";

const app = express();

const PORT = "8888";

const handlelistening = () => {
  console.log(`Your LocalHost : http://localhost:${PORT}`);
};

const home = (req, res) => {
  res.send("This is Home");
};

app.use("/", home);
app.use("/games");
app.use("/games/:id");
app.use("/search");

app.listen(PORT, handlelistening);
