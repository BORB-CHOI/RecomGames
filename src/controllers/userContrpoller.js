import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res, next) => {
  const {
    body: { id, name, password, password2 },
  } = req;
  // DB에 이미 있는 id인지 체크
  if (password !== password2) {
    res.status(400);
    res.render("join");
  } else {
    try {
      const user = await User({
        id,
        name,
      });
      // register == 등륵하다, 사용자가 고유한지 확인하고 등륵
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

// Log In

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = passport.authenticate("local", {
  // 로그인 정보가 DB에 있는 정보인지 체크
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// Log Out

export const logout = (req, res) => {
  res.redirect(routes.home);
};

// Profile

export const getMe = (req, res) => {
  res.render("userProfile");
};

export const userProfile = (req, res) => {
  res.render("userProfile");
};

export const getUserProfile = (req, res) => {
  res.render("editProfile");
};
export const postUserProfile = (req, res) => {
  res.redirect(routes.me);
};

// Change Password

export const getChangePassword = (req, res) => {
  res.render("changePassword");
};
