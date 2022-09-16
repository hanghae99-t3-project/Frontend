import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityDeleteThunk } from "../../redux/modules/communitySlice";
import {
  CommunityCardWrap,
  IconWrap,
  CardContents,
  IconBox,
  RepleCircle,
  NullCircle,
  ProfilePhoto,
  Names,
  Category,
  Title,
  Dog,
  User,
} from "./CommunityCard.styled";

const CommunityCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(data);


  return (
    <CommunityCardWrap>
      <IconWrap>
        {window.sessionStorage.getItem("nick") === data.nick ? (
          <>
            <IconBox length={"24px"} size={"24px"} url={"/img/pen.png"} hover={"blue"} />
            <IconBox
              onClick={() => {
                dispatch(getCommunityDeleteThunk(data.communityNo));
              }}
              length={"24px"}
              size={"34px"}
              url={"/img/delete.png"}
              hover={"red"}
            />
          </>
        ) : (
          ""
        )}
        <IconBox length={"24px"} size={"24px"} url={"/img/comment.png"} />
        {data.reviewCount === 0 ? <NullCircle/> : <RepleCircle>{data.reviewCount}</RepleCircle>}
      </IconWrap>

      <CardContents>
        <ProfilePhoto url={data.communityImg} />
        <Names>
          <Dog>{data.breed}</Dog>
          <User>{data.nick}</User>
        </Names>
        <Category>{data.category}비어</Category>
        {/* <Title onClick={detailHandler(data.communityNo)}>{data.title}</Title> */}
        <Title
          onClick={() => {
            navigate(`/community/${data.communityNo}`);
          }}
        >
          {data.title}
        </Title>
      </CardContents>
    </CommunityCardWrap>
  );
};

export default CommunityCard;
