import axios from 'axios'
import * as actions from "../api.js"

const api = ({dispatch , getState}) => next => async action => {

    if(action.type !== actions.apiCallBegan.type) return next(action)

    const {url  , onStart , onError , onSuccess} = action.payload


    if(onStart) dispatch({type:onStart})

    next(action)

    try {

        const res = await axios.request({
           baseURL:"http://api.weatherapi.com/v1",
           url,
        })

        // dispatch(actions.apiCallSuccess(res.data))

        if(onSuccess) dispatch({type:onSuccess , payload : res.data})
        
    } catch (error) {
        
        //general 

        // dispatch(actions.apiCallFailed(error.message))

        if(onError) dispatch({type : onError})
    }
}

export default api;