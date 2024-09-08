const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,

  // mode: "sandbox",
  // client_id:
  //   "AbnArH-feCWRDumJTk6Lcy3h1Zst8o3ZxSoP2oNky7iELaObXrvZ7JJBC9X8J_JnWZdGII0Jpw0rY59l",
  // client_secret:
  //   "EBHKcoCQcg3lWX_GeZ2zixOBYzsRGKFusoxuiophD2Wz4qiOMfyaF8P3K7IJ-AkAjXQa6FeEzeN0F_C8",
});

module.exports = paypal;
