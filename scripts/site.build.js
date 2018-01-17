/* eslint-disable no-console */
import webpack from 'webpack';
import config from './webpack.config.dist';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle. This will take a moment...');
webpack(config).run((error, stats) => {
  if (error) {
    console.log(error);
    return 1;
  }

  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log('Your app is compiled in production mode in /dist');

  return 0;
});
