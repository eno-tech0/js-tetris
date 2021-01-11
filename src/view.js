export default class View {
	static colors = {
		'1': 'cian',
		'2': 'blue',
		'3': 'orange',
		'4': 'yellow',
		'5': 'green',
		'6': 'purple',
		'7': 'red',
	};

	constructor(element, width, height, rows, columns) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.canvas = document.createElement('canvas');
		this.canvas.width = +this.width;
		this.canvas.height = +this.height;
		this.context = this.canvas.getContext('2d');

		this.playfieldBorderWidth = 4;
		this.playfieldX = this.playfieldBorderWidth;
		this.playfieldY = this.playfieldBorderWidth;
		this.playfieldWidth = this.width * 2 / 3;
		this.playfieldHeight = this.height;
		this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
		this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

		this.blockWidth = this.playfieldInnerWidth / columns;
		this.blockHeight = this.playfieldInnerHeight / rows;

		this.sideBarX = this.playfieldWidth + 10;
		this.sideBarY = 0;
		this.sideBarWidth = this.width / 3;
		this.sideBarHeight = this.height;

		this.element.append(this.canvas);

	}

	render(state) {
		this.clearScreen();
		this.renderPlayField(state);
		this.renderSideBar(state);
	}

	clearScreen() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	renderStartScreen() {
		this.renderScreen('Press ENTER to Start');
	}

	renderPauseScreen() {
		this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
		this.context.strokeRect(0, 0, this.width, this.height);

		this.renderScreen('Press ENTER to Resume');
	}

	renderGameOverScreen({ score }) {
		this.clearScreen();

		this.renderScreen('GAME OVER', 48);

		this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
	}

	renderScreen(text, height = 0) {
		this.context.fillStyle = 'white';
		this.context.font = '18px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText(text, this.width / 2, this.height / 2 - height);
	}

	renderPlayField({ playfield }) {
		
		playfield.forEach((arrItem, y) => {
			arrItem.forEach((item, x) => {
				if (item) {
					this.renderBlock(
						this.playfieldX + (x * this.blockWidth), 
						this.playfieldY + (y * this.blockHeight), 
						this.blockWidth, 
						this.blockHeight, 
						View.colors[item]);
				}
			})
		});

		this.context.strokeStyle = 'white';
		this.context.lineWidth = this.playfieldBorderWidth;
		this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
	}

	renderSideBar({ level, score, lines, nextPiece }) {
		this.context.textAlign = 'start';
		this.context.textBaseline = 'top';
		this.context.fillStyle = 'white';
		this.context.font = '14px "Press Start 2P"';

		this.context.fillText(`Score: ${score}`, this.sideBarX, this.sideBarY + 0);
		this.context.fillText(`Lines: ${lines}`, this.sideBarX, this.sideBarY + 24);
		this.context.fillText(`Level: ${level}`, this.sideBarX, this.sideBarY + 48);
		this.context.fillText(`Next:`, this.sideBarX, this.sideBarY + 96);

		nextPiece.block.forEach((arrItem, y) => {
			arrItem.forEach((item, x) => {
				if (item) {
					this.renderBlock(
						this.sideBarX + (x * this.blockWidth * 0.5), 
						this.sideBarY + 100 + (y * this.blockHeight * 0.5), 
						this.blockWidth * 0.5, 
						this.blockHeight * 0.5, 
						View.colors[item]
					);
				}
			})
		})
	}

	renderBlock(x, y, width, height, color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;

		this.context.fillRect(x, y, width, height);
		this.context.strokeRect(x, y, width, height);
	}
}