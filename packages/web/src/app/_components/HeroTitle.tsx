import React from "react";

const HeroTitle = () => {
  const outlineStyle = {
    textShadow:
      "-5px -5px 0 #000, 5px -5px 0 #000, -5px 5px 0 #000, 5px 5px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000, 4px 4px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
  };
  return (
    <div className="flex items-center tracking-tight justify-center mb-4 text-7xl md:text-8xl font-bold font-pixelifySans w-fit mx-auto">
      <span className="text-red-500" style={outlineStyle}>
        B
      </span>
      <span className="text-orange-500" style={outlineStyle}>
        i
      </span>
      <span className="text-yellow-500" style={outlineStyle}>
        f
      </span>
      <span className="text-green-500" style={outlineStyle}>
        r
      </span>
      <span className="text-blue-500" style={outlineStyle}>
        o
      </span>
      <span className="text-indigo-500" style={outlineStyle}>
        s
      </span>
      <span className="text-purple-500" style={outlineStyle}>
        t
      </span>
    </div>
  );
};

export default HeroTitle;
