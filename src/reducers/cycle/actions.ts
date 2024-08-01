import { Cycle } from "./reducer"

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    FINISHED_ACTIVIE_CYCLE = 'FINISHED_ACTIVIE_CYCLE',
    INTERRUP_ACTIVIE_CYCLE = 'INTERRUP_ACTIVIE_CYCLE'
}

export function addNewCycleAction(newCycle: Cycle){
    return{
        type: ActionTypes.ADD_NEW_CYCLE,
        payload:{
            newCycle
        }
    }
}

export function interrupActivieCycleAction(){
    return{
        type: ActionTypes.INTERRUP_ACTIVIE_CYCLE
    }
}

export function finishedActivieCycleAction(){
    return{
        type: ActionTypes.FINISHED_ACTIVIE_CYCLE
    }
}