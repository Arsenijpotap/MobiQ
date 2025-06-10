import { StaticImageData } from 'next/image';
import iphone11 from '../frames/iphone11.png'
import iphone13 from '../frames/iphone13.png'
import iphone12promax from '../frames/iphone12promax.png'
import iphone12mini from '../frames/iphone12mini.png'
interface DeviceSpecs {
  size: number;
  top: number;
  scale: number;
  width: number;
  height: number;
  timeX: number;
  timeY: number;
  style:'iphone'|'android'
  curtainHeight: number;
    src:  StaticImageData
    curtainColor:string
}
interface Devices{
  [key:string]:DeviceSpecs
}
 export const devices: Devices = {
   iphone11: {
        style:'iphone',
     size: 1,
      top: -448,
      scale: 0.791,
      width: 414,
      height: 896,
      curtainHeight: 40,
      curtainColor: '#fff',
     src: iphone11,
     timeX: 30,
        timeY:6,
    },
   iphone13: {
        style:'iphone',
    size: 0.95,
      top: -448,
      scale: 0.835,
      width: 414,
      height: 896,
      curtainHeight: 40,
      curtainColor: '#fff',
     src: iphone13,
     timeX: 35,
        timeY:8,
    },
   iphone12promax: {
    size: 1,
      top: -460,
      scale: 0.807,
      width: 428,
      height: 926,
      curtainHeight: 40,
      curtainColor: '#fff',
      src: iphone12promax,
      timeX: 34,
     timeY: 6,
      style:'iphone'
    },
   iphone12mini: {
    size: 0.98,
      top: -408,
      scale: 0.841,
      width: 375,
      height: 812,
      curtainHeight: 40,
      curtainColor: '#fff',
      src: iphone12mini,
      timeX: 24,
     timeY: 16,
         style:'iphone'
      
    }
  }