import OpenAI from 'openai'

export async function onRequestGet(context) {
  const data = {
    city: context.request.cf.city,
    region: context.request.cf.region,
    country: context.request.cf.country,
    timezone: context.request.cf.timezone,
    latitude: context.request.cf.latitude,
    longitude: context.request.cf.longitude
  }

  // make a request to openweathermap api to get current weather

  data.units =
    data.country === 'US' || data.country === 'LR' || data.country === 'MM' ? 'imperial' : 'metric'
  data.symbol = data.units === 'imperial' ? 'F' : 'C'

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${data.latitude}&lon=${data.longitude}&exclude=minutely,hourly,daily,alerts&units=${data.units}&appid=${context.env.WEATHER_API_KEY}`
    )
    const weatherData = await weatherResponse.json()

    data.temp = Math.round(weatherData.current.temp)
    data.name = weatherData.current.weather[0].main
    data.description = weatherData.current.weather[0].description
    data.icon = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
    data.timezone_offset = weatherData.timezone_offset
    data.time = weatherData.current.dt
    data.sunrise = weatherData.current.sunrise
    data.sunset = weatherData.current.sunset
  } catch (e) {
    console.log(e)
  }

  // try {

  //     const openai = new OpenAI({
  //         apiKey: context.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  //     });
  //     const openaiResponse = await openai.images.generate({
  //         model: "dall-e-3",
  //         prompt: "A hand-drawn illustration of Melbourne, Australia on a partly cloudy morning with the sun high in the sky and a visible crescent moon. The sky is a mix of light blue with some soft white clouds. In the foreground, people are enjoying outdoor activities in Federation Square, wearing light clothing suitable for 15°C weather. Some are casually strolling, while others are taking photos of the surrounding modern architecture. The buildings of Melbourne's skyline, including the Eureka Tower, are visible in the background. The Yarra River gently flows by, reflecting the cityscape. Large, clear typography in a modern, bold style displays 'Melbourne, 15°C' at the top of the image. The overall scene is vibrant and lively, showcasing the city's unique blend of nature and urban life.",
  //         n: 1,
  //         quality: "hd",
  //         size: "1024x1024",
  //         response_format: "url"
  //     });

  //     console.log(openaiResponse)
  //     data.image = openaiResponse.data[0].url;
  // } catch (e) {
  //     console.log(e)
  // }

  console.log(data)

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}
