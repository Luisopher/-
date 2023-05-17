import styled from "styled-components";
import {useState, useEffect} from "react";
import axios from "axios";
import logo1 from "./img/rainbow.png"
import logo2 from "./img/sun.png"
import logo3 from "./img/dust.png"
import CreateData from './CreateData'
/* eslint-disable */
const API_KYE = `e1d62e89d08eee1fef474296c2e13534`;

function App() {
    const [location, setLocation] = useState("서울");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KYE}`;

    //위도 경도
    const [latitude, setLatitude] = useState('37.5666791');
    const [longitude, setLongitude] = useState('126.9784147')

    // const [latitude, setLatitude] = useState();
    // const [longitude, setLongitude] = useState();

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
                    alert('잘못입력하셨습니다,')
                }

            } catch (arr) {

            }
        }
    };


    const [pm2_5, setPm2_5] = useState(0);
    const [pm10, setPm10] = useState(0);
    const newUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KYE}`;
    //미세먼지


    const searchWeather = async () => {

        try {
            const weatherData = await axios({
                method: "get",
                url: newUrl,
            });
            setPm10(weatherData["data"]["list"][0]["components"]["pm10"]);
            setPm2_5(weatherData["data"]["list"][0]["components"]["pm2_5"]);

        } catch (arr) {
            console.error('여기서 에러남')
        }
    }


    const [state, setState] = useState('');
    const stateQuery = () => {
        pm10 < 30 ? setState(logo1) : (pm10 > 29 && pm10 < 80) ? setState(logo2) : setState(logo3);
    }

    useEffect(() => {
        searchWeather();
    }, [latitude])


    useEffect(() => {
        stateQuery();
    }, [pm10])





    return (
        <AppWrap>
            <div className="appContentWrap">
                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder="도시를 입력하세요."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        onClick={searchCoordinate}
                    >버튼을 눌러 지역의 미세먼지를 알아보세요!
                    </button>
                </div>
               {/*<CreateData state={state} lotaion={lotation} pm10={pm10} pm_25={pm2_5}></CreateData>*/}
            </div>
        </AppWrap>
    );
}

export default App;

const AppWrap = styled.div`
  font-family: "Adobe 고딕 Std B";
  width: 300px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  img {
    width: 100px;
  }

  .inputContainer {
    width: 300px;
    display: flex;
    flex-wrap: wrap;
  }

  input {
    width: 200px;
    padding: 10px 5px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border: none;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    font-size: 20px;
  }

  button {
    margin-top: 30px;
    border: none;
    background-color: white;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    border-radius: 10px;
    padding: 5px 10px;
    margin-right: auto;
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 30px;
  }

  button:hover {
    background-color: rgba(75, 71, 71, 0.55);
    color: white;
  }

  .stateContainer .state {
    font-size: 30px;
  }

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
  }

`;

const ResultWrap = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px black solid;
  border-radius: 8px;


`;

