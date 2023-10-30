import { useRef, useState } from "react"
import { api } from "../config/Api"

interface ITicketProps {
    ticket_id: number,
    status: String,
    costumer: String,
    action: any,
    close: any
}

export default function BuyModal({ ticket_id, close, action }: ITicketProps) {

    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const props = {
        costumer: name,
        id: ticket_id,
        number: number
    }

    return (
        <div className="bg-white bg-opacity-50 w-full h-full fixed flex justify-center items-center">
            <div className="bg-blue-600 px-4 py-2 gap-y-4 max-w h-80 flex-col justify-center items-center rounded-lg text-neutral-100">
                <header className="w-full flex justify-end px-2">
                    <button onClick={close}>
                        X
                    </button>
                </header>
                {
                    step == 1 &&
                    <>
                        <div className="mb-2">
                            <h2>Ponto escolhido: {ticket_id}</h2>
                        </div>
                        <div className="mb-2">
                            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="username">
                                Qual seu nome?
                            </label>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="chico josé" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="username">
                                Qual o numero do seu telefone/celular?
                            </label>
                            <input onChange={(e) => setNumber(e.target.value)} value={number} className="shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="85988882222" />
                        </div>
                        <div className="mb-2">
                            <button
                                onClick={() => {
                                    setStep(step + 1)
                                    action(props)
                                }}
                                className="bg-transparent shadow w-full border rounded-lg py-2 px-3 hover:bg-slate-200 hover:text-blue-600">Enviar</button>
                        </div>
                    </>
                }
                {
                    step == 2 &&
                    <div className="flex justify-center align-center">
                        <img width={210} src="https://upload.wikimedia.org/wikipedia/commons/8/8a/QR_Code.png" alt="qr_code" />
                    </div>
                }

            </div>
        </div>
    )
}