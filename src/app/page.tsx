"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ticketContract from '../TicketSale'
import web3 from '../web3'

// Message Component
interface MessageProps {
  message: string
  type: 'success' | 'error'
}

function Message({ message, type }: MessageProps) {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100'
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800'

  return (
    <div className={`${bgColor} ${textColor} px-4 py-2 rounded-md mt-4`}>
      {message}
    </div>
  )
}

// Header Component
function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Blockchain Ticket App</h1>
      </div>
    </header>
  )
}

// PurchaseTicket Component
function PurchaseTicket() {
  const [ticketNumber, setTicketNumber] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handlePurchase = async () => {
    console.log("Ticket number is " + ticketNumber);
    if(!ticketNumber || isNaN(Number(ticketNumber))){
      setMessage({ text: "Please enter a valid ticket number", type: 'error' })
      return
    }
    try {
      const accounts = await web3.eth.getAccounts();
      await ticketContract.methods.buyTicket(ticketNumber).send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether')
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

// OfferSwap Component
function OfferSwap() {
  const [swapTicket, setSwapTicket] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleOfferSwap = async () => {
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

// AcceptOffer Component
function AcceptOffer() {
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

// GetTicketNumber Component
function GetTicketNumber() {
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

// ReturnTicket Component
function ReturnTicket() {
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

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Header />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PurchaseTicket />
          <OfferSwap />
          <AcceptOffer />
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-8">
            <GetTicketNumber />
            <ReturnTicket />
          </div>
        </div>
      </main>
    </div>
  )
}

