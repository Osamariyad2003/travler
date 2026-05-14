"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[717],{2424:function(e,t,n){n.d(t,{$:function(){return tf},A:function(){return p},B:function(){return na},C:function(){return no},D:function(){return nc},E:function(){return nl},F:function(){return l},G:function(){return m},H:function(){return g},I:function(){return I},J:function(){return eq},K:function(){return ej},L:function(){return eW},M:function(){return e3},N:function(){return e5},O:function(){return h},P:function(){return n0},Q:function(){return tn},R:function(){return nB},S:function(){return d},T:function(){return iG},U:function(){return em},V:function(){return ts},W:function(){return tl},X:function(){return tu},Y:function(){return td},Z:function(){return tc},_:function(){return tp},a:function(){return ny},a0:function(){return tI},a1:function(){return tR},a2:function(){return tN},a3:function(){return tO},a4:function(){return tb},a5:function(){return tF},a6:function(){return tV},a7:function(){return tx},a8:function(){return tH},a9:function(){return tq},aa:function(){return tj},ab:function(){return tz},ac:function(){return tG},ad:function(){return tW},ae:function(){return tK},af:function(){return tJ},ag:function(){return tY},ah:function(){return tX},ai:function(){return ti},aj:function(){return tr},ak:function(){return tQ},al:function(){return tZ},am:function(){return t0},an:function(){return Q},ao:function(){return Z},ap:function(){return tw},aq:function(){return t8},ar:function(){return ea},as:function(){return nh},at:function(){return nm},b:function(){return n_},c:function(){return n8},d:function(){return ie},e:function(){return n7},f:function(){return iu},g:function(){return im},h:function(){return ih},i:function(){return nV},j:function(){return iv},k:function(){return iH},l:function(){return nX},m:function(){return iz},n:function(){return iK},o:function(){return i0},p:function(){return u},q:function(){return t7},r:function(){return n$},s:function(){return nY},t:function(){return ne},u:function(){return nZ},v:function(){return nt},w:function(){return nn},x:function(){return ni},y:function(){return nr},z:function(){return ns}});var i,r=n(8954),s=n(5723),a=n(9858),o=n(9703),c=n(6574);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let l={PHONE:"phone",TOTP:"totp"},u={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},d={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},h={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},p={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};function f(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let m=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}},g=f,v=new r.LL("auth","Firebase",f()),I={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type"},_=new a.Yd("@firebase/auth");function T(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];_.logLevel<=a.in.ERROR&&_.error("Auth (".concat(s.Jn,"): ").concat(e),...n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];throw k(e,...n)}function w(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return k(e,...n)}function E(e,t,n){let i=Object.assign(Object.assign({},g()),{[t]:n});return new r.LL("auth","Firebase",i).create(t,{appName:e.name})}function A(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&y(e,"argument-error"),E(e,"argument-error","Type of ".concat(t.constructor.name," does not match expected instance.")+"Did you pass a reference from a different Auth SDK?")}function k(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];if("string"!=typeof e){let t=n[0],i=[...n.slice(1)];return i[0]&&(i[0].appName=e.name),e._errorFactory.create(t,...i)}return v.create(e,...n)}function S(e,t){for(var n=arguments.length,i=Array(n>2?n-2:0),r=2;r<n;r++)i[r-2]=arguments[r];if(!e)throw k(t,...i)}function R(e){let t="INTERNAL ASSERTION FAILED: "+e;throw T(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function O(){return"http:"===P()||"https:"===P()}function P(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(O()||(0,r.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}constructor(e,t){this.shortDelay=e,this.longDelay=t,t>e||R("Short delay should be less than long delay!"),this.isMobile=(0,r.uI)()||(0,r.b$)()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C(e,t){e.emulator||R("Emulator should always be set here");let{url:n}=e.emulator;return t?"".concat(n).concat(t.startsWith("/")?t.slice(1):t):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void R("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void R("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void R("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let D={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},U=new b(3e4,6e4);function M(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function F(e,t,n,i){let s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return V(e,s,async()=>{let s={},a={};i&&("GET"===t?a=i:s={body:JSON.stringify(i)});let o=(0,r.xO)(Object.assign({key:e.config.apiKey},a)).slice(1),c=await e._getAdditionalHeaders();return c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode),L.fetch()(H(e,e.config.apiHost,n,o),Object.assign({method:t,headers:c,referrerPolicy:"no-referrer"},s))})}async function V(e,t,n){e._canInitEmulator=!1;let i=Object.assign(Object.assign({},D),t);try{let t=new q(e),r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let s=await r.json();if("needConfirmation"in s)throw j(e,"account-exists-with-different-credential",s);if(r.ok&&!("errorMessage"in s))return s;{let[t,n]=(r.ok?s.errorMessage:s.error.message).split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===t)throw j(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===t)throw j(e,"email-already-in-use",s);if("USER_DISABLED"===t)throw j(e,"user-disabled",s);let a=i[t]||t.toLowerCase().replace(/[_\s]+/g,"-");if(n)throw E(e,a,n);y(e,a)}}catch(t){if(t instanceof r.ZR)throw t;y(e,"network-request-failed",{message:String(t)})}}async function x(e,t,n,i){let r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=await F(e,t,n,i,r);return"mfaPendingCredential"in s&&y(e,"multi-factor-auth-required",{_serverResponse:s}),s}function H(e,t,n,i){let r="".concat(t).concat(n,"?").concat(i);return e.config.emulator?C(e.config,r):"".concat(e.config.apiScheme,"://").concat(r)}class q{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(w(this.auth,"network-request-failed")),U.get())})}}function j(e,t,n){let i={appName:e.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);let r=w(e,t,i);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e){return void 0!==e&&void 0!==e.getResponse}function G(e){return void 0!==e&&void 0!==e.enterprise}class W{getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e){return(await F(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function B(e,t){return F(e,"GET","/v2/recaptchaConfig",M(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J(e,t){return F(e,"POST","/v1/accounts:delete",t)}async function Y(e,t){return F(e,"POST","/v1/accounts:update",t)}async function X(e,t){return F(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,r.m9)(e).getIdToken(t)}async function Z(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=(0,r.m9)(e),i=await n.getIdToken(t),s=et(i);S(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");let a="object"==typeof s.firebase?s.firebase:void 0,o=null==a?void 0:a.sign_in_provider;return{claims:s,token:i,authTime:$(ee(s.auth_time)),issuedAtTime:$(ee(s.iat)),expirationTime:$(ee(s.exp)),signInProvider:o||null,signInSecondFactor:(null==a?void 0:a.sign_in_second_factor)||null}}function ee(e){return 1e3*Number(e)}function et(e){let[t,n,i]=e.split(".");if(void 0===t||void 0===n||void 0===i)return T("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,r.tV)(n);if(!e)return T("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return T("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function en(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(n)return t;try{return await t}catch(t){throw t instanceof r.ZR&&function(e){let{code:t}=e;return"auth/user-disabled"===t||"auth/user-token-expired"===t}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(!e)return this.errorBackoff=3e4,Math.max(0,(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5);{let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}}schedule(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{_initializeTime(){this.lastSignInTime=$(this.lastLoginAt),this.creationTime=$(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function es(e){var t;let n=e.auth,i=await e.getIdToken(),r=await en(e,X(n,{idToken:i}));S(null==r?void 0:r.users.length,n,"internal-error");let s=r.users[0];e._notifyReloadListener(s);let a=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?s.providerUserInfo.map(e=>{var{providerId:t}=e,n=(0,o._T)(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}}):[],c=[...e.providerData.filter(e=>!a.some(t=>t.providerId===e.providerId)),...a],l=e.isAnonymous,u=!(e.email&&s.passwordHash)&&!(null==c?void 0:c.length);Object.assign(e,{uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new er(s.createdAt,s.lastLoginAt),isAnonymous:!!l&&u})}async function ea(e){let t=(0,r.m9)(e);await es(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(e,t){let n=await V(e,{},async()=>{let n=(0,r.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:s}=e.config,a=H(e,i,"/v1/token","key=".concat(s)),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",L.fetch()(a,{method:"POST",headers:o,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ec(e,t){return F(e,"POST","/v2/accounts:revokeToken",M(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(void 0!==e.idToken,"internal-error"),S(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){let t=et(e);return S(t,"internal-error"),S(void 0!==t.exp,"internal-error"),S(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(S(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired)?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:i,expiresIn:r}=await eo(e,t);this.updateTokensAndExpiration(n,i,Number(r))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){let{refreshToken:n,accessToken:i,expirationTime:r}=t,s=new el;return n&&(S("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),i&&(S("string"==typeof i,"internal-error",{appName:e}),s.accessToken=i),r&&(S("number"==typeof r,"internal-error",{appName:e}),s.expirationTime=r),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new el,this.toJSON())}_performRefresh(){return R("not implemented")}constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(e,t){S("string"==typeof e||void 0===e,"internal-error",{appName:t})}class ed{async getIdToken(e){let t=await en(this,this.stsTokenManager.getToken(this.auth,e));return S(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Z(this,e)}reload(){return ea(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new ed(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await es(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){let e=await this.getIdToken();return await en(this,J(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,r,s,a,o,c,l;let u=null!==(n=t.displayName)&&void 0!==n?n:void 0,d=null!==(i=t.email)&&void 0!==i?i:void 0,h=null!==(r=t.phoneNumber)&&void 0!==r?r:void 0,p=null!==(s=t.photoURL)&&void 0!==s?s:void 0,f=null!==(a=t.tenantId)&&void 0!==a?a:void 0,m=null!==(o=t._redirectEventId)&&void 0!==o?o:void 0,g=null!==(c=t.createdAt)&&void 0!==c?c:void 0,v=null!==(l=t.lastLoginAt)&&void 0!==l?l:void 0,{uid:I,emailVerified:_,isAnonymous:T,providerData:y,stsTokenManager:w}=t;S(I&&w,e,"internal-error");let E=el.fromJSON(this.name,w);S("string"==typeof I,e,"internal-error"),eu(u,e.name),eu(d,e.name),S("boolean"==typeof _,e,"internal-error"),S("boolean"==typeof T,e,"internal-error"),eu(h,e.name),eu(p,e.name),eu(f,e.name),eu(m,e.name),eu(g,e.name),eu(v,e.name);let A=new ed({uid:I,auth:e,email:d,emailVerified:_,displayName:u,isAnonymous:T,photoURL:p,phoneNumber:h,tenantId:f,stsTokenManager:E,createdAt:g,lastLoginAt:v});return y&&Array.isArray(y)&&(A.providerData=y.map(e=>Object.assign({},e))),m&&(A._redirectEventId=m),A}static async _fromIdTokenResponse(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new el;i.updateFromServerResponse(t);let r=new ed({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await es(r),r}constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,r=(0,o._T)(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ei(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new er(r.createdAt||void 0,r.lastLoginAt||void 0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eh=new Map;function ep(e){e instanceof Function||R("Expected a class definition");let t=eh.get(e);return t?t instanceof e||R("Instance stored in cache mismatched with class"):(t=new e,eh.set(e,t)),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}constructor(){this.type="NONE",this.storage={}}}ef.type="NONE";let em=ef;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(e,t,n){return"firebase:".concat(e,":").concat(t,":").concat(n)}class ev{setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?ed._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"authUser";if(!t.length)return new ev(ep(em),e,n);let i=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),r=i[0]||ep(em),s=eg(n,e.config.apiKey,e.name),a=null;for(let n of t)try{let t=await n._get(s);if(t){let i=ed._fromJSON(e,t);n!==r&&(a=i),r=n;break}}catch(e){}let o=i.filter(e=>e._shouldAllowMigration);return r._shouldAllowMigration&&o.length&&(r=o[0],a&&await r._set(s,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==r)try{await e._remove(s)}catch(e){}}))),new ev(r,e,n)}constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:i,name:r}=this.auth;this.fullUserKey=eg(this.userKey,i.apiKey,r),this.fullPersistenceKey=eg("persistence",i.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ew(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(e_(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(eA(t))return"Blackberry";if(ek(t))return"Webos";if(eT(t))return"Safari";if((t.includes("chrome/")||ey(t))&&!t.includes("edge/"))return"Chrome";if(eE(t))return"Android";let n=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==n?void 0:n.length)===2)return n[1]}return"Other"}function e_(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/firefox\//i.test(e)}function eT(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)(),t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ey(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/crios\//i.test(e)}function ew(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/iemobile/i.test(e)}function eE(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/android/i.test(e)}function eA(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/blackberry/i.test(e)}function ek(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/webos/i.test(e)}function eS(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function eR(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return eS(e)||eE(e)||ek(e)||eA(e)||/windows phone/i.test(e)||ew(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eN(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];switch(e){case"Browser":t=eI((0,r.z$)());break;case"Worker":t="".concat(eI((0,r.z$)()),"-").concat(e);break;default:t=e}let i=n.length?n.join(","):"FirebaseCore-web";return"".concat(t,"/","JsCore","/").concat(s.Jn,"/").concat(i)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eO{pushCallback(e,t){let n=t=>new Promise((n,i)=>{try{let i=e(t);n(i)}catch(e){i(e)}});n.onAbort=t,this.queue.push(n);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}constructor(e){this.auth=e,this.queue=[]}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eP(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return F(e,"GET","/v2/passwordPolicy",M(e,t))}class eb{validatePassword(e){var t,n,i,r,s,a;let o={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,o),this.validatePasswordCharacterOptions(e,o),o.isValid&&(o.isValid=null===(t=o.meetsMinPasswordLength)||void 0===t||t),o.isValid&&(o.isValid=null===(n=o.meetsMaxPasswordLength)||void 0===n||n),o.isValid&&(o.isValid=null===(i=o.containsLowercaseLetter)||void 0===i||i),o.isValid&&(o.isValid=null===(r=o.containsUppercaseLetter)||void 0===r||r),o.isValid&&(o.isValid=null===(s=o.containsNumericCharacter)||void 0===s||s),o.isValid&&(o.isValid=null===(a=o.containsNonAlphanumericCharacter)||void 0===a||a),o}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}constructor(e){var t,n,i,r;let s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=s.minPasswordLength)&&void 0!==t?t:6,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),void 0!==s.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),void 0!==s.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),void 0!==s.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),void 0!==s.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(i=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==i?i:"",this.forceUpgradeOnSignin=null!==(r=e.forceUpgradeOnSignin)&&void 0!==r&&r,this.schemaVersion=e.schemaVersion}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eC{_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ep(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await ev.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(i=this.currentUser)||void 0===i?void 0:i.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;let n=await this.assertedPersistence.getCurrentUser(),i=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,s=null==i?void 0:i._redirectEventId,a=await this.tryRedirectSignIn(e);(!n||n===s)&&(null==a?void 0:a.user)&&(i=a.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(e){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return(S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId)?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await es(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){let t=e?(0,r.m9)(e):null;return t&&S(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ep(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new eb(await eP(this));null===this.tenantId?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new r.LL("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await ec(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ep(e)||this._popupRedirectResolver;S(t,this,"argument-error"),this.redirectPersistenceManager=await ev.create(this,[ep(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return"".concat(this.config.authDomain,":").concat(this.config.apiKey,":").concat(this.name)}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};let r="function"==typeof t?t:t.next.bind(t),s=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{s||r(this.currentUser)}),"function"==typeof t){let r=e.addObserver(t,n,i);return()=>{s=!0,r()}}{let n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eN(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];_.logLevel<=a.in.WARN&&_.warn("Auth (".concat(s.Jn,"): ").concat(e),...n)}("Error while retrieving App Check token: ".concat(t.error)),null==t?void 0:t.token}constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eD(this),this.idTokenSubscription=new eD(this),this.beforeStateQueue=new eO(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=v,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}}function eL(e){return(0,r.m9)(e)}class eD{get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,r.ne)(e=>this.observer=e)}}function eU(e){return new Promise((t,n)=>{var i,r;let s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{let t=w("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(r=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==r?r:document).appendChild(s)})}function eM(e){return"__".concat(e).concat(Math.floor(1e6*Math.random()))}class eF{async verify(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"verify",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{B(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(i=>{if(void 0===i.recaptchaKey)n(Error("recaptcha Enterprise site key undefined"));else{let n=new W(i);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function i(t,n,i){let r=window.grecaptcha;G(r)?r.enterprise.ready(()=>{r.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n("NO_RECAPTCHA")})}):i(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,r)=>{n(this.auth).then(n=>{!t&&G(window.grecaptcha)?i(n,e,r):eU("https://www.google.com/recaptcha/enterprise.js?render="+n).then(()=>{i(n,e,r)}).catch(e=>{r(e)})}).catch(e=>{r(e)})})}constructor(e){this.type="recaptcha-enterprise",this.auth=eL(e)}}async function eV(e,t,n){let i,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=new eF(e);try{i=await s.verify(n)}catch(e){i=await s.verify(n,!0)}let a=Object.assign({},t);return r?Object.assign(a,{captchaResp:i}):Object.assign(a,{captchaResponse:i}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ex(e,t,n,i){var r;if(null===(r=e._getRecaptchaConfig())||void 0===r||!r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return i(e,t).catch(async r=>{if("auth/missing-recaptcha-token"!==r.code)return Promise.reject(r);{console.log("".concat(n," is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow."));let r=await eV(e,t,n,"getOobCode"===n);return i(e,r)}});{let r=await eV(e,t,n,"getOobCode"===n);return i(e,r)}}async function eH(e){let t=eL(e),n=new W(await B(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}));null==t.tenantId?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,n.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")&&new eF(t).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eq(e,t){let n=(0,s.qX)(e,"auth");if(n.isInitialized()){let e=n.getImmediate(),i=n.getOptions();if((0,r.vZ)(i,null!=t?t:{}))return e;y(e,"already-initialized")}return n.initialize({options:t})}function ej(e,t,n){let i=eL(e);S(i._canInitEmulator,i,"emulator-config-failed"),S(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");let r=!!(null==n?void 0:n.disableWarnings),s=ez(t),{host:a,port:o}=function(e){let t=ez(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};let i=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){let e=r[1];return{host:e,port:eG(i.substr(e.length+1))}}{let[e,t]=i.split(":");return{host:e,port:eG(t)}}}(t);i.config.emulator={url:"".concat(s,"//").concat(a).concat(null===o?"":":".concat(o),"/")},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}function ez(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function eG(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eW{toJSON(){return R("not implemented")}_getIdTokenResponse(e){return R("not implemented")}_linkToIdToken(e,t){return R("not implemented")}_getReauthenticationResolver(e){return R("not implemented")}constructor(e,t){this.providerId=e,this.signInMethod=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eK(e,t){return F(e,"POST","/v1/accounts:resetPassword",M(e,t))}async function eB(e,t){return F(e,"POST","/v1/accounts:update",t)}async function eJ(e,t){return F(e,"POST","/v1/accounts:signUp",t)}async function eY(e,t){return F(e,"POST","/v1/accounts:update",M(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eX(e,t){return x(e,"POST","/v1/accounts:signInWithPassword",M(e,t))}async function e$(e,t){return F(e,"POST","/v1/accounts:sendOobCode",M(e,t))}async function eQ(e,t){return e$(e,t)}async function eZ(e,t){return e$(e,t)}async function e0(e,t){return e$(e,t)}async function e1(e,t){return e$(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e2(e,t){return x(e,"POST","/v1/accounts:signInWithEmailLink",M(e,t))}async function e9(e,t){return x(e,"POST","/v1/accounts:signInWithEmailLink",M(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3 extends eW{static _fromEmailAndPassword(e,t){return new e3(e,t,"password")}static _fromEmailAndCode(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return new e3(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return ex(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",eX);case"emailLink":return e2(e,{email:this._email,oobCode:this._password});default:y(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return ex(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",eJ);case"emailLink":return e9(e,{idToken:t,email:this._email,oobCode:this._password});default:y(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e4(e,t){return x(e,"POST","/v1/accounts:signInWithIdp",M(e,t))}class e5 extends eW{static _fromParams(e){let t=new e5(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):y("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,r=(0,o._T)(t,["providerId","signInMethod"]);if(!n||!i)return null;let s=new e5(n,i);return s.idToken=r.idToken||void 0,s.accessToken=r.accessToken||void 0,s.secret=r.secret,s.nonce=r.nonce,s.pendingToken=r.pendingToken||null,s}_getIdTokenResponse(e){return e4(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,e4(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,e4(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,r.xO)(t)}return e}constructor(){super(...arguments),this.pendingToken=null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e6(e,t){return F(e,"POST","/v1/accounts:sendVerificationCode",M(e,t))}async function e8(e,t){return x(e,"POST","/v1/accounts:signInWithPhoneNumber",M(e,t))}async function e7(e,t){let n=await x(e,"POST","/v1/accounts:signInWithPhoneNumber",M(e,t));if(n.temporaryProof)throw j(e,"account-exists-with-different-credential",n);return n}let te={USER_NOT_FOUND:"user-not-found"};async function tt(e,t){return x(e,"POST","/v1/accounts:signInWithPhoneNumber",M(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),te)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends eW{static _fromVerification(e,t){return new tn({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new tn({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return e8(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return e7(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return tt(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:r}=e;return n||t||i||r?new tn({verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:r}):null}constructor(e){super("phone","phone"),this.params=e}}class ti{static parseLink(e){let t=function(e){let t=(0,r.zd)((0,r.pd)(e)).link,n=t?(0,r.zd)((0,r.pd)(t)).deep_link_id:null,i=(0,r.zd)((0,r.pd)(e)).deep_link_id;return(i?(0,r.zd)((0,r.pd)(i)).link:null)||i||n||t||e}(e);try{return new ti(t)}catch(e){return null}}constructor(e){var t,n,i,s,a,o;let c=(0,r.zd)((0,r.pd)(e)),l=null!==(t=c.apiKey)&&void 0!==t?t:null,u=null!==(n=c.oobCode)&&void 0!==n?n:null,d=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(i=c.mode)&&void 0!==i?i:null);S(l&&u&&d,"argument-error"),this.apiKey=l,this.operation=d,this.code=u,this.continueUrl=null!==(s=c.continueUrl)&&void 0!==s?s:null,this.languageCode=null!==(a=c.languageCode)&&void 0!==a?a:null,this.tenantId=null!==(o=c.tenantId)&&void 0!==o?o:null}}function tr(e){return ti.parseLink(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{static credential(e,t){return e3._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=ti.parseLink(t);return S(n,"argument-error"),e3._fromEmailAndCode(e,n.code,n.tenantId)}constructor(){this.providerId=ts.PROVIDER_ID}}ts.PROVIDER_ID="password",ts.EMAIL_PASSWORD_SIGN_IN_METHOD="password",ts.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to extends ta{addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}constructor(){super(...arguments),this.scopes=[]}}class tc extends to{static credentialFromJSON(e){let t="string"==typeof e?JSON.parse(e):e;return S("providerId"in t&&"signInMethod"in t,"argument-error"),e5._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return S(e.idToken||e.accessToken,"argument-error"),e5._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return tc.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return tc.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;let{oauthIdToken:n,oauthAccessToken:i,oauthTokenSecret:r,pendingToken:s,nonce:a,providerId:o}=t;if(!i&&!r&&!n&&!s||!o)return null;try{return new tc(o)._credential({idToken:n,accessToken:i,nonce:a,pendingToken:s})}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl extends to{static credential(e){return e5._fromParams({providerId:tl.PROVIDER_ID,signInMethod:tl.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tl.credentialFromTaggedObject(e)}static credentialFromError(e){return tl.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return tl.credential(t.oauthAccessToken)}catch(e){return null}}constructor(){super("facebook.com")}}tl.FACEBOOK_SIGN_IN_METHOD="facebook.com",tl.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends to{static credential(e,t){return e5._fromParams({providerId:tu.PROVIDER_ID,signInMethod:tu.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return tu.credentialFromTaggedObject(e)}static credentialFromError(e){return tu.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;let{oauthIdToken:n,oauthAccessToken:i}=t;if(!n&&!i)return null;try{return tu.credential(n,i)}catch(e){return null}}constructor(){super("google.com"),this.addScope("profile")}}tu.GOOGLE_SIGN_IN_METHOD="google.com",tu.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td extends to{static credential(e){return e5._fromParams({providerId:td.PROVIDER_ID,signInMethod:td.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return td.credentialFromTaggedObject(e)}static credentialFromError(e){return td.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return td.credential(t.oauthAccessToken)}catch(e){return null}}constructor(){super("github.com")}}td.GITHUB_SIGN_IN_METHOD="github.com",td.PROVIDER_ID="github.com";class th extends eW{_getIdTokenResponse(e){return e4(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,e4(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,e4(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){let{providerId:t,signInMethod:n,pendingToken:i}="string"==typeof e?JSON.parse(e):e;return t&&n&&i&&t===n?new th(t,i):null}static _create(e,t){return new th(e,t)}buildRequest(){return{requestUri:"http://localhost",returnSecureToken:!0,pendingToken:this.pendingToken}}constructor(e,t){super(e,e),this.pendingToken=t}}class tp extends ta{static credentialFromResult(e){return tp.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return tp.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){let t=th.fromJSON(e);return S(t,"argument-error"),t}static samlCredentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;let{pendingToken:n,providerId:i}=t;if(!n||!i)return null;try{return th._create(i,n)}catch(e){return null}}constructor(e){S(e.startsWith("saml."),"argument-error"),super(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf extends to{static credential(e,t){return e5._fromParams({providerId:tf.PROVIDER_ID,signInMethod:tf.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return tf.credentialFromTaggedObject(e)}static credentialFromError(e){return tf.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;let{oauthAccessToken:n,oauthTokenSecret:i}=t;if(!n||!i)return null;try{return tf.credential(n,i)}catch(e){return null}}constructor(){super("twitter.com")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tm(e,t){return x(e,"POST","/v1/accounts:signUp",M(e,t))}tf.TWITTER_SIGN_IN_METHOD="twitter.com",tf.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{static async _fromIdTokenResponse(e,t,n){let i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return new tg({user:await ed._fromIdTokenResponse(e,n,i),providerId:tv(n),_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){return await e._updateTokensIfNecessary(n,!0),new tg({user:e,providerId:tv(n),_tokenResponse:n,operationType:t})}constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}}function tv(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tI(e){var t;let n=eL(e);if(await n._initializationPromise,null===(t=n.currentUser)||void 0===t?void 0:t.isAnonymous)return new tg({user:n.currentUser,providerId:null,operationType:"signIn"});let i=await tm(n,{returnSecureToken:!0}),r=await tg._fromIdTokenResponse(n,"signIn",i,!0);return await n._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_ extends r.ZR{static _fromErrorAndOperation(e,t,n,i){return new t_(e,t,n,i)}constructor(e,t,n,i){var r;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,t_.prototype),this.customData={appName:e.name,tenantId:null!==(r=e.tenantId)&&void 0!==r?r:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}}function tT(e,t,n,i){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw t_._fromErrorAndOperation(e,n,t,i);throw n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(e){return new Set(e.map(e=>{let{providerId:t}=e;return t}).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tw(e,t){let n=(0,r.m9)(e);await tA(!0,n,t);let{providerUserInfo:i}=await Y(n.auth,{idToken:await n.getIdToken(),deleteProvider:[t]}),s=ty(i||[]);return n.providerData=n.providerData.filter(e=>s.has(e.providerId)),s.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function tE(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=await en(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return tg._forOperation(e,"link",i)}async function tA(e,t,n){await es(t),S(ty(t.providerData).has(n)===e,t.auth,!1===e?"provider-already-linked":"no-such-provider")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tk(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{auth:i}=e,r="reauthenticate";try{let s=await en(e,tT(i,r,t,e),n);S(s.idToken,i,"internal-error");let a=et(s.idToken);S(a,i,"internal-error");let{sub:o}=a;return S(e.uid===o,i,"user-mismatch"),tg._forOperation(e,r,s)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&y(i,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tS(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i="signIn",r=await tT(e,i,t),s=await tg._fromIdTokenResponse(e,i,r);return n||await e._updateCurrentUser(s.user),s}async function tR(e,t){return tS(eL(e),t)}async function tN(e,t){let n=(0,r.m9)(e);return await tA(!1,n,t.providerId),tE(n,t)}async function tO(e,t){return tk((0,r.m9)(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tP(e,t){return x(e,"POST","/v1/accounts:signInWithCustomToken",M(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tb(e,t){let n=eL(e),i=await tP(n,{token:t,returnSecureToken:!0}),r=await tg._fromIdTokenResponse(n,"signIn",i);return await n._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{static _fromServerResponse(e,t){return"phoneInfo"in t?tL._fromServerResponse(e,t):"totpInfo"in t?tD._fromServerResponse(e,t):y(e,"internal-error")}constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}}class tL extends tC{static _fromServerResponse(e,t){return new tL(t)}constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}}class tD extends tC{static _fromServerResponse(e,t){return new tD(t)}constructor(e){super("totp",e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tU(e,t,n){var i;S((null===(i=n.url)||void 0===i?void 0:i.length)>0,e,"invalid-continue-uri"),S(void 0===n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(S(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(S(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tM(e){let t=eL(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function tF(e,t,n){let i=eL(e),r={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};n&&tU(i,r,n),await ex(i,r,"getOobCode",eZ)}async function tV(e,t,n){await eK((0,r.m9)(e),{oobCode:t,newPassword:n}).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tM(e),t})}async function tx(e,t){await eY((0,r.m9)(e),{oobCode:t})}async function tH(e,t){let n=(0,r.m9)(e),i=await eK(n,{oobCode:t}),s=i.requestType;switch(S(s,n,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":S(i.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":S(i.mfaInfo,n,"internal-error");default:S(i.email,n,"internal-error")}let a=null;return i.mfaInfo&&(a=tC._fromServerResponse(eL(n),i.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.newEmail:i.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===i.requestType?i.email:i.newEmail)||null,multiFactorInfo:a},operation:s}}async function tq(e,t){let{data:n}=await tH((0,r.m9)(e),t);return n.email}async function tj(e,t,n){let i=eL(e),r=ex(i,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",tm),s=await r.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tM(e),t}),a=await tg._fromIdTokenResponse(i,"signIn",s);return await i._updateCurrentUser(a.user),a}function tz(e,t,n){return tR((0,r.m9)(e),ts.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&tM(e),t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tG(e,t,n){let i=eL(e),r={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};S(n.handleCodeInApp,i,"argument-error"),n&&tU(i,r,n),await ex(i,r,"getOobCode",e0)}function tW(e,t){let n=ti.parseLink(t);return(null==n?void 0:n.operation)==="EMAIL_SIGNIN"}async function tK(e,t,n){let i=(0,r.m9)(e),s=ts.credentialWithLink(t,n||N());return S(s._tenantId===(i.tenantId||null),i,"tenant-id-mismatch"),tR(i,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tB(e,t){return F(e,"POST","/v1/accounts:createAuthUri",M(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tJ(e,t){let n=O()?N():"http://localhost",{signinMethods:i}=await tB((0,r.m9)(e),{identifier:t,continueUri:n});return i||[]}async function tY(e,t){let n=(0,r.m9)(e),i={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()};t&&tU(n.auth,i,t);let{email:s}=await eQ(n.auth,i);s!==e.email&&await e.reload()}async function tX(e,t,n){let i=(0,r.m9)(e),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await e.getIdToken(),newEmail:t};n&&tU(i.auth,s,n);let{email:a}=await e1(i.auth,s);a!==e.email&&await e.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t$(e,t){return F(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tQ(e,t){let{displayName:n,photoURL:i}=t;if(void 0===n&&void 0===i)return;let s=(0,r.m9)(e),a=await s.getIdToken(),o=await en(s,t$(s.auth,{idToken:a,displayName:n,photoUrl:i,returnSecureToken:!0}));s.displayName=o.displayName||null,s.photoURL=o.photoUrl||null;let c=s.providerData.find(e=>{let{providerId:t}=e;return"password"===t});c&&(c.displayName=s.displayName,c.photoURL=s.photoURL),await s._updateTokensIfNecessary(o)}function tZ(e,t){return t1((0,r.m9)(e),t,null)}function t0(e,t){return t1((0,r.m9)(e),null,t)}async function t1(e,t,n){let{auth:i}=e,r={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(r.email=t),n&&(r.password=n);let s=await en(e,eB(i,r));await e._updateTokensIfNecessary(s,!0)}class t2{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class t9 extends t2{constructor(e,t,n,i){super(e,t,n),this.username=i}}class t3 extends t2{constructor(e,t){super(e,"facebook.com",t)}}class t4 extends t9{constructor(e,t){super(e,"github.com",t,"string"==typeof(null==t?void 0:t.login)?null==t?void 0:t.login:null)}}class t5 extends t2{constructor(e,t){super(e,"google.com",t)}}class t6 extends t9{constructor(e,t,n){super(e,"twitter.com",t,n)}}function t8(e){let{user:t,_tokenResponse:n}=e;return t.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){var t,n;if(!e)return null;let{providerId:i}=e,r=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},s=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!i&&(null==e?void 0:e.idToken)){let i=null===(n=null===(t=et(e.idToken))||void 0===t?void 0:t.firebase)||void 0===n?void 0:n.sign_in_provider;if(i)return new t2(s,"anonymous"!==i&&"custom"!==i?i:null)}if(!i)return null;switch(i){case"facebook.com":return new t3(s,r);case"github.com":return new t4(s,r);case"google.com":return new t5(s,r);case"twitter.com":return new t6(s,r,e.screenName||null);case"custom":case"anonymous":return new t2(s,null);default:return new t2(s,i,r)}}(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t7(e,t){return(0,r.m9)(e).setPersistence(t)}function ne(e){return eH(e)}async function nt(e,t){return eL(e).validatePassword(t)}function nn(e,t,n,i){return(0,r.m9)(e).onIdTokenChanged(t,n,i)}function ni(e,t,n){return(0,r.m9)(e).beforeAuthStateChanged(t,n)}function nr(e,t,n,i){return(0,r.m9)(e).onAuthStateChanged(t,n,i)}function ns(e){(0,r.m9)(e).useDeviceLanguage()}function na(e,t){return(0,r.m9)(e).updateCurrentUser(t)}function no(e){return(0,r.m9)(e).signOut()}function nc(e,t){return eL(e).revokeAccessToken(t)}async function nl(e){return(0,r.m9)(e).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{static _fromIdtoken(e,t){return new nu("enroll",e,t)}static _fromMfaPendingCredential(e){return new nu("signin",e)}toJSON(){return{multiFactorSession:{["enroll"===this.type?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,n;if(null==e?void 0:e.multiFactorSession){if(null===(t=e.multiFactorSession)||void 0===t?void 0:t.pendingCredential)return nu._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(null===(n=e.multiFactorSession)||void 0===n?void 0:n.idToken)return nu._fromIdtoken(e.multiFactorSession.idToken)}return null}constructor(e,t,n){this.type=e,this.credential=t,this.user=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{static _fromError(e,t){let n=eL(e),i=t.customData._serverResponse,r=(i.mfaInfo||[]).map(e=>tC._fromServerResponse(n,e));S(i.mfaPendingCredential,n,"internal-error");let s=nu._fromMfaPendingCredential(i.mfaPendingCredential);return new nd(s,r,async e=>{let r=await e._process(n,s);delete i.mfaInfo,delete i.mfaPendingCredential;let a=Object.assign(Object.assign({},i),{idToken:r.idToken,refreshToken:r.refreshToken});switch(t.operationType){case"signIn":let o=await tg._fromIdTokenResponse(n,t.operationType,a);return await n._updateCurrentUser(o.user),o;case"reauthenticate":return S(t.user,n,"internal-error"),tg._forOperation(t.user,t.operationType,a);default:y(n,"internal-error")}})}async resolveSignIn(e){return this.signInResolver(e)}constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}}function nh(e,t){var n;let i=(0,r.m9)(e);return S(t.customData.operationType,i,"argument-error"),S(null===(n=t.customData._serverResponse)||void 0===n?void 0:n.mfaPendingCredential,i,"argument-error"),nd._fromError(i,t)}class np{static _fromUser(e){return new np(e)}async getSession(){return nu._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){let n=await this.getSession(),i=await en(this.user,e._process(this.user.auth,n,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){let t="string"==typeof e?e:e.uid,n=await this.user.getIdToken();try{var i;let e=await en(this.user,(i=this.user.auth,F(i,"POST","/v2/accounts/mfaEnrollment:withdraw",M(i,{idToken:n,mfaEnrollmentId:t}))));this.enrolledFactors=this.enrolledFactors.filter(e=>{let{uid:n}=e;return n!==t}),await this.user._updateTokensIfNecessary(e),await this.user.reload()}catch(e){throw e}}constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>tC._fromServerResponse(e.auth,t)))})}}let nf=new WeakMap;function nm(e){let t=(0,r.m9)(e);return nf.has(t)||nf.set(t,np._fromUser(t)),nf.get(t)}let ng="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(ng,"1"),this.storage.removeItem(ng),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}constructor(e,t){this.storageRetriever=e,this.type=t}}class nI extends nv{forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let i=this.storage.getItem(n);if(e.newValue!==i)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}let i=()=>{let e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);(0,r.w1)()&&10===document.documentMode&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,10):i()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){let e=(0,r.z$)();return eT(e)||eS(e)}()&&function(){try{return!!(window&&window!==window.top)}catch(e){return!1}}(),this.fallbackToPolling=eR(),this._shouldAllowMigration=!0}}nI.type="LOCAL";let n_=nI;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT extends nv{_addListener(e,t){}_removeListener(e,t){}constructor(){super(()=>window.sessionStorage,"SESSION")}}nT.type="SESSION";let ny=nT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let n=new nw(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:n,data:i}=e.data,r=this.handlersMap[n];if(!(null==r?void 0:r.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:n});let s=Array.from(r).map(async t=>t(e.origin,i)),a=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:n,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nE(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}nw.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nA{removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t){let n,i,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50,s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((a,o)=>{let c=nE("",20);s.port1.start();let l=setTimeout(()=>{o(Error("unsupported_event"))},r);i={messageChannel:s,onMessage(e){if(e.data.eventId===c)switch(e.data.status){case"ack":clearTimeout(l),n=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(n),a(e.data.response);break;default:clearTimeout(l),clearTimeout(n),o(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}constructor(e){this.target=e,this.handlers=new Set}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nk(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nS(){return void 0!==nk().WorkerGlobalScope&&"function"==typeof nk().importScripts}async function nR(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nN="firebaseLocalStorageDb",nO="firebaseLocalStorage",nP="fbase_key";class nb{toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}constructor(e){this.request=e}}function nC(e,t){return e.transaction([nO],t?"readwrite":"readonly").objectStore(nO)}function nL(){let e=indexedDB.open(nN,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(nO,{keyPath:nP})}catch(e){n(e)}}),e.addEventListener("success",async()=>{let n=e.result;n.objectStoreNames.contains(nO)?t(n):(n.close(),await new nb(indexedDB.deleteDatabase(nN)).toPromise(),t(await nL()))})})}async function nD(e,t,n){return new nb(nC(e,!0).put({[nP]:t,value:n})).toPromise()}async function nU(e,t){let n=nC(e,!1).get(t),i=await new nb(n).toPromise();return void 0===i?null:i.value}function nM(e,t){return new nb(nC(e,!0).delete(t)).toPromise()}class nF{async _openDb(){return this.db||(this.db=await nL()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return nS()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=nw._getInstance(nS()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await nR(),!this.activeServiceWorker)return;this.sender=new nA(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await nL();return await nD(e,ng,"1"),await nM(e,ng),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>nD(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>nU(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>nM(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new nb(nC(e,!1).getAll()).toPromise());if(!e||0!==this.pendingWrites)return[];let t=[],n=new Set;if(0!==e.length)for(let{fbase_key:i,value:r}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),t.push(i));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}}nF.type="LOCAL";let nV=nF;class nx{render(e,t){let n=this.counter;return this._widgets.set(n,new nH(e,this.auth.name,t||{})),this.counter++,n}reset(e){var t;let n=e||1e12;null===(t=this._widgets.get(n))||void 0===t||t.delete(),this._widgets.delete(n)}getResponse(e){var t;return(null===(t=this._widgets.get(e||1e12))||void 0===t?void 0:t.getResponse())||""}async execute(e){var t;return null===(t=this._widgets.get(e||1e12))||void 0===t||t.execute(),""}constructor(e){this.auth=e,this.counter=1e12,this._widgets=new Map}}class nH{getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=function(e){let t=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let e=0;e<50;e++)t.push(n.charAt(Math.floor(Math.random()*n.length)));return t.join("")}(0);let{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch(e){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(e){}this.isVisible&&this.execute()},6e4)},500))}checkIfDeleted(){if(this.deleted)throw Error("reCAPTCHA mock was already deleted!")}constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};let i="string"==typeof e?document.getElementById(e):e;S(i,"argument-error",{appName:t}),this.container=i,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nq=eM("rcb"),nj=new b(3e4,6e4);class nz{load(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return(S(t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t),e,"argument-error"),this.shouldResolveImmediately(t)&&z(nk().grecaptcha))?Promise.resolve(nk().grecaptcha):new Promise((n,i)=>{let s=nk().setTimeout(()=>{i(w(e,"network-request-failed"))},nj.get());nk()[nq]=()=>{nk().clearTimeout(s),delete nk()[nq];let r=nk().grecaptcha;if(!r||!z(r)){i(w(e,"internal-error"));return}let a=r.render;r.render=(e,t)=>{let n=a(e,t);return this.counter++,n},this.hostLanguage=t,n(r)},eU("".concat("https://www.google.com/recaptcha/api.js?","?").concat((0,r.xO)({onload:nq,render:"explicit",hl:t}))).catch(()=>{clearTimeout(s),i(w(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(null===(t=nk().grecaptcha)||void 0===t?void 0:t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(null===(e=nk().grecaptcha)||void 0===e?void 0:e.render)}}class nG{async load(e){return new nx(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nW="recaptcha",nK={theme:"light",type:"image"};class nB{async verify(){this.assertNotDestroyed();let e=await this.render(),t=this.getAssertedRecaptcha();return t.getResponse(e)||new Promise(n=>{let i=e=>{e&&(this.tokenChangeListeners.delete(i),n(e))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){S(!this.parameters.sitekey,this.auth,"argument-error"),S(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),S("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"==typeof e)e(t);else if("string"==typeof e){let n=nk()[e];"function"==typeof n&&n(t)}}}assertNotDestroyed(){S(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){let t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){let e;S(O()&&!nS(),this.auth,"internal-error"),await (e=null,new Promise(t=>{if("complete"===document.readyState){t();return}e=()=>t(),window.addEventListener("load",e)}).catch(t=>{throw e&&window.removeEventListener("load",e),t})),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);let t=await K(this.auth);S(t,this.auth,"internal-error"),this.parameters.sitekey=t}getAssertedRecaptcha(){return S(this.recaptcha,this.auth,"internal-error"),this.recaptcha}constructor(e,t,n=Object.assign({},nK)){this.parameters=n,this.type=nW,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=eL(e),this.isInvisible="invisible"===this.parameters.size,S("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");let i="string"==typeof t?document.getElementById(t):t;S(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new nG:new nz,this.validateStartingState()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nJ{confirm(e){let t=tn._fromVerification(this.verificationId,e);return this.onConfirmation(t)}constructor(e,t){this.verificationId=e,this.onConfirmation=t}}async function nY(e,t,n){let i=eL(e);return new nJ(await nQ(i,t,(0,r.m9)(n)),e=>tR(i,e))}async function nX(e,t,n){let i=(0,r.m9)(e);return await tA(!1,i,"phone"),new nJ(await nQ(i.auth,t,(0,r.m9)(n)),e=>tN(i,e))}async function n$(e,t,n){let i=(0,r.m9)(e);return new nJ(await nQ(i.auth,t,(0,r.m9)(n)),e=>tO(i,e))}async function nQ(e,t,n){var i,r,s;let a=await n.verify();try{let o;if(S("string"==typeof a,e,"argument-error"),S(n.type===nW,e,"argument-error"),o="string"==typeof t?{phoneNumber:t}:t,"session"in o){let t=o.session;if("phoneNumber"in o)return S("enroll"===t.type,e,"internal-error"),(await (r={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:a}},F(e,"POST","/v2/accounts/mfaEnrollment:start",M(e,r)))).phoneSessionInfo.sessionInfo;{S("signin"===t.type,e,"internal-error");let n=(null===(i=o.multiFactorHint)||void 0===i?void 0:i.uid)||o.multiFactorUid;return S(n,e,"missing-multi-factor-info"),(await (s={mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:a}},F(e,"POST","/v2/accounts/mfaSignIn:start",M(e,s)))).phoneResponseInfo.sessionInfo}}{let{sessionInfo:t}=await e6(e,{phoneNumber:o.phoneNumber,recaptchaToken:a});return t}}finally{n._reset()}}async function nZ(e,t){await tE((0,r.m9)(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{verifyPhoneNumber(e,t){return nQ(this.auth,e,(0,r.m9)(t))}static credential(e,t){return tn._fromVerification(e,t)}static credentialFromResult(e){return n0.credentialFromTaggedObject(e)}static credentialFromError(e){return n0.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject(e){let{_tokenResponse:t}=e;if(!t)return null;let{phoneNumber:n,temporaryProof:i}=t;return n&&i?tn._fromTokenResponse(n,i):null}constructor(e){this.providerId=n0.PROVIDER_ID,this.auth=eL(e)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n1(e,t){return t?ep(t):(S(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}n0.PROVIDER_ID="phone",n0.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n2 extends eW{_getIdTokenResponse(e){return e4(e,this._buildIdpRequest())}_linkToIdToken(e,t){return e4(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return e4(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}constructor(e){super("custom","custom"),this.params=e}}function n9(e){return tS(e.auth,new n2(e),e.bypassAuthState)}function n3(e){let{auth:t,user:n}=e;return S(n,t,"internal-error"),tk(n,new n2(e),e.bypassAuthState)}async function n4(e){let{auth:t,user:n}=e;return S(n,t,"internal-error"),tE(n,new n2(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n5{execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:i,tenantId:r,error:s,type:a}=e;if(s){this.reject(s);return}let o={auth:this.auth,requestUri:t,sessionId:n,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return n9;case"linkViaPopup":case"linkViaRedirect":return n4;case"reauthViaPopup":case"reauthViaRedirect":return n3;default:y(this.auth,"internal-error")}}resolve(e){this.pendingPromise||R("Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){this.pendingPromise||R("Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}constructor(e,t,n,i,r=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n6=new b(2e3,1e4);async function n8(e,t,n){let i=eL(e);A(e,t,ta);let r=n1(i,n);return new it(i,"signInViaPopup",t,r).executeNotNull()}async function n7(e,t,n){let i=(0,r.m9)(e);A(i.auth,t,ta);let s=n1(i.auth,n);return new it(i.auth,"reauthViaPopup",t,s,i).executeNotNull()}async function ie(e,t,n){let i=(0,r.m9)(e);A(i.auth,t,ta);let s=n1(i.auth,n);return new it(i.auth,"linkViaPopup",t,s,i).executeNotNull()}class it extends n5{async executeNotNull(){let e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){1===this.filter.length||R("Popup operations only handle one event");let e=nE();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(w(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(w(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,it.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(w(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,n6.get())};e()}constructor(e,t,n,i,r){super(e,t,i,r),this.provider=n,this.authWindow=null,this.pollId=null,it.currentPopupAction&&it.currentPopupAction.cancel(),it.currentPopupAction=this}}it.currentPopupAction=null;let ii=new Map;class ir extends n5{async execute(){let e=ii.get(this.auth._key());if(!e){try{let t=await is(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}ii.set(this.auth._key(),e)}return this.bypassAuthState||ii.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}}async function is(e,t){let n=il(t),i=ic(e);if(!await i._isAvailable())return!1;let r=await i._get(n)==="true";return await i._remove(n),r}async function ia(e,t){return ic(e)._set(il(t),"true")}function io(e,t){ii.set(e._key(),t)}function ic(e){return ep(e._redirectPersistence)}function il(e){return eg("pendingRedirect",e.config.apiKey,e.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(e,t,n){return id(e,t,n)}async function id(e,t,n){let i=eL(e);A(e,t,ta),await i._initializationPromise;let r=n1(i,n);return await ia(r,i),r._openRedirect(i,t,"signInViaRedirect")}function ih(e,t,n){return ip(e,t,n)}async function ip(e,t,n){let i=(0,r.m9)(e);A(i.auth,t,ta),await i.auth._initializationPromise;let s=n1(i.auth,n);await ia(s,i.auth);let a=await i_(i);return s._openRedirect(i.auth,t,"reauthViaRedirect",a)}function im(e,t,n){return ig(e,t,n)}async function ig(e,t,n){let i=(0,r.m9)(e);A(i.auth,t,ta),await i.auth._initializationPromise;let s=n1(i.auth,n);await tA(!1,i,t.providerId),await ia(s,i.auth);let a=await i_(i);return s._openRedirect(i.auth,t,"linkViaRedirect",a)}async function iv(e,t){return await eL(e)._initializationPromise,iI(e,t,!1)}async function iI(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=eL(e),r=n1(i,t),s=new ir(i,r,n),a=await s.execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}async function i_(e){let t=nE("".concat(e.uid,":::"));return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}class iT{registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return iw(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!iw(e)){let i=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(w(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(iy(e))}saveEventToCache(e){this.cachedEventUids.add(iy(e)),this.lastProcessedEventTime=Date.now()}constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}}function iy(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function iw(e){let{type:t,error:n}=e;return"unknown"===t&&(null==n?void 0:n.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iE(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return F(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ik=/^https?/;async function iS(e){if(e.config.emulator)return;let{authorizedDomains:t}=await iE(e);for(let e of t)try{if(function(e){let t=N(),{protocol:n,hostname:i}=new URL(t);if(e.startsWith("chrome-extension://")){let r=new URL(e);return""===r.hostname&&""===i?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&r.hostname===i}if(!ik.test(n))return!1;if(iA.test(e))return i===e;let r=e.replace(/\./g,"\\.");return RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}(e))return}catch(e){}y(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iR=new b(3e4,6e4);function iN(){let e=nk().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let iO=null,iP=new b(5e3,15e3),ib={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},iC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function iL(e){let t=await (iO=iO||new Promise((t,n)=>{var i,r,s;function a(){iN(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{iN(),n(w(e,"network-request-failed"))},timeout:iR.get()})}if(null===(r=null===(i=nk().gapi)||void 0===i?void 0:i.iframes)||void 0===r?void 0:r.Iframe)t(gapi.iframes.getContext());else if(null===(s=nk().gapi)||void 0===s?void 0:s.load)a();else{let t=eM("iframefcb");return nk()[t]=()=>{gapi.load?a():n(w(e,"network-request-failed"))},eU("https://apis.google.com/js/api.js?onload=".concat(t)).catch(e=>n(e))}}).catch(e=>{throw iO=null,e})),n=nk().gapi;return S(n,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;S(t.authDomain,e,"auth-domain-config-required");let n=t.emulator?C(t,"emulator/auth/iframe"):"https://".concat(e.config.authDomain,"/").concat("__/auth/iframe"),i={apiKey:t.apiKey,appName:e.name,v:s.Jn},a=iC.get(e.config.apiHost);a&&(i.eid=a);let o=e._getFrameworks();return o.length&&(i.fw=o.join(",")),"".concat(n,"?").concat((0,r.xO)(i).slice(1))}(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ib,dontclear:!0},t=>new Promise(async(n,i)=>{await t.restyle({setHideOnLeave:!1});let r=w(e,"network-request-failed"),s=nk().setTimeout(()=>{i(r)},iP.get());function a(){nk().clearTimeout(s),n(t)}t.ping(a).then(a,()=>{i(r)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iD={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class iU{close(){if(this.window)try{this.window.close()}catch(e){}}constructor(e){this.window=e,this.associatedEvent=null}}let iM=encodeURIComponent("fac");async function iF(e,t,n,i,a,o){S(e.config.authDomain,e,"auth-domain-config-required"),S(e.config.apiKey,e,"invalid-api-key");let c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:i,v:s.Jn,eventId:a};if(t instanceof ta)for(let[n,i]of(t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",(0,r.xb)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(o||{})))c[n]=i;if(t instanceof to){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(c.scopes=e.join(","))}for(let t of(e.tenantId&&(c.tid=e.tenantId),Object.keys(c)))void 0===c[t]&&delete c[t];let l=await e._getAppCheckToken(),u=l?"#".concat(iM,"=").concat(encodeURIComponent(l)):"";return"".concat(function(e){let{config:t}=e;return t.emulator?C(t,"emulator/auth/handler"):"https://".concat(t.authDomain,"/").concat("__/auth/handler")}(e),"?").concat((0,r.xO)(c).slice(1)).concat(u)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iV="webStorageSupport";class ix{async _openPopup(e,t,n,i){var s;(null===(s=this.eventManagers[e._key()])||void 0===s?void 0:s.manager)||R("_initialize() not called before _openPopup()");let a=await iF(e,t,n,N(),i);return function(e,t,n){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:500,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:600,a=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString(),c="",l=Object.assign(Object.assign({},iD),{width:i.toString(),height:s.toString(),top:a,left:o}),u=(0,r.z$)().toLowerCase();n&&(c=ey(u)?"_blank":n),e_(u)&&(t=t||"http://localhost",l.scrollbars="yes");let d=Object.entries(l).reduce((e,t)=>{let[n,i]=t;return"".concat(e).concat(n,"=").concat(i,",")},"");if(function(){var e;let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,r.z$)();return eS(t)&&!!(null===(e=window.navigator)||void 0===e?void 0:e.standalone)}(u)&&"_self"!==c)return function(e,t){let n=document.createElement("a");n.href=e,n.target=t;let i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}(t||"",c),new iU(null);let h=window.open(t||"",c,d);S(h,e,"popup-blocked");try{h.focus()}catch(e){}return new iU(h)}(e,a,nE())}async _openRedirect(e,t,n,i){var r;return await this._originValidation(e),r=await iF(e,t,n,N(),i),nk().location.href=r,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(n||R("If manager is not set, promise should be"),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await iL(e),n=new iT(e);return t.register("authEvent",t=>(S(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(iV,{type:iV},n=>{var i;let r=null===(i=null==n?void 0:n[0])||void 0===i?void 0:i[iV];void 0!==r&&t(!!r),y(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=iS(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return eR()||eT()||eS()}constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ny,this._completeRedirectFn=iI,this._overrideRedirectResult=io}}let iH=ix;class iq{_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return R("unexpected MultiFactorSessionType")}}constructor(e){this.factorId=e}}class ij extends iq{static _fromCredential(e){return new ij(e)}_finalizeEnroll(e,t,n){return F(e,"POST","/v2/accounts/mfaEnrollment:finalize",M(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return F(e,"POST","/v2/accounts/mfaSignIn:finalize",M(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}constructor(e){super("phone"),this.credential=e}}class iz{static assertion(e){return ij._fromCredential(e)}constructor(){}}iz.FACTOR_ID="phone";class iG{static assertionForEnrollment(e,t){return iW._fromSecret(e,t)}static assertionForSignIn(e,t){return iW._fromEnrollmentId(e,t)}static async generateSecret(e){var t,n;S(void 0!==(null===(t=e.user)||void 0===t?void 0:t.auth),"internal-error");let i=await F(n=e.user.auth,"POST","/v2/accounts/mfaEnrollment:start",M(n,{idToken:e.credential,totpEnrollmentInfo:{}}));return iK._fromStartTotpMfaEnrollmentResponse(i,e.user.auth)}}iG.FACTOR_ID="totp";class iW extends iq{static _fromSecret(e,t){return new iW(t,void 0,e)}static _fromEnrollmentId(e,t){return new iW(t,e)}async _finalizeEnroll(e,t,n){return S(void 0!==this.secret,e,"argument-error"),F(e,"POST","/v2/accounts/mfaEnrollment:finalize",M(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){S(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let n={verificationCode:this.otp};return F(e,"POST","/v2/accounts/mfaSignIn:finalize",M(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n}))}constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}}class iK{static _fromStartTotpMfaEnrollmentResponse(e,t){return new iK(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let i=!1;return(iB(e)||iB(t))&&(i=!0),i&&(iB(e)&&(e=(null===(n=this.auth.currentUser)||void 0===n?void 0:n.email)||"unknownuser"),iB(t)&&(t=this.auth.name)),"otpauth://totp/".concat(t,":").concat(e,"?secret=").concat(this.secretKey,"&issuer=").concat(t,"&algorithm=").concat(this.hashingAlgorithm,"&digits=").concat(this.codeLength)}constructor(e,t,n,i,r,s,a){this.sessionInfo=s,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=r}}function iB(e){return void 0===e||(null==e?void 0:e.length)===0}var iJ="@firebase/auth",iY="1.5.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iX{getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){return(this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser)?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}constructor(e){this.auth=e,this.internalListeners=new Map}}let i$=(0,r.Pz)("authIdTokenMaxAge")||300,iQ=null,iZ=e=>async t=>{let n=t&&await t.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>i$)return;let r=null==n?void 0:n.token;iQ!==r&&(iQ=r,await fetch(e,{method:r?"POST":"DELETE",headers:r?{Authorization:"Bearer ".concat(r)}:{}}))};function i0(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,s.Mq)(),t=(0,s.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let n=eq(e,{popupRedirectResolver:iH,persistence:[nV,n_,ny]}),i=(0,r.Pz)("authTokenSyncURL");if(i){let e=iZ(i);ni(n,e,()=>e(n.currentUser)),nn(n,t=>e(t))}let a=(0,r.q4)("auth");return a&&ej(n,"http://".concat(a)),n}i="Browser",(0,s.Xd)(new c.wA("auth",(e,t)=>{let{options:n}=t,r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let l=new eC(r,s,a,{apiKey:o,authDomain:c,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eN(i)});return function(e,t){let n=(null==t?void 0:t.persistence)||[],i=(Array.isArray(n)?n:[n]).map(ep);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(i,null==t?void 0:t.popupRedirectResolver)}(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),(0,s.Xd)(new c.wA("auth-internal",e=>new iX(eL(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,s.KN)(iJ,iY,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(i)),(0,s.KN)(iJ,iY,"esm2017")}}]);