const countryEmoji = require('country-emoji')

const coursesMessage = (data) => {
    return `Дата: ${data.date}
    BYN: *${data.rates.BYN}*
    EUR: *${data.rates.EUR}*
    RUB: *${data.rates.RUB}*`
}

const weatherMessage = (data) => {
    return `Погода в Минске: 
    Описание: ${data.weather[0].description}
    Температура: ${data.main.temp} градусов,
    Давление: ${data.main.pressure} гПа,
    Влажность: ${data.main.humidity} %,
    Облачность: ${data.clouds.all} %,
    Скорость ветра: ${data.wind.speed} м\\с`
}

const covidStatsMessage = (data)=>{
    return `
  Country: *${data.country}* ${countryEmoji.flag(data.country) || ''}
  New: *${data.new_cases}*
  Active: *${data.total_active}*
  Recovered: *${data.total_recovered}*
  Deaths: *${data.total_deaths}*
  --------
  Total: *${data.total_cases}*
    `
  }

module.exports = {
    coursesMessage,
    weatherMessage,
    covidStatsMessage
}