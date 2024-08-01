import { useContext, useEffect } from "react";
import { differenceInSeconds } from 'date-fns' //Biblioteca de calculo de datas
import { CycleContext } from "../../../contexts/CycleContext";

import { 
    CountdownContainer, 
    Separator 
} from "./styles";

export function Countdown(){
    const {activeCycle, activeCycleId, finishedActiveCycle, amountSecondsPassed, secondsPassed} = useContext(CycleContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number;

        if(activeCycle){
            interval = setInterval(() => {

                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    new Date(activeCycle.startDate)
                )

                if(secondsDifference >= totalSeconds){
                    console.log("SecondsDiff: " + secondsDifference)
                    console.log("SecondsTot: " + totalSeconds)
                    console.log("ActiveCycle: " + activeCycle)

                    finishedActiveCycle()
                    secondsPassed(totalSeconds)
                }
                else{
                    secondsPassed(secondsDifference)
                }
            }, 1000);
            
            if (activeCycle.finishedDate) {
                clearInterval(interval);
            }
        }

        return () => {
            clearInterval(interval)
        }

    },[activeCycle, totalSeconds, activeCycleId, finishedActiveCycle])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    },[minutes, seconds, activeCycle])
    
    return(
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}