'use client';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
	getAperture,
	getExposure, getExposureData,
	getIso,
	getLuminance,
	getNd,
	getShutter
} from '@/lib/utils';
import { useEffect, useState } from 'react';
import { exposureTable } from '@/public/data';

export default function Home() {
	const luminanceData = getExposureData('luminance');
	const isoData = getExposureData('iso');
	const apertureData = getExposureData('aperture');
	const shutterData = getExposureData('shutter');
	const ndData = getExposureData('nd');
	const [luminance, setLuminance] = useState(
		luminanceData.findIndex((item) => item.ev === '0.000')
	);
	const [iso, setIso] = useState(isoData.findIndex((item) => item.ev === '6.000'));
	const [aperture, setAperture] = useState(
		apertureData.findIndex((item) => item.ev === '0.000')
	);
	const [shutter, setShutter] = useState(
		shutterData.findIndex((item) => item.ev === '0.000')
	);
	const [nd, setNd] = useState(ndData.findIndex((item) => item.ev === '0.000'));

	useEffect(() => {
		getExposure(luminance, iso, aperture, shutter, nd, 0);
	}, [luminance, iso, aperture, shutter, nd]);
	return (
		<div className="w-screen h-screen grid grid-rows-[auto_auto] items-center justify-center">
			<div>
				<div className="h-[128px] w-[128px] bg-black text-white scale-[2]">
					<h3 className="text-[9px] font-[family-name:var(--font-geist-mono)]">
						LUX {luminanceData[luminance].luminanceDisplay}
					</h3>
					<h3 className="text-[9px] font-[family-name:var(--font-geist-mono)]">
						ISO {isoData[iso].iso}
					</h3>
					<h3 className="text-[9px] font-[family-name:var(--font-geist-mono)]">
						APERTURE {apertureData[aperture].apertureDisplay}
					</h3>
					<h3 className="text-[9px] font-[family-name:var(--font-geist-mono)]">
						SHUTTER {shutterData[shutter].shutterDisplay}
					</h3>
					<h3 className="text-[9px] font-[family-name:var(--font-geist-mono)]">
						ND {ndData[nd].nd}
					</h3>
					<h3 className="text-[9px] font-[family-name:var(--font-geist-mono)]">
						EV {luminanceData[luminance].ev}
					</h3>
				</div>
			</div>
			<div>
				<div>
					<Label>LUX</Label>
					<Slider
						defaultValue={[luminance]}
						onValueChange={(value) => setLuminance(value[0])}
						max={luminanceData.length - 1}
						step={1}
						className="w-96"
					/>
				</div>
				<div>
					<Label>ISO</Label>
					<Slider
						defaultValue={[iso]}
						onValueChange={(value) => setIso(value[0])}
						max={isoData.length - 1}
						step={1}
						className="w-96"
					/>
				</div>
				<div>
					<Label>APERTURE</Label>
					<Slider
						defaultValue={[aperture]}
						onValueChange={(value) => setAperture(value[0])}
						max={apertureData.length - 1}
						step={1}
						className="w-96"
					/>
				</div>
				<div>
					<Label>SHUTTER</Label>
					<Slider
						defaultValue={[shutter]}
						onValueChange={(value) => setShutter(value[0])}
						max={shutterData.length - 1}
						step={1}
						className="w-96"
					/>
				</div>
				<div>
					<Label>ND</Label>
					<Slider
						defaultValue={[nd]}
						onValueChange={(value) => setNd(value[0])}
						max={ndData.length - 1}
						step={1}
						className="w-96"
					/>
				</div>
			</div>
		</div>
	);
}
