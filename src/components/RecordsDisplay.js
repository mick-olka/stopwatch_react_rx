import React from 'react';
import TimerDisplay from "./TimerDisplay";

function RecordsDisplay({ records }) {
  return (
    <div>
        {records.map((r, index)=>{
            return <div className="record" key={index} >
            <TimerDisplay time={r} />
            </div>;
        })}

    </div>
  );
}

export default RecordsDisplay;
