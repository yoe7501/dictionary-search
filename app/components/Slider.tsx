import React from "react";
interface Props {
    isLight: boolean;
}
const Slider = ({isLight} : Props) => {

  return (
    <div className={`sliderContainer ${isLight? '': 'active'} `}>
      <div className="ball"></div>
    </div>
  );
};

export default Slider;
