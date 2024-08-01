import { useContext } from "react";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale/pt-BR";
import { HistoryConatiner, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CycleContext";

export function History(){
    const { cycles } = useContext(CycleContext)

    return(
        <HistoryConatiner>
            <h1>Meu Historico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Inicio</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {cycles.map(data =>{
                            return(
                                <tr key={data.id}>
                                    <td>{data.task}</td>
                                    <td>{data.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(data.startDate), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}</td>
                                    <td>
                                        {data.finishedDate &&(
                                            <Status statusColor="green">Concluido</Status>
                                        )}

                                        {data.iterruptedDate &&(
                                            <Status statusColor="red">Interrompido</Status>
                                        )}

                                        {!data.finishedDate && !data.iterruptedDate &&(
                                            <Status statusColor="yellow">Em andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryConatiner>
    )
}