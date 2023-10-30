'use client';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api } from './config/Api'
import TicketCard from './compontes/ticketCard';
import BuyModal from './compontes/buyModal';



export default function Home() {
  interface iTickets {
    data: {
      tickets: [{
        costumer: String,
        status: String,
        ticket_id: number
      }
      ]
    }
  }

  interface iTicketLimit {
    data: {
      tickets: [{
        value: Number
      }
      ]
    }
  }

  interface iBuyProps {
    id: number,
    costumer: string,
    number: string
  }




  const [ticketLimit, setTicketLimit] = useState<iTicketLimit>()
  const [tickets, setTickets] = useState<iTickets>()
  const [modalOpen, setModalOpen] = useState(false)
  const [buyId, setBuyId] = useState(0)
  const [res, setRes] = useState(null)

  useEffect(() => {
    api.get('/api/ticket/u')
      .then(
        (res) => setTickets(res)
      )
      .catch(err => console.log(err))
  }, [modalOpen])

  useEffect(() => {
    api.get('/api/ticket/limit')
      .then(
        (res) => setTicketLimit(res)
      )
      .catch(err => console.log(err))
  }, [modalOpen])

  // console.log(ticketLimit?.data.tickets[0].value);

  let mocked = []

  for (let i = 1; i <= (ticketLimit?.data.tickets[0].value); i++) {
    mocked.push({
      ticket_id: i,
      status: 'livre'
    })
  }


  let item = mocked.forEach((mock, i) => {

    let t = tickets?.data.tickets.find(ticket => ticket.ticket_id == mock.ticket_id)

    // console.log(mock);

    if (mock.ticket_id == t?.ticket_id) {
      return mocked[i] = t

    }
  })

  const openBuyModal = (id) => {
    setBuyId(id)
    setModalOpen(true)
  }

  const closeBuyModal = () => {
    setBuyId(0)
    setModalOpen(false)
    console.log('opa');

  }

  const sendBuy = (props) => {
    console.log('qsaseawe');
    
    api.post(`/api/ticket/u/${props.id}/${props.costumer}/${props.number}`).then(resp=>setRes(resp))
    
  }

  return (
    <main className="flex h-full flex-col items-center">
      <header className='bg-blue-600 px-4 py-2 gap-y-4 w-full h-28 flex-col justify-center items-center text-neutral-100'>

      </header>
      {
        modalOpen && buyId != 0 && <BuyModal ticket_id={buyId}  action={sendBuy}
        close={()=>closeBuyModal()}/>
      }
      <div className='flex min-h-screen flex-wrap gap-5 justify-center space-y-4 p-20 overflow-y-hidden overflow-y-scroll' color='white'>
        {
          mocked.map(
            (d, key) =>
              <TicketCard
                key={key}
                costumer={d.costumer}
                ticket_id={d.ticket_id}
                status={d.status}
                action={() => openBuyModal(d.ticket_id)}
              />
          )
        }
      </div>
    </main>
  )
}
