"use client"

import Image from "next/image";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import int from './int2.png';
import './style.scss';
import { devices } from "@/constants/devices";
import Select from "react-select";

interface LocalData {
  [key: string]: string;
}

interface DeviceProps {
  src: string;
  num: number;
  allRef: RefObject<HTMLDivElement | null>; 
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
}

export default function Device({ src, num, allRef, setCount, count }: DeviceProps) {
  const [phone, setPhone] = useState("iphone11");
  const [time, setTime] = useState<Date | null>(null);
  const [scale, setScale] = useState(1);

  const options = [
    { value: 'iphone11', label: 'Iphone 11' },
    { value: 'iphone12promax', label: 'Iphone 12 Pro Max' },
    { value: 'iphone12mini', label: 'Iphone 12 Mini' },
    { value: 'iphone13', label: 'Iphone 13' },
  ];

  const groupRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const saveDeviceData = (val: string) => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("deviceArr");
      const currentData: LocalData = savedData ? JSON.parse(savedData) : {};
      const updatedData = { ...currentData, [num.toString()]: val };
      localStorage.setItem("deviceArr", JSON.stringify(updatedData));
    }
  };

  const delData = () => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("deviceArr");
      const currentData: LocalData = savedData ? JSON.parse(savedData) : {};
      delete currentData[num];
      localStorage.setItem("deviceArr", JSON.stringify(currentData));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScale(devices[phone].size * (window.innerHeight || 960) / 960);
    }
  }, [phone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('deviceArr')) {
      const savedData = localStorage.getItem("deviceArr");
      const currentData: LocalData = savedData ? JSON.parse(savedData) : {};
      if (currentData[num]) {
        setPhone(currentData[num]);
        saveDeviceData(currentData[num]);
      }
    } else {
      saveDeviceData(phone);
    }
  }, [num]);

  return (
    <div className="container" ref={containerRef}>
      <div className="device__box" ref={groupRef} style={{ scale }}>
        <div className="device__group" style={{
          scale: devices[phone].scale,
          height: devices[phone].height,
          width: devices[phone].width,
          top: devices[phone].top,
        }}>
          <div className="device__curtain" style={{
            height: devices[phone].curtainHeight,
            background: devices[phone].curtainColor
          }}>
            <p className="time" style={{
              fontSize: devices[phone].width / 23,
              paddingTop: devices[phone].timeY,
              paddingLeft: devices[phone].timeX
            }}>
              {time?.getHours() + ':' + time?.getMinutes().toString().padStart(2, '0')}
            </p>
            <Image
              style={{ marginTop: devices[phone].timeY + 2, marginRight: devices[phone].scale * devices[phone].timeX - 3 }}
              className="int"
              alt="interface element"
              src={int}
            />
          </div>
          <iframe
            ref={iframeRef}
            className="device__screen"
            src={src}
            title="Example Iframe"
            style={{ height: devices[phone].height - devices[phone].curtainHeight }}
          />
        </div>
        <Image className="device__frame" alt="mobile" width={400} height={800} src={devices[phone].src} />
      </div>
      <div className="select__group">
        <Select
          className="select"
          onChange={(e) => {
            if (groupRef.current && e) {
              groupRef.current.style.opacity = '0';
              setTimeout(() => {
                setPhone(e.value);
                if (groupRef.current) {
                  groupRef.current.style.opacity = '1';
                }
              }, 500);
              saveDeviceData(e.value);
            }
          }}
          placeholder={phone}
          options={options}
        />
        <button
          onClick={() => {
            if (allRef.current) {
              allRef.current.classList.add('opacity');
            }
            setTimeout(() => {
              setCount((c) => c - 1);
              localStorage.setItem("deviceCount", (count - 1).toString());
              if (allRef.current) {
                allRef.current.classList.remove('opacity');
              }
            }, 500);
            delData();
          }}
          style={{
            marginLeft: count !== num || count === 1 ? '0' : '10px',
            width: count !== num || count === 1 ? '0' : '47px',
            opacity: count !== num || count === 1 ? '0' : '1',
            pointerEvents: count !== num || count === 1 ? 'none' : "auto"
          }}
          className="bascket"
        >
          ⮾
        </button>
      </div>
    </div>
  );
}
