import React, { useEffect, useState } from "react";
import axios from 'axios';
import './home.css'

function Home(){
    const [data,setData]=useState({
        celcius: '',
        name: 'City Name',
        type:'',
        humidity: '',
        speed: '',
        image: "/images/WeatherIcons.gif"
    })
    const [name,setName]=useState('');
    const [error,setError]=useState('');

    const handleClick=()=>{
        if(name!==""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=32f81322b5291a5f321d72caa688c6a1&units=metric`
            axios.get(apiUrl)
            .then(res=>{
                let imagePath='';
                if(res.data.weather[0].main=="Clouds"){
                    imagePath="/images/clouds.png"
                }
                else if(res.data.weather[0].main=="Clear"){
                    imagePath="/images/clear.png"
                }
                else if(res.data.weather[0].main=="Rain"){
                    imagePath="/images/rain.png"
                }
                else if(res.data.weather[0].main=="Drizzle"){
                    imagePath="/images/drizzle.png"
                }
                else if(res.data.weather[0].main=="Mist"){
                    imagePath="/images/mist.png"
                }
                else{
                    imagePath="/images/WeatherIcons.gif"
                }
                console.log(res.data);
                setData({...data, celcius:res.data.main.temp, name:res.data.name,humidity:res.data.main.humidity,type:res.data.weather[0].main,speed:res.data.wind.speed,image:imagePath})
                setError('');
            })
            .catch(err=>{
                if(err.response.status==404){
                    setError("Invalid City Name")
                }
                else{
                    setError('');
                }
            })
        }
    }

    return (
      <div className="card">
            <div className="search">
                <input type="text" placeholder="Enter City Name" onChange={e=>setName(e.target.value)} />
                <button><img src="/images/search.png" onClick={handleClick} alt="" /></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
            <div className="weather">
                <img src={data.image} className="weather-icon" />
                <h1 className="temp">{Math.round(data.celcius)}°C</h1>
                <h2 className="city">{data.name}</h2>
                <h3 className="weathertype">{data.type}</h3>
                <div className="details">
                    <div className="col">
                        <img src="/images/humidity.png" alt="" />
                        <div>
                            <p className="humidity">{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src="/images/wind.png" alt="" />
                        <div>
                            <p className="wind">{Math.round(data.speed)} m/s</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home;