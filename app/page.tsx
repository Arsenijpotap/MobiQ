'use client'
import { useEffect, useRef, useState } from "react";
import Device from "./device";
import './style.scss'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [max, setMax] = useState(0);
  const [text, setText] = useState('https://nextjs.org/');
  const [count, setCount] = useState(1);
  const allref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, что мы находимся на клиенте
    if (typeof window !== 'undefined') {
      const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      setMax(Math.ceil(window.innerWidth / 610));

      const handleResize = () => {
        setMax(Math.ceil(window.innerWidth / 610));
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCount = parseInt(localStorage.getItem("deviceCount") || "1") || count;
      setCount(localCount);

      if (!localStorage.getItem("deviceCount")) {
        localStorage.setItem("deviceCount", count.toString());
      }

      if (!localStorage.getItem("deviceArr")) {
        localStorage.setItem("deviceArr", '{}');
      }
    }
  }, [count]);

  const deviceArr = [];
  const widthK = 15;
  const localCount = typeof window !== 'undefined' ? parseInt(localStorage.getItem("deviceCount") || "1") || count : count;

  for (let i = 0; i < localCount; i++) {
    deviceArr.push(i + 1);
  }

  return (
    <>
      <header>
        <p className="logo">MobiQ</p>
        <div className="header__group">
          <p className="header__text">Check your website responsiveness</p>
          {!isMobile ? (
            <input
              placeholder="Enter your url"
              onChange={(e) => {
                if (e.target && e.target.value != null && e.target.value !== '/') {
                  setText(e.target.value);
                }
              }}
              name="area"
              id="textArea"
            />
          ) : null}
        </div>
      </header>
      <main>
        {!isMobile ? (
          <div
            className="all"
            ref={allref}
            style={{
              paddingLeft: typeof window !== 'undefined' ? window.innerWidth / widthK : 0,
              paddingRight: typeof window !== 'undefined' ? window.innerWidth / widthK : 0,
            }}
          >
            {deviceArr.map((value) => (
              <Device
                allRef={allref}
                count={count}
                setCount={setCount}
                num={value}
                key={value}
                src={text}
              />
            ))}
            <button
              onClick={() => {
                if (allref.current) {
                  allref.current.classList.add('opacity');
                }
                setTimeout(() => {
                  setCount((c) => c + 1);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem("deviceCount", (count + 1).toString());
                  }
                  if (allref.current) {
                    allref.current.classList.remove('opacity');
                  }
                }, 500);
              }}
              className="plus"
              style={{ right: count >= max ? -50 : 50, opacity: count === max ? '0' : '1' }}
            >
              ⮾
            </button>
          </div>
        ) : (
          <div className="all">
            <br />
            <br />
            <br />
            <p className="all__text">К сожалению, мобильные устройства не поддерживаются</p>
          </div>
        )}
      </main>
    </>
  );
}
