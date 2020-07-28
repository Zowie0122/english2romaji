const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://192.168.100.119:8080/",
      },
      "/": {
        ws: true,
        target: "http://192.168.100.119:8080/",
      },
    },
  },
};
