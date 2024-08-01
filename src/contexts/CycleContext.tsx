import { createContext, ReactNode, useState,useReducer, useEffect } from "react";
import { Cycle, CyclesReducer } from "../reducers/cycle/reducer";
import { addNewCycleAction, finishedActivieCycleAction, interrupActivieCycleAction } from "../reducers/cycle/actions";
import { differenceInSeconds } from "date-fns";

interface NewCycleFormData{
    task: string
    minutesAmount: number
}

interface CyclesContext {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    finishedActiveCycle: () => void
    amountSecondsPassed: number
    secondsPassed: (seconds: number) => void
    CreateNewCycle: (data: NewCycleFormData) => void
    InterrupCycle: () => void
}

interface CycleContextProps{
    children: ReactNode
}

export const CycleContext = createContext({} as CyclesContext)

export function CycleContextProvider({children}:CycleContextProps){
    const [cyclesState, dispatch] = useReducer(
        CyclesReducer,
        {
            cycles: [], 
            activeCycleId: null,
        },
        (initialState) => {
            const storedStateJSON = localStorage.getItem('@timer:cycles-state-1.0.0')

            if(storedStateJSON){
                return JSON.parse(storedStateJSON)
            }

            return initialState
        }
    )

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@timer:cycles-state-1.0.0',stateJSON)
    },[cyclesState])

    const { cycles, activeCycleId} = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(),new Date(activeCycle.startDate))
        }
        return 0
    })

    function finishedActiveCycle(){
        dispatch(finishedActivieCycleAction())
    }

    function secondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function CreateNewCycle(data: NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function InterrupCycle(){
        dispatch(interrupActivieCycleAction())
    }

    return(
        <CycleContext.Provider 
            value={{
                cycles,
                activeCycle, 
                activeCycleId, 
                finishedActiveCycle,
                amountSecondsPassed,
                secondsPassed,
                CreateNewCycle,
                InterrupCycle
            }}  
        >
            {children}
        </CycleContext.Provider>
    )
}