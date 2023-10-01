import React from "react";

function Onlinecard({ onlineclass }) {
  console.log(onlineclass);

  return (
    <div className="w-[100px] h-[100px] sm:h-[100px] sm:w-[150px] my-[20px] mx-[20px] bg-dark-footer rounded-2xl text-white text-md font-bold hover:bg-mid-footer flex">
      <div className="border-rounded">asd</div>
      <div className="mt-2">
        <h1>{onlineclass.onlineClassName}</h1>
        <h1>{onlineclass.onlineClassGrade}</h1>
        <h1>Class Code: {onlineclass.enrollCode}</h1>
      </div>
    </div>
  );
}

export default Onlinecard;
