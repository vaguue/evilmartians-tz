const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  localePath: path.resolve(path.join(__dirname, 'public/locales')),
  reloadOnPrerender: true, 
};
