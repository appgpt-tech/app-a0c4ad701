//Source code generated by AppGPT (www.appgpt.tech)
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { customDataProvider } from './dataProvider';
import fakeDataProvider from 'ra-data-fakerest';
import { Dashboard } from './dashboard';
import { authProvider, apInitialize } from './authProvider';
import { i18nProvider } from './i18nProvider';
import LoginPage, { Login } from './Login';
import data from './data';
import { ItemsList, ItemsCreate, ItemsEdit } from './resources/Items';
import { UsersList, UsersCreate, UsersEdit } from './resources/Users';
import ItemsIcon from '@mui/icons-material/ShoppingCart';
import UsersIcon from '@mui/icons-material/People';
// SUPERTOKENS
import React from 'react';
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react';
import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import Session from 'supertokens-auth-react/recipe/session';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
let sessionFn = Session.init();
SuperTokens.init({
  appInfo: {
    appName: import.meta.env.VITE_SUPERTOKENS_APPNAME,
    apiDomain: import.meta.env.VITE_BACKEND_DOMAIN,
    websiteDomain: import.meta.env.VITE_SUPERTOKENS_WEBSITEDOMAIN,
    apiBasePath: import.meta.env.VITE_BACKEND_APIPATH + '/auth',
    websiteBasePath: import.meta.env.VITE_SUPERTOKENS_WEBSITEBASEPATH,
  },
  recipeList: [
    ThirdPartyPasswordless.init({
      contactMethod: 'EMAIL',
      signInUpFeature: {
        providers: [
          ThirdPartyPasswordless.Github.init(),
          //ThirdPartyPasswordless.Google.init(),
          //ThirdPartyPasswordless.Facebook.init(),
          //ThirdPartyPasswordless.Apple.init(),
        ],
      },
    }),
    sessionFn,
  ],
});
apInitialize(Session);
// END SUPERTOKENS
let dataProvider: any;
if (import.meta.env.VITE_USE_BACKEND_DATA === 'true') {
  dataProvider = customDataProvider(
    import.meta.env.VITE_BACKEND_DOMAIN +
      import.meta.env.VITE_BACKEND_APIPATH +
      '/proxy',
  );
} else {
  dataProvider = fakeDataProvider(data.defaultData);
}

const App = () => (
  <SuperTokensWrapper>
    <BrowserRouter basename="/a0c4ad701">
      <Admin
        authProvider={
          import.meta.env.VITE_ENVIRONMENT != 'DEV' ? authProvider : undefined
        }
        requireAuth
        loginPage={LoginPage}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        dashboard={Dashboard}
      >
        <Resource
          name="Items"
          options={{ label: 'Items' }}
          list={ItemsList}
          create={ItemsCreate}
          edit={ItemsEdit}
          recordRepresentation="Name"
          icon={ItemsIcon}
        />
        <Resource
          name="Users"
          options={{ label: 'Users' }}
          list={UsersList}
          create={UsersCreate}
          edit={UsersEdit}
          recordRepresentation="Username"
          icon={UsersIcon}
        />
        <CustomRoutes noLayout>
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          {/*Your app routes*/}
        </CustomRoutes>
      </Admin>
    </BrowserRouter>
  </SuperTokensWrapper>
);

export default App;
