import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommunityDetailRipleCard from "../../components/communityDetialRipleCard/CommunityDetailRipleCard";
import { StyledCommunityContainer, StyledCommunityWrap } from "../community/Community.styled";
import {
  StyledImgList,
  StyledDetailWrap,
  StyledPostContainer,
  StyledTitle,
  StyledPostInfo,
  StyledContent,
  StyledShowRiples,
  StyledRiple,
  StyledWriteRiple,
  StyledRipleBtn,
  StyledBottomBtn,
} from "./CommunityDetail.styled";
import { getCommunityDetailThunk } from "../../redux/modules/communitySlice";
import { groupBy, map } from "lodash";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.community.communityDetail);
  console.log("커뮤니티 디테일:", data);
  console.log(data.communityDetatilResponseDto);

  // const test = useSelector((state)=>console.log(state))

  let { id } = useParams();
  console.log(id);
 

  useLayoutEffect(() => {
    dispatch(getCommunityDetailThunk(Number(id)));
  }, [dispatch]);

  const OnCommentSubmitHandler = (e) => {
    alert("댓글 기능은 아직 구현중입니다.");
    e.preventdefault();
  };

  console.log("랜더링 전에 이게 나와야해 :", data.imgList);

  /** 날짜 포맷팅 함수*/
  const showDate = (date) => {
    return `${date?.split(" ").at(0)} ${date?.split(" ").at(1)} ${date?.split(" ").at(2)} ${date?.split(" ").at(-2)} ${date?.split(" ").at(-1)}`;
  };

  return (
    <StyledCommunityContainer id="super">
      <StyledCommunityWrap>
        <StyledDetailWrap>
          <StyledPostContainer marginTop={"60px"}>
            <StyledTitle>{data.communityDetatilResponseDto?.title}</StyledTitle>
            <StyledPostInfo>
              <div>분류 : {data.communityDetatilResponseDto?.category}</div>
              <div>작성자 : {data.communityDetatilResponseDto?.nick}</div>
              <div>견종 : {data.communityDetatilResponseDto?.breed}</div>
              <div>작성일 : {data.communityDetatilResponseDto?.createdAt}</div>
            </StyledPostInfo>

            {/* {console.log("랜더링 됨", data?.imgList)} */}

            <StyledContent>
              <StyledImgList>
                {data.imgResponseDtoList ? (
                  data.imgResponseDtoList?.map((el, i) => {
                    return <img key={i} alt="" src={el?.mapImgUrl} style={{ backgroundColor: "gray" }} />;
                  })
                ) : (
                  <div>이미지 없음</div>
                )}
                {/* {data.imgList?.map((el)=>{
                return (
                  <img alt="" src={el} style={{backgroundColor:'gray'}}/>
                  )
                })} */}
              </StyledImgList>
              <p>{data.content}</p>
            </StyledContent>
          </StyledPostContainer>

          <StyledRiple onSubmit={OnCommentSubmitHandler}>
            <StyledWriteRiple placeholder="000글자 이내로 작성해주세요" />
            <StyledRipleBtn type="submit">댓글달기</StyledRipleBtn>
          </StyledRiple>

          <StyledShowRiples>
            <CommunityDetailRipleCard data={data.reviewList} />
          </StyledShowRiples>

          <StyledBottomBtn>
            <button onClick={() => navigate("/community")}>목록으로</button>
          </StyledBottomBtn>
        </StyledDetailWrap>
      </StyledCommunityWrap>
    </StyledCommunityContainer>
  );
};

export default CommunityDetail;
