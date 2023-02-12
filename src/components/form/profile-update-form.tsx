import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Card from "@components/common/card";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@contexts/user/user.context";
import TeacherProfileUpdateForm from "./teacher-profile-update-form";
import StudentProfileUpdateForm from "./student-profile-update-form";

export default function ProfileUpdateForm() {
  const { user } = useUserContext();

  return user.userType === "Teacher" ? (
    <TeacherProfileUpdateForm />
  ) : (
    <StudentProfileUpdateForm />
  );
}
