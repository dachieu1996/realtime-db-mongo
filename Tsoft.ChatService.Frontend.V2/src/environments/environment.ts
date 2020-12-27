// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  SERVER_URL: './',
  BASE_API_URL: 'https://localhost:44321/',
  // APPLICATION_ID: '532D4669-6C65-6E65-7400-000000000000', // This is filenet application id.
  APPLICATION_ID: 'f6982879-8b0f-4005-ae2f-71a033cfa9c2', // This is crm application id.
  API_VERSION: '1',
  APP_VERSION: '1.0',
  production: false,
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
