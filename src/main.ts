import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import { GAME_BG_COLOR } from './game/utils/consts';
import SceneKeys from './game/utils/SceneKeys';
import BaseEventsScene from './scenes/BaseEvents';
import GameOverDialogScene from './scenes/GameOverDialog';
import GameStartDialogScene from './scenes/GameStartDialog';
import KeyboardsScene from './scenes/KeyboardsScene';
import NewLevelScene from './scenes/NewLevel';
import PanelsScene from './scenes/PanelsScene';
import PreloaderScene from './scenes/Preloader';
import ScoreScene from './scenes/ScoreScene';
import SmokeScene from './scenes/SmokeScene';
import UIElementsScene from './scenes/UIElements';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  fps: {
    target: 1,
  },
  backgroundColor: GAME_BG_COLOR,
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};

const typeHackerGame = new Phaser.Game(config);

// SCENES
typeHackerGame.scene.add(SceneKeys.Preloader, PreloaderScene, true);
typeHackerGame.scene.add(SceneKeys.Preloader, BaseEventsScene);
typeHackerGame.scene.add(SceneKeys.GameStartDialog, GameStartDialogScene);
typeHackerGame.scene.add(SceneKeys.UIElements, UIElementsScene);

typeHackerGame.scene.add(SceneKeys.UIElements, ScoreScene);
typeHackerGame.scene.add(SceneKeys.NewLevel, NewLevelScene);
typeHackerGame.scene.add(SceneKeys.Keyboards, KeyboardsScene);
typeHackerGame.scene.add(SceneKeys.Panels, PanelsScene);
typeHackerGame.scene.add(SceneKeys.GameOverDialog, GameOverDialogScene);
typeHackerGame.scene.add(SceneKeys.GameOverDialog, SmokeScene);

export default typeHackerGame;
