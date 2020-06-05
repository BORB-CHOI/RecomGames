import express from "express";
import morgan from "morgan"; //
import helmet from "helmet"; // HTTP 헤더를 적절히 설정하여 몇가지 웹 취약성 으로부터 앱을 보호
import bodyParser from "body-parser"; // html 태그를 가져 올 수 있음
import cookieParser from "cookie-parser"; // 브라우저의 쿠키 탐색
import path from "path";
import { localMiddleware } from "./middleware";
import routes from "./routes"; // URL들이 정의된 파일 가져옴
import globalRouter from "./routers/globalRouter"; // 경로지정자 파일 가져옴
import gameRouter from "./routers/gameRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(morgan("dev"));

app.use(localMiddleware);

app.use(routes.users, userRouter);
app.use(routes.games, gameRouter);
app.use(routes.home, globalRouter); // /:URL

export default app;
