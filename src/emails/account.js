const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'iamkapilgarg@gmail.com',
        subject: 'Welcome to the Task App',
        text: `Hi, Welcome to the Task App, ${name}`
    })
}

const farewellEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'iamkapilgarg@gmail.com',
        subject: 'Good Bye ',
        text: `Hi, Good Bye from the Task App, ${name}. I hope we could do better.`
    })
}

module.exports = {
    sendWelcomeEmail,
    farewellEmail
}