import React, { useState } from "react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import Modal from "@components/common/modal/modal";
import OnlineClassModal from "../../components/teacher/onlineclassmodal";
import { Card } from "react-bootstrap";

export default function onlineclass() {
  const [openModal, setOpenModal] = useState(false);
  const [section, setSection] = useState([]);
  const [classCode, setClassCode] = useState("      ");
  const [className, setClassName] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const handleInputChange = (e) => {
    setSection(e.target.value);
  };

  const [subjects, setSubjects] = useState([]);
  function handleClassChange(value) {
    setClassName(value.value);
    setSubjects(value.subject);
  }
  function handleSubjectChange(value) {
    setSelectedSubject(value.value);
  }

  function handleClick() {
    setOpenModal(true);
  }

  function handleModalClose() {
    setOpenModal(false);
  }

  return (
    <TeacherDashboardLayout>
      <div className="justify-left sm:flex gap-6 mt-4">
        <div className="mt-2">
          <Select
            className=" rounded px-2 py-1 text-sm w-44"
            options={subject_inClass}
            placeholder="SELECT CLASS"
            onChange={handleClassChange}
          />
        </div>
        <Modal onClose={handleModalClose} open={openModal}>
          <OnlineClassModal
            subjects={subjects}
            handleClassChange={handleClassChange}
            handleSubjectChange={handleSubjectChange}
            setSection={setSection}
            handleInputChange={handleInputChange}
          />
        </Modal>
        <div className="mt-2">
          <button
            className="mt-[10px] sm:mt-[10px] py-2 px-4 bg-dark-footer rounded-md text-white text-md font-bold hover:bg-mid-footer"
            onClick={handleClick}
          >
            Create
          </button>
        </div>
        <div></div>
      </div>
    </TeacherDashboardLayout>
  );
}
