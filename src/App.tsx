import { Component } from 'react';
import './App.scss';
import { Props } from './components.tsx/Clock';
import { State } from './components.tsx/Clock';
import { Clock } from './components.tsx/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends Component<Props, State> {
  state: State = {
    time: new Date().toUTCString().slice(-12, -4),
    hasClock: true,
    clockName: 'Clock-0',
  };

  nameTimerId: number = 0;

  componentDidMount() {
    document.addEventListener('contextmenu', this.hideClock);
    document.addEventListener('click', this.showClock);

    this.nameTimerId = window.setInterval(() => {
      this.setState(prevState => {
        const newName = getRandomName();
        //eslint-disable-next-line
        console.warn(`Renamed from ${prevState.clockName} to ${newName}`);

        return { clockName: newName };
      });
    }, 3300);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.hideClock);
    document.removeEventListener('click', this.showClock);
    window.clearInterval(this.nameTimerId);
  }

  hideClock = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  showClock = () => {
    this.setState({ hasClock: true });
  };

  render() {
    return (
      <div className="App">
        <h1>React Clock</h1>
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}
