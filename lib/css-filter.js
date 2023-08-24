const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = async (css) => {
  return postCss([
    tailwind(require("../tailwind.config.js")),
    autoprefixer(),
    cssnano({ preset: "default" }),
  ]).process(css, {
    from: "../src/_includes/main.css",
  });
};
