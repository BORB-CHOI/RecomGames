import { PythonShell } from "python-shell";
import path from "path";

const pyFunction = () => {
  PythonShell.defaultOptions = { mode: "json", encoding: "utf-8" };

  const pyshell = new PythonShell(
    path.join(__dirname, "../python/meta_scrap.py")
  );

  // sends a message to the Python script via stdin
  pyshell.send("hello");

  pyshell.on("message", (message) => {
    // received a message sent from the Python script (a simple "print" statement)
    const gamesDB = message;
    console.log(gamesDB);
  });

  // end the input stream and allow the process to exit
  pyshell.end((err, code, signal) => {
    if (err) throw err;
    console.log(`The exit code was: ${code}`);
    console.log(`The exit signal was: ${signal}`);
    console.log("finished!!");
  });
};

export default pyFunction;
