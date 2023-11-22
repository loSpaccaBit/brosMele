export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#ffffff",
    debug: false,
  },

  preloader: {
    bgColor: "",
    image: "phaser",
    imageX: 250, //512
    imageY: 5,
    loadingText: "",
  },

  spritesheets: [
    {
      name: "player",
      path: "assets/images/player.png",
      width: 50,
      height: 70,
      frames: 8,
    },
    {
      name: "bonus-coin",
      path: "assets/images/coin.png",
      width: 64,
      height: 64,
      frames: 8,
    },
    {
      name: "roccia",
      path: "assets/images/rocks.png",
      width: 1024,
      height: 686,
      frames: 1,
    },
    {
      name: "roccia2",
      path: "assets/images/rocks.png",
      width: 220,
      height: 200,
      frames: 8,
    },
    {
      name: "mela-vita",
      path: "assets/images/plusVite.png",
      width: 924,
      height: 1104,
      frames: 1,
    },
  ],
  images: [
    {
      name: "logo-phaser",
      path: "assets/images/logo-phaser.png",
    },
    {
      name: "terreno",
      path: "assets/images/ground.png",
    },
    {
      name: "terreno2",
      path: "assets/images/ground2.png",
    },
    {
      name: "vita",
      path: "assets/images/cuore2.png",
    },
    {
      name: "coin-img",
      path: "assets/images/coinImg.png",
    },
  ],
  atlas: [],
  sounds: [
    {
      name: "music0",
      paths: ["assets/sounds/sound.ogg", "assets/sounds/sound.m4a"],
    },
    {
      name: "collect-coin",
      jsonpath: "assets/sounds/sfx2.json",
      paths: [
        "assets/sounds/collect-coin-sound.ogg",
        "assets/sounds/collect-coin-sound.m4a",
      ],
    },
    {
      name: "ostacolo-collect",
      jsonpath: "assets/sounds/sfx2.json",
      paths: [
        "assets/sounds/ostacolo-sound.ogg",
        "assets/sounds/ostacolo-sound.m4a",
      ],
    },
  ],
  audio: [],
  bitmapfont: [],
};
