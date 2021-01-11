export default class Controller {
	constructor(game, view) {
		this.game = game;
		this.view = view;
		this.isPlaying = false;
		this.timerId = null;

		document.addEventListener('keydown', this.handeKeyDown.bind(this));
		document.addEventListener('keyup', this.handeKeyUp.bind(this));

		this.view.renderStartScreen();
	}

	updateForTime() {
		this.game.movePieceDown();
		this.updateView();
	}

	play() {
		this.isPlaying = true;
		this.startTimer();
		this.updateView();
	}

	pause() {
		this.isPlaying = false;
		this.stopTimer();
		this.updateView();
	}

	reset() {
		this.game.reset();
		this.play()
	}

	updateView() {
		const state = this.game.getState();

		if (state.isGameOver) this.view.renderGameOverScreen(state);
		else if (this.isPlaying) this.view.render(state);
		else this.view.renderPauseScreen();

	}

	startTimer() {
		const speed = 1000 - this.game.getState().level * 100;
		if (!this.timerId) {
			this.timerId = setInterval(() => {
				this.updateForTime();
			}, speed > 0 ? speed : 100);
		}
	}

	stopTimer() {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}

	handeKeyDown(e) {
		const {isGameOver} = this.game.getState();

		switch (e.code) {
			case 'ArrowLeft':
				this.game.movePieceLeft();
				this.updateView();
				break;
			case 'ArrowRight':
				this.game.movePieceRight();
				this.updateView();
				break;
			case 'ArrowDown':
				this.stopTimer();
				this.game.movePieceDown();
				this.updateView();
				break;
			case 'ArrowUp': 
				this.game.rotatePiece();
				this.updateView();
				break;
			case 'Enter': 
				if (isGameOver) this.reset();
				else if (this.isPlaying) this.pause();
				else this.play();
				break;
		}
	}

	handeKeyUp(e) {
		if (e.code === 'ArrowDown') this.startTimer();
	}
}