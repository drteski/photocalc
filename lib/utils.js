import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import data from '../public/data.json';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const getLuminance = () => {
	return data
		.map((item) => {
			if (item.lux === '') return;
			return { ev: parseFloat(item.ev), luminance: parseFloat(item.lux) };
		})
		.filter(Boolean)
		.sort((a, b) => a.ev - b.ev);
};
export const getIso = () => {
	return data
		.map((item) => {
			if (item.iso === '') return;
			return { ev: parseFloat(item.ev), iso: parseFloat(item.iso) };
		})
		.filter(Boolean)
		.sort((a, b) => a.ev - b.ev);
};
export const getShutter = () => {
	return data
		.map((item) => {
			if (item.shutter === '') return;
			return { ev: parseFloat(item.ev), shutter: item.shutter };
		})
		.filter(Boolean)
		.sort((a, b) => a.ev - b.ev);
};
export const getAperture = () => {
	return data
		.map((item) => {
			if (item.f === '') return;
			return { ev: parseFloat(item.ev), aperture: item.f };
		})
		.filter(Boolean)
		.sort((a, b) => a.ev - b.ev);
};
export const getNd = () => {
	return data
		.map((item) => {
			if (item.nd === '') return;
			return { ev: parseFloat(item.ev), nd: parseFloat(item.nd) };
		})
		.filter(Boolean)
		.sort((a, b) => b.ev - a.ev);
};

export const getExposure = ({
	                            lux,
	                            iso,
	                            aperture,
	                            shutter,
	                            nd,
	                            compensation
                            }) => {
	const luminanceData = getLuminance();
	const isoData = getIso();
	const apertureData = getAperture();
	const shutterData = getShutter();
	const ndData = getNd();

	function calculateShutterSpeed(N, EV, ISO) {
		return (N * N) / (Math.pow(2, EV).toPrecision(8) * (ISO / 100));
	}

	function calculateAperture(t, EV, ISO) {
		return Math.sqrt(t * Math.pow(2, EV).toPrecision(8) * (ISO / 100));
	}

	const speed = calculateShutterSpeed(
		Math.pow(Math.sqrt(2), parseFloat(apertureData[aperture].ev * -1)),
		parseFloat(luminanceData[lux].ev),
		parseFloat(isoData[iso].iso)
	);
	const f = calculateAperture(
		Math.pow(2, parseFloat(shutterData[shutter].ev)),
		parseFloat(luminanceData[lux].ev),
		parseFloat(isoData[iso].iso)
	);

	console.log(data.filter(item => parseFloat(item.shutterNominal).toFixed(8) === speed.toFixed(8)), speed.toFixed(8));

	console.log(
		`Shutter speed: ${speed.toFixed(8)} and aperture: ${f.toFixed(8)}`
	);

	return {
		lux,
		iso,
		aperture,
		shutter,
		nd,
		compensation
	};
};
