# react-distortion-image

```js
propTypes = {
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  displacementImage: PropTypes.string.isRequired,
  intensity: PropTypes.number,
  speedIn: PropTypes.number,
  speedOut: PropTypes.number,
  hovering: PropTypes.bool,
  easing: PropTypes.object, // easing objects from gsap
};
defaultProps = {
  intensity: 1,
  speedIn: 1.6,
  speedOut: 1.2,
  easing: Expo.easeOut,
};
```
