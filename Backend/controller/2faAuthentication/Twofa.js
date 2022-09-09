const twofactor = require("node-2fa");
const sql = require('mssql')
const sqlConfig = require('../../config.js')
const os = require('os')
const uuidv1 = require("uuid/v1");



  const GenerateTwofa = async function(req,res){
    const email = req.body.email;
    const org = req.body.org;
    console.log(email,org)
    try{
      const newSecret = twofactor.generateSecret({ name: org, account: email });
      if(newSecret){
        res.send(newSecret)
      
      }else{
        res.send("ScanAgain")

      }
    }  catch (err) {
        console.log(err)
    }
  }

  const VerifyTwofa = async function (req,res){
    const secret = req.body.secret;
    const otp = req.body.otp;
    const userid = req.body.userid;
    const org = req.body.org

    console.log(secret,otp,userid,org)
    try{
        await sql.connect(sqlConfig)
      const result = twofactor.verifyToken(secret, otp);
      if(result && result.delta === 0){
        const Twofa = await sql.query(`update FINSDB.dbo.tbl_Login set twofauth='true',tfact_secretkey='${secret}' WHERE user_id = '${userid}' and comp_name='${org}'`)
        console.log(Twofa)
        res.send("Verify")
      }else{
        res.send("NotVerify")
      }
  
    }catch (err) {
        console.log(err)
    }
  }



  module.exports = {GenerateTwofa,VerifyTwofa}