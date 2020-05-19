import express from "express";
import morgan from "morgan";
import helmet from "helmet"; // HTTP 헤더를 적절히 설정하여 몇가지 웹 취약성 으로부터 앱을 보호
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes"; // URL들이 정의된 파일 가져옴
import globalRouter from "./routers/globalRouter"; // 경로지정자 파일 가져옴
import gameRouter from "./routers/gameRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(morgan("dev"));

app.use(routes.home, globalRouter); // /:URL
app.use(routes.games, gameRouter);
app.use(routes.users, userRouter);

export default app;
