import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import StudentDashboardLayout from "@components/layout-dashboard-student";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Book() {
  const router = useRouter();
  const queryValue = router.query;
  // const bookName = queryValue["?bookName"];
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNavigation, setShowNavigation] = useState(true);
  const pdfContainerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  console.log(queryValue);

  // Parse the books query parameter back into an array
  const parsedBook = decodeURIComponent(queryValue?.books as string);

  // Function to handle scrolling to the bottom of the page
  const handleScrollToBottom = () => {
    const container = pdfContainerRef;
    if (container) {
      // const scrollHeight = container.scrollHeight;
      // const clientHeight = container.clientHeight;
      // const scrollPosition = container.scrollTop;
    }
  };

  // Function to handle going to the next page
  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to handle going to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageChange = (e) => {
    setCurrentPage(+e.target.value);
  };

  return (
    <StudentDashboardLayout>
      <div className="pt-2">
        <h1 className="text-2xl mb-2 ">{queryValue?.bookName}</h1>
        <div
          ref={pdfContainerRef}
          className="pdf-container"
          onScroll={handleScrollToBottom}
        >
          <div className="flex items-center justify-end gap-2 mb-4">
            {numPages && !showNavigation && (
              <p className="text-center mt-4"></p>
            )}
            {numPages && showNavigation && (
              <div className="text-center mt-4">
                <p className="text-white">
                  Page{" "}
                  <input
                    className="text-black text-sm w-16   rounded"
                    type="number"
                    id="pageNumber"
                    name="pageNumber"
                    min="1"
                    max={numPages}
                    value={currentPage}
                    onChange={(e) => handlePageChange(e)}
                  />{" "}
                  of {numPages}
                </p>
              </div>
            )}
            {showNavigation && (
              <div className="flex justify-center mt-4">
                <button
                  className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNextPage}
                  disabled={currentPage === numPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <Document file={parsedBook} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              className=" pdf-page"
              pageNumber={currentPage}
              width={600}
              height={300}
              renderTextLayer={false}
              
            />
          </Document>
          {/* </div> */}
        </div>
      </div>
      <style jsx>{`
        .pdf-container {
          max-width: 100%;
          max-height: 600px;
          margin: 0px;
          padding: 4px 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          // border-radius: 8px;
          background-color: #690f00;
          overflow: auto;
        }

        .pdf-page {
          display: block;
          margin: 30px;

          border: 1px solid #ccc;
          // border-radius: 8px;
          background-color: #666;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </StudentDashboardLayout>
  );
}
