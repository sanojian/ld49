/*
  This is the main game scene.
*/

class PlayScene extends Phaser.Scene {

	constructor() {
		super("PlayScene");
	}

	create() {

		let world = this.initWorld();

		//let vat = this.add.image(this.sys.game.scale.gameSize.width/2 - 5 * g_game.DEFS.SCALE, this.sys.game.scale.gameSize.height/2 - 4* g_game.DEFS.SCALE, 'vat').setOrigin(0, 0).setScale(g_game.DEFS.SCALE);
		let vat_reactor = this.add.image(34 * g_game.DEFS.SCALE, 63 * g_game.DEFS.SCALE, 'vat_reactor').setOrigin(0, 0).setScale(g_game.DEFS.SCALE);

		this.tempGuage = this.add.image(vat_reactor.x + 18 * g_game.DEFS.SCALE, vat_reactor.y + 22 * g_game.DEFS.SCALE, 'toxic').setScale(g_game.DEFS.SCALE);
		this.currentTemp = 50;
		this.updateTempGuage();

		var graphics = this.add.graphics({
			x: this.sys.game.scale.gameSize.width/2,
			y: this.sys.game.scale.gameSize.height/2
		}).setScale(g_game.DEFS.SCALE);

		let valveFuel = this.add.image(vat_reactor.x + 88 * g_game.DEFS.SCALE, vat_reactor.y + 54 * g_game.DEFS.SCALE, 'valve').setOrigin(0.5, 1).setScale(g_game.DEFS.SCALE);
		valveFuel.setInteractive({ useHandCursor: true });
		valveFuel.on('pointerdown', () => {
			this.nextFuelBall = 'FUEL';
			if (this.valveTween) {
				this.valveTween.stop();
				valveFuel.setScale(g_game.DEFS.SCALE);
			}
		});

		let chem1ButtonDown = false;
		let chem1Button = this.add.image(vat_reactor.x + 184 * g_game.DEFS.SCALE, vat_reactor.y + 19 * g_game.DEFS.SCALE, 'chem1_source').setScale(g_game.DEFS.SCALE).setOrigin(0, 0);
		let chem2ButtonDown = false;
		let chem2Button = this.add.image(chem1Button.x, chem1Button.y + 12 * g_game.DEFS.SCALE, 'chem2_source').setScale(g_game.DEFS.SCALE).setOrigin(0, 0);
		let chem3ButtonDown = false;
		let chem3Button = this.add.image(chem1Button.x, chem1Button.y + 24 * g_game.DEFS.SCALE, 'chem3_source').setScale(g_game.DEFS.SCALE).setOrigin(0, 0);

		var style = {
      fontFamily: 'Conv_ladybug px',
      fontSize: '9px',
      color: '#333333'
    };

		chem1Button.setInteractive({ useHandCursor: true});
		chem1Button.on('pointerdown', () => { chem1ButtonDown = true;	}, this);
		chem1Button.on('pointerout', () => { chem1ButtonDown = false; }, this);
		chem1Button.on('pointerup', () => { chem1ButtonDown = false; }, this);
		this.add.text(chem1Button.x+8 * g_game.DEFS.SCALE, chem1Button.y+4 * g_game.DEFS.SCALE, g_game.DEFS.ELEMENTS[11].name, style).setOrigin(0.5, 0.5);
		chem2Button.setInteractive({ useHandCursor: true});
		chem2Button.on('pointerdown', () => { chem2ButtonDown = true;	}, this);
		chem2Button.on('pointerout', () => { chem2ButtonDown = false; }, this);
		chem2Button.on('pointerup', () => { chem2ButtonDown = false; }, this);
		this.add.text(chem2Button.x+8 * g_game.DEFS.SCALE, chem2Button.y+4 * g_game.DEFS.SCALE, g_game.DEFS.ELEMENTS[12].name, style).setOrigin(0.5, 0.5);
		chem3Button.setInteractive({ useHandCursor: true});
		chem3Button.on('pointerdown', () => { chem3ButtonDown = true;	}, this);
		chem3Button.on('pointerout', () => { chem3ButtonDown = false; }, this);
		chem3Button.on('pointerup', () => { chem3ButtonDown = false; }, this);
		this.add.text(chem3Button.x+8 * g_game.DEFS.SCALE, chem3Button.y+4 * g_game.DEFS.SCALE, g_game.DEFS.ELEMENTS[13].name, style).setOrigin(0.5, 0.5);

		this.time.addEvent({
			delay: 100,
			callback: () => {

				if (this.nextFuelBall) {
					let valueCount = 0;
					let heat = 0;
					for (let y = world.height - 3; y < world.height; y++) {
						for (let x = 0; x < world.width; x++) {
							// average heat values
							let cell = world.grid[y][x];
							let element = g_game.DEFS.ELEMENTS[cell.type];
							if (element.heat !== -1) {
								heat += element.heat;
								valueCount++;
							}
						}
						if (valueCount) {
							let avg = heat / valueCount;
							let influence = valueCount / (world.width * 2);
							this.currentTemp = (this.currentTemp + (avg * 10) * influence) / (1 + influence);
							this.updateTempGuage();
						}
					}

					// take bottom two rows of vat and shift rest down
					for (let y = world.height - 3; y >= 0; y--) {
						for (let x = 0; x < world.width; x++) {
							if (y < 2) {
								world.grid[y][x].type = 10;
							}
							world.grid[y+2][x].type = world.grid[y][x].type;
						}
					}

					this.nextFuelBall = null;
				}

				if (chem1ButtonDown) {
					let cell = world.grid[0][world.width/2];
					cell.type = 11;
					if (!this.valveTween) {
						this.startValveAnim(valveFuel);
					}
				}
				if (chem2ButtonDown) {
					let cell = world.grid[0][world.width/2];
					cell.type = 12;
					if (!this.valveTween) {
						this.startValveAnim(valveFuel);
					}
				}
				if (chem3ButtonDown) {
					let cell = world.grid[0][world.width/2];
					cell.type = 13;
					if (!this.valveTween) {
						this.startValveAnim(valveFuel);
					}
				}
				this.redrawContents(world, graphics);
				world.step();
			},
			callbackScope: this,
			repeat: -1
		});

		this.scene.bringToTop('UIScene');

	}

