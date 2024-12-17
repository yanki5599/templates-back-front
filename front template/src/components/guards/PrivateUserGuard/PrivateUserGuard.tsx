import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { fetchValidateToken } from "../../../store/features/auth/authSlice";

interface PrivateUserGuardProps {
  children: React.ReactNode;
}

const PrivateUserGuard: React.FC<PrivateUserGuardProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const validate = async () => {
      dispatch(fetchValidateToken()).then((action) => {
        if (action.meta.requestStatus === "rejected") navigate("/");
      });
    };
    validate();
  }, []);

  return <> {status === "Fulfilled" && children}</>;
};

export default PrivateUserGuard;
