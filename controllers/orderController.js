
import {Order,CartItem} from "../models/cartModel"
import errors from "../errors/dataBaseErrors"
import User from "../models/userModel"
import Product from "../models/productModel"


exports.newOrder=(req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errors.dataBaseErrors(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        // const emailData = {
        //     to: 'kaloraat@gmail.com',
        //     from: 'noreply@ecommerce.com',
        //     subject: `A new order is received`,
        //     html: `
        //     <p>Customer name:</p>
        //     <p>Total products: ${order.products.length}</p>
        //     <p>Total cost: ${order.amount}</p>
        //     <p>Login to dashboard to the order in detail.</p>
        // `
        // };
        // sgMail.send(emailData);
        res.json(data);
    });
};
    
exports.newOrderForUser = (req, res, next) => {
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
};

exports.purchaseHistory = (req, res) => {
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
};

exports.quantityHandler=(req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
};

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: errors.dataBaseErrors(err)
            });
        }
        res.json(orders);
    });
}

exports.getStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues);
}

exports.updateOrder=(req,res)=>{
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errors.dataBaseErrors(err)
                });
            }
            res.json(order);
        }
    );
}