import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import { Circ, gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import LocomotiveScroll from "locomotive-scroll";
import Accordion from "./components/Accordion";

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);

  const mainRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      // setShowCanvas(!showCanvas);
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fff",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (cursorVariant === "default") {
      gsap.to(cursor, {
        width: 32,
        height: 32,
        backgroundColor: "#111",
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        duration: 0.2,
      });
      gsap.to(cursorTextRef.current, { opacity: 0, duration: 0.2 });
    } else if (cursorVariant === "hoverHeading") {
      gsap.to(cursor, {
        width: 150,
        height: 150,
        backgroundColor: "red",
        x: mousePosition.x - 75,
        y: mousePosition.y - 75,
        duration: 0.2,
      });
      gsap.to(cursorTextRef.current, { opacity: 1, duration: 0.2 });
    }
  }, [mousePosition, cursorVariant]);

  const headingEnter = () => setCursorVariant("hoverHeading");
  const headingLeave = () => setCursorVariant("default");

  return (
    <>
      <span
        ref={growingSpan}
        className="growing block fixed top-[-20px] left-[-20px] w-5 h-5 rounded-full"
      ></span>

      <div className="cursor" ref={cursorRef}>
        <span
          ref={cursorTextRef}
          className="cursor-text absolute text-white text-sm font-bold opacity-0 z-10"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          Click me
        </span>
      </div>

      {/* Main div starts here */}
      <div className="main h-max w-full relative  ">
        {/* Page starst here */}
        <div className="w-full h-screen relative z-1">
          {/* Navbar */}
          <nav className="fixed w-full  p-4 flex items-center justify-between z-0">
            {/* <div className="brand text-2xl font-regular">chachaCODEry</div> */}
            <div className="brand text-lg font-regular">chachaCODEry</div>
            <ul className="links flex justify-center space-x-4">
              {[
                "Whta we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <li
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm  hover:text-gray-300 cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </nav>

          <div className=" flex flex-col items-center justify-between  ">
            {showCanvas &&
              data[0].map((canvasItem, canvasIndex) => (
                <Canvas details={canvasItem} key={canvasIndex} />
              ))}

            {/* Hero Text */}
            <div className="textcontainer  mt-20 w-full px-[25%] ">
              <div className="text w-[47%] ">
                <h3 className="text-3xl tracking-wide leading-[1.2]">
                  At chachaCODEry, chacha writes CODE and builds immersive
                  experiences for sexy brands.
                </h3>
                <p className="text-sm  mt-6 font-normal">
                  We're a boutique production studio focused on design,
                  animation, and technology, constantly rethinking what digital
                  craft can do for present-day ads and campaigns.
                </p>
                <p className="text-md mt-6">Scroll</p>
              </div>
            </div>

            {/* Ref Heading */}
            <div className="headingRef w-full  flex items-center justify-center re;ative">
              <h1
                className="text-[13rem] font-normal tracking-tight leading-none pl-5 absolute -bottom-20  z-0"
                ref={headingRef}
                onMouseEnter={headingEnter}
                onMouseLeave={headingLeave}
              >
                ChachaCODEry
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full relative min-h-screen  py-40  flex flex-col items-center ">
          {showCanvas &&
            data[1].map((canvasItem, canvasIndex) => (
              <Canvas details={canvasItem} key={canvasIndex} />
            ))}

          <div className="  flex justify-between  w-[55%]">
            <div className="flex items-start justify-start  w-[22rem]">
              <h1 className="text-xl tracking-tighter ">01 - WHAT WE DO</h1>
            </div>
            <div className="  w-[25rem] flex flex-col gap-30">
              {/* <h1 className="text-8xl tracking-tighter">about the brand</h1> */}
              {/* leading-[1.8] w-[80%] */}
              <p className="text-4xl   font-light ">
                We aim to elevate digital production in the advertising space,
                bringing your ideas to life.
              </p>

              <div className="">
                <span className="text-sm">
                  As a contemporary studio, we use cutting-edge design practices
                  and the latest technologies to deliver current digital work.
                </span>
                <br />
                <br />

                <span className="text-sm">
                  Our commitment to innovation and simplicity, paired with our
                  agile approach, ensures your journey with us is smooth and
                  enjoyable from start to finish.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative min-h-screen  py-30  flex flex-col items-center ">
          {showCanvas &&
            data[2].map((canvasItem, canvasIndex) => (
              <Canvas details={canvasItem} key={canvasIndex} />
            ))}

          <div className=" w-full flex  justify-center items-center   ">
            <div className="flex flex-col items-start justify-center  gap-10  w-[55%]">
              <h1 className="text-sm tracking-tighter ">OUR SERVICES</h1>

              <span className="text-4xl">
                We provide you with captivating design, interactive animations,
                reliable code, and immaculate project coordination.Whether you
                need a campaign built from scratch or assistance at a specific
                phase, we’ve got you covered.
              </span>
            </div>
          </div>

          <div className=" w-full flex  justify-center items-center mt-40">
            <div className="flex flex-col items-start justify-center  gap-10  w-[55%]">
              <Accordion />
            </div>
          </div>

          <div className=" w-full flex  justify-center items-center mt-40">
            <div className="flex flex-col items-start justify-center  gap-10  w-[55%]">
              <span className="w-[40%]  text-sm">
                Got a project in mind? Drop us a line at hello@chachacodery.com
                or use the form below.
              </span>
              <span className="w-[40%] text-sm">
                Not sure what you need? We’re here to help you define the
                undefined. Let’s explore all creative and technical
                possibilities together through one of our tailored labs, where
                we champion future-forward thinking within an ethical framework.
              </span>
              <button className="px-4 py-1  rounded-4xl hover:bg-black hover:text-white transition-all duration-300 ease-in-out underline">
                TALK TO US
              </button>
            </div>
          </div>
        </div>

        <div className="w-full relative min-h-screen  py-40  flex flex-col items-center ">
          {showCanvas &&
            data[3].map((canvasItem, canvasIndex) => (
              <Canvas details={canvasItem} key={canvasIndex} />
            ))}

          <div className="  flex justify-between  w-[55%] bg-red-300">
            <div className="flex items-start justify-start  w-[22rem]">
              <h1 className="text-xl tracking-tighter ">02 - WHO WE ARE</h1>
            </div>

            <div className="  w-[25rem] flex flex-col gap-30">
              {/* <h1 className="text-8xl tracking-tighter">about the brand</h1> */}
              {/* leading-[1.8] w-[80%] */}
              <p className="text-4xl   font-light ">
                Our vision is to refine digital production while creating social
                impact and opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// {data.map((item, index) => (
//   <div className="" key={index}>
//     {item.map((canvasItem, canvasIndex) => (
//       <Canvas details={canvasItem} key={canvasIndex} />
//     ))}
//   </div>
// ))}
