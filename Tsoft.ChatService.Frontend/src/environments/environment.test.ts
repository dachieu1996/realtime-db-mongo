// ng build --configuration="test"
export const environment = {
  SERVER_URL: './',
  BASE_API_URL: 'http://10.0.101.141:8200/',
  API_VERSION: '1',
  production: false,
  useHash: true,
  hmr: false,
  pro: {
    theme: 'dark',
    menu: 'side',
    contentWidth: 'fluid',
    fixedHeader: true,
    autoHideHeader: true,
    fixSiderbar: true,
    onlyIcon: false,
    colorWeak: false,
  },
};
