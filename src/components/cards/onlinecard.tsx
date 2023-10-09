import React from "react";

function Onlinecard({ onlineclass }) {
  console.log(onlineclass);

  return (
    <div className=" w-[400px] h-[250px] sm:h-[300px] sm:w-[400px] mx-auto my-15 relative flex">
      <div className=" bg-dark-footer w-[150px] h-[150px] sm:h-[110px] sm:w-[110px] absolute top-[70px] left-[50px] z-[2] rounded-full flex items-center justify-center">
        <img
          className="rounded-md h-[100px] w-[80px] "
          src="https://cdn4.vectorstock.com/i/1000x1000/25/58/office-paper-icon-outline-style-vector-22692558.jpg"
          alt=""
        />
      </div>
      <div className=" bg-mid-footer w-[250px] h-[250px] sm:h-[170px] sm:w-[280px] mt-8 absolute top-[15px] right-[3px] square rounded-full border border-black text-white p-[5px] pl-[15px] ">
        <div className="text-md font-bold flex flex-col space-y-4 items-center mt-4 mb-2 ">
          <h1>{onlineclass.onlineClassName}</h1>
          <h1>{onlineclass.onlineClassGrade}</h1>
          <h1>Class Code: {onlineclass.enrollCode}</h1>
        </div>
      </div>
    </div>
  );
}

export default Onlinecard;
