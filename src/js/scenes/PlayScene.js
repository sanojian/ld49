/*
  This is the main game scene.
*/

class PlayScene extends Phaser.Scene {

	constructor() {
		super("PlayScene");
	}

	create() {

		var world = new CAWorld({
			width: 96,
			height: 64,
			cellSize: 4
		});

		world.palette = [
			'68, 36, 52, 1',
			'255, 255, 255, 1'
		];

		world.registerCellType('living', {
			getColor: function () {
				return this.alive ? 0 : 1;
			},
			process: function (neighbors) {
				var surrounding = this.countSurroundingCellsWithValue(neighbors, 'wasAlive');
				this.alive = surrounding === 3 || surrounding === 2 && this.alive;
			},
			reset: function () {
				this.wasAlive = this.alive;
			}
		}, function () {
			//init
			this.alive = Math.random() > 0.5;
		});

		world.initialize([
			{ name: 'living', distribution: 100 }
		]);


		var graphics = this.add.graphics();

		this.time.addEvent({
			delay: 500,
			callback: () => {
				world.step();
				this.redrawContents(world, graphics);
			},
			callbackScope: this,
			repeat: -1
		});

	}

	redrawContents(world, graphics) {

		graphics.clear();
		graphics.fillStyle(0xffffff);

		for (var y=0; y<world.height; y++) {
			for (var x=0; x<world.width; x++) {
				var cell = world.grid[y][x];
				if (cell.alive) {
					graphics.fillRect(x * world.cellSize, y * world.cellSize, world.cellSize, world.cellSize);
				}
			}
		}

	}

}
