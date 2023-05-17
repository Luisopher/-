import react from 'react'
function CreateData({state},{location},{pm10},{pm2_%}) {
    searchWeather();
    return (
        <div>
            <div className="stateContainer">
                <div className="state">현재상태</div>
                <div className="stateIcon">
                    <img src={state} alt="현재 날씨"></img>
                </div>
            </div>
            <ResultWrap>
                <div className="city">위치는 : {location}</div>
                <div className="big">미세먼지 수치는 : {pm10}</div>
                <div className="tiny">초미세먼지 수치는 : {pm2_5}</div>
            </ResultWrap>
        </div>
    )
}

export default CreateData;

const ResultWrap = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px black solid;
  border-radius: 8px;


`;

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

