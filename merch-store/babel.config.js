module.exports = (api) => {
  const isDevelopment = api.env('development');
  const isTest = api.env('test');

  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          modules: isTest ? 'commonjs' : false,
          targets: isTest ? { node: 'current' } : '>0.5%, not dead, not op_mini all',
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: isDevelopment,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      isDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
  };
};
