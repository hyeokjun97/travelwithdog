import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "react-summernote/lang/summernote-ko-KR"; // you can import any other locale
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "./summerNote.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const SummerNote = ({ where, onContentChangeHandler, initial }) => {
  const onInputChange = (content) => {
    onContentChangeHandler(content);
  };
  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        let formData = new FormData();
        formData.append("files", images[i]);
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/file/${where}htmlimage`,
            formData
          )
          .then((response) =>
            insertImage(
              `${process.env.REACT_APP_BASEURL}-images/${
                where === "notice" ? "Notice" : "Exp"
              }/${response.data}`,
              ($image) => {
                $image.css("width", "100%");
                $image.attr("alt", $image.name);
              }
            )
          )
          .catch((err) => console.error(err));
      };

      reader.readAsDataURL(images[i]);
    }
  };

  return (
    <section className="summer">
      <ReactSummernote
        children={<div dangerouslySetInnerHTML={{ __html: initial }}></div>}
        options={{
          lang: "ko-KR",
          height: 350,
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
        onImageUpload={onImageUpload}
        onChange={onInputChange}
      />
    </section>
  );
};

export default SummerNote;
