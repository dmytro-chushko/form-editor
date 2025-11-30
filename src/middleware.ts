// import { NextResponse } from 'next/server';

// import { auth } from './lib/auth';

// export default auth((req) => {
//   if (!req.auth) {
//     const url = new URL('/auth/sign-in', req.url);
//     url.searchParams.set(
//       'callbackUrl',
//       req.nextUrl.pathname + req.nextUrl.search
//     );

//     return NextResponse.redirect(url);
//   }
// });

import { NextResponse } from 'next/server';

import { auth } from './lib/auth';

export default auth((req) => {
  if (!req.auth) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set(
      'callbackUrl',
      req.nextUrl.pathname + req.nextUrl.search
    );

    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
