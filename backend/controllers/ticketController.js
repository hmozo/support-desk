const asyncHandler= require('express-async-handler')
const User= require('../models/userModel')
const Ticket= require('../models/ticketModel')

const getTicket= asyncHandler( async (req, res)=>{
    const user= User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    var ticket
    try{
        ticket= await Ticket.findById(req.params.id)
    }catch(error){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket)
})

const getTickets= asyncHandler( async (req, res)=>{
    const user= User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets= await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

const createTicket= asyncHandler( async (req, res)=>{
    const { product, description }= req.body
    const user= User.findById(req.user.id)

    if(!product || !description){
        res.status(400)
        throw new Error('Please add product and description')
    }

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket= await Ticket.create({ product, description, user: req.user.id, status: 'new' })

    res.status(200).json(ticket)
})

const deleteTicket= asyncHandler( async (req, res)=>{
    const user= User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket= await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    await ticket.remove()

    res.status(200).json({ success: true })
})

const updateTicket= asyncHandler( async (req, res)=>{
    const user= User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket= await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedTicket= await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})

module.exports= {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
}