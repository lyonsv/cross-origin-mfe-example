const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

// Determine the remote URL based on environment
const getRemoteUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production, use the environment variable for the remote URL
    return process.env.REMOTE_URL || 'https://your-remote-app-domain.vercel.app';
  }
  // In development, use localhost
  const remoteUrl = 'http://localhost:3001';
  console.log('🔗 Host app configured to connect to remote at:', remoteUrl);
  return remoteUrl;
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
  devtool: 'source-map', // Add source maps for debugging
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: `remoteApp@${getRemoteUrl()}/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};