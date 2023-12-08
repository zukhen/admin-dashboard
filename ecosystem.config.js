module.exports = {
  apps: [
    {
      name: `vite-app`,
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 4567,
        PM2_SERVE_SPA: "true",
        NODE_ENV: 'production',
      },
    },
  ],
};
