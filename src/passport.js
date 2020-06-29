import passport from "passport";
import User from "./models/User";

// passport는 쿠키 생성, 쿠키 설정, 쿠키 해석 기능 지원

// strategy 사용, strategy == 로그인 하는 방식
// passport-local-mongoose가 제공하는 strategy 사용
// 지름길이 아닌 방식 -> http://www.passportjs.org/docs/username-password/
passport.use(User.createStrategy());

// 쿠키에 user.id 만 담음. (보편적으로 id만 넣음)
passport.serializeUser(User.serializeUser());
// 쿠키 해석 (이것도 기본값)
passport.deserializeUser(User.deserializeUser());
