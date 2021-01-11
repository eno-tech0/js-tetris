import Game from './src/game.js';
import View from './src/view.js';

window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('#root');

	const game = new Game(20, 10);
	const view = new View(root, 480, 640, 20, 10);

	view.renderGameOverScreen(game.getState());
	
	window.game = game;
	window.view = view;
	
	document.addEventListener('keydown', (e) => {
		switch (e.code) {
			case 'ArrowLeft':
				game.movePieceLeft();
				view.render(game.getState());
				break;
			case 'ArrowRight':
				game.movePieceRight();
				view.render(game.getState());
				break;
			case 'ArrowDown':
				game.movePieceDown();
				view.render(game.getState());
				break;
			case 'ArrowUp': 
				game.rotatePiece();
				view.render(game.getState());
				break;
			case 'Enter': 
				view.render(game.getState());
				break;
		}
	})
})

