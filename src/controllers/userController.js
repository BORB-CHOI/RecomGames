import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res, next) => {
  const {
    body: { id, name, password, password1 },
  } = req;
  // DB에 이미 있는 id인지 체크
  if (password !== password1) {
    res.status(400);
    res.render("join");
  } else {
    try {
      const user = await User({
        id,
        name,
      });
      console.log(user);
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
  req.logout(); // passport 함수
  res.redirect(routes.home);
};

// Profile

export const getMe = (req, res) => {
  res.render("userProfile", { user: req.user });
};

export const userProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    if (user) {
      res.render("userProfile", { user });
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { user: req.user });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name },
    file,
    // multer가 주는 멋진 req.file.path middleware에서 경로 설정과 갯수 설정은 이미 함.
  } = req;
  try {
    console.log(file);
    await User.findByIdAndUpdate(req.user._id, {
      name: name || req.user.name,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(`${routes.users}${routes.me}`);
  } catch (error) {
    console.log(error);
    res.redirect(`${routes.users}${routes.editProfile}`);
  }
};

// Change Password

export const getChangePassword = (req, res) => {
  res.render("changePassword");
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400); // 구글의 비번 자동저장 기능이 거슬리기에
      res.redirect(`${routes.users}${routes.changePassword}`);
      return;
    }
    // passport-local-mongoose의 기능
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(`${routes.users}${routes.me}`);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.redirect(`${routes.users}${routes.changePassword}`);
  }
};
