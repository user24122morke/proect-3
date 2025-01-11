

import React, { Suspense } from "react";
import SignUp from "./components/Signup"; // Import your SignUp component directly


export default function Page() {
  return (
    <Suspense fallback={<p>.........loading</p>}>
      <SignUp />
    </Suspense>
  );
}
