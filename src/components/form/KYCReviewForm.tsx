import React, { useState, useEffect } from "react";
import Card from "@components/common/card";

function KYCReviewForm() {
  return (
    <div className="flex justify-center items-center">
      <Card className=" w-full md:w-8/12 mt-8 text-center">
        <div className="text-center bg-slate-100 py-4">
          <h4 className="font-nunito font-semibold text-red-900">KYC STATUS</h4>
        </div>
        <div className="p-6 bg-slate-100  mt-2 text-center">
          <h2 className="font-semibold text-lg r text-green-800 mt-2">
            Your Account is under KYC Verification
          </h2>

          <p className="mt-2 text-gray-600 ">
            Your KYC Document is under verification ! <br />
            The verification process takes few days.
            <br /> We will send you the verification result through email
          </p>
        </div>
      </Card>
    </div>
  );
}

export default KYCReviewForm;
