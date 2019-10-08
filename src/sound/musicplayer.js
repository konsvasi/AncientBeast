import * as $j from 'jquery';

export class MusicPlayer {
	constructor() {
		this.current = 0;
		this.audio = $j('#audio')[0];
		this.playlist = $j('#playlist');
		this.tracks = this.playlist.find('li a');

		this.repeat = true;
		this.shuffle = true;

		this.audio.volume = 0.25;
		this.audio.pause();

		$j('#shuffle')
			.addClass('active')
			.click(e => {
				$j(e.currentTarget).toggleClass('active');
				this.shuffle = !this.shuffle;
			});

		$j('#next-track')
			.addClass('active')
			.click(() => {
				this.playNext();
			});

		$j('#previous-track').click(() => {
			this.playPrevious();
		});

		$j('#pause-track').click(() => {
			this.stopMusic();
		});

		this.playlist.find('a').click(e => {
			e.preventDefault();
			this.current = $j(e.currentTarget)
				.parent()
				.index();
			this.run($j(e.currentTarget));
		});

		this.audio.addEventListener('ended', () => {
			if (this.shuffle) {
				this.playRandom();
			} else {
				this.playNext();
			}
		});
	}

	playRandom() {
		let rand;
		do {
			rand = Math.floor(Math.random() * (this.tracks.length - 1));
		} while (rand == this.current); // Don't play the same track twice in a row

		this.current = rand;
		let link = this.playlist.find('a')[this.current];
		this.run($j(link));
	}

	playNext() {
		this.current++;

		if (this.current == this.tracks.length && this.repeat) {
			this.current = 0;
		}

		let link = this.playlist.find('a')[this.current];
		this.run($j(link));
	}

	playPrevious() {
		this.current = this.current === 0 ? this.tracks.length - 1 : this.current - 1;
		let link = this.playlist.find('a')[this.current];
		this.run($j(link));
	}

	run(link) {
		// Style the active track in the playlist
		let par = link.parent();

		par
			.addClass('active')
			.siblings()
			.removeClass('active');
		this.audio.src = link.attr('href');
		this.audio.load();
		this.audio.play();
	}

	stopMusic() {
		this.audio.pause();
	}
}
