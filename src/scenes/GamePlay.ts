import Player from "./sprite/Player";
import Bonus from "./bonus/Bonus";
import BonusCoin from "./bonus/Bonus-coin";
import Vite from "./bonus2/Vite";
import ViteMele from "./bonus2/Vite-mele";
import Ostacoli from "./ostacoli/Ostacoli";
import OstacoliRocks from "./ostacoli/Ostacoli-rocks";
import { duration } from "@mui/material";
export default class GamePlay extends Phaser.Scene {
  private _music: Phaser.Sound.BaseSound; // musica di sotto fondo
  private _collectCoin: Phaser.Sound.BaseSound; // musica per raccogliere i coin
  private _collectOstacolo: Phaser.Sound.BaseSound; // musica quando tocca la roccia
  private _bg: Phaser.GameObjects.TileSprite; // background
  private _keyUp: Phaser.Types.Input.Keyboard.CursorKeys; // tasto su
  private _mainCamera: Phaser.Cameras.Scene2D.Camera; // camera
  private _player: Player; // sprite per giocatore
  private _coin: Phaser.GameObjects.Sprite; // coin
  private _groupBonus: Phaser.GameObjects.Group; // gruppo per i bonus
  private _groupOstacoli: Phaser.GameObjects.Group; // gruppo per gli ostacoli
  private _groupVite: Phaser.GameObjects.Group; // gruppo per le vite
  private _score: Phaser.GameObjects.BitmapText; // punteggio
  private _coinScore: Phaser.GameObjects.Image;
  private _scoreLive: number = 0;
  private _viteLive: number = 0;
  private _banner: Phaser.GameObjects.BitmapText;
  private _life1: Phaser.GameObjects.Image; // cuoricini
  private _life2: Phaser.GameObjects.Image;
  private _life3: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "GamePlay" });
  }

  create() {
    console.log("create:gameplay");
    this._mainCamera = this.cameras.main;
    this._mainCamera.setBounds(0, 0, 1024, 600);

    this._music = this.sound.add("music0", { loop: true, volume: 0.1 });
    this._collectCoin = this.sound.add("collect-coin", {
      loop: false,
      volume: 0.2,
    });
    this._collectOstacolo = this.sound.add("ostacolo-collect", {
      loop: false,
      volume: 0.3,
    });
    this._music.play();

    this._keyUp = this.input.keyboard.createCursorKeys();
    this._bg = this.add.tileSprite(0, 0, 1024, 601, "terreno").setOrigin(0);
    this._groupBonus = this.add.group({ runChildUpdate: true });
    this._groupOstacoli = this.add.group({ runChildUpdate: true });
    this._groupVite = this.add.group({ runChildUpdate: true });
    this._player = new Player({ scene: this, x: 237, y: 435, key: "player" });
    this._mainCamera.startFollow(this._player);

    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        let _rndPoint: Phaser.Geom.Point =
          this.cameras.main.worldView.getRandomPoint();
        this.addBonus(
          new BonusCoin({
            scene: this,
            x: _rndPoint.x - 30, //400 + 200,  Math.random() * (1024 - 500) + 800
            y: 440, //440
            key: "bonus-coin",
          })
        );
      },
    });

    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        let _rndPoint: Phaser.Geom.Point =
          this.cameras.main.worldView.getRandomPoint();

        this.addOstacolo(
          new OstacoliRocks({
            scene: this,
            x: _rndPoint.x - 30,
            y: 100,
            key: "roccia",
          }).setScale(0.07)
        );
      },
    });

    this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        let _rndPoint: Phaser.Geom.Point =
          this.cameras.main.worldView.getRandomPoint();

        this.addVite(
          new ViteMele({
            scene: this,
            x: _rndPoint.x - 100, //400 + 200,  Math.random() * (1024 - 500) + 800
            y: 100, //440
            key: "mela-vita",
          }).setScale(0.03)
        );
      },
    });

    this.physics.add.collider(
      // collisione tra il player e coin
      this._player,
      this._groupBonus,
      this.hitBonus,
      undefined,
      this
    );

    this.physics.add.collider(
      // collisione tra il player e le mele bonus
      this._player,
      this._groupVite,
      this.hitVite,
      undefined,
      this
    );

    this.physics.add.collider(
      // collisione tra il player e le rocce
      this._player,
      this._groupOstacoli,
      this.hitOstacoli,
      undefined,
      this
    );

    this._coinScore = this.add.image(48, 33, "coin-img").setScale(0.2);
    this._score = this.add
      .bitmapText(75, 24, "arcade", "", 20)
      .setAlpha(1)
      .setDepth(1001)
      .setOrigin(0, 0)
      .setTint(0x000000);
    this._life1 = this.add.image(30, 50, "vita").setOrigin(0, 0).setScale(0.07);
    this._life2 = this.add.image(80, 50, "vita").setOrigin(0, 0).setScale(0.07);
    this._life3 = this.add
      .image(130, 50, "vita")
      .setOrigin(0, 0)
      .setScale(0.07);
  }

  hitBonus(player: any, bonus: any) {
    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;
    //viene richiamato il metodo getBonus della classe Bonus
    _bonus.getBonus();
    this._scoreLive += 10;
    this._collectCoin.play();
  }

  // [7]
  //metodo per aggiungere un bonus al gruppo
  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }
  // [8]
  //metodo per rimuovere un bonus dal gruppo
  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
  }

  hitVite(player: any, bonus: any) {
    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Vite = <Vite>bonus;
    //viene richiamato il metodo getBonus della classe Bonus
    _bonus.getVite();
    if (this._viteLive != 3) {
      this._viteLive -= 1;
      this._collectCoin.play();
    }
  }
  // [7]
  //metodo per aggiungere un bonus al gruppo
  addVite(bonus: Vite) {
    this._groupVite.add(bonus);
  }
  // [8]
  //metodo per rimuovere un bonus dal gruppo
  removeVite(bonus: Vite) {
    this._groupVite.remove(bonus, true, true);
  }

  hitOstacoli(player: any, ostacolo: any) {
    //effettuiamo una conversione dal tipo any al tipo corretto
    const _ostacoli: Ostacoli = <Ostacoli>ostacolo;
    //viene richiamato il metodo getBonus della classe Bonus
    _ostacoli.getOstacolo();
    //this._collectOstacolo.play();
    this._mainCamera.shake(
      500, //durata
      0.01, //intensità
      true, //force to start
      (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) {
          console.log("flash completed");
        }
      }, //callback
      this //callback context
    );
    this._viteLive += 1;
    if (this._viteLive == 1) {
      this._life1.setAlpha(0.4);
    } else if (this._viteLive == 2) {
      this._life2.setAlpha(0.4);
    } else if (this._viteLive == 3) {
      this._life3.setAlpha(0.4);
      this._viteLive = 0;
      this._scoreLive = 0;
      this.scene.start("GameOver");
    }
  }

  // [7]
  //metodo per aggiungere un bonus al gruppo
  addOstacolo(ostacolo: Ostacoli) {
    this._groupOstacoli.add(ostacolo);
  }
  // [8]
  //metodo per rimuovere un bonus dal gruppo
  removeOstacolo(ostacolo: Ostacoli) {
    this._groupOstacoli.remove(ostacolo, true, true);
  }

  update(time: number, delta: number): void {
    if (this._keyUp.right.isUp) {
      this._bg.tilePositionX -= 2;
    }
    if (this._keyUp.left.isUp) {
      this._bg.tilePositionX += 2;
    }

    if (this._keyUp.left.isDown) {
      //sottraiamo 10px alla x del player
      this._player.x -= 2;
    }
    //se il tasto cursore right è premuto
    else if (this._keyUp.right.isDown) {
      //aggiungiamo 2px alla x del player
      this._player.x += 2;
    }
    this._player.update(time, delta);
    this._player.setY(435);
    this._score.setText("" + this._scoreLive); // this._score.setText("COIN:" + this._scoreLive);
  }
}
