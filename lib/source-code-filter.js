const fs = require("fs/promises");

module.exports = async (inputPath) => {
  const content = await fs.readFile(inputPath, "utf8");
  return "```\n" + content + "\n```";
};