export const getHome = (req, res) => {
  const games = {
    title: "Monster Hunter World",
    company: "Capcom",
    releaseDate: "20180128",
    platform: "PC, PS4",
    mainImg: "http://iconLinkLalalala",
    genres: "actionRPG, fantaji, hunting",
    link: "https://www.metacritic.com{game_url}",
  };
  res.render("home", games);
};
