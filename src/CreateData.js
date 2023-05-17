import styled from "styled-components";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import {EffectCoverflow, Pagination} from "swiper";

/* eslint-disable */
function CreateData({data}) {

    const newData = data.filter((data,index)=>data.pm10 > 0);


    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            style={{perspective: ` 300px`}}
        >
            {
                newData.map((item, idx) =>
                    <SwiperSlide key={idx}>
                        <Container key={idx}>
                            <div className="stateContainer">
                                <div className="state">현재상태</div>
                                <div className="stateIcon">
                                    <img src={item.state} alt="현재 날씨"></img>
                                </div>
                            </div>
                            <ResultWrap>
                                <div className="city">위치는 : {item.location}</div>
                                <div className="big">미세먼지 수치는 : {item.pm10}</div>
                                <div className="tiny">초미세먼지 수치는 : {item.pm2_5}</div>
                            </ResultWrap>
                        </Container>
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}

export default CreateData;

const ResultWrap = styled.div`
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(177, 195, 201, 0.58);





`;

const Container = styled.div`{
  flex-wrap: wrap;
  display: flex;
  justify-content: center;

  box-shadow: rgba(0, 0, 0, 0) 0 54px 55px, rgba(0, 0, 0, 0.06) 0px -12px 30px, rgba(0, 0, 0, 0.08) 0px 4px 6px, rgba(0, 0, 0, 0.04) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 50px;
  padding: 20px;
  margin: 20px auto 20px;
  width: 300px;

}`;
