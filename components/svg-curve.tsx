'use client';
import { useRef, useEffect } from 'react'

export default function SvgCurve() {

  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const initialCurve = 200;
  const duration = 600;
  let start: any;

  useEffect(() => {
    setPath(initialCurve)
    setTimeout( () => {
      requestAnimationFrame(animate)
    }, 500)
  }, [])

  const animate = (timestamp: any) => {
    if(start === undefined){
      start = timestamp
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration)
    setPath(newCurve);

    if (loader.current) {
      loader.current.style.top = easeOutQuad(elapsed, 0, -loaderHeight(), duration) + "px";
    }

    if(elapsed < duration){
      requestAnimationFrame(animate)
    }
  }

  const easeOutQuad = (time: number, start: number, end: number, duration: number) => {
    return -end * (time /= duration) * (time - 2) + start;
  }

  const loaderHeight = () => {
    if (!loader.current) return 0;
    const loaderBounds = loader.current.getBoundingClientRect();
    return loaderBounds.height;
  }

  const setPath = (curve: number) => {
    const width = window.innerWidth
    const height = loaderHeight();
    if (path.current) {
      path.current.setAttributeNS(null, "d",
      `M0 0
      L${width} 0
      L${width} ${height}
      Q${width/2} ${height - curve} 0 ${height}
      L0 0`
      )
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-8 bg-surface-0">

      <div className="max-w-2xl text-center">
        <h1 className="text-h2 font-display text-ink-strong">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </h1>
      </div>

      <div ref={loader} className="fixed top-0 left-0 w-full h-[calc(100vh+200px)]">
        <svg className="w-full h-full">
          <path ref={path} className="stroke-black stroke-[1px] fill-[var(--surface-2)]"></path>
        </svg>
      </div>

    </main>
  )
}
