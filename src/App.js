import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import logo1 from "./img/rainbow.png";
import logo2 from "./img/sun.png";
import logo3 from "./img/dust.png";
import base from "./img/think.png";
import CreateData from "./CreateData";

/* eslint-disable */
const API_KYE = `e1d62e89d08eee1fef474296c2e13534`;

function App() {
  const [location, setLocation] = useState("서울");
  const [coordinates, setCoordinate] = useState(["서울"]);

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KYE}`;

  //위도 경도
  const [latitude, setLatitude] = useState("37.5665");
  const [longitude, setLongitude] = useState("126.978");

  const locations = () => {
    setCoordinate([location, ...coordinates]);
  };

  const searchCoordinate = async () => {
    if ("Click") {
      try {
        const data = await axios({
          method: "get",
          url: url,
        });

        if (data["data"][0] != null) {
          setLatitude(data["data"][0]["lat"]);
          setLongitude(data["data"][0]["lon"]);
        } else {
          setPm10(0);
          setPm2_5(0);
          alert("잘못입력하셨습니다,");
        }
      } catch (arr) {}
    }
  };

  const [pm2_5, setPm2_5] = useState(0);
  const [pm10, setPm10] = useState(0);
  const newUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KYE}`;
  //미세먼지

  const searchWeather = async () => {
    const weatherData = await axios({
      method: "get",
      url: newUrl,
    });
    setPm10(weatherData["data"]["list"][0]["components"]["pm10"]);
    setPm2_5(weatherData["data"]["list"][0]["components"]["pm2_5"]);
  };

  const [state, setState] = useState(base);

  const stateQuery = () => {
    // pm10 >0 && pm10 < 30 ? setState(logo1) : (pm10 > 29 && pm10 < 80) ? setState(logo2) : setState(logo3);
    // pm10>=80 ? setState(logo3) : (pm10<80 && pm10>=30 )? setState(logo2):setState(logo1)
    if (pm10 > 0 && pm10 < 30) {
      setState(logo1);
    } else if (pm10 > 0 && pm10 < 30) {
      setState(logo2);
    } else {
      setState(logo3);
    }
  };

  const submit = () => {
    onCreate(state, location, pm10, pm2_5);
  };

  const [data, setData] = useState([]);
  const onCreate = (state, location, pm10, pm2_5) => {
    const newData = {
      state,
      location,
      pm10,
      pm2_5,
    };
    setData([newData, ...data]);
  };

  useEffect(() => {
    searchWeather();
  }, [latitude]);

  useEffect(() => {
    stateQuery();
    submit();
  }, [pm10]);

  useEffect(() => {}, [data]);

  return (
    <AppWrap>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="도시를 입력하세요."
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <button
          onClick={() => {
            searchCoordinate();
            locations();
          }}>
          오늘의 미세먼지
        </button>
      </div>
      <div>
        <CreateData data={data} onCreat={onCreate} />
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  font-family: "Adobe 고딕 Std B";
  width: 500px;
  box-sizing: border-box;
  text-align: center;
  margin-top: 100px;
  margin-right: auto;
  margin-left: auto;

  img {
    width: 100px;
    margin-top: 10px;
  }

  .inputContainer {
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
  }

  input {
    width: 200px;
    padding: 10px 5px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border: none;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    font-size: 20px;
  }

  button {
    border: none;
    background-color: white;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
    margin: 30px auto 150px;
  }

  button:hover {
    background-color: rgba(75, 71, 71, 0.55);
    color: white;
  }

  .stateContainer .state {
    font-size: 30px;
    line-height: 120px;
  }

  .stateContainer {
    width: 300px;
    display: flex;
    margin: 0 auto;
    justify-content: space-evenly;
  }
`;
