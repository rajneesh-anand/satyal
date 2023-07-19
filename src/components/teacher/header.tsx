import React from "react";

function QuestionHeader() {
  return (
    <div>
      <div className="flex flex-col text-center mt-2">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl ">
          S.S.D. Public School
        </h1>

        <h6>Kathmandu</h6>

        <h1>G.k</h1>
      </div>
      <hr className="h-px mb-2  bg-gray-200 border-2" />
      <hr className="h-px bg-gray-200 border-2 " />
    </div>
  );
}

export default QuestionHeader;
