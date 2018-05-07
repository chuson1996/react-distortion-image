import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Expo, TweenMax } from 'gsap';
import * as THREE from 'three';
import vertex from './vertex';
import fragment from './fragment';
import mobileAndTabletcheck from './mobileAndTabletcheck';

class DistortedImage extends Component {
  state = {
    rendererDomElement: null,
  };

  componentDidMount() {
    const { displacementImage, image1, image2, intensity, speedIn,
      speedOut, easing } = this.props;
    const parent = this.refs.parent;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
    );

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
        antialias: false,
        // alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0.0);

    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);
    // this.setState({
    //   rendererDomElement: renderer.domElement,
    // });

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    var texture1 = loader.load(image1);
    var texture2 = loader.load(image2);

    var disp = loader.load(displacementImage);
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    texture1.anisotropy = renderer.getMaxAnisotropy();
    texture2.anisotropy = renderer.getMaxAnisotropy();

    var mat = new THREE.ShaderMaterial({
      uniforms: {
          effectFactor: { type: "f", value: intensity },
          dispFactor: { type: "f", value: 0.0 },
          texture: { type: "t", value: texture1 },
          texture2: { type: "t", value: texture2 },
          disp: { type: "t", value: disp }
      },

      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      opacity: 1.0
    });

    var geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    var object = new THREE.Mesh(geometry, mat);
    scene.add(object);

    // ---
    var addEvents = function(){
      var evtIn = "mouseenter";
      var evtOut = "mouseleave";
      if (mobileAndTabletcheck()) {
        evtIn = "touchstart";
        evtOut = "touchend";
      }
      parent.addEventListener(evtIn, function(e) {
        TweenMax.to(mat.uniforms.dispFactor, speedIn, {
          value: 1,
          ease: easing
        });
      });

      parent.addEventListener(evtOut, function(e) {
        TweenMax.to(mat.uniforms.dispFactor, speedOut, {
          value: 0,
          ease: easing
        });
      });
    };

    addEvents();

    window.addEventListener("resize", function(e) {
      renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    });


    this.next = function(){
      TweenMax.to(mat.uniforms.dispFactor, speedIn, {
        value: 1,
        ease: easing
      });
    }

    this.previous = function(){
      TweenMax.to(mat.uniforms.dispFactor, speedOut, {
        value: 0,
        ease: easing
      });
    };

    var animate = function() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };
    animate();
  }

  render() {
    const { image1, image2, style, children } = this.props;
    const { rendererDomElement } = this.state;
    return (
      <div ref="parent" style={{ ...style, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 , width: '100%', height: '100% '}}>
          {children}
        </div>
        <img src={image1} alt="" style={{ display: 'none' }}/>
        <img src={image2} alt="" style={{ display: 'none' }}/>
      </div>
    );
  }
}
DistortedImage.propTypes = {
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  displacementImage: PropTypes.string.isRequired,
  intensity: PropTypes.number,
  speedIn: PropTypes.number,
  speedOut: PropTypes.number,
  hovering: PropTypes.bool,
  easing: PropTypes.object,
};
DistortedImage.defaultProps = {
  intensity: 1,
  speedIn: 1.6,
  speedOut: 1.2,
  easing: Expo.easeOut,
};

export default DistortedImage;
