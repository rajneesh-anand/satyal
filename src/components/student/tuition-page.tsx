import Container from "@components/ui/container";
import React, { useState, useEffect, useRef } from "react";
import { ValueType } from "@data/constant";
import Card from "@components/common/card";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";

export default function TuitionDetail() {
  const { data: session, status } = useSession();
  const [Subjects, setSubjects] = useState<ValueType[]>();
  const [teachers, setTeachers] = useState([]);
  const [teacherStatus, setTeacherStaus] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef<any>();
  socket.current = io("http://localhost:4000");

  console.log(teacherStatus);

  useEffect(() => {
    const fetchSubjectsByClass = async () => {
      if (session) {
        const studentClass = JSON.parse(session?.user?.className).value;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/file/class/${studentClass}`
        );
        const data = await res.json();
        setSubjects(data);
      }
    };
    fetchSubjectsByClass();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      setCurrentUser(await JSON.parse(localStorage.getItem("cUser")));
    };
    getUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current.emit("connected", currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    socket.current.on("teachersListClassSubjectWise", (data) =>
      setTeachers(data)
    );
    socket.current.on("onlineTeachers", (data) => setTeacherStaus(data));
  }, [socket]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleSubjectClick = (subject) => {
    socket.current.emit("findTeachersSubjectWise", {
      studentClass: session?.user?.className,
      subject,
    });
  };

  const handleSendMsg = async (email) => {
    const data = await JSON.parse(localStorage.getItem("cUser"));
    socket.current.emit("send-msg", {
      to: email,
      from: data.email,
      msg: "HEllO FROM MARS",
    });
  };

  // const handleTuitionRequest = (email) => {
  //   socket.current.emit("studentTutionRequest", {
  //     to: email,
  //     from: session?.user?.email,
  //     msg: "HEllO FROM MARS",
  //   });

  //   socket.emit("studentTutionRequest", {
  //     email: session?.user?.email,
  //     name: session?.user?.name,
  //     to: email,
  //   });
  // };

  return (
    <Container>
      <div className="flex justify-center space-x-2">
        {Subjects &&
          Subjects.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSubjectClick(item.value)}
              className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  shadow-sm transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-lg border-2 border-rose-700"
            >
              {item.value}
            </button>
          ))}
      </div>

      <div className="grid grid-cols-12 gap-4 py-4">
        {teachers.map((item, idx) => (
          <div
            key={idx}
            className="col-span-12 lg:col-span-3 text-center bg-slate-200 rounded-lg relative shadow-sm hover:bg-slate-300 "
          >
            <div className="mt-6 w-fit mx-auto">
              <img
                src="/images/avatar.svg"
                className="rounded-full w-28 "
                alt="profile picture"
              />
            </div>

            <div className="mt-8 ">
              <h2 className="text-xl tracking-wide ">
                {item.firstName} {item.lastName}
              </h2>
              <h2 className=" text-md tracking-wide ">{item.email}</h2>
            </div>

            {teacherStatus.find((itm) => itm.email === item.email) ? (
              <p className="text-indigo-600 font-semibold text-emerald-600 my-2">
                Online
              </p>
            ) : (
              <p className="text-rose-600 font-semibold my-2">Offline</p>
            )}

            <button
              onClick={() => handleSendMsg(item.email)}
              className=" px-1 py-2 my-4"
            >
              Send Request for Tuition
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
