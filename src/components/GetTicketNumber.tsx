"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Message } from '@/components/Message'
import ticketContract from '../TicketSale'
import web3 from '../web3'

export function GetTicketNumber() {
  const [walletAddress, setWalletAddress] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleGetTicketNumber = async () => {
    if (!web3.utils.isAddress(walletAddress)) {
      setMessage({ text: "Please enter a valid wallet address", type: 'error' })
      return
    }

    try {
      const ticketNumber = await ticketContract.methods.getTicketNumber(walletAddress).call()

      setMessage({
        text: `The ticket number for wallet ${walletAddress} is ${ticketNumber}`,
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Failed to retrieve the ticket number. Please try again.",
        type: 'error',
      })
    }
  }

  return (
    <Card className="w-full md:w-auto">
      <CardHeader>
        <CardTitle>Get Ticket Number</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        {message && <Message message={message.text} type={message.type} />}
      </CardContent>
      <CardFooter>
        <Button variant="default" onClick={handleGetTicketNumber}>Get Ticket</Button>
      </CardFooter>
    </Card>
  )
}
