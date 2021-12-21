import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { getPolicy } from "../lib/request";

export const PolicyEditPage = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useRouter().query;
  const [policy, setPolicy] = useState(null);
  useEffect(() => {
    if (id) {
      console.log(id);
      getPolicy(parseInt(id)).then((response) => {
        setPolicy(response.data);
      });
    }
  }, [id]);
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="lg:w-2/5 md:w-3/5 w-4/5">
          <label className="mt-6">Email address: {policy?.id}</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            placeholder=""
            value={signInEmail}
            // onChange={(e) => handleSignInEmailFieldChange(e)}
          />
          <label className="mt-6">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            placeholder=""
            value={signInPassword}
            // onChange={(e) => handleSignInPasswordFieldChange(e)}
          />
          <Button disabled={loading} loading={loading}>
            Update
          </Button>
          <p className="text-red-900">{errorMessage}</p>
        </div>
      </div>
    </>
  );
};
