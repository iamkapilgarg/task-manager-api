const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = 'SG.oPdQoX8WTXC0rqqkKquYgg.yeXgISmjjVEClhBxK1r1_j8XCO3WvTl3vqv_G3GerK8'

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
  console.log('email fired')
  sgMail.send({
    to: email,
    from: 'iamkapilgarg@gmail.com',
    subject: 'Welcome to the Task App',
    text: `Hi, Welcome to the Task App, ${name}`
  })
}

const farewellEmail = (email, name) =>{
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