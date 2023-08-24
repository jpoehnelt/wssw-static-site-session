require("dotenv").config();

const cssFilter = require("./lib/css-filter");
const predictText = require("./lib/predict-text");
const imageShortCode = require("./lib/image");
const sourceCode = require("./lib/source-code-filter");

module.exports = function (eleventyConfig) {
  eleventyConfig.addAsyncFilter("postcss", cssFilter);
  eleventyConfig.addAsyncFilter("sourceCode", sourceCode);

  eleventyConfig.addAsyncShortcode("predictText", predictText);
  eleventyConfig.addAsyncShortcode("image", imageShortCode);

  eleventyConfig.addCollection("slides", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.url.startsWith("/slides/"))
      .sort((a, b) => a.data.order - b.data.order);
  });

  return {
    dir: { input: "src" },
    pathPrefix: process.env.PATH_PREFIX,
  };
};
