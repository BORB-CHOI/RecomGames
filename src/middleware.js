import multer from "multer";
import routes from "./routes";

const multerAvatar = multer({ dest: "uploads/avatars/" });

export const uploadAvatar = multerAvatar.single("avatar");

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Recom Games";
  res.locals.routes = routes;
  res.locals.user = { loggedUser: true, id: 23 };
  next();
};
