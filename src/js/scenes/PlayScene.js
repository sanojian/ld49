/*
  This is the main game scene.
*/

class PlayScene extends Phaser.Scene {

	constructor() {
		super("PlayScene");
	}

	create() {

		var style = {
      fontFamily: 'Conv_ladybug px',
      fontSize: '9px',
      color: '#333333'
    };

		this.score = 0;

		let world = this.initWorld();

		this.vat_reactor = this.add.image(34 * g_game.DEFS.SCALE, 63 * g_game.DEFS.SCALE, 'vat_reactor').setOrigin(0, 0).setScale(g_game.DEFS.SCALE);

		let thermo = this.add.image(this.vat_reactor.x - 16 * g_game.DEFS.SCALE, this.vat_reactor.y + 52 * g_game.DEFS.SCALE, 'thermo').setOrigin(0, 1).setScale(g_game.DEFS.SCALE*2);
		this.thermometer = this.add.image(thermo.x + 4 * g_game.DEFS.SCALE, thermo.y - 10 * g_game.DEFS.SCALE, 'thermo_contents').setOrigin(0, 1).setScale(g_game.DEFS.SCALE);
		this.thermometer.setScale(g_game.DEFS.SCALE, 0.5 * g_game.DEFS.SCALE);

		let powerBack = this.add.image(this.vat_reactor.x + 18 * g_game.DEFS.SCALE, this.vat_reactor.y - 12 * g_game.DEFS.SCALE, 'power').setScale(g_game.DEFS.SCALE);
		style.color = '#fbf236';
		style.fontSize = '18px';
		this.scoreText =  this.add.text(powerBack.x + 4 * g_game.DEFS.SCALE, powerBack.y + 7 * g_game.DEFS.SCALE, '0', style).setOrigin(0.5, 1);
		style.color = '#333333';
		style.fontSize = '9px';

		this.tempGuage = this.add.image(this.vat_reactor.x + 18 * g_game.DEFS.SCALE, this.vat_reactor.y + 22 * g_game.DEFS.SCALE, 'toxic').setScale(g_game.DEFS.SCALE);
		this.currentTemp = 50;
		this.updateTempGuage();

		var graphics = this.add.graphics({
			x: this.sys.game.scale.gameSize.width/2,
			y: this.sys.game.scale.gameSize.height/2
		}).setScale(g_game.DEFS.SCALE);

		let valveFuel = this.add.image(this.vat_reactor.x + 88 * g_game.DEFS.SCALE, this.vat_reactor.y + 54 * g_game.DEFS.SCALE, 'valve').setOrigin(0.5, 1).setScale(g_game.DEFS.SCALE);
		valveFuel.setInteractive({ useHandCursor: true });
		valveFuel.on('pointerdown', () => {
			this.nextFuelBall = 'FUEL';
			if (this.valveTween) {
				this.valveTween.stop();
				valveFuel.setScale(g_game.DEFS.SCALE);
			}
		});

		style.fontSize = '12px';
		this.fuelName = this.add.text(this.vat_reactor.x + 56 * g_game.DEFS.SCALE, this.vat_reactor.y + 34 * g_game.DEFS.SCALE, 'test', style).setOrigin(0.5, 0.5).setVisible(false);

		style.fontSize = '24px';
		this.fuelScore = this.add.text(this.fuelName.x, this.fuelName.y - 8 * g_game.DEFS.SCALE , '+16', style).setOrigin(0.5, 0.5).setVisible(false);
		style.fontSize = '9px';

		this.fuelBlocks = [];
		this.fuelQueue = [];
		for (let i = 0; i < 11; i++) {
			let block = this.add.image(this.vat_reactor.x + 32 * g_game.DEFS.SCALE + i*5* g_game.DEFS.SCALE, this.vat_reactor.y + 54 * g_game.DEFS.SCALE, 'block').setOrigin(0, 1).setScale(g_game.DEFS.SCALE).setVisible(false);
			this.fuelBlocks.push(block);
		}

		this.time.addEvent({
			delay: 1000,
			callback: () => {
				if (this.gameIsOver) {
					return;
				}

				this.updateFuelQueue();
				this.fuelName.setVisible(false);
				if (this.fuelQueue.length) {
					this.fuelName.setText(this.fuelQueue[0].name).setVisible(true);
					this.tweens.add({
						targets: this.fuelBlocks[0],
						rotation: -3*Math.PI/4,
						duration: 300,
						easing: 'Quad.easeOut',
						onComplete: () => {
							// feed fuel
							this.feedFuel(this.fuelQueue[0]);
							this.fuelQueue.shift();
							this.updateFuelQueue();
							this.fuelBlocks[0].setRotation(0);
						},
						onCompleteScope: this
					});
				}
			},
			callbackScope: this,
			repeat: -1
		});


		let chem1ButtonDown = false;
		let chem1Button = this.add.image(this.vat_reactor.x + 184 * g_game.DEFS.SCALE, this.vat_reactor.y + 19 * g_game.DEFS.SCALE, 'chem1_source').setScale(g_game.DEFS.SCALE).setOrigin(0, 0);
		let chem2ButtonDown = false;
		let chem2Button = this.add.image(chem1Button.x, chem1Button.y + 12 * g_game.DEFS.SCALE, 'chem2_source').setScale(g_game.DEFS.SCALE).setOrigin(0, 0);
		let chem3ButtonDown = false;
		let chem3Button = this.add.image(chem1Button.x, chem1Button.y + 24 * g_game.DEFS.SCALE, 'chem3_source').setScale(g_game.DEFS.SCALE).setOrigin(0, 0);

		chem1Button.setInteractive({ useHandCursor: true});
		chem1Button.on('pointerdown', () => {
			chem1ButtonDown = true;
			this.sounds.pour.play({ loop: true });
		}, this);
		chem1Button.on('pointerout', () => {
			chem1ButtonDown = false;
			this.sounds.pour.stop();
		}, this);
		chem1Button.on('pointerup', () => {
			chem1ButtonDown = false;
			this.sounds.pour.stop();
		}, this);
		this.add.text(chem1Button.x+8 * g_game.DEFS.SCALE, chem1Button.y+4 * g_game.DEFS.SCALE, g_game.DEFS.ELEMENTS[11].name, style).setOrigin(0.5, 0.5);
		chem2Button.setInteractive({ useHandCursor: true});
		chem2Button.on('pointerdown', () => { chem2ButtonDown = true;	this.sounds.pour.play({ loop: true });}, this);
		chem2Button.on('pointerout', () => { chem2ButtonDown = false; this.sounds.pour.stop();}, this);
		chem2Button.on('pointerup', () => { chem2ButtonDown = false; this.sounds.pour.stop();}, this);
		this.add.text(chem2Button.x+8 * g_game.DEFS.SCALE, chem2Button.y+4 * g_game.DEFS.SCALE, g_game.DEFS.ELEMENTS[12].name, style).setOrigin(0.5, 0.5);
		chem3Button.setInteractive({ useHandCursor: true});
		chem3Button.on('pointerdown', () => { chem3ButtonDown = true;	this.sounds.pour.play({ loop: true });}, this);
		chem3Button.on('pointerout', () => { chem3ButtonDown = false; this.sounds.pour.stop();}, this);
		chem3Button.on('pointerup', () => { chem3ButtonDown = false; this.sounds.pour.stop();}, this);
		this.add.text(chem3Button.x+8 * g_game.DEFS.SCALE, chem3Button.y+4 * g_game.DEFS.SCALE, g_game.DEFS.ELEMENTS[13].name, style).setOrigin(0.5, 0.5);

		this.time.addEvent({
			delay: 100,
			callback: () => {

				if (this.gameIsOver) {
					return;
				}

				if (this.nextFuelBall) {
					let valueCount = 0;
					let heat = 0;
					for (let x = 0; x < world.width; x++) {
						// average heat values
						let cell = world.grid[world.height-1][x];
						let element = g_game.DEFS.ELEMENTS[cell.type];
						this.fuelQueue.push(element);
					}

					// take bottom two rows of vat and shift rest down
					for (let y = world.height - 2; y >= 0; y--) {
						for (let x = 0; x < world.width; x++) {
							if (y < 1) {
								world.grid[y][x].type = 10;
							}
							world.grid[y+1][x].type = world.grid[y][x].type;
						}
					}

					this.nextFuelBall = null;
					this.updateFuelQueue();
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

		this.sounds = {
			freeze: this.sound.add('freeze'),
			meltdown: this.sound.add('meltdown'),
			pour: this.sound.add('pour'),
			nada: this.sound.add('nada'),
			burn: this.sound.add('burn'),
			hiss: this.sound.add('hiss')
		};

		this.scene.bringToTop('UIScene');

	}

	updateFuelQueue() {
		for (let i = 0; i < 11; i++) {
			if (this.fuelQueue[i]) {
				this.fuelBlocks[i].setTint(this.fuelQueue[i].color);
				this.fuelBlocks[i].setVisible(true);
			}
			else {
				this.fuelBlocks[i].setVisible(false);
			}
		}
	}

	gameOver(meltdown) {

		this.gameIsOver = true;

		this.scene.get('UIScene').showGameOver();

		let frameName = meltdown ? 'vat_reactor_meltdown' : 'vat_reactor_shutdown';

		if (meltdown) {
			this.sounds.meltdown.play();
		}
		else {
			this.sounds.freeze.play();
		}

		this.vat_reactor.setTexture(frameName + 0);
		let nextFrame = 1;

		let endAnimation = this.time.addEvent({
			delay: 1000,
			callback: () => {

				if (nextFrame > 3) {
					endAnimation.destroy();
				}
				else {
					this.vat_reactor.setTexture(frameName + nextFrame);
					nextFrame++;
				}
			},
			callbackScope: this,
			repeat: -1
		});


	}

	initWorld() {

		const cellSize = 4;

		var world = new CAWorld({
			width: 64 / cellSize,
			height: 48 / cellSize,
			cellSize: cellSize
		});


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

	feedFuel(element) {

		if (element.heat === -1) {
			this.sounds.nada.play();
		}
		else {
			let diff = element.heat - 5;
			this.currentTemp += diff;
			if (this.currentTemp <= 0 ||  this.currentTemp >= 90) {
				this.gameOver(this.currentTemp >= 90);
				return;
			}
			let points = diff > 0 ? diff * diff : 0;
			this.fuelScore.setText('+' + points).setVisible(true);
			this.score += points;
			this.scoreText.setText(this.score);
			let oy = this.fuelScore.y;
			this.tweens.add({
				targets: this.fuelScore,
				y: oy - 20 * g_game.DEFS.SCALE,
				duration: 900,
				ease: 'Power0',
				onComplete: () => {
					this.fuelScore.setVisible(false);
					this.fuelScore.y = oy;
				},
				onCompleteScope: this
			});

			console.log(this.currentTemp);
			if (diff === 0) {
				this.sounds.nada.play();
			}
			else if (diff > 0) {
				this.sounds.burn.play();
			}
			else {
				this.sounds.hiss.play();
			}
			this.updateTempGuage();
		}

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

		this.thermometer.setScale(g_game.DEFS.SCALE, ( this.currentTemp / 90) * g_game.DEFS.SCALE);

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
