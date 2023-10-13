import React, { useState } from "react";
import { IonlineClassNote } from "../../../../types/server/props";
import { HeadingType } from "../../../../enums/tittle";
import Heading from "@components/ui/heading";
// import Notice from '@components/common/onlineClass/Notice';
import Notice from "@components/teacher/note/notice";
import { Button } from "@components/ui/button/dashboard-button";
import { ButtonSize, ButtonType } from "../../../../enums/buttons";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import IconButton from "@components/ui/button/icon-button";
import Modal from "@components/common/modal/modal";
import axios from "axios";
import { useSession } from "next-auth/react";

interface IProps {
  notes: IonlineClassNote[];
  setRefresh: React.Dispatch<React.SetStateAction<string>>;
}
interface IdeleteNote {
  noticeid: number | null;
  onlineClassId: number | null;
}
export default function viewnote({ notes, setRefresh }: IProps) {
  let { data: session } = useSession();
  let [modalState, setModalState] = useState(false);
  let [deleteNoteID, setDeleteNoteID] = useState<IdeleteNote>({
    noticeid: null,
    onlineClassId: null,
  });

  let handelDeleteModalState = () => {
    setModalState((state) => !state);
  };
  // handeler for deleteNoteID state
  let handelDeleteNoticeState = (id: number, onlineClassCode: number) => {
    handelDeleteModalState();
    setDeleteNoteID({
      noticeid: id,
      onlineClassId: onlineClassCode,
    });
  };
  // handeler for notice delete cancel
  let handelCancleDelete = () => {
    setDeleteNoteID({
      noticeid: null,
      onlineClassId: null,
    });
    handelDeleteModalState();
  };
  // asny function for deleting notice
  let deleteNoticeFromDB = async () => {
    if (deleteNoteID) {
      let response = await axios.delete(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/note/onlineClass/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            id: deleteNoteID?.noticeid,
            onlineClassId: deleteNoteID?.onlineClassId,
            teacherEmail: session?.user?.email,
          }),
        }
      );
      if (response?.status === 200) {
        handelDeleteModalState();
        setRefresh(response.data);
      }
    } else {
      console.log("please select notice");
    }
  };

  return (
    <>
      <section className="py-3 px-4 flex flex-col w-[370px] sm:w-[700px] h-[600px] sm:h-[900px] lg:w-[1000px] lg:h-[700px] bg-secondary-background opacity-100 rounded-lg">
        <div className="py-0 sm:py-2 w-full text-center border-b border-solid border-mid-footer">
          <Heading variant={HeadingType.MediumHeading}>ALL NOTES</Heading>
        </div>
        <div className="w-full h-full overflow-y-auto py-2 sm:py-4 ">
          {notes.length > 0 ? (
            notes.map((note) => {
              return (
                <div
                  className="flex justify-between py-2 px-0 sm:px-2 my-2 "
                  key={note.id}
                >
                  <Notice
                    note={note}
                    handelDeleteNotice={handelDeleteNoticeState}
                  />
                  <div className="pl-[20px] hidden sm:flex items-center">
                    <IconButton
                      type="primary"
                      size="large"
                      onClick={() =>
                        handelDeleteNoticeState(note?.id, note?.onlineClassId)
                      }
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center py-2 sm:py-4">
              <Heading variant={HeadingType.MediumHeading}>
                You Can Add Notices For Students
              </Heading>
            </div>
          )}
        </div>
      </section>
      <Modal open={modalState} onClose={handelDeleteModalState}>
        <div className="w-[300px] sm:w-[350px] h-[250px] sm:h-[250px] py-4 px-4 flex flex-col justify-between">
          <div className="w-full text-center">
            <Heading
              variant={HeadingType.MediumHeading}
              className="text-xl font-semibold"
            >
              Delete this notice?
            </Heading>
          </div>
          <div className="">
            <Heading variant={HeadingType.Base}>
              Are you sure you want to remove the notice from this class?
            </Heading>
          </div>
          <div className="py-2 px-6 flex justify-between">
            <div className="">
              <Button
                type={ButtonType.Secondary}
                size={ButtonSize.Medium}
                onClick={handelCancleDelete}
              >
                Cancel
              </Button>
            </div>
            <div className="">
              <Button
                type={ButtonType.Primary}
                size={ButtonSize.Medium}
                onClick={deleteNoticeFromDB}
              >
                Delete Notice
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
