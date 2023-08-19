import React from "react";

function QuestionHeader(props) {
  return (
    <div>
      <div className="flex flex-col text-center mt-2">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl ">
          {props.schoolname}
        </h1>

        <h6>{props.location}</h6>

        <h1>{props.subject}</h1>
      </div>
      <hr className="h-px mb-2  bg-gray-200 border-2" />
      <hr className="h-px bg-gray-200 border-2 " />
    </div>
  );
}

export default QuestionHeader;
