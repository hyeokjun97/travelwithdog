import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import axios from "axios";

const SummerNote = ({ where, onContentChangeHandler }) => {
  return (
    <section className="summer">
      <ReactSummernote
        options={{
          lang: "ko-KR",
          height: 500,
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
        onChange={onContentChangeHandler}
      />
    </section>
  );
};

export default SummerNote;
