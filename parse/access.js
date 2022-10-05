 const crypto = require("crypto");
 
 async function check() {
    const response = await Parse.Cloud.httpRequest({ 
      url: "https://api.github.com/users/oklemenz/events/public",
      headers: {
        "user-agent": "node.js"
      }
    });
    if (response && response.text) {
      const data = JSON.parse(response.text);
      if (data.length > 0) {
        const date = new Date(data[0].created_at).getTime();
        const now = Date.now();
        const days = Math.floor((now - date) / 1000 / 60 / 60 / 24);
        return days > 30;
      }
    }
    return true;
 }
 
 async function validate(params) {
   // INPUT: YYYYMMDDHHSS
   const length = 8;
   const shift = {
     internal: [1, 2, 3, 4, 5, 6, 7, 8],
     external: [0, 1, 2, 3, 4, 5, 6, 7],
   };
   const input = crypto.createHash("md5").update(params.input || "").digest("base64").substring(0, 8);
   const value = {
     internal: "",
	   external: ""
   };
   for (let i = 0; i < length; i++) {
       value.internal += String.fromCharCode(input.charCodeAt(i) + shift.internal[i]);
       value.external += String.fromCharCode(input.charCodeAt(i) + shift.external[i]);
   }
   return value;
 };

 module.exports = {
   check,
   validate
 }
 
