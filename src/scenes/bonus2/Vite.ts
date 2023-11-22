import GamePlay from "../../scenes/GamePlay";
import IVite from "./IVite";

export default class Vite extends Phaser.GameObjects.Sprite implements IVite {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.addVite(this);
    this._scene.add.existing(this);
    this._body.setImmovable(true);
    this.setDepth(100);
  }
  create() {}
  update(time: number, delta: number) {}

  getVite() {
    this._scene.removeVite(this);
  }
}
