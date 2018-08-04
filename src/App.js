import React from 'react';
// import CatWithMouse from './Cat';

const Cat = ({ mouse, name }) => (
  <div style={{ position: 'absolute', left: mouse.x - 130, top: mouse.y - 90 }}>
    <img src="/cat.jpg" alt="cat" />
    <h4 style={{ textAlign: 'center' }}>
      {name}
    </h4>
  </div>
);

function withMouse(Component, name) {
  return {
    [name]: class extends React.Component {
      render() {
        return (
          <Mouse render={mouse => (
            <Component mouse={mouse} {...this.props} />
          )} />
        );
      }
    }
  }[name];
}

const CatWithMouse = withMouse(Cat, "CatWrapper");

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <h1>Move the mouse around!</h1>
        {/* <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} /> */}
        <CatWithMouse name="Anthony" />
      </div>
    );
  }
}

export default MouseTracker;
