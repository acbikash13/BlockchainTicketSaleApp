"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Message } from '@/components/Message'
import ticketContract from '../TicketSale'
import web3 from '../web3'

export function AcceptOffer() {
  console.log("The ticket sale methods are " + JSON.stringify(ticketContract.methods))
  console.log("The deployed address is " +   ticketContract.options.address)
  const [acceptTicket, setAcceptTicket] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleAcceptOffer = async () => {
    if (!acceptTicket) {
      setMessage({ text: "Please enter a valid ticket number or address", type: 'error' })
      return
    }

    try {
      const accounts = await web3.eth.getAccounts()
      await ticketContract.methods.acceptSwapOffer(acceptTicket).send({
        from: accounts[0],
      })

      setMessage({
        text: `You have successfully accepted the swap offer with ticket/address: ${acceptTicket}`,
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Failed to accept the offer. Please try again.",
        type: 'error',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accept Offer</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter ticket number or address"
          value={acceptTicket}
          onChange={(e) => setAcceptTicket(e.target.value)}
        />
        {message && <Message message={message.text} type={message.type} />}
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={handleAcceptOffer}>Accept Offer</Button>
      </CardFooter>
    </Card>
  )
}
