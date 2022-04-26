import Background from '../game/entities/Background';
import onDamageMonitor from '../game/events/onDamageMonitor';
import onScoreWin from '../game/events/onScoreWin';
import SceneKeys from '../game/utils/SceneKeys';
import { TMonitorData, TMonitorsNames } from '../game/utils/types';
import TFBaseScene from './TFBaseScene';

export default class BaseEventsScene extends TFBaseScene {
  constructor() {
    super(SceneKeys.BaseEvents);
  }

  create() {
    this.prepareEvents();
    this.addBackground();
    this.generateMonitorsOverlay();
  }

  prepareEvents() {
    // GENERAL EVENTS
    this.events.on(
      'damage-monitor',
      ({ monitorToBeDamaged }: { monitorToBeDamaged: TMonitorsNames }) => {
        onDamageMonitor({ scene: this, monitorToBeDamaged });
      }
    );

    this.events.on(
      'score-win',
      ({
        scoreIncrement,
        combo,
        monitorData,
      }: {
        scoreIncrement: number;
        combo: number;
        monitorData: TMonitorData;
      }) => {
        onScoreWin({
          scene: this,
          scoreIncrement,
          combo,
          monitorData,
        });
      }
    );

    this.events.on('game-over', () => {
      this.getPlayerData().data.isGameOver = true;
      // Reset monitor overlays
      this.getPlayerData().data.monitors.left.screenOverlay?.destroy();
      this.getPlayerData().data.monitors.center.screenOverlay?.destroy();
      this.getPlayerData().data.monitors.right.screenOverlay?.destroy();
      this.getPlayerData().data.monitors.left.screenOverlay = undefined;
      this.getPlayerData().data.monitors.center.screenOverlay = undefined;
      this.getPlayerData().data.monitors.right.screenOverlay = undefined;
      this.scene.get(SceneKeys.DamageMonitor).events.emit('game-over');
    });

    this.events.on('reset-game', () => {
      this.restartPlayerData();
      this.scene.get(SceneKeys.DamageMonitor).events.emit('game-over');
      this.scene.get(SceneKeys.NewLevel).events.emit('level-end', { skipAnimations: true });
    });
  }

  addBackground = () => {
    new Background(this, 0, 0, 'hacker-background', {
      isGif: true,
    });
  };

  startGameMusic() {
    this.sound.play('bgm', {
      loop: true,
      volume: 0.08,
    });
  }
}
