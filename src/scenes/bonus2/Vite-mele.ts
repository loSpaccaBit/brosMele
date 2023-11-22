import GamePlay from "../../scenes/GamePlay";
import Vite from "./Vite";

export default class ViteMele extends Vite {
  constructor(params: genericConfig) {
    super(params);
    // settiamo il nome di questo gameObject a coin
    // potrebbe esserci utile per differenziare i tipi di bonus
    // quando vengono raccolti dal player
    this.setName("vite");
    this.create();
  }

  create() {
    // Creiamo l'animazione
    if (!this._scene.anims.exists("bonus-vite-anim")) {
      let _animationConfig = {
        key: "bonus-vite-anim",
        frames: this._config.scene.anims.generateFrameNumbers(
          this._config.key,
          { frames: [0] }
        ),
        frameRate: 10,
        yoyo: false,
        repeat: -1,
      };
      this._config.scene.anims.create(_animationConfig);
    }
    this._body.setGravityY(20);
    this.play("bonus-vite-anim");
    this.setScale(0.5);
  }
}
