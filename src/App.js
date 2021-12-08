import './App.css';
import React, { useState, useEffect } from 'react';
import {fromEvent, interval, Observable, Subject} from "rxjs";
import { takeUntil } from "rxjs/operators";

import TimerDisplay from './components/TimerDisplay';
import ControlPane from './components/ControlPane';
import RecordsDisplay from "./components/RecordsDisplay";

function App() {

  const [time, setTime] = useState(0);
  const [flowing, setFlowing] = useState(false);  //  is time flowing
  // const [status, setStatus] = useState(0);  //  for control pane display
  const [records, setRecords] = useState([]); //  for prev time display

  const showPopup = (text) => {
    let small_popup = document.getElementById("small_popup");
    small_popup.innerText = text;
    small_popup.style.right = "1px";
    small_popup.style.opacity="1";
    setTimeout(() => {
      small_popup.style.right = "-15rem";
      small_popup.style.opacity="0";
    }, 2000);
  }

  const handleStart = () => {
    setFlowing(true);
    showPopup("Timer Started");
    // setStatus(1);
  }

  const handleWait = () => {
    setFlowing(false);
    showPopup("Timer Stopped (Wait)");
  }

  const handleStop = () => {
    if (time !== 0) {
      setFlowing(false);
      setRecords([...records, time]);
      setTime(0);
      showPopup("Timer Stopped");
    }
  }

  const handleReset = () => {
    setTime(0);
    setFlowing(true);
    setRecords([]);
    showPopup("Reset Timer");
  }

  useEffect(()=>{

      //  Dealing with 300ms doubleclick (if second click is 300ms after first -- nothing happens)
    fromEvent(document, 'click')
        .subscribe(e => { //  subscribe to fromEvent
          new Observable(observer=>{  //  my custom observable
            setTimeout(()=>observer.complete(), 300); //  is 300ms left -- stop observer
            if (e.detail===2) {observer.next(" 300ms double click")}  //  if 2 click in 300ms -- push subscriber
          }).subscribe( //  subscribe to observable
              value => {
                if (flowing) handleWait();
                console.log(value);
              }
          );
        });

  }, [handleStop, flowing]);

  useEffect(() => {

    const unsubscribe = new Subject();
    interval(1000)    //  rx stream
        .pipe(takeUntil(unsubscribe)) //  method where we put operators for stream manipulating
        .subscribe(() => {
          if (flowing) {
            setTime(val => val + 1);
          }
        });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [flowing]);


  return (
    <div className="App">
      <div className='main-section'>
        <div className='clock-holder'>
          <div className='app-title'>StopwatcH</div>
          <div className='stopwatch'>
            <RecordsDisplay records={records} />
            <TimerDisplay
                time={time}
                active={true}
            />
            <ControlPane
                start={handleStart}
                stop={handleStop}
                reset={handleReset}
                wait={handleWait}
            />
          </div>
          <div className='link-project'>
            <p><b>300ms doubleclick to Wait</b></p>
          </div>
          <div id="small_popup"/>
        </div>
      </div>
    </div>
  );
}

export default App;