	initWorld() {

		const cellSize = 4;

		var world = new CAWorld({
			width: 64 / cellSize,
			height: 48 / cellSize,
			cellSize: cellSize
		});

		/*let colors = {
			1: 0x333333,
			// air
			10: 0xeeeeee,	// airium
			// base
			11: 0xffeb3b,	// hydorium
			12: 0x259b24,	// oxxum
			13: 0x90a4ae,	// chlorium
			14: 0x6d4c41,	// sodaium
			// compounds
			15: 0x9575cd,	// 3 neutrium
			16: 0x03a9f4,	// 2 coolium
			17: 0x81d4fa,	// 1 freezium
			18: 0xe51c23,	// 5 flamium
			19: 0xf06292	// 4 feulium
		};*/

		/*
		81d4fa	1
		00bcd4	2
		03a9f4	3
		4e6cef	4
		8e24aa	5
		f48fb1	6
		f06292	7
		f36c60	8
		e51c23	9
		*/


		world.registerCellType('water', {
			getColor: function() {
				//return colors[this.type];
				return g_game.DEFS.ELEMENTS[this.type].color;
			},
			pushTolighterNeighbor: function(left, right) {

				let temp = this.type;

				// both lighter
				if (left && left.type < this.type && right && right.type < this.type) {
					if (Math.random() > 0.5) {
						this.type = left.type;
						left.type = temp;
						this.moved = true;
						left.moved = true;
					}
					else {
						this.type = right.type;
						right.type = temp;
						this.moved = true;
						right.moved = true;
					}
				}
				else if (left && left.type < this.type) {
					this.type = left.type;
					left.type = temp;
					this.moved = true;
					left.moved = true;
				}
				else if (right && right.type < this.type) {
					this.type = right.type;
					right.type = temp;
					this.moved = true;
					right.moved = true;
				}

			},
			reactWithNeighbor: function(left, right) {

				if (left) {
					let reaction = g_game.DEFS.REACTIONS[left.type + '_' + this.type];
					if (!reaction && reaction !== 0) {
						reaction = g_game.DEFS.REACTIONS[this.type + '_' + left.type];
					}
					if (reaction || reaction === 0) {
						this.type = reaction;
						left.type = reaction;
						this.moved = true;
						left.moved = true;
					}
				}
				else if (right) {
					let reaction = g_game.DEFS.REACTIONS[right.type + '_' + this.type];
					if (!reaction && reaction !== 0) {
						reaction = g_game.DEFS.REACTIONS[this.type + '_' + right.type];
					}
					if (reaction || reaction === 0) {
						this.type = reaction;
						right.type = reaction;
						this.moved = true;
						right.moved = true;
					}
				}
			},
			process: function(neighbors) {
				if (this.moved) {
					// already moved or emptyempty
					return;
				}
				//  fly out if lighter than air
				if (this.type === 1 && !neighbors[world.TOP.index]) {
					this.type = 10;
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
			},
			reset: function() {
				this.moved = false;
			}
		}, function() {
			//init
			this.type = 10;
			this.moved = false;
			/*this.type = Math.random() < 0 ? 10 : 10;

			if (this.type) {
				this.type = Math.random() < 0 ? 10 : 12;
			}*/

		});

		// pass in our generated cave data
		world.initialize([
			{ name: 'water', distribution: 100 }
		]);

		return world;
	}

	startValveAnim(valveFuel) {
		this.valveTween = this.tweens.add({
			targets: valveFuel,
			scaleX: g_game.DEFS.SCALE * 1.4,
			scaleY: g_game.DEFS.SCALE * 1.4,
			duration: 500,
			yoyo: true,
			repeat: -1
		});
	}

	updateTempGuage() {

		let value = Math.round(this.currentTemp / 10);

		let color = g_game.DEFS.HEATCOLORS[value-1];

		this.tempGuage.setTint(color);

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
