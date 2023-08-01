const db = require('../db/models/index');
const { Op } = require("sequelize");

exports.getDashboard=async (req,res)=>{

    // user product orders
    let response=[]
    try {
        const allUsers= await db.User.findAll();
        const allProduct= await db.Product.findAll();
        const allOrders= await db.Order.findAll();

        console.log(allUsers.length);
        // users
        let totalCustomers=allUsers.filter(user=>user.isAdmin==="0").length;
        let totalAdmin=allUsers.length-totalCustomers;
        response=[...response,{title:"Registered Customers", count:totalCustomers},{title:"Admin Users", count:totalAdmin}]
        // Orders
        let totalOrders=allOrders.length;
        let orderDelivered=0;
        let orderPreparing=0;
        let orderReceived=0;
        let orderOutForDelivery=0;

        allOrders.map(order=>{
            if(order.status==="Delivered"){
                orderDelivered+=1;
            }
            if(order.status==="Preparing"){
                orderPreparing+=1;
            }
            if(order.status==="Out for delivery"){
                orderOutForDelivery+=1;
            }
            if(order.status==="Order received"){
                orderReceived+=1;
            }
        })

        response=[...response,{title:"Orders Received till now",count:totalOrders,url:"/admin/orders", redirectMsg:"Go to Orders"},{title:"Order received, not Delivered",count:orderReceived,url:"/admin/orders",redirectMsg:"Go to Orders"},{title:"Orders Preparing",count:orderPreparing,url:"/admin/orders",redirectMsg:"Go to Orders"},{title:"Orders Out for Delivery",count:orderOutForDelivery,url:"/admin/orders",redirectMsg:"Go to Orders"},{title:"Orders Delivered",count:orderDelivered,url:"/admin/orders",redirectMsg:"Go to Orders"}]

        // products
        let totalProducts=allProduct.length;

        response=[...response,{title:"Food Items Listed",count:totalProducts,url:"/admin/products",redirectMsg:"Go to products"}]

        res.status(200).json({code:"200",data:response})
        
    } catch (error) {
        console.log("error in getting dashboard ",error);
        res.status(400).send({error})
    }
}
