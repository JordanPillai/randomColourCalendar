import React, { Component } from 'react';
import Calendar from './components/Calendar';
import { withState, withHandlers, compose } from 'recompose';
import isEqual from 'date-fns/is_equal';
import './App.css';

function randomColour() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}

function RandomColourWrapper(props) {
  const renderDay = (formattedDate, DefaultComponent, date) => {
    const { selectedDatesWithColours } = props;
    const Component = DefaultComponent.extend`
      background: ${props => props.colour};
      color: black;
      font-weight: 500;
    `;

    const dateAndColour =
      selectedDatesWithColours.find(([selectedDate]) =>
        isEqual(date, selectedDate)
      ) || [];
    const colour = dateAndColour[1];
    if (colour) {
      return <Component colour={colour}>{formattedDate}</Component>;
    } else {
      return <DefaultComponent>{formattedDate}</DefaultComponent>;
    }
  };

  return <Calendar {...props} renderDay={renderDay} />;
}
const RandomColourCalendar = compose(
  withState('start', 'setStart', Date.now()),
  withState('selectedDatesWithColours', 'setSelectedDateAndColour', []),
  withHandlers({
    onNext: ({ setStart }) => newStart => {
      setStart(newStart);
    },
    onPrevious: ({ setStart }) => newStart => {
      setStart(newStart);
    },
    onDaySelect: ({ setSelectedDateAndColour }) => day => {
      console.log(day);
      const colour = randomColour();
      setSelectedDateAndColour(state => {
        return [...state, [day, colour]];
      });
    }
  })
)(RandomColourWrapper);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RandomColourCalendar />
      </div>
    );
  }
}

export default App;
