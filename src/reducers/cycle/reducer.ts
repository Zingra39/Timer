import { produce } from "immer"
import { ActionTypes } from "./actions"

export interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
    iterruptedDate?: Date
    finishedDate?: Date
}

interface CycleState{
    cycles: Cycle[]
    activeCycleId: string | null
}

export function CyclesReducer(state: CycleState, action: any){
    switch(action.type){
        case ActionTypes.ADD_NEW_CYCLE:{
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        }
        case ActionTypes.INTERRUP_ACTIVIE_CYCLE:{
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })
            
            if(currentCycleIndex < 0){
                return state
            }
            
            return produce(state, draft =>{
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].iterruptedDate = new Date()
            })
        }
        case ActionTypes.FINISHED_ACTIVIE_CYCLE:{
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })
            
            if(currentCycleIndex < 0){
                return state
            }
            
            return produce(state, draft =>{
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        }
        default:
            return state
    }
}