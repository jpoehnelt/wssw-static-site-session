const aiplatform = require("@google-cloud/aiplatform");
const { AssetCache } = require("@11ty/eleventy-fetch");
const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const Image = require("@11ty/eleventy-img");

require("dotenv").config();

const predictionServiceClient = new aiplatform.v1.PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  project: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});

const postcssFilter = async (css) => {
  return postCss([
    tailwind(require("./tailwind.config.js")),
    autoprefixer(),
    cssnano({ preset: "default" }),
  ]).process(css, {
    from: "./src/_includes/main.css",
  });
};

const predictText = async function (prompt) {
  const maxOutputTokens = 1024;

  async function predict(prompt) {
    let asset = new AssetCache(`${prompt}: ${maxOutputTokens}`);

    if (asset.isCacheValid("1h")) {
      return asset.getCachedValue();
    }

    const instances = [
      {
        prompt,
      },
    ];

    const parameters = {
      maxOutputTokens,
    };

    const response = await predictionServiceClient.predict({
      endpoint: `projects/wssw-static-site-generation/locations/us-central1/publishers/google/models/text-bison@001`,
      instances: instances.map(aiplatform.helpers.toValue),
      parameters: aiplatform.helpers.toValue(parameters),
    });

    const content = aiplatform.helpers.fromValue(
      response[0].predictions[0]
    ).content;

    await asset.save(content, "string");

    return content;
  }

  const prediction = await predict(prompt);

  return `<p class="prompt">Prompt: "<span class="font-mono">${prompt}</span>"</p><hr />\n\n${prediction}\n<hr />`;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addAsyncFilter("postcss", postcssFilter);

  eleventyConfig.addAsyncShortcode("predictText", predictText);

  eleventyConfig.addShortcode(
    "image",
    async function (
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
    }
  );

  eleventyConfig.addCollection("slides", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) =>item.url.startsWith("/slides/")).sort((a, b) => a.data.order - b.data.order);
  });

  return {
    dir: { input: "src" },
    pathPrefix: process.env.PATH_PREFIX,
  };
};
