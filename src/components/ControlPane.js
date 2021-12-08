import React from 'react';

function ControlPane({ start, stop, reset, resume, status }) {
  return (
      <div>
          {(status === 0) ?
              <button className="stopwatch-btn stopwatch-btn-blu"
                      onClick={start}>Start</button> : null
          }

          {(status === 1) ?
              <div>
                  <button className="stopwatch-btn stopwatch-btn-red"
                          onClick={stop}>Stop</button>

                  <button className="stopwatch-btn stopwatch-btn-yel"
                          onClick={reset}>Reset</button>
              </div> : null
          }

          {(status === 2) ?
              <div>
                  <button className="stopwatch-btn stopwatch-btn-blu"
                          onClick={resume}>Continue</button>

                  <button className="stopwatch-btn stopwatch-btn-yel"
                          onClick={reset}>Reset</button>
              </div> : null
          }

      </div>
  );
}

export default ControlPane;
