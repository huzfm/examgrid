import React from "react";
import Image from "next/image";

function page() {
  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen text-center">
        <div className="flex flex-col items-center justify-center flex-grow">
          <Image
            src="/exam.jpg"
            alt="Exam Grid Logo"
            width={200}
            height={200}
          />
          <h1 className="text-9xl mt-4">Welcome to Exam Grid</h1>
        </div>

        <footer className="mb-4">
          made with ❤️ by{" "}
          <a
            href="https://huzfm.vercel.app"
            className="text-blue-500 underline"
          >
            huzfm
          </a>{" "}
          <a
            href="https://ikram-zargar.web.app"
            className="text-blue-500 underline"
          >
            IkramZargar
          </a>
        </footer>
      </div>
    </>
  );
}

export default page;
