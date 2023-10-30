interface ITicketProps {
    ticket_id: number,
    status: String,
    costumer: String,
    action: () => {}
}

export default function TicketCard({ ticket_id, status, costumer, action }: ITicketProps) {
    return (

        (status == 'pago' && costumer != null)
            ?
            <div className="bg-red-600 w-32 h-24 flex justify-center items-center rounded-lg text-3xl">
                <h1>{ticket_id}</h1>
            </div>
            :
            (status == 'pendente' && costumer)
                ?
                <div className="bg-yellow-600 w-32 h-24 flex justify-center items-center rounded-lg text-3xl">
                    <h1>{ticket_id}</h1>
                </div>
                :
                <button onClick={action} className="bg-green-600 w-32 h-24 flex justify-center items-center rounded-lg text-3xl">
                    <h1>{ticket_id}</h1>
                </button>
    )
}