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

const arr = [];
const generateNumbers = (amount) => {
	for(let i = 0; i < amount; i++) {
		arr.push(Math.floor(rndGenerator()*3000));
	}
}

generateNumbers(1000000);

const generationEndTime = new Date();
let duration = generationEndTime - startTime;

console.log(`Generated ${arr.length} numbers in ${duration}ms`);

arr.sort((a,b) => a - b);

const sortEndTime = new Date();
duration = sortEndTime - generationEndTime;

console.log(`Sorted ${arr.length} elements in ${duration}ms`);

const createBins = (minBinValue, maxBinValue, binRange) => {
	const nrOfBins = Math.ceil((maxBinValue - minBinValue) / binRange);

	const bins = {};

	for(let i = 0; i < nrOfBins; i++) {
		bins[minBinValue + binRange * i] = {
			min: minBinValue + binRange * i,
			max: minBinValue + (binRange * i) + binRange,
			values: []
		};
	}

	return bins;
}

const bins = createBins(0, 3000, 100);

const fillBins = (binsToFill) => {
	for(const number of arr) {
		const h = Math.floor(number / 100) * 100;
		binsToFill[h].values.push(number);
	}
}

fillBins(bins);

const binCreationAndFillTime = new Date();
duration = binCreationAndFillTime - sortEndTime;

console.log(`Filled ${Object.keys(bins).length} bins with ${arr.length} values in ${duration}ms`);