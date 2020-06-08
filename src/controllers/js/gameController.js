export const getHome = (req, res) => {
  const games = [
    {
      title: "Monster hunter world",
      company: "Capcom",
      releaseDate: "20180128",
      platform: "PC, PS4",
      mainImg:
        "https://static.metacritic.com/images/products/games/0/27d469acae256afad2d87206cb41d460-98.jpg",
      genres: "actionRPG, fantaji, hunting",
      link: "https://www.metacritic.com/game/pc/monster-hunter-world",
    },
    {
      title: "God of war",
      company: "Capcom",
      releaseDate: "20180128",
      platform: "PC, PS4",
      mainImg:
        "https://static.metacritic.com/images/products/games/8/452903806353a11fbecc0089ac94ef13-98.jpg",
      genres: "actionRPG, fantaji",
      link: "https://www.metacritic.com/game/playstation-4/god-of-war",
    },
    {
      title: "DRAGON BALL Z: KAKAROT",
      company: "Capcom",
      releaseDate: "20180128",
      platform: "PC, PS4, Xbos One",
      mainImg:
        "https://static.metacritic.com/images/products/games/5/f88092cd50f054727235b7f071f54556-98.jpg",
      genres: "actionRPG, fantaji",
      link:
        "https://www.metacritic.com/game/playstation-4/dragon-ball-z-kakarot",
    },
  ];
  res.render("home", { games });
};

export const getSearch = (req, res) => {
  res.render("search");
};
