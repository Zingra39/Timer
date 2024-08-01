import { HandPalm, Play } from 'phosphor-react' //biblioteca de icones
import {FormProvider, useForm} from 'react-hook-form' //biblioteca que disponibiliza ferramentas para controle de formularios
import { zodResolver } from '@hookform/resolvers/zod' //biblioteca que integra bibliotecas de validação de formularios
import * as zod from 'zod' //bibliotecas de validação de formularios
import { FormNewCycle } from './FormNewCycle'
import { Countdown } from './Countdown'

//styled components
import { 
    StartCountdownButton, 
    HomeContainer, 
    StopCountdownButton
} from './styles'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'

//se da o nome de esquema, pois usa uma formato de validação schema basic
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
})

//transforma os valores passados como validação, em um objeto utilizando puramente Typesrcipt
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

    const { activeCycle, CreateNewCycle, InterrupCycle } = useContext(CycleContext)

    //register --> retorna metodos de utilização de Input(onChange, onBlur, onFocus)
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })

    const {watch, handleSubmit, reset} = newCycleForm

    //função watch verifica o estado do input, validando de algum valor foi inserido
    const task = watch('task')
    const isSubmitDisable = !task

    function handleCreateNewCycle(data: NewCycleFormData){
        CreateNewCycle(data)
        reset()
    }

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <FormNewCycle />
                </FormProvider>
                <Countdown />
                { activeCycle ? (
                    <StopCountdownButton onClick={InterrupCycle}  type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisable} type="submit">
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}