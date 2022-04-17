import Word from "../../game/entities/Word";
import { calculateEnabledMonitors } from "../../game/events/onScoreWin";
import SceneKeys from "../../game/utils/SceneKeys";
import { TMonitorsNames } from "../../game/utils/types";
import TFBaseScene from "../TFBaseScene";
import onComboFn from "./onCombo";
import onKeydownFn, { getNextWord } from "./onKeyDown";

export default class KeyboardsScene extends TFBaseScene {
  constructor() {
    super(SceneKeys.Keyboards);
  }

  create() {
    this.addKeyboardListener();
    this.addAllKeyboardGameMonitors();

    this.events.on("level-end", () => {
      this.events.emit("destroy-words");
      this.input.keyboard.removeListener("keydown");
    });

    this.events.on("new-level-start", () => {
      this.addAllKeyboardGameMonitors();
      this.addKeyboardListener();
    });
  }

  private addKeyboardListener() {
    this.input.keyboard.on(
      "keydown",
      (event: { keyCode: number; key: string }) => {
        onKeydownFn({
          scene: this,
          event,
        });
      }
    );
  }

  private addSingleKeyboardGameMonitor(
    guessWordX: number,
    guessWordY: number,
    userWordY: number,
    currentMonitor: TMonitorsNames,
    defaultVisible: boolean
  ) {
    const guessWord = new Word(
      this,
      guessWordX,
      guessWordY,
      getNextWord({
        scene: this,
        levelSettings: this.getPlayerData().configuration.levelSettings,
      }),
      "#fdfdfd",
      defaultVisible
    );
    guessWord.setShadow(3, 3, "rgba(0,0,0,0.5)", 5);
    guessWord.setOrigin(0, 0.5);
    this.tweens.add({
      targets: guessWord,
      alpha: {
        from: 0,
        to: 1,
      },
      duration: 400,
      onComplete: (tween) => {
        tween.resetTweenData(true);
      },
    });
    this.getPlayerData().data.currentWordsDisplayed.push(guessWord.text);
    this.getPlayerData().data.monitors[currentMonitor].guessText = guessWord;

    const userWord = new Word(
      this,
      guessWordX,
      userWordY + guessWord.height,
      "",
      "#fe9c9d",
      defaultVisible
    );
    userWord.setShadow(3, 3, "rgba(0,0,0,0.5)", 5);
    userWord.setOrigin(0, 0.5);

    this.getPlayerData().data.monitors[currentMonitor].userText = userWord;
    const currentTime = 10;

    const onCombo = this.events?.on("combo", () => {
      onComboFn({ currentTime, userWord });
    });

    this.events.on("destroy-words", () => {
      guessWord.destroy();
      userWord.destroy();
      onCombo.off("combo");
    });
  }

  addAllKeyboardGameMonitors() {
    const currentLevel = this.getPlayerData().data.currentLevel;

    const { centerMonitorEnabled, leftMonitorEnabled, rightMonitorEnabled } =
      calculateEnabledMonitors(currentLevel);

    const monitorsData = this.getPlayerData().data.monitors;
    // 🖥️ Center monitor
    if (centerMonitorEnabled) {
      this.addSingleKeyboardGameMonitor(
        monitorsData.center.coordinates.guessWordX,
        monitorsData.center.coordinates.guessWordY,
        monitorsData.center.coordinates.userWordY,
        "center",
        true
      );
    }

    // 🖥️ Left monitor
    if (leftMonitorEnabled) {
      this.addSingleKeyboardGameMonitor(
        monitorsData.left.coordinates.guessWordX,
        monitorsData.left.coordinates.guessWordY,
        monitorsData.left.coordinates.userWordY,
        "left",
        true
      );
    }

    // 🖥️ Right monitor
    if (rightMonitorEnabled) {
      this.addSingleKeyboardGameMonitor(
        monitorsData.right.coordinates.guessWordX,
        monitorsData.right.coordinates.guessWordY,
        monitorsData.right.coordinates.userWordY,
        "right",
        true
      );
    }
  }
}
