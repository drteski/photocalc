"use client";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  getAperture,
  getExposure,
  getIso,
  getLuminance,
  getNd,
  getShutter,
} from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const luminanceData = getLuminance();
  const isoData = getIso();
  const apertureData = getAperture();
  const shutterData = getShutter();
  const ndData = getNd();
  const [lux, setLux] = useState(
    luminanceData.findIndex((item) => item.ev === 0),
  );
  const [iso, setIso] = useState(isoData.findIndex((item) => item.ev === 6));
  const [aperture, setAperture] = useState(
    apertureData.findIndex((item) => item.ev === 0),
  );
  const [shutter, setShutter] = useState(
    shutterData.findIndex((item) => item.ev === 0),
  );
  const [nd, setNd] = useState(ndData.findIndex((item) => item.ev === 0));
  const [cameraSettings, setCameraSettings] = useState({
    lux,
    iso,
    aperture,
    shutter,
    nd,
    compensation: 0,
  });
  useEffect(() => {
    setCameraSettings(
      getExposure({ lux, iso, aperture, shutter, nd, compensation: 0 }),
    );
  }, [lux, iso, aperture, shutter, nd]);
  return (
    <div className="w-screen h-screen grid grid-rows-[auto_auto] items-center justify-center">
      <div>
        <div className="h-[128px] w-[128px] bg-black text-white scale-[2]">
          <h3 className="text-xs font-[family-name:var(--font-geist-mono)]">
            LUX {luminanceData[lux].luminance}
          </h3>
          <h3 className="text-xs font-[family-name:var(--font-geist-mono)]">
            ISO {isoData[iso].iso}
          </h3>
          <h3 className="text-xs font-[family-name:var(--font-geist-mono)]">
            APERTURE {apertureData[aperture].aperture}
          </h3>
          <h3 className="text-xs font-[family-name:var(--font-geist-mono)]">
            SHUTTER {shutterData[shutter].shutter}
          </h3>
          <h3 className="text-xs font-[family-name:var(--font-geist-mono)]">
            ND {ndData[nd].nd}
          </h3>
          <h3 className="text-xs font-[family-name:var(--font-geist-mono)]">
            EV {luminanceData[lux].ev}
          </h3>
        </div>
      </div>
      <div>
        <div>
          <Label>LUX</Label>
          <Slider
            defaultValue={[lux]}
            onValueChange={(value) => setLux(value[0])}
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
