const { Telegraf, Scenes, session } = require('telegraf')

const bmiValue = require('./util/bmiValue')
const getCurrency = require('./util/api/getCurrency')
const getWeather = require('./util/api/getWeather')
const getCovidStats = require('./util/api/getCovidStats')
const covidStatsMessage = require('./util/messages/covidStatsMessage')
const weatherMessage = require('./util/messages/weatherMessage')
const coursesMessage = require('./util/messages/coursesMessage')
const { TELEGRAM_API_TOKEN } = require('./util/config')
const searchImage = require('./util/api/searchImages')

const bot = new Telegraf(TELEGRAM_API_TOKEN, { polling: true })
bot.start(ctx => {
    return ctx.reply("Welcome to Bot");
});

bot.command('c', async ctx => {
    const { data } = await getCurrency()
    return ctx.replyWithMarkdown(coursesMessage(data))
})

bot.command('w', async ctx => {
    const { data } = await getWeather()
    return ctx.replyWithMarkdown(
        `Погода в Минске: 
             Описание: ${data.weather[0].description}
             Температура: ${data.main.temp} градусов,
             Давление: ${data.main.pressure} гПа,
             Влажность: ${data.main.humidity} %,
             Облачность: ${data.clouds.all} %,
             Скорость ветра: ${data.wind.speed} м\\с`
    )
})

bot.command('covid', async ctx => {
    const { data } = await getCovidStats()
    return ctx.replyWithMarkdown(
        `Погода в Минске: 
             Описание: ${data.weather[0].description}
             Температура: ${data.main.temp} градусов,
             Давление: ${data.main.pressure} гПа,
             Влажность: ${data.main.humidity} %,
             Облачность: ${data.clouds.all} %,
             Скорость ветра: ${data.wind.speed} м\\с`
    )
})

bot.on("inline_query", async (ctx) => {
    if (!ctx.inlineQuery.query) return
    const result = await searchImage(ctx.inlineQuery.query)
    const data = result.data.hits.map((hit) => {
        return {
            type: 'photo',
            id: hit.id,
            photo_url: hit.largeImageURL,
            thumb_url: hit.previewURL,
            title: hit.tags,
            description: hit.tags,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `${hit.likes} ❤️`,
                            url: hit.pageURL,
                        },
                    ],
                    [
                        {
                            text: "Share bot with friends",
                            switch_inline_query: "",
                        },
                    ],
                ],
            }
        }
    })
    return ctx.answerInlineQuery(data)
})

const superWizard = new Scenes.WizardScene('create',
    (ctx) => {
        ctx.reply('1. Введите Ваш Вес (кг):')
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.weight = parseInt(ctx.message.text, 10);
        ctx.reply('2. Введите Ваш рост (см):');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.height = parseInt(ctx.message.text, 10) / 100;
        const weight = ctx.wizard.state.weight;
        const height = ctx.wizard.state.height;
        const bmi = weight / height / height;

        ctx.reply(`Ваш индекс массы тела ${bmi} - ${bmiValue(bmi)}`);
        ctx.reply(`Спасибо! Попбобовать еще ращ - /start `)
        return ctx.scene.leave();
    }
)

const stage = new Scenes.Stage([superWizard], {
    default: 'super-wizard',
})
//bot.use(session())
//bot.use(stage.middleware())
//bot.command('bmi', async ctx => {
    
//})
bot.launch()