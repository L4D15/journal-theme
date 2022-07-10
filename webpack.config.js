const path = require('path');
const fileSystem = require('fs-extra');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { isReadable } = require('stream');

/**
 * Retrieves info about the Foundry installed in the system in JSON format.
 * @returns JSON with Foundry configuration data.
 */
function getFoundryConfig() {
  const filePath = path.resolve(process.cwd(), 'foundryconfig.json');
  let config;

  if (fileSystem.existsSync(filePath)) {
    config = fileSystem.readJSONSync(filePath);
  } else {
    console.log('Unable to locate configuration file at path.');
  }

  return config;
}

module.exports = (env, argv) => {
  let config = {
    context: __dirname,
    mode: "none",
    entry: "./src/index.js",
    plugins: [
      new CleanWebpackPlugin( {cleanStaleWebpackAssets: false}),
      new CopyPlugin({
        patterns:[
          { from: 'module.json', to: 'module.json'},
          { from: 'assets', to: 'assets'}
        ]
      }),
    ],
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    }
  }

  const isProduction = argv.mode === 'production';
  const foundryConfig = getFoundryConfig();

  if (!isProduction) {
    console.log(`Dev build detected.`);

    if (foundryConfig !== undefined) {
      config.output.path = path.join(foundryConfig.data_folder, 'modules', 'journal-theme');
    }
    
    config.devtool = "inline-source-map";
    config.watch = true;
  }
  console.log(`Generating files at: ${config.output.path}`);

  return config;
};