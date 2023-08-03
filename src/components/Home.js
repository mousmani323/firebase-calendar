import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import CounselingForm from "./CounselingForm";

const Home = () => {
  const { user } = useUserAuth();

  return (
    <>
      <div className="">
      {/* <CounselingForm /> */}
      </div>
    </>
  );
};

export default Home;
