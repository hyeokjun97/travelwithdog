import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";

const SummerNote = ({ where, onContentChangeHandler }) => {
  const onImageUpload = (fileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

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
        onImageUpload={onImageUpload}
      />
    </section>
  );
};

export default SummerNote;
