import passport from "passport";
import User from "../models/User";
import routes from "../routes";

// Steam Login API

export const getSteamLogin = passport.authenticate("steam");

export const steamLoginReturn = async (_, profile, done) => {
  const {
    _json: { steamid, personaname, avatarfull },
  } = profile;
  console.log(profile);

  try {
    const user = await User.findOne({ id: steamid });
    if (user) {
      return done(null, user);
    }
    // axios({
    //   method: "get",
    //   url:
    //     "https://partner.steam-api.com/ISteamUser/GetPublisherAppOwnership/v3/",
    //   params: {
    //     key: process.env.STEAM_API_KEY,
    //     steamid: "76561198179961778",
    //   },
    // }).then((response) => {
    //   console.log(response.data);
    // });
    const newUser = await User.create({
      id: steamid,
      name: personaname,
      avatarUrl: avatarfull,
    });

    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

export const postSteamLogin = passport.authenticate("steam", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
