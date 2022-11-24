const jwt = require("jsonwebtoken"); //to generate signed token
const db = require('../db/models/index');
require('../helpers/init-env')();
const axios =  require('axios')
const crypto = require("crypto"); // for password hashing
const { v4: uuidv4 } = require("uuid"); // used to generated unique user id

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
        try {
          otpResponse = await sendOTPMessage(req.body.phoneNumber)
          console.log(otpResponse.data);
          res.status(200).send({code:"200",...otpResponse.data});
        } catch (error) {
          res.status(500).send({error});
        }
    }
    else
    {
        res.status(401).send({"msg":"Phone Number Already Registered ? Try Again With Another Number"})
    }
}

exports.verifyOTP =async (req,res)=>{
    let verifiedOTP = await verifyOTP(req.body.session_id, req.body.otp_entered_by_user)
    console.log(verifiedOTP.data);
        if(verifiedOTP.data.Details === "OTP Matched" )
        {
          res.status(200).send({ auth: true,msg:"token verified" });

        }
        else
        {
            return res.status(401).send({auth:false, Details:"Wrong OTP Entered ! Please Try Again !"});
        }

}


const encryptPassword=(password,salt)=>{
  if (!password) {
      return "";
    }

    try {
      return crypto
        .createHmac("sha1", salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
}


const validatePassword=(plainPassword, hashedPassword,salt)=>{
  return encryptPassword(plainPassword,salt) === hashedPassword;
}

exports.signup = async (req, res) => {

    const {name,phoneNumber,password, isAdmin}=req.body;
    const salt=uuidv4();
    try {
      const existingUser =  await db.User.findOne({
        where:{
            phoneNumber:phoneNumber
        }
      })

      if(existingUser){
        return res.status(401).json({
          msg: "There is already an account exists with this number.",
        });
      }
      const hashedPassword=encryptPassword(password,salt);
      let newUser = await db.User.create({
                      name,
                      phoneNumber,
                      isAdmin:isAdmin?isAdmin:"0",
                      salt,
                      password:hashedPassword,
      });
      await newUser.save();
      var token = await jwt.sign({id: newUser.id, isAdmin:newUser.isAdmin, name: newUser.name, phoneNumber:newUser.phoneNumber}, process.env.SECRET_KEY, {
          expiresIn: 86400 
      });
      newUser.password=undefined;
      newUser.salt=undefined;

      res.status(200).send({ auth: true, token: token , user: newUser });
    } catch (error) {
      console.log("error in signup ",error);
      res.status(400).send({error})
    }
};

exports.signin = async (req, res) => {
    console.log(req.body);
    const {phoneNumber,password}=req.body;

    const existingUser =  await db.User.findOne({
        where:{
            phoneNumber:phoneNumber
        }
    })

  if(existingUser){
    if(validatePassword(password,existingUser.password,existingUser.salt)){
      const token = jwt.sign({id: existingUser.id, isAdmin:existingUser.isAdmin, name: existingUser.name, phoneNumber:existingUser.phoneNumber}, process.env.SECRET_KEY, {
                    expiresIn: 86400 
      });
      res.status(200).send({ auth: true, token: token , user: existingUser,msg:'User logged in successfully' });
    }
    else{
      res.status(401).json({
        msg: "Phone number and password does not match",
      });
    }
  }
  else{
    res.status(401).json({auth:false,code:'401', msg:"User name or password doesnot exists"});
  }
};

exports.signout = (req, res) => {
    console.log(req.body);
  res.clearCookie("t");
  res.json({
    message: "Successfully signout",
  });
};

exports.getMe=(req,res)=>{
  console.log("request ",req.headers["x-access-token"]);
  const token =req.headers["x-access-token"];
  if(token){
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY,{ complete: true });
      req.user = decoded.payload;
      return res.status(200).send({userDetails:{id:decoded.payload.id,name:decoded.payload.name,isAdmin:decoded.payload.isAdmin,phoneNumber:decoded.payload.phoneNumber}});
    } catch (err) {
      console.log("ERRRRRRR ",err);
      return res.status(200).send({userDetails:{},msg:"Inavlid User"});
    }
  }
  else{
    return res.status(200).send({userDetails:{},msg:"Inavlid User"});
  }



  
}

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