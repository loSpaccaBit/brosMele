import GamePlay from "../GamePlay";
import IOstacoli from "./IOstacoli";

export default class Ostacoli
  extends Phaser.GameObjects.Sprite
  implements IOstacoli
{
  protected _config: genericConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.addOstacolo(this);
    this._scene.add.existing(this);
    this._body.setImmovable(true);
    // this._body.setGravityY(200);
    this._body.setGravityY(20);
    this.setDepth(300);
  }
  create() {}
  update(time: number, delta: number) {}

  // un metodo che richiama un metodo della scena
  // questo metodo non è ancora presente nella scena e lo implementeremo
  // successivamente
  getOstacolo() {
    //da commentato per evitare problemi di compilazione
    // necessita dell’implementazione del metodo removeBonus nella scena
    // di GamePlay come si vedrà successivamente
    this._scene.removeOstacolo(this);
  }
}
