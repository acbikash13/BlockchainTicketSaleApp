"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {Message} from '@/components/Message'

import ticketContract from '../TicketSale'
import web3 from '../web3'

export default  function ReturnTicket() {
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleReturnTicket = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        await ticketContract.methods.resaleTicket().send({ 
          from: accounts[0]
        });
        setMessage({ text: "Your ticket has been returned and a refund (minus service fee) has been processed", type: 'success' })
      }
      catch(error){ 
        console.error(error)
        setMessage({ text: "An error occurred on returning ticket", type: 'error' })
      }
  }

  return (
    <Card className="w-full md:w-auto">
      <CardHeader>
        <CardTitle>Return Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Click to return your ticket and receive a refund (service fee will be deducted).</p>
        {message && <Message message={message.text} type={message.type} />}
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={handleReturnTicket}>Return Ticket</Button>
      </CardFooter>
    </Card>
  )
}

