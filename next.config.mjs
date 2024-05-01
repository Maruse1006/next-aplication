// next.config.mjs
import path from 'path-browserify';

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

    return config;
  },
};

export default nextConfig;
