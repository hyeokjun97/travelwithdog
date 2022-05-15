import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import axios from "axios";
import Swal from 'sweetalert2';
//reader.result
const SummerNote = ({ onContentChangeHandler, boardSelect }) => {
  const onImageUpload = (fileList) => {
    if (!boardSelect) {
      //alert("게시판을 먼저 선택해주세요");
      Swal.fire({
        icon: 'info',
        //title: 'Something',
        text: '게시판을 먼저 선택해주세요',
        confirmButtonColor: '#1d5e24',
      });
      return;
    }
    const formData = new FormData();
    formData.append("board_id", boardSelect);
    formData.append("image", fileList[0]);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/boards/${boardSelect}/images`,
        formData
      )
      .then((response) => ReactSummernote.insertImage(response.data.url));
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
