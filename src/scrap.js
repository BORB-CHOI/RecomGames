import { PythonShell } from "python-shell";
import axios from "axios";
import path from "path";
import Game from "./models/Game";

const gameUpload = async (games) => {
  Object.keys(games).forEach(async (key) => {
    const game = games[key];
    const gameExist = await Game.exists({ title: game.title });
    console.log(gameExist);
    if (!gameExist) {
      await axios({
        method: "get",
        url: "https://www.googleapis.com/youtube/v3/search",
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: "id",
          q: `${game.title}`,
          type: "video",
          topicId: "/m/0bzvm2",
          videoCategoryId: "20",
        },
      }).then((response) => {
        console.log(response.data);
        // video ID 가져와서 url로 만든 후 스키마에 주소 저장
      });
      await Game.create({
        title: game.title,
        company: game.company,
        releaseDate: game.releaseDate,
        platform: game.platform,
        mainImg: game.mainImg,
        genres: game.genres,
        link: game.link,
        comments: game.comments,
      });
    }
  });
};

const pyFunction = () => {
  PythonShell.defaultOptions = { mode: "json", encoding: "utf-8" };

  const pyshell = new PythonShell(
    path.join(__dirname, "./python/meta_scrap.py")
  );

  // sends a message to the Python script via stdin
  pyshell.send("hello");

  pyshell.on("message", (games) => {
    // received a message sent from the Python script (a simple "print" statement)
    gameUpload(games);
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
