import React from 'react';

function TimerDisplay({ time, active }) {
  return (
    <div className={active? "active_timer" : "timer"}>
      <span>{('0' + Math.floor((time / (60 * 60)) % 24)).slice(-2)}</span>&nbsp;:&nbsp;
      <span>{('0' + Math.floor(time / 60)).slice(-2)}</span>&nbsp;:&nbsp;
      <span>{('0' + Math.floor((time) % 60)).slice(-2)}</span>
    </div>
  );
}

export default TimerDisplay;
