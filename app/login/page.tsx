"use client";

import { useActionState, useState } from "react";
import { login, signup, ActionState } from "./actions";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginState, loginAction] = useActionState<ActionState, FormData>(login, null);
  const [signupState, signupAction] = useActionState<ActionState, FormData>(signup, null);

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {loginState?.message && <p>{loginState.message}</p>}
      {signupState?.message && <p>{signupState.message}</p>}

      <button formAction={loginAction}>Log in</button>
      <button formAction={signupAction}>Sign up</button>
    </form>
  );
};

export default Page;