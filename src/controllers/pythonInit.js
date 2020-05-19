import { PythonShell } from "python-shell";
import path from "path";

const pyfunction = () => {
  PythonShell.defaultOptions = { mode: "text", encoding: "utf-8" };

  const pyshell = new PythonShell(path.join(__dirname, "scrap_init.py"));

  // sends a message to the Python script via stdin
  pyshell.send("hello");

  pyshell.on("message", (message) => {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
  });

  // end the input stream and allow the process to exit
  pyshell.end((err, code, signal) => {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished!!");
  });
};

export default pyfunction;
