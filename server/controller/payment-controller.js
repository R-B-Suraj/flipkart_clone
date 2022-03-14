import PaytmChecksum from "../paytm/PaytmChecksum.js"
import { paytmMerchantKey, paytmParams } from "../server.js";
import formidable from 'formidable';
import https from 'https';




// we need to pass merchant key and paytmParams
export const addPaymentGateway = async (request, response)=>{
    let paytmChecksum = await PaytmChecksum.generateSignature(paytmParams,paytmMerchantKey);
    try{
        let params = {
            ...paytmParams, 'CHECKSUMHASH': paytmChecksum
        }
        response.json(params);
    } catch (error){
        console.log(error);
    }
}

// this router controller is called after we have called the paytm payment gateway 
// and response of that was passed here as request  to the callback url
export const paymentResponse = (request, response)=>{
    const form = new formidable.IncomingForm();
    let paytmChecksum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;
// params, merchant id, hash
    let isVerifySignature = PaytmChecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmChecksum);
    // verifies if there is any mismatch between in the hash

    if(isVerifySignature){
        paytmParams['MID'] = request.body.MID;
        paytmParams['ORDERID'] = request.body.ORDERID;
// returns a promise
        PaytmChecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').thenn(function (checksum){
            paytmParams['CHECKSUMHASH'] = checksum;
// now we need to make an api call  it's better to pass request body values as strings... 
            let post_data = JSON.stringify(paytmParams);

            let options = {
                hostname: 'securegw-stage.paytm.in', // we only need domain in hostname.. subdomain and https:// we will call separately
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };


            let res = '';
// options, callback function 
            let post_req = https.request(options, function(post_res){
                post_res.on('data', function(chunk){
                    res += chunk;
                })

                post_res.on('end', function(){
                    let result = JSON.parse(res);
                    response.redirect('http://localhost:3000/');
                    // redirect to home page after payment successful or failed 
                });
            });
            post_req.write(post_data);
            post_req.end();


        })

    }else{
        console.log('checksum mismatched .');
        // the checksum that i sent is not the same as what i received 
    }

}