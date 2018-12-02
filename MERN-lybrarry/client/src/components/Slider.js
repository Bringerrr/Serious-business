import React from 'react';
import Carousel from 'nuka-carousel';

class Slider extends React.Component {
  render() {
    return (
      <Carousel autoplay={true} framePadding={"200px"} autoplayInterval={3000} width={"100%"}>
        <img src="https://i.ibb.co/LxND72D/slider-1.jpg" />
        <img src="https://i.ibb.co/ZcZ02D0/slider-2.jpg" />
        <img src="https://i.ibb.co/0MBmYSk/slider-3.jpg" />
      </Carousel>
    );
  }
}
  
  export default Slider;

