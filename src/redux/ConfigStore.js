//use CommonJS require below so we can dynamically import during build time
if (process.env.NODE_ENV === "production") {
  module.exports = require("./ConfigStore.prod");
} else {
  module.exports = require("./ConfigStore.dev");
}
