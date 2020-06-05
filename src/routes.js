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
const USER_EDIT = "/edit";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

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
  userEdit: USER_EDIT,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  games: GAMES,
  gameDetail: (id) => {
    if (id) {
      return `/games/${id}`;
    }
    return GAME_DETAIL;
  },
};

export default routes;
