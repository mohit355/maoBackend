const db = require('../db/models/index');


exports.getAddressById= async (req,res)=>{
    try {
        const existingAddress =  await db.Address.findOne({
            where:{
                id:req.params.id
            }
        })
        if(existingAddress){
            res.status(200).send({auth:false, data:existingAddress});
        }
        else{
            res.status(404).send({auth:false, data:''});
        }
    } catch (error) {
        console.log("get address  by id error ", error.original.routine);

        if(error.original.routine==="string_to_uuid"){
            res.status(200).send({auth:false, data:{}});
        }
        else{
            res.status(502).send({auth:false, data:''});

        }
    }

    
}

exports.getAllAddressByUserId= async (req,res)=>{
    try {
        const existingAddresses =  await db.Address.findAll({
            where:{
                userId:req.params.userId
            }
        })
        if(existingAddresses){
            res.status(200).send({auth:false, data:existingAddresses});
        }
        else{
            res.status(404).send({auth:false, data:[]});
        }
    } catch (error) {
        console.log("get address  by id error ", error.original.routine);

        if(error.original.routine==="string_to_uuid"){
            res.status(200).send({auth:false, data:{}});
        }
        else{
            res.status(502).send({auth:false, data:''});

        }
    }
}

exports.addAddress= async (req,res)=>{
    // add address 
    const newAddress= await db.Address.create({
        ...req.body,userId:req.user.id, updatedBy:req.user.id
    });

    try {
        await newAddress.save();
     res.status(200).send({msg:"Address saved", data:newAddress});

    } catch (error) {
        console.log("Address add error ", error);
        res.status(400).send({ error});
        
    }
}

exports.updateAddress= async (req,res)=>{
    const {id}=req.params;

    try {
        const updatedAddress=await  db.Address.update({
            ...req.body
        },{
            where:{
                id:id
            }
        });

        if(updatedAddress){
            res.status(200).send({msg:"Address updated", data:updatedAddress});
        }

    } catch (error) {
         console.log("Address update error ", error);
        res.status(400).send({ error});
    }
}

exports.DeleteAddress= async (req,res)=>{
    const {id}=req.params;
    
    try {
        await db.Address.destroy({
            where:{
                id:id
            }
        });

            res.status(200).send({msg:"Address deleted"});

    } catch (error) {
         console.log("Address update error ", error);
        res.status(400).send({ error});
    }
}
