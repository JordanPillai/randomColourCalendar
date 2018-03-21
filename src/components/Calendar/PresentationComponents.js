import styled, { css } from 'styled-components';

const padding = '40px';
const margin = '0.188rem';

export const DefaultCalendarDay = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: 0;
  padding: ${padding};
`;

export const CalendarGridItem = styled.div`
  ${props =>
    props.offset &&
    css`
      grid-column-start: ${props.offset};
    `};
  border: 1px solid;
  font-size: 0.8125rem;
  margin-left: -1px;
  margin-bottom: -1px;
  & > * {
    padding: ${padding};
    display: block;
    width: 100%;
  }
  text-align: center;
`;

export const CalendarMonth = styled.div`
  &:not(:last-child) {
    margin-right: 1rem;
  }
  display: inline-block;
`;

export const CalendarGridHeading = CalendarGridItem.extend`
  color: black;
  opacity: 0.35;
  padding: ${padding};
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  border: 1px solid #c4c4c4;
`;

export const CalendarControl = styled.div`
  margin: ${props =>
    props.rightArrow ? '0 ' + margin + ' 0 auto' : '0 auto 0 ' + margin};
  padding: 0 ${padding};
  width: 32px;
  box-sizing: border-box;
  height: 18px;
`;

export const CalendarArrow = styled.button`
  background: none;
  font-weight: bold;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: 0;
  padding: 0;
`;

export const CalendarMonthHeading = styled.span`
  text-transform: uppercase;
  text-align: center;
  display: block;
  font-size: 0.875rem;
`;
