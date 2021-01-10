import Game from './src/game.js';
import View from './src/view.js';

const game = new Game();

// game.lockPiece();

// document.addEventListener('keydown', (e) => {

// 	switch (e.code) {
// 		case 'ArrowLeft':
// 			game.movePieceLeft();
// 			break;
// 		case 'ArrowRight':
// 			game.movePieceRight();
// 			break;
// 		case 'ArrowDown':
// 			game.movePieceDown();
// 			break;
// 	}
// 	console.log(game.playfield);
// })
window.game = game;