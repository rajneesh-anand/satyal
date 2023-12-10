// import Heading from "@components/ui/heading";
import Modal from "@components/common/modal/modal";
import React, { useState, useEffect } from "react";
import { Button } from "@components/ui/button/dashboard-button";
import { WiCloudUp } from "react-icons/wi";

import { ButtonSize, ButtonType } from "../../../../enums/buttons";

// import { HeadingType } from "../../../../enums/tittle";

export default function Workshite() {
  const [openModal, setOpenModal] = useState(false);
  let handelModalState = () => {
    setOpenModal((state) => !state);
  };

  return (
    <>
      <section className="w-[350px] sm:w-[700px] lg:w-[1200px] h-[650px] bg-secondary-background py-3 px-4 rounded-lg">
        <div className="w-full flex justify-center border-b border-solid border-mid-footer">
          <Button type={ButtonType.Primary} onClick={handelModalState}>
            <span className="flex items-center">
              Upload worksheet here
              <span className="rounded-ful text-white p-1 ml-2">
                <WiCloudUp size={20} />
              </span>
            </span>
          </Button>
        </div>
        <Modal onClose={handelModalState} open={openModal}>
          abc
        </Modal>
      </section>
    </>
  );
}
