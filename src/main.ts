import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

// Amplify.configure({
//   Auth:{
//     mandatorySignIn:true,
//     region: 'eu-west-2',
//     userPoolId: 'eu-west-2_9zNYXg3jE',
//     userPoolWebClientId: '1223o7ns109e4bhacr0f9j2i8u',
//     authenticationFlowType:'USER_PASSWORD_AUTH'
//   }
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
