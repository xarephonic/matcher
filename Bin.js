export default class Bin {
	constructor(min, max, contents = []) {
		this.min = min;
		this.max = max;
		this.contents = contents;
		this.size = contents.length;
	}

	push(player) {
		this.contents.push(player);
		if (player.rating < this.min) {
			this.min = player.rating;
		};

		if (player.rating > this.max) {
			this.max = player.rating;
		}
		this.size = this.contents.length;
	}

	split() {
		this.contents.sort((a, b) => a.rating - b.rating);

		const firstHalfContents = this.contents.splice(0, Math.floor(this.contents.length / 2));
		const secondHalfContents = this.contents;

		const firstHalf = new Bin(this.min, firstHalfContents[firstHalfContents.length-1].rating, firstHalfContents);
		const secondHalf = new Bin(firstHalf.max, this.max, secondHalfContents);

		return [firstHalf, secondHalf];
	}
}