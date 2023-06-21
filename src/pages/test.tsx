import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "@components/layout";
import { useSession } from "next-auth/react";

const TestPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchBooksByClass = async () => {
      if (session) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/test/book/${
            JSON.parse(session?.user?.className).value
          }`
        );
        const data = await res.json();
        console.log(data);
      }
    };
    fetchBooksByClass();
  }, []);

  // const ReactReader = dynamic(
  //   () => import("react-reader").then((res) => res.ReactReader),
  //   { ssr: false }
  // );

  // // And your own state logic to persist state
  // const [location, setLocation] = useState(null);
  // const [firstRenderDone, setFirstRenderDone] = useState(false);
  // const renditionRef = useRef(null);
  // const locationChanged = (epubcifi) => {
  //   // Since this function is also called on initial rendering, we are using custom state
  //   // logic to check if this is the initial render.
  //   // If you block this function from running (i.e not letting it change the page on the first render) your app crashes.

  //   if (!firstRenderDone) {
  //     setLocation(localStorage.getItem("book-progress")); // getItem returns null if the item is not found.
  //     setFirstRenderDone(true);
  //     return;
  //   }

  //   // This is the code that runs everytime the page changes, after the initial render.
  //   // Saving the current epubcifi on storage...
  //   localStorage.setItem("book-progress", epubcifi);
  //   // And then rendering it.
  //   setLocation(epubcifi); // Or setLocation(localStorage.getItem("book-progress"))
  // };
  return session ? (
    <>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user?.userType}</h1>
      <h1>{session?.user?.className}</h1>
    </>
  ) : (
    <h1>You are not logged in</h1>
  );
  // <div style={{ height: "100vh" }}>
  //   {/* <ReactReader
  //     url="https://react-reader.metabits.no/files/alice.epub"
  //     location={currentLocation}
  //     locationChanged={onLocationChanged}
  //     tocChanged={(toc) => console.log(toc)}
  //   /> */}

  //   <ReactReader
  //     location={location}
  //     locationChanged={locationChanged}
  //     url="https://react-reader.metabits.no/files/alice.epub"
  //     getRendition={(rendition) => (renditionRef.current = rendition)}
  //   />
  // </div>
};
TestPage.Layout = Layout;

export default TestPage;
