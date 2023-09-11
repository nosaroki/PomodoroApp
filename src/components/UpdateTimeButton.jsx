import { useDispatch } from "react-redux"
import { updateChronoValues } from "../features/chrono"

export default function UpdateTimeButton({sign, type}) {
    const dispatch = useDispatch()

    function handleUpdate() {
        dispatch(updateChronoValues({type, value: sign === "+" ? 60 : -60}))
    }
    // console.log(updateChronoValues({type, value: 60}))

    return(
        <button 
        onClick={handleUpdate}
        className="w-8 h-8 text-4xl text-orange-700 bg-orange-200 rounded flex justify-center items-center">
            <span className="relative bottom-1 pointer-events-none">{sign}</span>
        </button>
    )
}