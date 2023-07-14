import React from 'react'
import OnlineClass from "../../../assets/icons/Online Class.svg";
import Assignments from "../../../assets/icons/Assignments.svg";
import Books from "../../../assets/icons/E-Books.svg";
import SmartClassVideos from "../../../assets/icons/Smart Class.svg";
import OnlineTution from "../../../assets/icons/Tuition.svg";
import MobileStickyMenu from "../../common/mobilemenu";

const menuItems=[
  {
    id:1,
    menuTitle:'Class',
    menuLink:'/teacher/dashboard',
    menuIcon:OnlineClass
  },
  {
    id:2,
    menuTitle:'Books',
    menuLink:'/teacher/books',
    menuIcon:Books
  },
  {
    id:3,
    menuTitle:'Assignment',
    menuLink:'/teacher/assignment',
    menuIcon:Assignments
  },
  {
    id:4,
    menuTitle:'Videos',
    menuLink:'/teacher/videos',
    menuIcon:SmartClassVideos
  },
  {
    id:5,
    menuTitle:'Tution',
    menuLink:'/teacher/tuition',
    menuIcon:OnlineTution
  }
]
 const StickyMenu:React.FC=()=> {
  return (
    <>
       <MobileStickyMenu menuItems={menuItems}/>
    </>
  )
}
export default StickyMenu;