import multer from "multer";
import routes from "./routes";

const multerAvatar = multer({ dest: "uploads/avatars/" });

export const uploadAvatar = multerAvatar.single("avatar");

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Recom Games";
  res.locals.routes = routes;
  res.locals.user = req.user || {}; // passport에서 req.user를 만들어 줌. 없으면 빈 오브젝트 반환
  next();
};
