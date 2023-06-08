import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../features/login/loginSlice";
import { useEffect } from "react";

export const useAuto = () => {
  const user = useSelector(selectLoginUser);
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push("/");
  });
};
