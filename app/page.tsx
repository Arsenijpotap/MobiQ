'use client'
import { useEffect, useRef, useState } from "react";
import Device from "./device";
import './style.scss'
export default function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let allref = useRef<HTMLDivElement>(null)
  interface LocalData {
    [key: string]: string;
  }
  let [max,setMax] = useState(Math.ceil(window.innerWidth / 610))
  console.log(max)
  let [text, setText] = useState('https://nextjs.org/')
  let [count, setCount] = useState(1)
  if (!localStorage.getItem('deviceArr')) {
    
  }
  let deviceArr = []
let widthK = 15
  let localCount = parseInt(localStorage.getItem("deviceCount") || "1")||count
  for (let i = 0; i <localCount; i++) {
    deviceArr.push(i + 1)
  }

  useEffect(() => {
    window?.addEventListener('resize', () => {setMax(Math.ceil(window.innerWidth / 610)) })
    setCount(localCount)
    if (!localStorage.getItem("deviceCount")) {
        
      localStorage.setItem("deviceCount", count.toString())
    }
    if (!localStorage.getItem("deviceArr")) {
        
      localStorage.setItem("deviceArr", '{}')
    }
    const savedData = localStorage.getItem("deviceCount");
    
    
})
  
  return (<>
    <header>
      <p className="logo">MobiQ</p>
      <div className="header__group">
        <p className="header__text">Check your website responsiveness</p>
        {!isMobile? <input placeholder="Enter your url" onChange={
                (e) => {
                  if (e.target) {
                    console.log(e.target.value)
                    if (e.target.value != null &&e.target.value != '/') {
                      setText(e.target.value)
                    }
                  }
        }} name="area" id="textArea" />:''}</div></header>
      <main>
      {!isMobile?(<div className="all" ref={allref}
        style={{
          paddingLeft: (window.innerWidth/widthK),
          paddingRight: (window.innerWidth/widthK)
          
        }}
      >
      
      
      {deviceArr.map((value) => {return<Device allRef={allref} count={count}  setCount={setCount}  num={value} key={value} src={text}></Device>})}
    
        <button onClick={() => {
          if (allref.current) {
            allref.current.classList.add('opacity')
          }
          setTimeout(() => {
            
            setCount((c) => count + 1)
            localStorage.setItem("deviceCount", (count + 1).toString())
            if (allref.current) {
              allref.current.classList.remove('opacity')
            }
          },500)
        }} className="plus"  style={{ right: count >= max ? -50 :50, opacity: count == max ? '0' : '1' }}>⮾</button>
</div>):<div className="all"><br/><br/><br/><p className="all__text">К сожалению, мобильные устройства не поддерживаются</p></div>}
  </main>
  
  </>)
}