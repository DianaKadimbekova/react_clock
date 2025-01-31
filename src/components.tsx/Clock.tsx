import { Component } from 'react';
import '../App.scss';

export type Props = {
  name: string;
};

export type State = {
  time: string;
  hasClock: boolean;
  clockName: string;
};

export class Clock extends Component<Props, State> {
  timerId: number = 0;

  state: State = {
    time: new Date().toUTCString().slice(-12, -4),
    hasClock: false,
    clockName: this.props.name,
  };

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({ time: new Date().toUTCString().slice(-12, -4) }, () => {
        // eslint-disable-next-line no-console
        console.log(this.state.time);
      });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.time}</span>
      </div>
    );
  }
}
