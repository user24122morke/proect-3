

import React, { Suspense } from "react";
import SignIn from './component/Signin'


export default function Page() {
  return (
    <Suspense fallback={<p>.........loading</p>}>
      <SignIn />
    </Suspense>
  );
}
