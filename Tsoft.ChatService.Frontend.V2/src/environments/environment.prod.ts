// ng build --prod
export const environment = {
  SERVER_URL: './',
  BASE_API_URL: 'http://tcom-crm-be.sky-demo.net/',
  // APPLICATION_ID: '532D4669-6C65-6E65-7400-000000000000', // This is filenet application id.
  APPLICATION_ID: 'f6982879-8b0f-4005-ae2f-71a033cfa9c2', // This is crm application id.
  API_VERSION: '1',
  APP_VERSION: '1.6.0',
  production: true,
  useHash: true,
  hmr: false,
  pro: {
    theme: 'compact',
    menu: 'side',
    contentWidth: 'fluid',
    fixedHeader: true,
    autoHideHeader: true,
    fixSiderbar: true,
    onlyIcon: false,
    colorWeak: false,
  }
};
