import UpdateTimeButton from "./components/UpdateTimeButton"
import ToggleButton from "./components/ToggleButton"
import { useSelector } from "react-redux"
import getFormattedValue from "./utils/getFormattedValue"

function App() {

  const chronoValues = useSelector (state => state.chrono)

  return (
    <div className="bg-orange-700 text-orange-950 pt-20 min-h-screen">
      <div className="max-w-xl mx-auto border border-orange-400 rounded p-10">
        <h1 className="text-center text-3xl mb-8">Pomodoro App</h1>
        <div className="flex justify-center mb-8">

          {/* Sessions part */}
          <div className="mr-10">
            <p className="text-center mb-1">Sessions</p>
            <div className="flex">
              <UpdateTimeButton sign={"-"} type={"session"}/>
              <p className="mx-4  text-xl">{chronoValues.session.value / 60}</p>
              <UpdateTimeButton sign={"+"} type={"session"}/>
            </div>
          </div>

          {/* Pauses part */}
          <div>
            <p className="text-center mb-1">Pauses</p>
            <div className="flex">
            <UpdateTimeButton sign={"-"} type={"pause"}/>
              <p className="mx-4  text-xl">{chronoValues.pause.value / 60}</p>
            <UpdateTimeButton sign={"+"} type={"pause"}/>
            </div>
          </div>

        </div>
        
           {/* Work part */}
           <p className="text-center mb-2 text-xl font-semibold">
           {chronoValues.displayedValue.heading}
          </p>
          <p className="text-center flex justify-center mb-1">
            <span className="text-4xl p-4 rounded bg-orange-200 text-orange-900">{getFormattedValue(chronoValues.displayedValue.value)}</span>
          </p>
          <p className="mb-10 text-center">Passed cycle(s) : {chronoValues.cycles}</p>

          {/* Start button part */}
          <ToggleButton />
      </div>

    </div>
  )
}

export default App
