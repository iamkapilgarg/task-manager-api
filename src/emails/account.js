const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = 'SG.oPdQoX8WTXC0rqqkKquYgg.yeXgISmjjVEClhBxK1r1_j8XCO3WvTl3vqv_G3GerK8'

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
  console.log('email fired')
  sgMail.send({
    to: email,
    from: 'iamkapilgarg@gmail.com',
    subject: 'Welcome to the Task App',
    text: `Hi, Welcome to the Task App, ${name} <html><body><table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>${name}</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
  </table></body></html>`
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