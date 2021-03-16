import axios from 'axios';


const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'fe5c72cfea89fbc8e5cc240f241fea92'

export const getWeatherData = async (cityName) => {
    try {
        const {data} = await axios.get(baseUrl + `q=${cityName}&appid=${apiKey}`)
        return data
    } catch (error) {
        throw error
    }
}
