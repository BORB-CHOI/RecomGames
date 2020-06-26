import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, id, password, password2 },
  } = req;
  // DB에 이미 있는 name인지 체크
  if (password !== password2) {
    res.status(400);
    res.render("join");
  } else {
    // DB에 사용자 등륵
    // 로그인된 페이지 제공
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = (req, res) => {
  const {
    body: { id, password },
  } = req;

  // 로그인 정보가 DB에 있는 정보인지 체크
  res.redirect(routes.home, { id, password });
};

export const logout = (req, res) => {
  res.redirect(routes.home);
};

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

export const getChangePassword = (req, res) => {
  res.render("changePassword");
};
