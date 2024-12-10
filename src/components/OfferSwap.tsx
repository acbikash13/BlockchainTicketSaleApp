"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import  {Message}  from './Message'
import ticketContract from '../TicketSale'
import web3 from '../web3'

export default function OfferSwap() {
  const [swapTicket, setSwapTicket] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleOfferSwap = async () => {
    // Here you would integrate with your blockchain logic
    // This is a mock implementation

    if(!swapTicket || isNaN(Number(swapTicket))){ 
      setMessage({ text: "Please enter a valid ticket number", type: 'error' });
      return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await ticketContract.methods.offerSwap(swapTicket).send({ 
          from: accounts[0] 
        });
        setMessage({ text: `Your offer to swap for ticket ${swapTicket} is pending`, type: 'success' })
    }
    catch(error){
      console.error(error)
      setMessage({ text: "An error occurred when swapping. Please try again", type: 'error' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter ticket number or address"
          value={swapTicket}
          onChange={(e) => setSwapTicket(e.target.value)}
        />
        {message && <Message message={message.text} type={message.type} />}
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={handleOfferSwap}>Offer Swap</Button>
      </CardFooter>
    </Card>
  )
}

