import Container from "@components/ui/container";
import React, { useState, useEffect } from "react";
import { ValueType } from "@data/constant";
import Card from "@components/common/card";

export default function TuitionDetail({ data, socket }) {
  const studentClass = JSON.parse(data.class).value;
  const [Subjects, setSubjects] = useState<ValueType[] | undefined>();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/file/class`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ class: studentClass }),
        }
      );
      const subjects = await result.json();
      setSubjects(subjects);
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    socket.on("teachersList", (data) => setUsers(data));
    socket.on("teacherStatusResponse", (result) => setStatus(result));
  }, [socket, users, status]);

  const handleSubjectClick = (subject) => {
    socket.emit("findTeachers", { studentClass, subject });
  };

  const handleTuitionRequest = (email) => {
    socket.emit("studentTutionRequest", { to: email });
  };

  return (
    <Container>
      <div className="flex justify-center space-x-2">
        {Subjects &&
          Subjects.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSubjectClick(item.value)}
              className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              {item.value}
            </button>
          ))}
      </div>

      <div className="flex font-medium items-center justify-center ">
        {users.map((item, idx) => (
          <div
            key={idx}
            className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg my-2"
          >
            <div className="mt-6 w-fit mx-auto">
              <img
                src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                className="rounded-full w-28 "
                alt="profile picture"
              />
            </div>

            <div className="mt-8 ">
              <h2 className="text-white font-bold text-xl tracking-wide ">
                {item.firstName} {item.lastName}
              </h2>
              <h2 className="text-white font-normal text-md tracking-wide ">
                {item.email}
              </h2>
            </div>
            <p className="text-emerald-400 font-semibold mt-2.5">
              {status.find((itm) => itm.email === item.email)
                ? "Online"
                : "Offline"}
            </p>
            <button
              onClick={() => handleTuitionRequest(item.email)}
              className="text-gray-100 border-2 px-1 py-2"
            >
              Send Request for Tuition
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
