import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Decimal from 'decimal.js';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const getExposureData = (type) => {
	return exposureTable.map((item) => {
			if (type === '') return [];
			if (type === 'nd' || type === 'iso') {
				if (item[type] === '') return;
				return { ev: item.ev, evDisplay: item.evDisplay, [type]: item[type] };
			} else {
				if (item[type] === '') return;
				return { ev: item.ev, evDisplay: item.evDisplay, [type]: item[type], [`${type}Display`]: item[`${type}Display`] };
			}
		})
		.filter(Boolean)
		.sort((a, b) => (type === 'nd' ? b.ev - a.ev : a.ev - b.ev));
};

const luminanceTable = '';
const isoTable = '';
const apertureTable = '';
const shutterTable = '';
const ndTable = '';
const compensationTable = '';

export const getExposure = (
	lux,
	iso,
	aperture,
	shutter,
	nd,
	compensation = 0
) => {
	const luminanceData = getExposureData('luminance');
	const isoData = getExposureData('iso');
	const apertureData = getExposureData('aperture');
	const shutterData = getExposureData('shutter');

	function calculateShutterSpeed(N, EV, ISO) {
		return new Decimal((N * N) / (Math.pow(2, EV) * (ISO / 100))).toFixed(8, Decimal.ROUND_HALF_UP);
	}

	function calculateAperture(t, EV, ISO) {
		return new Decimal(Math.sqrt(t * Math.pow(2, EV) * (ISO / 100))).toFixed(8, Decimal.ROUND_HALF_UP);
	}

	const speed = calculateShutterSpeed(
		parseFloat(apertureData[aperture].aperture),
		parseFloat(luminanceData[lux].ev),
		parseFloat(isoData[iso].iso)
	);
	const f = calculateAperture(
		parseFloat(shutterData[shutter].shutter),
		parseFloat(luminanceData[lux].ev),
		parseFloat(isoData[iso].iso)
	);
	const shutterEv = new Decimal((Decimal.log2(speed)) / (Decimal.log2(2))).toFixed(1, Decimal.ROUND_HALF_UP);
	const apertureEv = new Decimal(2 * (Decimal.log2(f))).toFixed(1, Decimal.ROUND_HALF_UP);

	const evCorrection = (data) => {
		const splited = data.split('.');
		if (parseInt(splited[1]) === 0) return splited[0] + '.000';
		if (parseInt(splited[1]) >= 1 && parseInt(splited[1]) <= 4) return splited[0] + '.333';
		if (parseInt(splited[1]) > 4 && parseInt(splited[1]) <= 6) return splited[0] + '.500';
		if (parseInt(splited[1]) > 6 && parseInt(splited[1]) <= 9) return splited[0] + '.667';
		else console.log(splited);
	};


	console.log(
		// speed,
		// f,
		// shutterEv,
		// apertureEv,
		parseFloat(luminanceData[lux].ev),
		shutterData.filter(item => item.ev === evCorrection(shutterEv))[0]?.shutterDisplay
		// apertureData.filter(item => item.ev === evCorrection(apertureEv))[0]?.apertureDisplay
		// evCorrection(shutterEv),
		// evCorrection(apertureEv)
	);

	return {
		luminance: lux,
		iso,
		aperture,
		shutter  : shutterData.findIndex(item => item.ev === evCorrection(shutterEv)),
		nd,
		compensation
	};

};
