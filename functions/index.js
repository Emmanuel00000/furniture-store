const functions = require('firebase-functions')
const stripe = require('stripe')(
    'sk_test_51KgLV8HYuOyXEXHsiMeXWQtT3orEwUIdacfF2btpahMXZK7SFx2kpKmjKkS8JsqnXKXKMcaMnk1CloSphZETlDjp00Li7i9xEj'
)

exports.changeTotalPrice = functions.https.onCall(async (data) => {
    const price = await stripe.prices.create({
        unit_amount: data.totalPrice + 534,
        currency: 'usd',
        product: 'prod_LOzHoWPQwShyXt',
    })
    return { priceId: price.id }
})
