import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import ShakePositionPlugin from 'phaser3-rex-plugins/plugins/shakeposition-plugin';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin';

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
import DamageMonitorScene from './scenes/DamageMonitorScene';
import UIElementsScene from './scenes/UIElements';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
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
    global: [
      {
        key: 'rexglowfilterPipelineplugin',
        plugin: GlowFilterPipelinePlugin,
        mapping: 'rexGlow',
        start: true,
      },
      {
        key: 'rexShakePosition',
        plugin: ShakePositionPlugin,
        mapping: 'rexShake',
        start: true,
      },
    ],
  },
};

const typeFightersGame = new Phaser.Game(config);

// SCENES
typeFightersGame.scene.add(SceneKeys.Preloader, PreloaderScene, true);
typeFightersGame.scene.add(SceneKeys.Preloader, BaseEventsScene);
typeFightersGame.scene.add(SceneKeys.GameStartDialog, GameStartDialogScene);
typeFightersGame.scene.add(SceneKeys.UIElements, UIElementsScene);

typeFightersGame.scene.add(SceneKeys.UIElements, ScoreScene);
typeFightersGame.scene.add(SceneKeys.NewLevel, NewLevelScene);
typeFightersGame.scene.add(SceneKeys.Keyboards, KeyboardsScene);
typeFightersGame.scene.add(SceneKeys.Panels, PanelsScene);
typeFightersGame.scene.add(SceneKeys.GameOverDialog, GameOverDialogScene);
typeFightersGame.scene.add(SceneKeys.GameOverDialog, DamageMonitorScene);

export default typeFightersGame;
