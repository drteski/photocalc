import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import data from '../public/data.json';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}


export const getLuminance = () => {
	return data.map((item) => {
		if (item.lux === '') return;
		return { ev: parseFloat(item.ev), luminance: parseFloat(item.lux) };
	}).filter(Boolean).sort((a, b) => a.ev - b.ev);
};
export const getIso = () => {
	return data.map((item) => {
		if (item.iso === '') return;
		return { ev: parseFloat(item.ev), iso: parseFloat(item.iso) };
	}).filter(Boolean).sort((a, b) => a.ev - b.ev);
};
export const getShutter = () => {
	return data.map((item) => {
		if (item.shutter === '') return;
		return { ev: parseFloat(item.ev), shutter: item.shutter };
	}).filter(Boolean).sort((a, b) => a.ev - b.ev);

};
export const getAperture = () => {
	return data.map((item) => {
		if (item.f === '') return;
		return { ev: parseFloat(item.ev), aperture: item.f };
	}).filter(Boolean).sort((a, b) => a.ev - b.ev);

};
export const getNd = () => {
	return data.map((item) => {
		if (item.nd === '') return;
		return { ev: parseFloat(item.ev), nd: parseFloat(item.nd) };
	}).filter(Boolean).sort((a, b) => b.ev - a.ev);

};