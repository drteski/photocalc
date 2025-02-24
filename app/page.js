'use client';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
	getExposure, getExposureData
} from '@/lib/utils';
import { useEffect, useLayoutEffect, useState } from 'react';
import { compensationTable } from '@/public/data';

export default function Home() {
	const luminanceData = getExposureData('luminance');
	const isoData = getExposureData('iso');
	const apertureData = getExposureData('aperture');
	const shutterData = getExposureData('shutter');
	const ndData = getExposureData('nd');
	// const [luminance, setLuminance] = useState(
	// 	luminanceData.findIndex((item) => item.ev === '0.000')
	// );
	// const [iso, setIso] = useState(isoData.findIndex((item) => item.ev === '6.000'));
	// const [aperture, setAperture] = useState(
	// 	apertureData.findIndex((item) => item.ev === '0.000')
	// );
	// const [shutter, setShutter] = useState(
	// 	shutterData.findIndex((item) => item.ev === '0.000')
	// );
	// const [nd, setNd] = useState(ndData.findIndex((item) => item.ev === '0.000'));
	// const [compensation, setCompensation] = useState(compensationTable.findIndex((item) => item.ev === '0.000'));

	const [cameraSettings, setCameraSettings] = useState({
		luminance   : luminanceData.findIndex((item) => item.ev === '0.000'),
		iso         : isoData.findIndex((item) => item.ev === '6.000'),
		aperture    : apertureData.findIndex((item) => item.ev === '0.000'),
		shutter     : shutterData.findIndex((item) => item.ev === '0.000'),
		nd          : ndData.findIndex((item) => item.ev === '0.000'),
		compensation: compensationTable.findIndex((item) => item.ev === '0.000')
	});
	console.log(cameraSettings);

	useLayoutEffect(() => {
		const { luminance, iso, aperture, shutter, nd, compensation } = cameraSettings;
		setCameraSettings(getExposure(luminance, iso, aperture, shutter, nd, compensation));
	}, [cameraSettings]);


	return (
		<div className="w-screen h-screen grid grid-rows-[auto_auto] items-center justify-center">
			<div>
				<div className="h-[600px] w-[600px] bg-black text-white scale-[1] flex flex-col justify-between p-8">
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						LUX: {luminanceData[cameraSettings.luminance].luminanceDisplay}
					</h3>
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						ISO: {isoData[cameraSettings.iso].iso}
					</h3>
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						APERTURE: {apertureData[cameraSettings.aperture].apertureDisplay}
					</h3>
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						SHUTTER: {shutterData[cameraSettings.shutter].shutterDisplay}
					</h3>
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						ND: {ndData[cameraSettings.nd].nd}
					</h3>
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						EV: {luminanceData[cameraSettings.luminance].evDisplay}
					</h3>
					<h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
						COMPENS: {compensationTable[cameraSettings.compensation].evDisplay} ev
					</h3>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="py-2">
					<Label>LUX</Label>
					<Slider
						defaultValue={[cameraSettings.luminance]}
						onValueChange={(value) => setCameraSettings(prevState => ({ ...prevState, luminance: value[0] }))}
						max={luminanceData.length - 1}
						step={1}
						orientation="vertical"
						className="h-[600px]"
					/>
				</div>
				<div className="py-2">
					<Label>ISO</Label>
					<Slider
						defaultValue={[cameraSettings.iso]}
						onValueChange={(value) => setCameraSettings(prevState => ({ ...prevState, iso: value[0] }))}
						max={isoData.length - 1}
						step={1}
						orientation="vertical"
						className="h-[600px]"
					/>
				</div>
				<div className="py-2">
					<Label>APERTURE</Label>
					<Slider
						defaultValue={[cameraSettings.aperture]}
						onValueChange={(value) => setCameraSettings(prevState => ({ ...prevState, aperture: value[0] }))}
						max={apertureData.length - 1}
						step={1}
						orientation="vertical"
						className="h-[600px]"
					/>
				</div>
				<div className="py-2">
					<Label>SHUTTER</Label>
					<Slider
						defaultValue={[cameraSettings.shutter]}
						onValueChange={(value) => setCameraSettings(prevState => ({ ...prevState, shutter: value[0] }))}
						max={shutterData.length - 1}
						step={1}
						orientation="vertical"
						className="h-[600px]"
					/>
				</div>
				<div className="py-2">
					<Label>ND</Label>
					<Slider
						defaultValue={[cameraSettings.nd]}
						onValueChange={(value) => setCameraSettings(prevState => ({ ...prevState, nd: value[0] }))}
						max={ndData.length - 1}
						step={1}
						orientation="vertical"
						className="h-[600px]"
					/>
				</div>
				<div className="py-2">
					<Label>Compensation</Label>
					<Slider
						defaultValue={[cameraSettings.compensation]}
						onValueChange={(value) => setCameraSettings(prevState => ({ ...prevState, compensation: value[0] }))}
						max={compensationTable.length - 1}
						step={1}
						orientation="vertical"
						className="h-[600px]"
					/>
				</div>
			</div>
		</div>
	);
}
