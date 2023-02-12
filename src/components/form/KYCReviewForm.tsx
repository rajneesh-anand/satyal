import React, { useState, useEffect } from "react";

function KYCReviewForm() {
  return (
    <div className="flex justify-center items-center my-16">
      <div className="p-6 bg-slate-100 max-w-sm text-center">
        <h2 className="font-semibold text-lg r text-gray-800 mt-2">
          Your Account is under KYC Verification
        </h2>

        <p className="mt-2 text-gray-600 ">
          Your KYC Document is under verification ! <br />
          The verification process takes few days.
          <br /> We will send you the verification result through email
        </p>
      </div>
    </div>
  );
}

export default KYCReviewForm;
