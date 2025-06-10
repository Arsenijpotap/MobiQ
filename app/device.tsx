"use client"

import Image from "next/image";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import int from './int2.png'
import './style.scss'
import { devices } from "@/constants/devices";
import Select from "react-select";
interface LocalData {
  [key: string]: string;
}

export default function Device(props: {
  src: string 
  num: number
  allRef: RefObject<HTMLDivElement | null>
  setCount: Dispatch<SetStateAction<number>>
 count:number
}) {
  let [phone,setPhone] = useState("iphone11")
  let [time, setTime] =useState<Date | null>(null)

  let options=[{ value: 'iphone11', label: 'Iphone 11' },
    { value: 'iphone12promax', label: 'Iphone 12 Pro Max' },
    { value: 'iphone12mini', label: 'Iphone 12 Mini' },
    { value: 'iphone13', label: 'Iphone 13' },
  ]
  let groupRef =useRef<HTMLDivElement>(null)
  let iframeRef =useRef<HTMLIFrameElement>(null)
  let containerRef = useRef<HTMLDivElement>(null)
  const saveDeviceData = (val:string) => {
    const savedData = localStorage.getItem("deviceArr");
    const currentData: LocalData = savedData ? JSON.parse(savedData) : {};
    
    const updatedData = {
      ...currentData,
      [props.num.toString()]: val
    };
    
    localStorage.setItem("deviceArr", JSON.stringify(updatedData));
  };
  const delData = () => {
    const savedData = localStorage.getItem("deviceArr");
    const currentData: LocalData = savedData ? JSON.parse(savedData) : {};
    
     delete currentData[props.num]
    
    localStorage.setItem("deviceArr", JSON.stringify(currentData));
  };
  useEffect(() => {

    if (localStorage.getItem('deviceArr')) {
      const savedData = localStorage.getItem("deviceArr");
      const currentData: LocalData = savedData ? JSON.parse(savedData) : {};
      if(currentData[props.num])
      setPhone(currentData[props.num])
      saveDeviceData(currentData[props.num])
    } else {
      saveDeviceData(phone)
    }
 
    
 
   
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      
      clearInterval(interval)



  };
  }, []);





  return (
    
    <div className="container" ref={containerRef}>
      <div className="device__box" ref={groupRef} style={{ scale: devices[phone].size*(window.innerHeight||960)/960,}}>
        <div className="device__group"
          style={{
            scale: devices[phone].scale,
          height:devices[phone].height,
          width:devices[phone].width,
          top:devices[phone].top,
        }}>
          <div className="device__curtain" style={{
            height: devices[phone].curtainHeight,
            background: devices[phone].curtainColor
          }}><p className="time" style={{ fontSize:devices[phone].width/23, paddingTop: devices[phone].timeY, paddingLeft: devices[phone].timeX }}> {time?.getHours() + ':' + time?.getMinutes().toString().padStart(2, '0')}</p> <Image style={{ marginTop: devices[phone].timeY +2, marginRight:devices[phone].scale*devices[phone].timeX-3}} className="int" alt="interface element" src={int}></Image></div>
          <iframe ref={iframeRef} className="device__screen"
        src={props.src} 
        title="Example Iframe" 
       style={{height:devices[phone].height-devices[phone].curtainHeight,}}
        />
        </div>
        <Image className="device__frame"  alt="mobile" width={400} height={800} src={devices[phone].src}></Image>
      </div>
      <div className="select__group">
        <Select  className="select" onChange={(e) => {
          if (groupRef.current && e) {
            groupRef.current.style.opacity = '0'; 
            const timer = setTimeout(() => {
              setPhone(e.value);
            
              if (groupRef.current) {
                groupRef.current.style.opacity = '1';
              }
              
            }, 500);
            saveDeviceData(e.value)
        
            return () => clearTimeout(timer);

         }
       
        }} placeholder={phone} options={options}></Select>
        <button onClick={() => {
            if (props.allRef && props.allRef.current) {
              props.allRef.current.classList.add('opacity')
            }
          setTimeout(() => {
            
            props.setCount((c) => props.count - 1)
            localStorage.setItem("deviceCount", (props.count +-1).toString())
            if (props.allRef && props.allRef.current) {
              props.allRef.current.classList.remove('opacity')
            }
          },500)
            
          delData()
        }} style={{marginLeft: props.count != props.num || props.count == 1 ? '0' : '10px', width: props.count != props.num || props.count == 1 ? '0' : '47px',opacity: props.count != props.num || props.count == 1 ? '0' : '1', pointerEvents:props.count != props.num || props.count == 1 ? 'none' :"auto"}} className="bascket">⮾</button>
      </div>
      </div>
  )
}
