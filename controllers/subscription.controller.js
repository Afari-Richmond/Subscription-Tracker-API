// import Subscription Model

import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {

        const Subscription = await Subscription.create( {
            ...req.body,
            user: req.user._id,

        })

        res.status(201).json({
            success: true,
            data: Subscription,
        })
        
    } catch (error) {
        next(error)
        
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {

        if(req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "You are not authorized to view this subscription",
            })
        }

        const subscriptions = await Subscription.find( {
            user: req.params.id,
        }).populate("user", "name email")
        if (!subscriptions) {
            return res.status(404).json({
                message: "No subscriptions found",
            })
        }
        
    } catch (error) {
        next(error)
        
    }
}