import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "react-summernote/lang/summernote-ko-KR"; // you can import any other locale
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import axios from "axios";

const SummerNote = ({ where, onContentChangeHandler, initial }) => {
  return (
    <section className="summer">
      <ReactSummernote
        children={<div dangerouslySetInnerHTML={{ __html: initial }}></div>}
        options={{
          lang: "ko-KR",
          height: 250,
          dialogsInBody: true,
          toolbar: [
            ["Font Style", ["fontname"]],
            ["style", ["bold", "italic", "underline"]],
            ["font", ["strikethrough"]],
            ["fontsize", ["fontsize"]],
            ["color", ["color"]],
            ["para", ["paragraph"]],
            ["height", ["height"]],
            ["Insert", ["picture"]],
            ["Insert", ["link"]],
          ],
        }}
      />
    </section>
  );
};

export default SummerNote;
