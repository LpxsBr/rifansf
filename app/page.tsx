'use client';
import { SetStateAction, useEffect, useState } from 'react'
import { api } from './config/Api'
import TicketCard from './compontes/ticketCard';
import BuyModal from './compontes/buyModal';
import About from './compontes/about';



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
        value: any
      }
      ]
    }
  }

  interface iBuyProps {
    id: number,
    costumer: string,
    number: string
  }

  interface IResponseApi {
    data: {
      message: String,
      status: String
    },
    status: number
  }



  const [ticketLimit, setTicketLimit] = useState<iTicketLimit>()
  const [tickets, setTickets] = useState<iTickets>()
  const [modalOpen, setModalOpen] = useState(false)
  const [buyId, setBuyId] = useState(0)
  const [res, setRes] = useState<IResponseApi>()

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
      status: 'livre',
      costumer: ''
    })
  }


  let item = mocked.forEach((mock, i) => {

    let t = tickets?.data.tickets.find(ticket => ticket.ticket_id == mock.ticket_id)

    // console.log(mock);

    if (mock.ticket_id == t?.ticket_id) {
      return mocked[i] = t

    }
  })

  const openBuyModal = (id: SetStateAction<number>): any => {
    setBuyId(id)
    setModalOpen(true)
  }

  const closeBuyModal = (): any => {
    setBuyId(0)
    setModalOpen(false)
    console.log('opa');

  }

  const sendBuy = (props: { id: any; costumer: any; number: any; }) => {
    console.log('qsaseawe');

    api.post(`/api/ticket/u/${props.id}/${props.costumer}/${props.number}`).then(resp => setRes(resp))

  }

  return (
    <main className="lg:flex-col h-full overflow-y-hidden">
      {
        modalOpen && buyId != 0 && <BuyModal ticket_id={buyId} action={sendBuy}
          close={() => closeBuyModal()} />
      }
      <div className="main flex lg:flex-row md:flex-col sm:flex-col">
        {
          <About />
        }
        <div className='flex max-h-screen w-9/12 md:w-full sm:w-full shadow-lg flex-wrap gap-5 justify-center space-y-4 p-10 overflow-y-scroll' color='white'>
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

      </div>
    </main>
  )
}
