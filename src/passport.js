import passport from "passport";
import SteamStrategy from "passport-steam";
import User from "./models/User";
import { steamLoginReturn } from "./controllers/userController";

// passport는 쿠키 생성, 쿠키 설정, 쿠키 해석 기능 지원

// strategy 사용, strategy == 로그인 하는 방식
// passport-local-mongoose가 제공하는 strategy 사용
// 지름길이 아닌 방식 -> http://www.passportjs.org/docs/username-password/
passport.use(User.createStrategy());

passport.use(
  new SteamStrategy(
    {
      returnURL: `http://localhost:9999/auth/steam/return`,
      realm: "http://localhost:9999/",
      apiKey: process.env.STEAM_API_KEY,
      profile: true,
    },
    // 유저 정보를 성공적으로 가져오면 아래 함수 실행.
    steamLoginReturn
  )
);

// 쿠키에 user.id 만 담음. (보편적으로 id만 넣음)
passport.serializeUser(User.serializeUser());
// 쿠키 해석 (이것도 기본값) 모든 경로에 req.user 생성해줌
passport.deserializeUser(User.deserializeUser());
