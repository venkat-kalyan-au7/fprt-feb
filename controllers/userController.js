import User from "../models/userModel"
import {Order} from "../models/cartModel"
import errors from "../errors/dataBaseErrors"

exports.userProfile=(req,res)=>{
     return res.json(req.profile);
}


exports.profileUpdate=(req,res)=>{
    
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            res.json(user);
        }
    );
}

exports.myOrders=(req,res)=>{
    Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .sort('-created')
    .exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: errors.dataBaseErrors(err)
            });
        }
        res.json(orders);
    });
}

exports.addingOrderToUser=(req,res)=>{
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
}


