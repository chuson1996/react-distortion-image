import React, {Component} from 'react'
import {render} from 'react-dom'

import DistortedImage from '../../src'

class Demo extends Component {
  render() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,50vmax)', gridAutoRows: 700 }}>
        <DistortedImage
          style={{ width: '100%' }}
          image1={'https://images.unsplash.com/photo-1518798572118-2c5c3f1320b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cc529544783b00e007a4911197ef8b0f&auto=format&fit=crop&w=668&q=80'}
          image2={'https://images.unsplash.com/photo-1518699376815-e6cae5137429?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffba1178a9e1dd91f21b5061ea4cd6da&auto=format&fit=crop&w=668&q=80'}
          displacementImage={'https://images.unsplash.com/photo-1513420558496-c3e2534de0ba?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bb6d99d3b5f38f9f9f1e757986a39280&auto=format&fit=crop&w=974&q=80'}
        >
          <div style={{ padding: 20, color: 'white' }}>
            <h1>Pretty</h1>
            <p>Nice</p>
          </div>
        </DistortedImage>
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
