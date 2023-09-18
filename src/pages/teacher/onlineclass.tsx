import React, { useState } from "react";
import TeacherDashboardLayout from "@components/layout-dashboard-teacher";
import Select from "@components/ui/select/select";
import { subject_inClass } from "@data/constant";
import Modal from "@components/common/modal/modal";
import OnlineClassModal from "../../components/teacher/onlineclassmodal";
import {ButtonSize,ButtonType} from '../../../enums/buttons'
import { Button } from "@components/ui/button/dashboard-button";
// import { Card } from "react-bootstrap";

export default function onlineclass() {
  const [openModal, setOpenModal] = useState(false);
  const [section, setSection] = useState([]);
  const [classCode, setClassCode] = useState(" ");
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
      <div className="pt-2 pb-[50px] sm:pb-[10px] ">
        <div className="flex items-center">
          <div className="">
            <Select
              className=" rounded px-2 py-1 text-sm w-44"
              options={subject_inClass}
              placeholder="SELECT CLASS"
              onChange={handleClassChange}
            />
          </div>  
          <div className="  mx-4 sm:mx-[30px]">
            <Button size={ButtonSize.Large} type={ButtonType.Primary} onClick={handleClick}>CREATE CLASS</Button>
        
          </div>
          
        </div>
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
    </TeacherDashboardLayout>
  );
}
