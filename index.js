import Player from './Player.js';
import Bin from './Bin.js'

// create a number that is closer to 0.5
const rndGenerator = () => {
	let rnd = 0;

	for(let i = 0; i < 4; i++) {
		rnd += Math.random();
	}

	rnd = rnd / 4;

	return rnd;
}

const startTime = new Date();

const playerArr = [];
const generatePlayers = (amount) => {
	for(let i = 0; i < amount; i++) {
		const player = new Player(i, Math.floor(rndGenerator()*3000))
		playerArr.push(player);
	}
}

generatePlayers(1000000);

const generationEndTime = new Date();
let duration = generationEndTime - startTime;

console.log(`Generated ${playerArr.length} numbers in ${duration}ms`);

const maxBinSize = 10000;
const createBins = () => {
	const bins = [];
	const initialBin = new Bin(0, 3000);
	bins.push(initialBin);
	for (let player of playerArr) {
		// see which bin this player needs to go into
		for (let i = 0; i < bins.length; i++) {
			if (bins[i].min < player.rating && bins[i].max > player.rating) {
				//console.log(`Inserting ${player.rating} to ${bins[i].min}-${bins[i].max}`);
				bins[i].push(player);
				if (bins[i].size > maxBinSize) {
					const splitBins = bins[i].split();
					//console.log(`Split ${bins[i].min}-${bins[i].max} into ${splitBins[0].min}-${splitBins[0].max} and ${splitBins[1].min}-${splitBins[1].max}`);
					bins[i] = splitBins[0];
					bins.push(splitBins[1]);
				}
				break;
			}
		}
	}
	return bins;
}

const bins = createBins();

const binCreationEndTime = new Date();
duration = binCreationEndTime - generationEndTime;

console.log(`Created ${bins.length} bins in ${duration}ms`);
