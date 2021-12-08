import React from 'react';

function ControlPane({start, stop, reset, wait}) {
    return (
        <div>
            <div>
                <button className="stopwatch-btn stopwatch-btn-blu"
                        onClick={start}>Start
                </button>
                <button className="stopwatch-btn stopwatch-btn-red"
                        onClick={stop}>Stop
                </button>
                <button className="stopwatch-btn stopwatch-btn-yel"
                        onClick={reset}>Reset
                </button><button className="stopwatch-btn stopwatch-btn-yel"
                        onClick={wait}>Wait
                </button>
            </div>
        </div>
    );
}

export default ControlPane;
