"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {Message}  from '@/components/Message'

import ticketContract from '../TicketSale'
import web3 from '../web3'


export default function PurchaseTicket() {
  const [ticketNumber, setTicketNumber] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handlePurchase = async () => {
    console.log("Tucket bnumber is " + ticketNumber);

    const price =  await ticketContract.methods.tickePrice;
    console.log("The price is " + price);

    //check if there is a valid ticket number
    if(!ticketNumber || isNaN(Number(ticketNumber))){
      setMessage({ text: "Please enter a valid ticket number", type: 'error' })
      return
    }
    // else do the logic
    try {
      const accounts = await web3.eth.getAccounts();
      // const price =  await ticketContract.methods.tickePrice().call();
      // console.log("The price is " + price);
      await ticketContract.methods.buyTicket(ticketNumber).send({
      from: accounts[0],
        value: price
      })
      .then(() => {
        console.log("Inside purchase ticket")
        setMessage({ text: `You have successfully purchased ticket ${ticketNumber}`, type: 'success' })
      })
    }
    catch(error){
      console.error(error)
      setMessage({ text: "An error occurred", type: 'error' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter ticket number"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
        />
        {message && <Message message={message.text} type={message.type} />}
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={handlePurchase}>Purchase</Button>
      </CardFooter>
    </Card>
  )
}

