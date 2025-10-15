import "./modalMostrarTarefa.css";

function ModalEditarTarefa({ diaEscolhido, diaOntem, diaAmanha, onClose }) {
    console.log("Dia escolhido: ", diaEscolhido);
    console.log("Dia ontem: ", diaOntem);
    console.log('Dia amanha: ', diaAmanha);
    



    return (
        <div className="Container">
            {diaEscolhido === "ontem" ? (
                <div>
                    <h1>Ontem</h1>
                    <ul>
                        {diaOntem.map((ontem) => {
                            const horaFormatada = new Date(ontem.dataHora).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            return (
                                <li key={ontem.id}
                                    className={ontem.concluida ? "tarefa-concluida" : "tarefa-nao-concluida"}>
                                    hora: {horaFormatada} // Nome tarefa: {ontem.tarefa.nomeTarefa} // Valor: {ontem.tarefa.valorTarefa}
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={onClose} className="btnCancelar">Cancelar</button>

                </div>
            ) : diaEscolhido === "amanha" ? (
                <div>
                    <h1>Dia amanha</h1>
                    <ul>
                        {diaAmanha.map((amanha) => {
                            const horaFormatada = new Date(amanha.dataHora).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            return (
                                <li key={amanha.id}
                                    className={amanha.concluida ? "tarefa-concluida" : "tarefa-nao-concluida"}>
                                    hora: {horaFormatada} // Nome tarefa: {amanha?.tarefa?.nomeTarefa ?? "Nenhuma tarefa agendada"}// Valor: {amanha?.tarefa?.valorTarefa??'Nenhum valor'}
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={onClose} className="btnCancelar">Cancelar</button>

                </div>
            ) : (
                <div>
                    <h1>Oi</h1>
                </div>
            )}
        </div>
    );
}

export default ModalEditarTarefa;
