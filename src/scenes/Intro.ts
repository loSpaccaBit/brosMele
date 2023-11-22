export default class Intro extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Image;
  private _start: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() {}
  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    console.log("create:intro");

    this._logo = this.add.image(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "logo-phaser"
    );

    this._start = this.add
      .bitmapText(this.game.canvas.width / 2, 580, "arcade", "", 30)
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0.5, 1)
      .setTint(0x000000);
    this._start.setText("START");
    this._start.setInteractive().on("pointerdown", () => {
      this.scene.start("GamePlay");
    });
  }

  update(time: number, delta: number): void {
    this._logo.rotation += 0.01;
  }
}
