const access = require("./access");

Parse.Cloud.define("check", async (request) => {
	return await access.check();
});

Parse.Cloud.define("validate", async (request) => {
	return await access.validate(request.params);
});
