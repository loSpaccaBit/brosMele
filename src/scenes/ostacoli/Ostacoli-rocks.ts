import GamePlay from "../GamePlay";
import Ostacoli from "./Ostacoli";

export default class OstacoliRocks extends Ostacoli {
  constructor(params: genericConfig) {
    super(params);
    // settiamo il nome di questo gameObject a coin
    // potrebbe esserci utile per differenziare i tipi di bonus
    // quando vengono raccolti dal player
    this.setName("rocks");
    this.create();
  }

  create() {
    // Creiamo l'animazione
    if (!this._scene.anims.exists("ostacoli-rocks-anim")) {
      let _animationConfig = {
        key: "ostacoli-rocks-anim",
        frames: this._config.scene.anims.generateFrameNumbers(
          this._config.key,
          { frames: [0] }
        ),
        frameRate: 1,
        yoyo: false,
        repeat: 1,
      };
      this._config.scene.anims.create(_animationConfig);
    }

    this.play("ostacoli-rocks-anim");
    this.setScale(0.3);
  }
}
