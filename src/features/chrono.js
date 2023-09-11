import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session: {
        value: 1500,
        runningValue: 1500
    },

    pause: {
        value: 300,
        runningValue: 300
    },

    isPlaying: false,
    intervalID: undefined,
    cycles: 0,
    displayedValue: {
        value: 1500,
        heading: "Work"
    }
}

export const chrono = createSlice({
    name: "chrono",
    initialState,
    reducers: {
        updateChronoValues: (state, action) => {
            const chosenState = state[action.payload.type]

            // Condition inférieur à 1
            if(chosenState.value + action.payload.value === 0)
                return

             // Condition isPlaying = pause et on veut augmenter la session
             // Si c'est pas play session et work se mettent à jour
                if(action.payload.type === "session") {
                    if(!state.isPlaying) {
                        chosenState.value = chosenState.value + action.payload.value
                        chosenState.runningValue = chosenState.runningValue + action.payload.value
                        state.displayedValue.value = chosenState.runningValue
                    }
                    else {
                        chosenState.value = chosenState.value + action.payload.value
                    }
                }
                else if(action.payload.type === "pause"){
                    chosenState.value = chosenState.value + action.payload.value
                }
        },
        tick: (state, action) => {
            // console.log("TICK") // Pour check qu'au click le chrono démarre bien
            if(state.session.runningValue > 0) {
                state.session.runningValue--
                state.displayedValue.value = state.session.runningValue
                state.displayedValue.heading = "Work"
            }
            else if(state.pause.runningValue > 0) {
                state.pause.runningValue--
                state.displayedValue.value = state.pause.runningValue
                state.displayedValue.heading = "Pause"
            }
            else{
                state.cycles++
                state.session.runningValue = state.session.value - 1
                state.displayedValue.value = state.session.value - 1
                state.displayedValue.heading = "Work"
                state.pause.runningValue = state.pause.value
            }

        },
        setUpChrono: (state, action) => {
            state.isPlaying = true
            state.intervalID = action.payload
        },
        resetChrono: (state, action) => {
            window.clearInterval(state.intervalID)
            state.isPlaying = false
            state.session.runningValue = state.session.value
            state.pause.runningValue = state.pause.value
            state.displayedValue.value = state.session.runningValue
            state.cycles = 0
        }
    }
})

export function startChrono(action) {
    return function(dispatch, getState) {

        // On met en place le setinterval qui attend une seconde avant de commencer
        const intervalID = setInterval(() => {
            dispatch(tick())
        }, 1000)

        dispatch(setUpChrono(intervalID))
        // sans lui on passerait à une seconde direct sans temps d'attente
        dispatch(tick())
    }
}


export const {updateChronoValues, resetChrono, setUpChrono, tick} = chrono.actions
export default chrono.reducer