import Game from "../../models/Game";
import routes from "../../routes";

export const home = async (req, res) => {
  try {
    const games = await Game.find({});
    res.render("home", { games });
  } catch (error) {
    console.log(error);
    res.render("home", { games: [] });
  }
};

export const search = async (req, res) => {
  // req.query.term 을 searchin gBy으로 한다.
  const {
    query: { term: searchingBy },
  } = req;
  let searchedGames = [];
  try {
    searchedGames = await Game.find({
      // $regex : searchingBy == searchingBy가 포함된.
      // $options: "i" insensitive 대소문자를 구분하지 않음.
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { searchingBy, searchedGames });
};

export const gameDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const game = await Game.findById(id);
    console.log(game);
    res.render(`gameDetail`, { game });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
