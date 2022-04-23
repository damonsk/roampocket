# Roam Research and Pocket Integration

Pull Pocket data into Roam.  Requires SmartBlocks - https://roamjs.com/extensions/roam42

## Steps

### Pocket API

Login and create a new App - https://getpocket.com/developer/apps/

Obtain a consumer key and access key.  These will be needed for the lambda below. 

### AWS

#### Lambda 

Create a NodeJS lambda in AWS, copy paste the code from lambda-node-js.js.  Be sure to insert your consumer key and access key as part of the URL to the Pocket API.  'https://getpocket.com/v3/get?count=10&sort=newest&detailType=complete&consumer_key=YOUR_CONSUMER_KEY&access_token=YOUR_ACCESS_TOKEN&since='

#### API Gateway

Create an API Gateway, in recent times, AWS allows a lambda to be invoked directly without an API gateway.  Not tested this but could be suitable.

Link the API Gateway to the Lambda as a GET request.

- API type: REST
- Method: ANY

### RoamJS

I use SmartBlocks.   Javascript code below.  There are two parts to change.  

1. Update the request with your API Gateway address (YOUR_API_GATEWAY_ADDRESS).
2. Create a block which will hold a UNIX timestamp. Set the block content to a unix timestamp - `1650455868205`.  Copy the UID (Ctrl+Shift_C) - Take the UID and update YOUR_BLOCK_UID (2 occurrences) (without any brackets - just the ID.  e.g `-BwCvDgIq` not `((-BwCvDgIq))` 

SmartBlock Code below

Pull Pocket #42SmartBlock
```
<%JA:```javascript
const puid = document.activeElement.id.slice(-9);

	const unixTimeVal = window.roamAlphaAPI.q("[:find ?e :in $ ?a :where [?e :block/uid ?a]]", 'YOUR_BLOCK_UID').map(page=> window.roamAlphaAPI.pull('[*]',page[0]))[0][':block/string'];
    window.postData('https://YOUR_API_GATEWAY_ADDRESS/DEFINED_PATH?since=' + unixTimeVal.slice(0, -3))
    .then(data => {
        const d  = new Date();
        var months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        for(let i in data.list){
            const e = data.list[i];
            const block = ((e.resolved_title.length > 0) ? `${e.resolved_title} - ` : '') + `${e.excerpt}`;
			console.log(block);
          	window.createChildBlock(puid, block, 0)
            .then(cUid => {
                window.createChildBlock(cUid, `#Links ${e.resolved_url}`)
            });
            
        };

        window.roamAlphaAPI.updateBlock(
            {"block": 
                {"uid": 'YOUR_BLOCK_UID',
                "string": Date.now().toString(),
                "open": false}});        
    });

	return 'Pocket Inbox';

```%>
```
