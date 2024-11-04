const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false  
      };
    }

    config.module.rules.push({
      test: /\.html$/,
      use: ['html-loader']
    });

    config.watchOptions = {
      poll: 100,
      aggregateTimeout: 300
    };

    return config;
  },
};

export default nextConfig;
