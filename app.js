import Game from './src/game.js';
import View from './src/view.js';
import Controller from './src/conroller.js';

window.addEventListener('DOMContentLoaded', () => {
	const root = document.querySelector('#root');

	const game = new Game(20, 10);
	const view = new View(root, 480, 640, 20, 10);
	const controller = new Controller(game, view);
	
	window.game = game;
	window.view = view;
	window.controller = controller;

})

