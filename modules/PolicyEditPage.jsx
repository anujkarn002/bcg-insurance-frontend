import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { getPolicy, updatePolicy } from "../lib/request";
import styles from "../styles/Home.module.css";

export const PolicyEditPage = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (policy?.premium > 1000000) {
      alert("Premium should be less than 1 million");
      setLoading(false);
    } else {
      updatePolicy(id, { premium: policy?.premium })
        .then((response) => {
          setLoading(false);
          alert("Policy updated");
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="lg:w-2/5 md:w-3/5 w-4/5">
          <label className="mt-6">Date of Purchase</label>
          <Input
            type="text"
            disabled
            value={moment(policy?.datePurchased).format("MMM Do YYYY")}
          />

          <label className="mt-6">Premium</label>
          <Input
            type="number"
            placeholder="Enter premium"
            value={policy?.premium}
            onChange={(e) =>
              setPolicy({ ...policy, premium: parseInt(e.target.value) })
            }
          />
          <Button disabled={loading} loading={loading} onClick={onSubmit}>
            Update
          </Button>
          <p className="text-red-900">{errorMessage}</p>
        </div>
      </div>
    </>
  );
};
