const db = require('../db/models/index');
const { Op } = require("sequelize");

exports.getAllDiscounts=async (req,res)=>{

    try {
        const allDiscounts= await db.Discount.findAll();
        res.status(200).json({code:"200",data:allDiscounts})
        
    } catch (error) {
        console.log("error in get all discount ",error);
        res.status(400).send({error})
    }
}

exports.getDiscountById=async (req,res)=>{
    const {id}=req.params;
    if(id){
        try {
            const discount=await db.Discount.findOne({
                where:{
                    id:id
                }
            })
            if(discount){
                res.status(200).json({code:"200",data:discount})
            }
            else{
                res.status(404).send({code:"404", data:''});
            }
        } catch (error) {
            console.log("error in get  discount by id ",error);
            res.status(400).send({error})
        }
    }
    else{
        res.status(400).send({msg:"invalid id"});
    }
}

exports.getDiscountByOrderPriceRange=async (req,res)=>{

    const priceRange=req.body.priceRange || 1;

    try {
        const discounts= await db.Discount.findAll({
            where:{
                discountOnOrderAbove:{
                    [Op.lte]:priceRange
                }
            }
        })
        let maxDiscount=0;
        if(discounts.length>0){
            let disIndex=0;
            discounts.forEach((dis,index) => {
                if(dis.discountType!=="Percentage"){
                    if(maxDiscount<dis.discountValue){
                        maxDiscount=dis.discountValue;
                        disIndex=index;
                    }
                }
                else{
                    const flatAmount=((dis.discountValue/100)*priceRange);
                    if(flatAmount>maxDiscount){
                        maxDiscount=flatAmount;
                        disIndex=index;
                    }
                }
            });
            res.status(200).json({code:"200",data:{discounts:discounts[disIndex],totalDiscountAmount:maxDiscount}})
        }
        else{
            res.status(200).json({code:"200",data:{discounts:{}}})
        }


    } catch (error) {
        console.log("error in get  discount by price ",error);
        res.status(400).send({error})
    }
}

exports.addDiscount= async (req,res)=>{

    try {
        const newDiscountCoupon=await db.Discount.create({
            ...req.body,
            updatedBy:req.user.id
        })

        await newDiscountCoupon.save();
        res.status(200).json({code:"200",data:newDiscountCoupon})

        
    } catch (error) {
        console.log("error in add discount ",error);
        res.status(400).send({error})
    }
}

exports.updateDiscount=async (req,res)=>{

    const {id}=req.params
    if(id){
        try {
            await db.Discount.update({
                ...req.body
            },{
                where:{
                    id:id
                }
            })
            res.status(200).json({code:"200",msg:"Updated"})
        } catch (error) {
             console.log("error in edit discount ",error);
            res.status(400).send({error})
        }
    }
    else{
        res.status(400).send({msg:"invalid id"});

    }
}

exports.deleteDiscount=async (req,res)=>{
    const {id}=req.params;
    
    if(id){
        try {
            const isDeleted=await db.Discount.destroy({
                where:{
                    id:id
                }
            });
            console.log("is deleted ", isDeleted);

            res.status(200).send({msg:"Discount deleted"});

        } catch (error) {
            console.log("discount delete error ", error);
            res.status(400).send({ error});
        }
    }
    else{
        res.status(400).send({msg:"invalid id"});
    }
}

