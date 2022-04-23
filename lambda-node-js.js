const https = require('https');
exports.handler = async (event) => {
    // TODO implement
    
    let dataString = '';
    const since = event["queryStringParameters"]['since'];
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get("https://getpocket.com/v3/get?count=10&sort=newest&detailType=complete&consumer_key=YOUR_CONSUMER_KEY&access_token=YOUR_ACCESS_KEY&since="+since, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                },
                statusCode: 200,
                body: dataString
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response;
    
};
