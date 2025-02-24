"use client";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { getExposure, getExposureData } from "@/lib/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { compensationTable } from "@/public/data";
import { useExposureMetter } from "@/lib/exposureMeter";

export default function Home() {
  const { exposure, luminance, iso, aperture, shutter, nd, compensation } =
    useExposureMetter("M", {
      exposure: 0,
      luminance: 0,
      iso: 0,
      aperture: 0,
      shutter: 0,
      nd: 0,
      compensation: 0,
    });

  return (
    <div className="w-screen h-screen grid grid-rows-[auto_auto] items-center justify-center">
      <div>
        <div className="h-[600px] w-[600px] bg-black text-white scale-[1] flex flex-col justify-between p-8">
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            LUX: {luminance.luminanceDisplay}
          </h3>
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            ISO: {iso.iso}
          </h3>
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            APERTURE: {aperture.apertureDisplay}
          </h3>
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            SHUTTER: {shutter.shutterDisplay}
          </h3>
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            ND: {nd.nd}
          </h3>
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            EV: {luminance.evDisplay}
          </h3>
          <h3 className="text-[32px] font-[family-name:var(--font-geist-mono)]">
            COMPENS: {compensation.evDisplay}
            ev
          </h3>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="py-2">
          <Label>LUX</Label>
          <Slider
            defaultValue={[cameraSettings.luminance]}
            onValueChange={(value) =>
              setCameraSettings((prevState) => ({
                ...prevState,
                luminance: value[0],
              }))
            }
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
            onValueChange={(value) =>
              setCameraSettings((prevState) => ({
                ...prevState,
                iso: value[0],
              }))
            }
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
            onValueChange={(value) =>
              setCameraSettings((prevState) => ({
                ...prevState,
                aperture: value[0],
              }))
            }
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
            onValueChange={(value) =>
              setCameraSettings((prevState) => ({
                ...prevState,
                shutter: value[0],
              }))
            }
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
            onValueChange={(value) =>
              setCameraSettings((prevState) => ({
                ...prevState,
                nd: value[0],
              }))
            }
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
            onValueChange={(value) =>
              setCameraSettings((prevState) => ({
                ...prevState,
                compensation: value[0],
              }))
            }
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
