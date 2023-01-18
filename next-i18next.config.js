const path = require("path");
module.exports = {
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    // localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};
