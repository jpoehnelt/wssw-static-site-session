const aiplatform = require("@google-cloud/aiplatform");
const { AssetCache } = require("@11ty/eleventy-fetch");

const predictionServiceClient = new aiplatform.v1.PredictionServiceClient({
  apiEndpoint: `us-central1-aiplatform.googleapis.com`,
  project: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});

const predictText = async function (prompt) {
  const maxOutputTokens = 1024;

  async function predict(prompt) {
    let asset = new AssetCache(`text-bison-${prompt}`, ".cache/llm");

    if (asset.isCacheValid("*")) {
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
      endpoint: `projects/wssw-static-site-generation/locations/us-central1/publishers/google/models/text-bison`,
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

  return `<p class="prompt">${prompt}</p>\n\n${prediction}\n\n`;
};

module.exports = predictText;
