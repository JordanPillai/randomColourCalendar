import React from 'react';
import styled from 'styled-components';

import startOfMonth from 'date-fns/start_of_month';
import getDayOfYear from 'date-fns/get_day_of_year';
import subMonths from 'date-fns/sub_months';
import eachDay from 'date-fns/each_day';
import addMonths from 'date-fns/add_months';
import endOfMonth from 'date-fns/end_of_month';
import format from 'date-fns/format';
import getDay from 'date-fns/get_day';
import getMonth from 'date-fns/get_month';

import {
  CalendarMonth,
  CalendarControl,
  CalendarArrow,
  CalendarMonthHeading,
  CalendarGrid,
  CalendarGridHeading,
  CalendarGridItem,
  DefaultCalendarDay
} from './PresentationComponents';

import { eachMonth } from '../../utils';

const abbreviatedDaysInWeek = [
  'Mon',
  'Tues',
  'Weds',
  'Thurs',
  'Fri',
  'Sat',
  'Sun'
];

const offsetForDays = [7, 1, 2, 3, 4, 5, 6];

const Flex = styled.div`
  display: flex;
  padding: 20px;
`;

export default function Calendar(props) {
  const {
    start = new Date(),
    noOfMonths = 1,
    onNext,
    onPrevious,
    renderDay,
    onDaySelect
  } = props;
  const startMonth = startOfMonth(start);
  const endMonth = addMonths(startMonth, noOfMonths - 1);
  const months = eachMonth(startMonth, endMonth);
  const daysInMonths = months.map(month => {
    const endDate = endOfMonth(month);
    const day = eachDay(month, endDate);
    return day;
  });
  return (
    <div>
      {daysInMonths.map((daysInMonth, index) => {
        return (
          <CalendarMonth key={'month-' + getMonth(daysInMonth[0])}>
            <Flex>
              <CalendarControl>
                {index === 0 ? (
                  <CalendarArrow
                    onClick={() =>
                      onPrevious && onPrevious(subMonths(start, 1))
                    }
                  >
                    Prev
                  </CalendarArrow>
                ) : null}
              </CalendarControl>
              <CalendarMonthHeading>
                {format(daysInMonth[0], 'MMM YYYY')}
              </CalendarMonthHeading>
              <CalendarControl rightArrow>
                {index === noOfMonths - 1 ? (
                  <CalendarArrow
                    onClick={() => onNext && onNext(addMonths(start, 1))}
                  >
                    Next
                  </CalendarArrow>
                ) : null}
              </CalendarControl>
            </Flex>
            <CalendarGrid>
              {abbreviatedDaysInWeek.map((dayName, i) => {
                return (
                  <CalendarGridHeading key={'day-name-' + i}>
                    {dayName}
                  </CalendarGridHeading>
                );
              })}
              {daysInMonth.map((day, index) => {
                return (
                  <CalendarGridItem
                    onClick={() => onDaySelect && onDaySelect(day)}
                    offset={
                      index === 0 ? offsetForDays[getDay(day)] : undefined
                    }
                    key={'day-' + getDayOfYear(day)}
                  >
                    {renderDay ? (
                      renderDay(format(day, 'D'), DefaultCalendarDay, day)
                    ) : (
                      <DefaultCalendarDay>
                        {format(day, 'D')}
                      </DefaultCalendarDay>
                    )}
                  </CalendarGridItem>
                );
              })}
            </CalendarGrid>
          </CalendarMonth>
        );
      })}
    </div>
  );
}
