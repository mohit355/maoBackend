const db = require('../db/models/index');

exports.getProductById= async (req,res)=>{
    try {
        const products= await db.Product.findAll({
            where:{
                id:req.params.id
            }
        });

        if(products){
            res.status(200).send({auth:true, data:products});

        }
        else{
            res.status(404).send({auth:true, data:[]});
        }
    } catch (error) {
        console.log("get all product error ",error);
        res.status(400).send({error})
        
    }
}
exports.getAllProduct= async (req, res)=>{

    try {
        const products= await db.Product.findAll();

        if(products){
            res.status(200).send({auth:true, data:products});

        }
        else{
            res.status(404).send({auth:true, data:[]});
        }
    } catch (error) {
        console.log("get all product error ",error);
        res.status(400).send({error})
        
    }
}

exports.getProductByType= async ()=>{}

// only accessible by admin
exports.addProduct= async (req,res)=>{
    try {
        const newProduct= await db.Product.create({
            ...req.body
        });
        await newProduct.save();
        res.status(200).send({msg:"Product saved", data:newProduct});
    } catch (error) {
        console.log("product add error ", error);
        res.status(400).send({ error});
    }
}

exports.updateProduct= async (req,res)=>{
    const {id}=req.params;

    try {
        await db.Product.update({
            ...req.body
        },{
            where:{
                id:id
            }
        });

            res.status(200).send({msg:"Product updated"});

    } catch (error) {
         console.log("Product update error ", error);
        res.status(400).send({ error});
    }
}

exports.deleteProduct= async (req,res)=>{
    const {id}=req.params;
    
    try {
        await db.Product.destroy({
            where:{
                id:id
            }
        });
        res.status(200).send({msg:"Product deleted"});

    } catch (error) {
         console.log("Product update error ", error);
        res.status(400).send({ error});
    }
}