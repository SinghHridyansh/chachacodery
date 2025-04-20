// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import CanvasImages from "./canvasImages";

// gsap.registerPlugin(useGSAP);

// const Canvas = ({ details }) => {
//   const { startIndex, numImages, duration, size, top, left, zIndex } = details;
//   const [index, setIndex] = useState({ value: startIndex });
//   const canvasRef = useRef(null);

//   useGSAP(() => {
//     gsap.to(index, {
//       value: startIndex + numImages - 1,
//       duration: duration,
//       repeat: -1,
//       easing: "linear",
//       onUpdate: () => {
//         setIndex({ value: Math.floor(index.value) });
//       },
//     });

//     gsap.from(canvasRef.current, {
//       opacity: 0,
//       scale: 0.5,
//       duration: 1,
//       ease: "power2.out",
//     });

//     gsap.to(canvasRef.current, {
//       opacity: 1,
//       scale: 1,
//       duration: 1,
//       ease: "power2.in",
//     });
//   });

//   useEffect(() => {
//     const scale = window.devicePixelRatio;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     img.src = CanvasImages[index.value];
//     img.onload = () => {
//       canvas.width = canvas.offsetWidth * scale;
//       canvas.height = canvas.offsetHeight * scale;
//       canvas.style.width = canvas.offsetWidth + "px";
//       canvas.style.height = canvas.offsetHeight + "px";

//       ctx.scale(scale, scale);
//       ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
//     };
//   }, [index]);

//   return (
//     <canvas
//       data-scroll
//       data-scroll-speed={Math.random().toFixed(1)}
//       ref={canvasRef}
//       className="absolute"
//       style={{
//         width: `${size * 1.8}px`,
//         height: `${size * 1.8}px`,
//         top: `${top}%`,
//         left: `${left}%`,
//         zIndex: `${zIndex}`,
//       }}
//       id="canvas"
//     ></canvas>
//   );
// };

// export default Canvas;

// import { useGSAP } from "@gsap/react";
// import React, { useEffect, useRef, useState } from "react";

// const Canvas = ({ details }) => {
//   const {
//     startIndex,
//     pepperType,
//     numImages,
//     duration,
//     size,
//     top,
//     left,
//     zIndex,
//   } = details;

//   const canvasRef = useRef(null);
//   const imagesRef = useRef([]);
//   const indexRef = useRef(startIndex);
//   const frameRequestRef = useRef();
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Preload images from URL
//   useEffect(() => {
//     let loaded = 0;
//     const loadedImages = [];

//     for (let i = 0; i < numImages; i++) {
//       const img = new Image();
//       img.src = `https://thirtysixstudio.com/peppers/pepper${pepperType}/${i}.png`;

//       img.onload = () => {
//         loadedImages[i] = img;
//         loaded++;
//         if (loaded === numImages) {
//           imagesRef.current = loadedImages;
//           setIsLoaded(true);
//         }
//       };

//       img.onerror = () => {
//         console.error(`Failed to load image: ${img.src}`);
//       };
//     }
//   }, [numImages]);

//   // Start animation after all images are loaded
//   // useEffect(() => {
//   //   if (!isLoaded) return;

//   //   const canvas = canvasRef.current;
//   //   const ctx = canvas.getContext("2d");

//   //   const scale = window.devicePixelRatio || 1;
//   //   const width = canvas.offsetWidth;
//   //   const height = canvas.offsetHeight;
//   //   canvas.width = width * scale;
//   //   canvas.height = height * scale;
//   //   ctx.scale(scale, scale);

//   //   const fps = numImages / duration;
//   //   const frameDuration = 1000 / fps;
//   //   let lastFrameTime = performance.now();

//   //   const render = (time) => {
//   //     const delta = time - lastFrameTime;
//   //     if (delta >= frameDuration) {
//   //       const img = imagesRef.current[Math.floor(indexRef.current)];
//   //       if (img) {
//   //         ctx.clearRect(0, 0, width, height);
//   //         ctx.drawImage(img, 0, 0, width, height);
//   //       }

//   //       indexRef.current =
//   //         startIndex + ((indexRef.current - startIndex + 1) % numImages);
//   //       lastFrameTime = time;
//   //     }

//   //     frameRequestRef.current = requestAnimationFrame(render);
//   //   };

//   //   frameRequestRef.current = requestAnimationFrame(render);
//   //   return () => cancelAnimationFrame(frameRequestRef.current);
//   // }, [isLoaded, numImages, duration, startIndex]);

//   useEffect(() => {
//     if (!isLoaded) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const scale = window.devicePixelRatio || 1;
//     const width = canvas.offsetWidth;
//     const height = canvas.offsetHeight;
//     canvas.width = width * scale;
//     canvas.height = height * scale;
//     ctx.scale(scale, scale);

//     const totalDurationMs = duration * 1000;
//     const startTimeRef = { current: performance.now() };

//     const render = (time) => {
//       const elapsed = time - startTimeRef.current;
//       const progress = (elapsed % totalDurationMs) / totalDurationMs;
//       const frame = Math.floor(progress * numImages);

//       const img = imagesRef.current[frame];
//       if (img) {
//         ctx.clearRect(0, 0, width, height);
//         ctx.drawImage(img, 0, 0, width, height);
//       }

//       frameRequestRef.current = requestAnimationFrame(render);
//     };

//     frameRequestRef.current = requestAnimationFrame(render);

//     return () => cancelAnimationFrame(frameRequestRef.current);
//   }, [isLoaded, numImages, duration]);

//   return (
//     <canvas
//       data-scroll
//       data-scroll-speed={Math.random().toFixed(1)}
//       ref={canvasRef}
//       className="absolute"
//       style={{
//         width: `${size * 1.8}px`,
//         height: `${size * 1.8}px`,
//         top: `${top}%`,
//         left: `${left}%`,
//         zIndex: `${zIndex}`,
//         opacity: isLoaded ? 1 : 0.5, // optional fade in cue
//       }}
//       id="canvas"
//     />
//   );
// };

// export default Canvas;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Canvas = ({ details }) => {
  const {
    startIndex,
    pepperType,
    numImages,
    duration,
    size,
    top,
    left,
    zIndex,
  } = details;

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const indexRef = useRef(startIndex);
  const frameRequestRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images BEFORE doing anything
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < numImages; i++) {
      const img = new Image();
      img.src = `https://thirtysixstudio.com/peppers/pepper${pepperType}/${i}.png`;

      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        if (loadedCount === numImages) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
      };
    }
  }, [numImages, pepperType]);

  // Start canvas animation AFTER images are preloaded
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scale = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    const totalDurationMs = duration * 1000;
    const startTime = performance.now();

    const render = (time) => {
      const elapsed = time - startTime;
      const progress = (elapsed % totalDurationMs) / totalDurationMs;
      const frame = Math.floor(progress * numImages);

      const img = imagesRef.current[frame];
      if (img) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
      }

      frameRequestRef.current = requestAnimationFrame(render);
    };

    frameRequestRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(frameRequestRef.current);
  }, [isLoaded, numImages, duration]);

  // GSAP animation only after preload is done
  useGSAP(() => {
    if (!isLoaded) return;

    gsap.fromTo(
      canvasRef.current,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, [isLoaded]);

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
        opacity: isLoaded ? 1 : 0, // prevent flicker
        transform: isLoaded ? "scale(1)" : "scale(0.5)", // preload transform
        transition: "none", // gsap handles animation
      }}
      id="canvas"
    />
  );
};

export default Canvas;
