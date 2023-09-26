import React, { useState } from "react";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import { ButtonSize, ButtonType } from "../../../enums/buttons";
import { Button } from "@components/ui/button/dashboard-button";
import Modal from "@components/common/modal/modal";

import { MdCheckCircle } from "react-icons/md";
import OnlineClassModal from "@components/student/onlineclassmodal";

function OnlineClass() {
  const [openModal, setOpenModal] = useState(false);

  function handleClick() {
    setOpenModal((state) => !state);
  }

  return (
    <>
      <StudentDashboardLayout>
        <div className="mx-8 sm:mx-[30px]">
          <Button
            size={ButtonSize.Large}
            type={ButtonType.Primary}
            onClick={handleClick}
          >
            <span className="flex items-center">
              JOIN CLASS
              <span className="rounded-full bg-green-500 text-white p-1 ml-2">
                <MdCheckCircle size={20} />
              </span>
            </span>
          </Button>
        </div>
        <Modal onClose={handleClick} open={openModal}>
          <OnlineClassModal />
        </Modal>
      </StudentDashboardLayout>
    </>
  );
}

export default OnlineClass;
