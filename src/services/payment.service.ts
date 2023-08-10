// test momo:
// NGUYEN VAN A
// 9704 0000 0000 0018
// 03/07
// OTP
import { Request, Response } from "express";
import https from "https";
import { IPayment } from "../types/payment.type";
// import sortObject from "sortobject";
import querystring from "qs";
import crypto from "crypto";
import dateFormat from "dateformat";

export const createPaymentService = (req: Request, res: Response) =>
  new Promise(async (resolve, reject) => {
    try {
      const successPage = "http://localhost:3000/thanh-toan/checkout";
      const { amount: price, orderInfo: infoOrder, type } = <IPayment>req.body;
      if (!price || !infoOrder || !type) {
        reject({
          error: 1,
          message: "missing inputs",
        });
        return;
      }
      if (type === "MOMO") {
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY || "";
        const orderInfo = infoOrder;
        const partnerCode = process.env.PAYMENT_TYPE || "";
        const redirectUrl = successPage + "?type=momo";
        const ipnUrl = successPage + "?type=momo";
        const requestType = "payWithATM";
        const amount = price;
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = "";
        const paymentCode =
          "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
        const orderGroupId = "";
        const autoCapture = true;
        const lang = "vi";

        const rawSignature =
          "accessKey=" +
          accessKey +
          "&amount=" +
          amount +
          "&extraData=" +
          extraData +
          "&ipnUrl=" +
          ipnUrl +
          "&orderId=" +
          orderId +
          "&orderInfo=" +
          orderInfo +
          "&partnerCode=" +
          partnerCode +
          "&redirectUrl=" +
          redirectUrl +
          "&requestId=" +
          requestId +
          "&requestType=" +
          requestType;
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------");
        console.log(rawSignature);
        //signature
        const signature = crypto
          .createHmac("sha256", secretKey)
          .update(rawSignature)
          .digest("hex");
        console.log("--------------------SIGNATURE----------------");
        console.log(signature);

        const requestBody = JSON.stringify({
          partnerCode: partnerCode,
          partnerName: "Test",
          storeId: "MomoTestStore",
          requestId: requestId,
          amount: amount,
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: redirectUrl,
          ipnUrl: ipnUrl,
          lang: lang,
          requestType: requestType,
          autoCapture: autoCapture,
          extraData: extraData,
          orderGroupId: orderGroupId,
          signature: signature,
        });
        const options = {
          hostname: "test-payment.momo.vn",
          port: 443,
          path: "/v2/gateway/api/create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
          },
        };
        const reqPayment = https.request(options, (res) => {
          console.log(`Status: ${res.statusCode}`);
          console.log(`Headers: ${JSON.stringify(res.headers)}`);
          res.setEncoding("utf8");
          res.on("data", (body) => {
            console.log("Body: ");
            console.log(body);
            resolve(JSON.parse(body));
            console.log("resultCode: ");
            console.log(JSON.parse(body).resultCode);
          });
          reqPayment.on("end", () => {
            console.log("No more data in response.");
          });
        });
        reqPayment.on("error", (e) => {
          console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log("Sending....");
        reqPayment.write(requestBody);
        reqPayment.end();
      }

      if (type === "VNPAY") {
        console.log("req.body :>> ", req.body);
        var ipAddr = "127.0.0.1";

        var tmnCode = "CGXZLS0Z";
        var secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN";
        var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        var returnUrl = successPage + "?type=vnpay";

        var date = new Date();

        var createDate = "20240808200834";
        var orderId = dateFormat(date, "HHmmss");
        var amount = price;
        var bankCode = "NCB";

        var orderInfo = infoOrder;
        var orderType = "billpayment";
        var locale = "vn";
        if (locale === null || locale === "") {
          locale = "vn";
        }
        var currCode = "VND";
        var vnp_Params: any = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = orderInfo;
        vnp_Params["vnp_OrderType"] = orderType;
        vnp_Params["vnp_Amount"] = Number(amount) * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
          vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;

        console.log("signed :>> ", signed);
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

        resolve({
          error: 0,
          payUrl: vnpUrl,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });

function sortObject(obj: any) {
  var sorted: any = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
