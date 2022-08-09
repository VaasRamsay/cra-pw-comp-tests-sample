const deps = require("./package.json").dependencies;

module.exports = {
  name: "CRA",
  filename: "remoteEntry.js",
  exposes: {
    "./viewer": "./src/bootstrap",
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    }
  },
};