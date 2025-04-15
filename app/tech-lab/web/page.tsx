"use client";

import Ckeditor from "@/app/_components/editor/Ckeditor";
import React, { useEffect, useState } from "react";

const page = () => {
  // useEffect(() => {
  //   console.log("테스트");
  // }, []);

  const [editor, setEditor] = useState<ClassicEditor | null>(null);
  const [data, setData] = useState("");

  return (
    <div>
      테스트
      <Ckeditor />
    </div>
  );
};

export default page;
