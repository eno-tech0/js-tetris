export default class Game {
	score = 0;
	lines = 0;
	level = 0;
	playfield = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	activePiece = {
		x: 0,
		y: 0,
		blocks: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0]
		]
	};

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

		console.log(this.hasCollision());
		if (this.hasCollision()) {
			this.activePiece.y -= 1;
			this.lockPiece();
		}
	}

	rotatePiece() {
		const blocks = this.activePiece.blocks,
			length = blocks.length;

		const temp =[];

		for (let i = 0; i < length; i++) {
			temp[i] = new Array(length).fill(0);
		}

		for (let y = 0; y < length; y++) {
			for (let x = 0; x < length; x++) {
				temp[x][y] = blocks[length - 1 - y][x];
			}
		}

		this.activePiece.blocks = temp;

		if (this.hasCollision()) {
			this.activePiece.blocks = blocks;
		}
	}

	hasCollision() {
		const {x, y, blocks} = this.activePiece,
			playfield = this.playfield;

		for (let oy = 0; oy < blocks.length; oy++) {
			for (let ox = 0; ox < blocks[oy].length; ox++) {
				if (
					blocks[oy][ox] && 
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
		const {x, y, blocks} = this.activePiece;
		blocks.forEach((arrItem, oy) => {
			arrItem.forEach((item, ox) => {
				if(item) {
					this.playfield[y + oy][x + ox] = item;
				}
			})
		})
	}
}