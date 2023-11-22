export default class GameOver extends Phaser.Scene {
  private _over: Phaser.GameObjects.BitmapText;
  constructor() {
    super({
      key: "GameOver",
    });
  }

  create() {
    console.log("Create:gameover");
    this._over = this.add
      .bitmapText(30, 30, "arcade", "", 20)
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0, 0)
      .setTint(0xf00000);

    this._over
      .setText("HAI PERSO!")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Preloader");
      });
  }
}
