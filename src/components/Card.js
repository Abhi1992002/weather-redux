import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weather, { getWeather, loadWeather  } from "../store/weather";


export default function Card() {

    const [locations , setLocation] = useState("")

    const dispatch = useDispatch();
    const weatherData = useSelector(getWeather);


  const clickHandler = async() => {
    
   //Send location of the user to server 

   dispatch(loadWeather(locations))

   console.log(weatherData)

  };


  return (
    <div className="card-container">

      <div className="form">
        <input
          type={"text"}
          name="location"
          id="location"
          placeholder="Enter Location"
          value={locations}
          onChange={(e)=>{
              setLocation(e.target.value);
          }}
        />
        <button onClick={clickHandler}>Submit</button>
      </div>

    
      {weatherData.list.length === 0 ? " "  : (
        <div className="weather-data">
          
          <div className="upper">
            <div className="upper-left">
                <div className="icon">
                <img src={weatherData.list.current.condition.icon} alt="" />
                </div>
                <div className="weather-detail">
                <p>{weatherData.list.current.condition.text}</p> 
                <p>Humidity : {weatherData.list.current.humidity}</p>   
                <p>Temperature : {weatherData.list.current.temp_c}  C</p>    
                <p>Wind : {weatherData.list.current.wind_kph} Kmph</p>   
                </div>
               
          
            </div>
            <div className="upper-right">
                <div className="content">
                <h1>{weatherData.list.location.name}</h1>
                </div>
           
            </div>
        
          </div>
          <div className="lower">
            {
               weatherData.list.forecast.forecastday.map((day)=>{
               return  <div className="box" key={day.date}>
                <img src={day.day.condition.icon} alt="" />
                <h1>{day.day.avgtemp_c}</h1>
                <p>{day.date}</p>
               </div>
               }) 
            }
          
          </div>

        </div>
      ) 
    }
      {/* {console.log(weatherData.list.forecast.forecastday)}
      */}
    </div>
  );
}

