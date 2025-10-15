import "./modalResgatePremio.css";

function ModalResgatarPremio({ Premio, onClose }) {

    console.log("Premio selecionado: ", Premio);

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token")

        try {

            const response = await fetch("http://localhost:3000/api/resgate/resgatarPremio", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dataResgate: new Date().toISOString().split('T')[0],   // "2025-10-07",
                    pontosGastos: Premio.valorPremio,
                    premioId: Premio.id,
                })

            })

            if (!response.ok) {
                alert("Voce náo tem pontos suficientes");
            }

            const data = await response.json();
            console.log("Atualizado com sucesso", data);
            onClose(); 

        } catch (error) {
            alert(error.message);

        }
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1>Oi</h1>
                <p>Você deseja resgatar este prêmio?</p>
                <div className="modal-buttons">
                    <button className="btn-confirmar" onClick={handleSubmit}>Confirmar</button>
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalResgatarPremio;
