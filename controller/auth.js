const jwt = require("jsonwebtoken"); //to generate signed token
const db = require('../db/models/index');
require('../helpers/init-env')();
const axios =  require('axios')

exports.sendRegisterOTP =async (req,res)=>{
    console.log(req.body)
    if(!req.body){
        return res.json({
            "details":"body required"
        })
    }
    const existingUser = await db.User.findOne({
        where:{
            phoneNumber:req.body.phoneNumber
        }
    })

    if(existingUser === null)
    {
        otpResponse = await sendOTPMessage(req.body.phoneNumber)
        console.log(otpResponse.data);
        res.send(otpResponse.data);
    }
    else
    {
        res.status(401).send({"Details":"Phone Number Already Registered ? Try Again With Another Number"})
    }
}

exports.sendLoginOTP =async (req,res)=>{
    const existingUser = await db.User.findOne({
        where:{
            phoneNumber:req.body.phoneNumber
        }
    })

    if(existingUser)
    {
        otpResponse = await sendOTPMessage(req.body.phoneNumber)
        console.log(otpResponse.data);
        res.send(otpResponse.data);
    }
    else
    {
        res.status(401).send({"Details":"Phone Number Not Registered"})
    }
}

exports.signup = async (req, res) => {
    // let verifiedOTP = await verifyOTP(req.body.session_id, req.body.otp_entered_by_user)
    // console.log(verifiedOTP.data);
    //     if(verifiedOTP.data.Details === "OTP Matched" )
    //     {
    //             const newUser = await db.User.create({
    //                 name:req.body.name,
    //                 phoneNumber:req.body.phoneNumber
    //             });
    //             try
    //             {
    //                     await newUser.save();
    //                     // create a token
    //                     var token = await jwt.sign({id: newUser.user_id}, process.env.SECRET_KEY, {
    //                       expiresIn: 86400 
    //                     });
    //                     res.status(200).send({ auth: true, token: token , user: newUser });
    //             }
    //             catch(err)
    //             {
    //                 console.log("Error:" ,err)
    //                 res.send(err)
    //             }       
    //     }
    //     else
    //     {
    //         return res.status(401).send({auth:false, Details:"Wrong OTP Entered ! Please Try Again !"});
    //     }

    const newUser = await db.User.create({
                    name:req.body.name,
                    phoneNumber:req.body.phoneNumber,
                    isAdmin:req.body.isAdmin
    });
     await newUser.save();
     var token = await jwt.sign({id: newUser.id, isAdmin:newUser.isAdmin, name: newUser.name, phoneNumber:newUser.phoneNumber}, process.env.SECRET_KEY, {
        expiresIn: 86400 
    });
    res.status(200).send({ auth: true, token: token , user: newUser });
};

exports.signin = async (req, res) => {
    console.log(req.body);
    const {phoneNumber, session_id , otp_entered_by_user } = req.body;
    const existingUser =  await db.User.findOne({
        where:{
            phoneNumber:phoneNumber
        }
    })
//     try
//     {
//          verifiedOTP = await verifyOTP(session_id, otp_entered_by_user)
    
//             if(verifiedOTP.data.Details === "OTP Matched" && existingUser )
//             {
//                 const token = jwt.sign({id: existingUser.user_id}, process.env.SECRET_KEY, {
//                     expiresIn: 86400 
//                   });
//                   res.status(200).send({ auth: true, token: token , user: existingUser });
//             }
//             else
//             {
//                 res.status(400).send({auth:false, Details:"Invalid Credentials !"});
//             }
//   }
//   catch (err)
//   {
//     console.error(err);
//     res.send(err);
//   }

  if(existingUser){
    const token = jwt.sign({id: existingUser.id, isAdmin:existingUser.isAdmin, name: existingUser.name, phoneNumber:existingUser.phoneNumber}, process.env.SECRET_KEY, {
                    expiresIn: 86400 
            });
    res.status(200).send({ auth: true, token: token , user: existingUser });
  }
  else{
    res.status(400).send({auth:false, Details:"Invalid Credentials !"});
  }
};

exports.signout = (req, res) => {
    console.log(req.body);
  res.clearCookie("t");
  res.json({
    message: "Successfully signout",
  });
};

exports.makeAdmin = async (req, res) => {
    const {id}=req.params;

    try {
        await db.User.update({
          isAdmin:"1",
        },{
           where:{
            id:id
          }
        });
        res.status(200).send({ auth: true, msg: "user is now an admin"});


    } catch (error) {
      console.log("is admin errro ", error);
      res.status(400).send({error})
    }
};

exports.removeFromAdmin = async (req, res) => {
    const {id}=req.params;
    try {
        await db.User.update({
          isAdmin:"0",
        },
        {
          where:{
            id:id
          }
        });
        res.status(200).send({ auth: true, msg: "user has been removed from admin role"});
    } catch (error) {
      console.log("remove admin errro ", error);
      res.status(400).send({error})
    }
};

const sendOTPMessage = async (phone_no) => {
    console.log(phone_no)
    try {
      return await axios.get(`https://2factor.in/API/V1/${process.env.SMS_KEY}/SMS/+91${phone_no}/AUTOGEN`)
    } catch (error) {
      console.error(error)
    }
  }

  const verifyOTP = async (session_id,otp_entered_by_user) => {
    try {
      return await axios.get(`https://2factor.in/API/V1/${process.env.SMS_KEY}/SMS/VERIFY/${session_id}/${otp_entered_by_user}`)
    } catch (error) {
      console.error(error)
    }
  }