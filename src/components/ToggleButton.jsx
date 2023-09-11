import play from "../assets/play-button.svg"
import reset from "../assets/reset.svg"
import { useSelector, useDispatch } from "react-redux"
import { startChrono, resetChrono } from "../features/chrono"

import React from 'react'

export default function ToggleButton() {

  const dispatch = useDispatch()
  const chronoValues = useSelector(state => state.chrono)

  function toggleChrono() {
    if (!chronoValues.isPlaying) {
      dispatch(startChrono())
    }
    else {
      dispatch(resetChrono())
    }
  }

  return (
    <button 
    onClick={toggleChrono}
    className="px-4 py-2 text-orange-950 flex justify-center items-center mx-auto bg-orange-200 rounded hover:bg-orange-100">
        <span className="mr-3 text-lg">{chronoValues.isPlaying ? "Reset" : "Start"}</span>
        <img className="w-5" src={chronoValues.isPlaying ? reset : play} alt="" />
    </button>
    )
}
