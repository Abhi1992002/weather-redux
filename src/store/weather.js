import { createSelector, createSlice } from "@reduxjs/toolkit";
import * as actions from "./api"

const apiKey = process.env.REACT_APP_API_KEY

const slice = createSlice({
    name:"weather",
    initialState: {
        list:[],
        loading:false,
        lastFetch:false
    },
    reducers:{

        weatheradded:(weather , action)=>{
            weather.list.push(action.payload)
        },

        weatherRequested:(weather , action)=>{
            weather.loading = true
        },
      
        weatherRecieved:(weather , action)=>{
            weather.list = action.payload
            weather.loading = false
            weather.lastFetch = Date.now()
        },

        weatherFailed: (weather , action)=>{
            weather.loading = false
        }


    }
}) 

export const {weatheradded} = slice.actions;

export default slice.reducer;



export const loadWeather = (location)=>(dispatch , getState) => {
    
    const url = `/forecast.json?key=${apiKey}&q=${location}&days=7`

   return dispatch(actions.apiCallBegan({
        url,
        onStart:slice.actions.weatherRequested.type,
        onError:slice.actions.weatherFailed.type,
        onSuccess:slice.actions.weatherRecieved.type
    }))
}

export const getWeather = createSelector(
    state => state.entities.weather,
    weather => weather
)