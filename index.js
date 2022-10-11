const { Telegraf, Scenes, session } = require('telegraf')

const bmiValue = require('./util/bmiValue')
const getCurrency = require('./util/api/getCurrency')
const getWeather = require('./util/api/getWeather')
const getCovidStats = require('./util/api/getCovidStats')
const searchImage = require('./util/api/searchImages')
const { coursesMessage, weatherMessage, covidStatsMessage } = require('./util/messages')
const { TELEGRAM_API_TOKEN } = require('./util/config')

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
    return ctx.replyWithMarkdown(weatherMessage(data))
})

bot.command('covid', async ctx => {
    const { data } = await getCovidStats({ countrycode: 'us' })
    return ctx.replyWithMarkdown(covidStatsMessage(data))
})

bot.on("inline_query", async (ctx) => {
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
    const data1 = [{
        type: 'photo',
        id: 1417208,
        photo_url: 'https://pixabay.com/get/ge8eeb7c2a9ebf2ac861f2fbf99d487f96d03d88ec18172bbd295fe81b3b42a19b48cfd9500606e021fffa629a2b9a33d7ddfad9cb5febc4f416c1c49e2496d7f_1280.png',
        thumb_url: 'https://cdn.pixabay.com/photo/2016/05/26/13/51/dog-1417208_150.png',
        title: 'dog',
        description: 'dog, animal, corgi',
    }]

    console.log(data1)
    return ctx.answerInlineQuery( data1)
})

/*
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
*/
bot.launch()