const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

// Determine the remote URL based on environment
const getRemoteUrl = () => {
  // Check if we're in production build (not just NODE_ENV)
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  
  if (isProduction) {
    // In production, use the environment variable for the remote URL
    const remoteUrl = process.env.REMOTE_URL || 'https://cross-origin-mfe-example.vercel.app';
    console.log('🔗 Production build using remote URL:', remoteUrl);
    return remoteUrl;
  }
  // In development, use localhost
  const remoteUrl = 'http://localhost:3001';
  console.log('🔗 Development build using remote URL:', remoteUrl);
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
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
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