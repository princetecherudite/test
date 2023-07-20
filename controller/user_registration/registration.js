const { random } = require('../../helper/otp');
const { send_mail } = require('../../helper/send_mail');
const db = require('../../models/index');
const user = db.user;

const registration = async (req,res) => {

    const body = {
        email_address: req.body.email_address
    }
    
    send_mail(body.email_address,random);
    const data = await user.create({email_address:body.email_address,otp:random,is_verified:0});
    // res.json({data:data});

}

const is_verified = async (req,res) => {

    const { otp } = req.body

    const verify = await user.findOne({where:{otp:otp}})
    
    if(verify){
        await user.update({is_verified:1},{where:{otp:otp}});
        await user.destroy({where:{is_verified:0}})
        // res.json({data:"verified"})
    }else{
        res.json({data:"please enter correct otp........ "})
    }

}

module.exports = {
    registration,
    is_verified
}