import React, { useState } from "react";

const accordionData = [
  {
    title: "CREATIVE",
    content: ["Art Direction", "Creative Direction"],
  },
  {
    title: "DESIGN",
    content: [
      "Digital Design",
      "UX/UI Design",
      "Web Design",
      "Graphic Design",
      "3D Design",
      "Interactive Design",
      "Illustration Design",
      "Brand Design",
    ],
  },
  {
    title: "ANIMATION",
    content: [
      "Art Direction",
      "3D Animation",
      "Motion Graphics",
      "Experimental Animation",
      "Typography Animation",
    ],
  },
  {
    title: "TECHNOLOGY",
    content: [
      "Development",
      "Implementation",
      "Creative Coding",
      "Prototyping",
      "Quality Assurance",
      "Testing",
    ],
  },
  {
    title: "PROJECT DELIVERY",
    content: ["Production Strategy", "Project Management", "Team Direction"],
  },
  {
    title: "EXAMPLE PRODUCTS",
    content: [
      "Social Ads",
      "Websites",
      "AR Filters and Experiences",
      "Display Ads (Htm15, Static, Rich media)",
      "Digital Out of Home",
      "Static and Animated Assets",
      "Digital Installations",
      "Design Toolkits",
    ],
  },
];

const Accordion = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full">
      {accordionData.map((item, index) => (
        <div
          key={index}
          className="border-b flex flex-col gap-2  transition-all duration-300 reveal-up"
        >
          {/* Accordion Header */}
          <button
            className="w-full flex justify-between items-center px-0 py-4 text-left text-lg font-semibold bg-triumph-bg-gray  focus:outline-none text-DemiBold cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <span
              className={`text-sm lg:text-sm font-normal  ${
                activeIndex === index ? "text-triumph-red " : "text-black "
              } `}
            >
              {item.title}
            </span>
            <svg
              className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-400 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Accordion Content */}
          <div
            className={`bg-triumph-bg-gray overflow-hidden transition-max-height duration-500 ease-in-out ${
              activeIndex === index ? "max-h-96 mb-3" : "max-h-0"
            }`}
          >
            {item.content.map((contentItem, contentIndex) => (
              <div
                key={contentIndex}
                className="px-6 py-2 text-gray-600 text-Regular text-sm lg:text-base hover:bg-black hover:text-white transition-all duration-100 ease-in"
              >
                {contentItem}
              </div>
            ))}
            {/* <div className="px-6 py-4 text-gray-600 text-Regular text-sm lg:text-base">
              {item.content}
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
