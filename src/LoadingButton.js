import React from 'react';
import { Button } from 'react-bootstrap';

export default class LoadingButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false
    };
  }

  listen() {
    this.props.start();
    this.props.stop();
  }

  handleClick() {
    this.setState({ isLoading: true }, () => {
      this.listen();
      
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? 'Listening...' : 'Click to talk'}
      </Button>
    );
  }
}
