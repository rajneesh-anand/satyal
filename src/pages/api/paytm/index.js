import prisma from '@lib/prisma';
import PaytmConfig from '@paytm/config';
import PaytmChecksum from '@paytm/cheksum';
import https from 'https';

export default async function handler(req, res) {
  const { name, email, amount, studentClass, plan, medium, planDetails } =
    req.body;

  console.log(req.body);

  var orderDate = new Date();

  var orderId = `ORID${orderDate.getFullYear()}${
    orderDate.getMonth() + 1
  }${orderDate.getDate()}${Math.floor(Math.random(4) * 100000)}`;

  const paytmParams = {};

  paytmParams.body = {
    requestType: 'Payment',
    mid: PaytmConfig.PaytmConfig.mid,
    websiteName: PaytmConfig.PaytmConfig.website,
    orderId: orderId,
    callbackUrl: 'https://www.vedusone.com/payment/status',
    txnAmount: {
      value: amount,
      currency: 'INR',
    },
    userInfo: {
      custId: email,
      name: name,
    },
  };

  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    PaytmConfig.PaytmConfig.key
  ).then(function (checksum) {
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);
    console.log(post_data);

    var options = {
      // for Staging
      hostname: 'securegw-stage.paytm.in',

      // //for Production
      // hostname: 'securegw.paytm.in',

      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${PaytmConfig.PaytmConfig.mid}&orderId=${orderId}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': post_data.length,
      },
    };

    var response = '';
    var post_req = https.request(options, function (post_res) {
      post_res.on('data', function (chunk) {
        response += chunk;
      });

      post_res.on('end', function () {
        console.log(response);
        // response = JSON.parse(response);
        // let txnToken = response.body.txnToken;
        // saveDataToDatabase(txnToken);
      });
    });

    post_req.write(post_data);
    post_req.end();
  });

  async function saveDataToDatabase(token) {
    try {
      await prisma.order.create({
        data: {
          orderNumber: orderId,
          name: name,
          email: email,
          class: studentClass,
          medium: medium,
          planType: plan,
          planDetails: JSON.stringify(planDetails),
          paymentStatus: 'Pending',
        },
      });

      return res.status(200).json({
        msg: 'success',
        txnToken: token,
        orderId: orderId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  }
}
