import GamePlay from "../../scenes/GamePlay";
import Bonus from "./Bonus";

export default class BonusCoin extends Bonus {
  constructor(params: genericConfig) {
    super(params);
    // settiamo il nome di questo gameObject a coin
    // potrebbe esserci utile per differenziare i tipi di bonus
    // quando vengono raccolti dal player
    this.setName("coin");
    this.create();
  }

  create() {
    // Creiamo l'animazione
    if (!this._scene.anims.exists("bonus-coin-anim")) {
      let _animationConfig = {
        key: "bonus-coin-anim",
        frames: this._config.scene.anims.generateFrameNumbers(
          this._config.key,
          { frames: [0, 1, 2, 3, 4, 5, 6, 7] }
        ),
        frameRate: 10,
        yoyo: false,
        repeat: -1,
      };
      this._config.scene.anims.create(_animationConfig);
    }

    this.play("bonus-coin-anim");
    this.setScale(0.5);
  }
}
