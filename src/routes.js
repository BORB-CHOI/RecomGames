// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Games
const GAMES = "/games";
const GAME_DETAIL = "/:id";

// User
const USERS = "/users";
const USER_PROFILE = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Auth API
const AUTH = "/auth";
const STEAM = "/steam";
const SETAM_RETURN = "/steam/return";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userProfile: (id) => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_PROFILE;
  },
  me: ME,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  games: GAMES,
  gameDetail: (id) => {
    if (id) {
      return `/games/${id}`;
    }
    return GAME_DETAIL;
  },
  auth: AUTH,
  steam: STEAM,
  steamReturn: SETAM_RETURN,
};

export default routes;
