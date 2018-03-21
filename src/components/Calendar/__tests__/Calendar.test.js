import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Calendar from '../index';
import { CalendarArrow } from '../PresentationComponents';
import { shallow } from 'enzyme';
import { adjustToUtc } from '../../../utils';
test('renders and matches snapshot', () => {
  const start = adjustToUtc(new Date('2018-04-01'));
  const wrapper = shallow(<Calendar start={start} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('onNext event', () => {
  const myMock = jest.fn();
  const start = new Date('2018-04-01');
  const wrapper = shallow(<Calendar onNext={myMock} start={start} />);

  // Next button
  wrapper
    .find(CalendarArrow)
    .at(1)
    .simulate('click');
  expect(toJson(wrapper)).toMatchSnapshot();
  expect(adjustToUtc(myMock.mock.calls[0][0]).getTime()).toBe(
    adjustToUtc(new Date('2018-05-01')).getTime()
  );
});

test('onPrevious event', () => {
  const myMock = jest.fn();
  const start = new Date('2018-03-01');
  const wrapper = shallow(<Calendar onPrevious={myMock} start={start} />);

  // Prev button
  wrapper
    .find(CalendarArrow)
    .at(0)
    .simulate('click');
  expect(toJson(wrapper)).toMatchSnapshot();
  expect(adjustToUtc(myMock.mock.calls[0][0]).getTime()).toBe(
    adjustToUtc(new Date('2018-02-01')).getTime()
  );
});
