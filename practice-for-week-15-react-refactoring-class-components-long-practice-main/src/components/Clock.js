import React from 'react';
import {useState, useEffect} from 'react'

export function ClockToggle({ toggleClock }) {
    return (
      <button 
        type="button"
        className="clock-toggle" 
        onClick={toggleClock}
      >
        Toggle Clock
      </button>
    )
} 

export function Clock() {
  const [time, setTime] = useState(new Date())
  const [hours, setHours] = useState(time.getHours())
  const [minutes, setMinutes] = useState(time.getMinutes())
  const [seconds, setSeconds] = useState(time.getSeconds())
  const [timezone, setTimezone] = useState(
    time.toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
    .replace(/[^A-Z]/g, "") // Strip out all but capitals
    .slice(3) // Eliminate initial GMT)
  )
  
  // componentDidMount() {
  //   this.interval = setInterval(this.tick, 1000);
  // }

  useEffect(()=>{
    let tickInterval = setInterval(tick, 1000)
    return () => clearInterval(tickInterval)
  },[])


  
  // componentWillUnmount() {
  //   console.log("Clearing Clock interval!")
  //   clearInterval(this.interval);
  // }
  
  const tick = () => {
    setTime(new Date());
    console.log("tick!")
  }

  useEffect(() => {
    let newHours = time.getHours()
    let newMinutes = time.getMinutes()
    let newseconds = time.getSeconds()

    setHours((newHours < 10) ? `0${newHours}` : newHours)
    setMinutes((newMinutes < 10) ? `0${newMinutes}` : newMinutes)
    setSeconds((newseconds < 10) ? `0${newseconds}` : newseconds)

    setTimezone(time
      .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
      .replace(/[^A-Z]/g, "") // Strip out all but capitals
      .slice(3) // Eliminate initial GMT
    )

  },[time])

  return (
    <section className="clock-section">
      <h1>Clock</h1>
      <div className='clock'>
        <p>
          <span>
            Time:
          </span>
          <span>
            {hours}:{minutes}:{seconds} {timezone}
          </span>
        </p>
        <p>
          <span>
            Date: 
          </span>
          <span>
            {time.toDateString()}
          </span>
        </p>
      </div>
    </section>
  );

}

export default {Clock, ClockToggle}