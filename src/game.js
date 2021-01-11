export default class Game {
	static points = {
		'1': 40,
		'2': 100,
		'3': 300,
		'4': 1200
	}

	constructor(columns, rows) {
		this.columns = columns;
		this.rows = rows;
		this.playfield = this.createPlayField();
	}
	score = 0;
	lines = 0;
	blocks = [
		[
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0]
		],
		[
			[0, 0, 0],
			[0, 2, 2],
			[2, 2, 0]
		],
		[
			[0, 0, 0],
			[3, 3, 0],
			[0, 3, 3]
		],
		[
			[0, 0, 0],
			[4, 4, 4],
			[0, 0, 4]
		],
		[
			[0, 0, 0],
			[5, 5, 5],
			[5, 0, 0]
		],
		[
			[0, 0, 0, 0],
			[6, 6, 6, 6],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[0, 0, 0, 0],
			[0, 7, 7, 0],
			[0, 7, 7, 0],
			[0, 0, 0, 0]
		],
	]
	activePiece = this.createPiece();
	nextPiece = this.createPiece();

	get level() {
		return Math.floor(this.lines * 0.1);
	}

	getState() {
		const playfield = this.createPlayField();
		const {x, y, block} = this.activePiece;

		this.playfield.forEach((arrItem, oy) => {
			playfield[oy] = [];
			arrItem.forEach((item, ox) => {
				playfield[oy][ox] = item;
			})
		})

		block.forEach((arrItem, oy) => {
			arrItem.forEach((item, ox) => {
				if (item) {
					playfield[y + oy][x + ox] = item;
				} 
			})
		})

		
		return {
			level: this.level,
			score: this.score,
			lines: this.lines,
			nextPiece: this.nextPiece,
			playfield
		}
	}

	createPlayField() {
		const playfield = [];

		for (let y = 0; y < this.columns; y++) {
			playfield[y] = [];
			
			for (let x = 0; x < this.rows; x++) {
				playfield[y][x] = 0;
			}
		}

		return playfield;
	}

	createPiece() {
		const block = this.blocks[Math.floor(Math.random() * this.blocks.length)];

		return {
			x: Math.floor(((10 || this.rows) - block[0].length) / 2),
			y: 0,
			block
		}
	}

	movePieceLeft() {
		this.activePiece.x -= 1;

		if (this.hasCollision()) {
			this.activePiece.x += 1;
		}	
	}
	movePieceRight() {
		this.activePiece.x += 1;

		if (this.hasCollision()) {
			this.activePiece.x -= 1;
		}
	}
	movePieceDown() {
		this.activePiece.y += 1;

		if (this.hasCollision()) {
			this.activePiece.y -= 1;
			this.lockPiece();
			this.clearLines();
			this.updatePieces();
		}
	}

	rotatePiece() {
		const block = this.activePiece.block,
			length = block.length;

		const temp =[];

		for (let i = 0; i < length; i++) {
			temp[i] = new Array(length).fill(0);
		}

		for (let y = 0; y < length; y++) {
			for (let x = 0; x < length; x++) {
				temp[x][y] = block[length - 1 - y][x];
			}
		}

		this.activePiece.block = temp;

		if (this.hasCollision()) {
			this.activePiece.block = block;
		}
	}

	hasCollision() {
		const {x, y, block} = this.activePiece,
			playfield = this.playfield;

		for (let oy = 0; oy < block.length; oy++) {
			for (let ox = 0; ox < block[oy].length; ox++) {
				if (
					block[oy][ox] && 
					((playfield[oy + y] === undefined || playfield[oy + y][ox + x] === undefined) ||
					playfield[oy + y][ox + x])
					) {
					return true;
				}
			}
		}
		return false;
	}

	lockPiece() {
		const {x, y, block} = this.activePiece;

		block.forEach((arrItem, oy) => {
			arrItem.forEach((item, ox) => {
				if(item) {
					this.playfield[y + oy][x + ox] = item;
				}
			})
		})
	}

	clearLines() {
		let lines = [];

		for (let y = this.columns - 1; y >= 0; y--) {
			let numberOfBlocks = 0;
			for (let x = 0; x < this.rows; x++) {
				if (this.playfield[y][x]) {
					numberOfBlocks++;
				}
			}

			if (numberOfBlocks === 0) break;
			else if (numberOfBlocks < this.rows) continue;
			else lines.unshift(y);
		}

		lines.forEach(item => {
			this.playfield.splice(item, 1);
			this.playfield.unshift(new Array(this.rows).fill(0));
		})

		this.updateScore(lines.length);
	}

	updateScore(clearedLines) {
		if (clearedLines > 0) {
			this.score += Game.points[4 || clearedLines] * (this.level + 1);
			this.lines += clearedLines;
		}
	}

	updatePieces() {
		this.activePiece = this.nextPiece;
		this.nextPiece = this.createPiece();
	}
}