import games from "../../db";

export const home = (req, res) => {
  res.render("home", { games });
};

export const search = (req, res) => {
  // req.query.term 을 searchingBy으로 한다.
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { searchingBy, games });
};

export const gameDetail = (req, res) => {
  const {
    params: { id },
  } = req;
  res.render(`gameDetail`, { id });
};
