import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { confirm } from "../api/confirm";
import Router from "next/router";

export default function Token() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("Confirming...");

  useEffect(() => {
    if (token) {
      confirm(token).then(
        (data) => {
          console.log("data", data);
					setStatus("Email confirmed successfully!");
					Router.push("/dashboard");
        },
        (err) => {
          console.log("err", err);
          setStatus("You fucked up! " + err);
        }
      );
    }
  }, [token]);

  return <>{status}</>;
}
