/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [80, 90, 100],
  },
  turbopack: {
    root: __dirname,
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
      '*.{vert,frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;
