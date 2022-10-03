import { initial } from "lodash";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { getCommunityPostThunk, getCommunityPostListThunk } from "../../redux/modules/communitySlice";
import {
  StyledCommunityPostForm,
  StyledCategory,
  StyledUserName,
  StyledTitle,
  StyledContent,
  StyledImgFile,
  StyledLabel,
  StyledPosts,
  StyledFileInput,
  StyledSelect,
  StyledInput,
  StyledTextArea,
  StyledButtonWrap,
  StyledUserNick,
} from "./CommunityPost.styled";

const CommunityPost = ({ modalHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef();
  const userNick = window.localStorage.getItem("nick");

  const initialState = {
    data: {
      title: "",
      content: "",
      category: "",
    },
    imgUrl: [],
  };

  const [uploadImg, setUploadImg] = useState("");

  // 다차원 객체 state의 프로퍼티 값을 수정해야함

  const [post, setPost] = useState(initialState);
  const [img, setImg] = useState([]);

  const onChangeImgHandler = (event) => {
    // const { files } = event.target
    // console.log(files);
    // console.log(typeof(files));

    // const formdata = new FormData();
    // console.log(formdata);
    // files ? formdata.append("image", files) : alert("사진을 추가해주세요.");

    // formdata.getAll('image')
    // for (const keyValue of formdata) console.log(keyValue);

    const maxFileNum = 3; // 최대 첨부가능한 갯수

    // 선택한 이미지들
    const images = event.target.files;
    console.log("선택한 이미지들 :", images);
    if (images.length > 3) {
      alert("이미지는 3개까지만 첨부 가능합니다.");
    } else {
      // 최대갯수로 받은 이미지
      const imagesMax = [...images].slice(0, maxFileNum);
      console.log(imagesMax);
      setImg(imagesMax);

      // 이미지 미리보기로 보여줄려면 url이 필요함
      for (let i = 0; i < imagesMax.length; i++) {
        img.push(URL.createObjectURL(imagesMax[i]));
      }
    }
  };

  const onChangeDataHandler = (event) => {
    // console.log(event.target.name, ":", event.target.value);/
    const { name, value } = event.target;
    console.log(name, ":", value);
    setPost({
      ...post,
      data: {
        ...post.data,
        [name]: value,
      },
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(e);

    const haveToSend = {
      data: {
        title: post.data.title,
        content: post.data.content,
        category: post.data.category,
      },

      imgUrl: img,
    };

    console.log(haveToSend);
    dispatch(getCommunityPostThunk(haveToSend));
    modalHandler();
    window.location.reload()
    // navigate("/");
    // navigate("/community");
  };

  // console.log(post);

  return (
    <StyledCommunityPostForm onSubmit={onSubmitHandler}>
      <StyledCategory>
        <StyledLabel topLeftRadius={"10px"} bottomLeftRadius={"none"}>
          <label>분류</label>
        </StyledLabel>
        <StyledPosts>
          <StyledSelect name="category" onChange={onChangeDataHandler}>
            <option value="">분류선택</option>
            <option value="장터">장터</option>
            <option value="호텔">호텔</option>
            <option value="병원">병원</option>
            <option value="자유">자유</option>
          </StyledSelect>
        </StyledPosts>
      </StyledCategory>

      <StyledUserName>
        <StyledLabel borderTop={"1px solid #797979"}>
          <label>작성자</label>
        </StyledLabel>
        <StyledPosts borderTop={"1px solid #797979"}>
          <StyledUserNick>{userNick}</StyledUserNick>
        </StyledPosts>
      </StyledUserName>

      <StyledTitle>
        <StyledLabel borderTop={"1px solid #797979"}>
          <label>제목</label>
        </StyledLabel>
        <StyledPosts borderTop={"1px solid #797979"}>
          <StyledInput type="text" name="title" required onChange={onChangeDataHandler} />
        </StyledPosts>
      </StyledTitle>

      <StyledImgFile>
        <StyledLabel borderTop={"1px solid #797979"}>
          <label>사진</label>
        </StyledLabel>
        <StyledPosts borderTop={"1px solid #797979"}>
          <div>
            <StyledFileInput onChange={onChangeImgHandler} type="file" name="imgUrl" accept="image/*" multiple />
          </div>
        </StyledPosts>
      </StyledImgFile>

      <StyledContent>
        <StyledLabel bottomLeftRadius={"10px"} borderTop={"1px solid #797979"}>
          <label>내용</label>
        </StyledLabel>
        <StyledPosts borderTop={"1px solid #797979"}>
          <StyledTextArea onChange={onChangeDataHandler} name="content" />
        </StyledPosts>
      </StyledContent>

      <StyledButtonWrap>
        <button type="submit">등록하기</button>
      </StyledButtonWrap>
    </StyledCommunityPostForm>
  );
};

export default CommunityPost;
