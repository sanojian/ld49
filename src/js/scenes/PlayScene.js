/*
  This is the main game scene.
*/

class PlayScene extends Phaser.Scene {

	constructor() {
		super("PlayScene");
	}

	create() {

		let world = this.initWorld();

		var graphics = this.add.graphics({
			x: this.sys.game.scale.gameSize.width/2 - world.height*world.cellSize/2,
			y: this.sys.game.scale.gameSize.height/2
		});

		let chem1ButtonDown = false;
		let chem1Button = this.add.image(this.sys.game.scale.gameSize.width/2 - 8, graphics.y - 8, 'chem1_source');
		let chem2ButtonDown = false;
		let chem2Button = this.add.image(this.sys.game.scale.gameSize.width/2 + 8, graphics.y - 8, 'chem2_source');


		chem1Button.setInteractive({ useHandCursor: true});
		chem1Button.on('pointerdown', () => { chem1ButtonDown = true;	}, this);
		chem1Button.on('pointerout', () => { chem1ButtonDown = false; }, this);
		chem1Button.on('pointerup', () => { chem1ButtonDown = false; }, this);
		chem2Button.setInteractive({ useHandCursor: true});
		chem2Button.on('pointerdown', () => { chem2ButtonDown = true;	}, this);
		chem2Button.on('pointerout', () => { chem2ButtonDown = false; }, this);
		chem2Button.on('pointerup', () => { chem2ButtonDown = false; }, this);

		this.time.addEvent({
			delay: 50,
			callback: () => {

				if (chem1ButtonDown) {
					let cell = world.grid[0][8];
					cell.type = 1;
				}
				if (chem2ButtonDown) {
					let cell = world.grid[0][24];
					cell.type = 2;
				}
				this.redrawContents(world, graphics);
				world.step();
			},
			callbackScope: this,
			repeat: -1
		});

	}

	initWorld() {

		var world = new CAWorld({
			width: 64,
			height: 32,
			cellSize: 1
		});

		let colors = {
			0: 0xeeeeee,
			1: 0x6fedf4,
			2: 0xf46a45,
			3: 0xdc96f4
		};

		world.registerCellType('water', {
			getColor: function() {
				return colors[this.type];
			},
			pushTolighterNeighbor: function(left, right) {

				let temp = this.type;

				// both lighter
				if (left && left.type < this.type && right && right.type < this.type) {
					if (Math.random() > 0.5) {
						this.type = left.type;
						left.type = temp;
					}
					else {
						this.type = right.type;
						right.type = temp;
					}
				}
				else if (left && left.type < this.type) {
					this.type = left.type;
					left.type = temp;
				}
				else if (right && right.type < this.type) {
					this.type = right.type;
					right.type = temp;
				}

			},
			reactWithNeighbor: function(left, right) {

				if (left) {
					if (this.type == 1 && left.type == 2) {
						this.type = 3;
						left.type = 3;
					}
					else if (this.type == 2 && left.type == 3) {
						this.type = 3;
						left.type = 3;
					}
				}
				else if (right) {
					if (this.type == 1 && right.type == 2) {
						this.type = 3;
						right.type = 3;
					}
					else if (this.type == 2 && right.type == 3) {
						this.type = 3;
						right.type = 3;
					}
				}
			},
			process: function(neighbors) {
				if (this.type === 0) {
					// already empty
					return;
				}
				// react with above neighbors
				this.reactWithNeighbor(neighbors[world.TOP.index]);
				this.reactWithNeighbor(neighbors[world.TOPLEFT.index], neighbors[world.TOPRIGHT.index]);
				this.reactWithNeighbor(neighbors[world.LEFT.index], neighbors[world.RIGHT.index]);

				// push my contents out to my empty below neighbors

				// push to bottom first
				this.pushTolighterNeighbor(neighbors[world.BOTTOM.index]);

				// push to lower left or right
				this.pushTolighterNeighbor(neighbors[world.BOTTOMLEFT.index], neighbors[world.BOTTOMRIGHT.index]);

				// push to left or right if still contents
				this.pushTolighterNeighbor(neighbors[world.LEFT.index], neighbors[world.RIGHT.index]);
			}
		}, function() {
			//init
			this.type = Math.random() < 0 ? 1 : 0;

			if (this.type) {
				this.type = Math.random() < 0 ? 1 : 2;
			}

		});

		// pass in our generated cave data
		world.initialize([
			{ name: 'water', distribution: 100 }
		]);

		return world;
	}

	redrawContents(world, graphics) {

		graphics.clear();

		for (var y=0; y<world.height; y++) {
			for (var x=0; x<world.width; x++) {
				var cell = world.grid[y][x];
				graphics.fillStyle(cell.getColor());
				graphics.fillRect(x * world.cellSize, y * world.cellSize, world.cellSize, world.cellSize);
			}
		}

	}

	update() {

	}

}
