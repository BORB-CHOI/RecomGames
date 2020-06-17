import express from "express"; // exprss 서버 프레임 워크
import morgan from "morgan"; // http status 콘솔에 출력
import helmet from "helmet"; // HTTP 헤더를 적절히 설정하여 몇가지 웹 취약성 으로부터 앱을 보호
import bodyParser from "body-parser"; // 사용자가 보낸 정보를 읽기 위해. 없으면 post요청 처리 불가.
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
app.use("/uploads", express.static("uploads")); // 사용할 파일 경로(route)설정
app.use("/static", express.static("src/static")); // 누군가 /static으로 가려하면 static 폴더로 가도록 설정
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // http status

app.use(localMiddleware);

app.use(routes.users, userRouter);
app.use(routes.games, gameRouter);
app.use(routes.home, globalRouter); // /:URL

export default app;
