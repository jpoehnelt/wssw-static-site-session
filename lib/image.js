const Image = require("@11ty/eleventy-img");


module.exports = async function (
    src,
    alt,
    sizes = "auto",
    loading = "lazy",
    decoding = "async"
  ) {
    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["avif", "jpeg"],
      outputDir: "./_site/img/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading,
      decoding,
    };

    // You bet we throw an error on a missing alt (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  };
