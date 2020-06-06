// Source
// https://vercel.com/guides/deploying-nextjs-nodejs-and-sendgrid-with-vercel

const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const { email, message } = req.body

  const content = {
    to: process.env.NODE_ENV != 'development' ? email : 'cjol99@icloud.com',
    from: 'cjol99@icloud.com',
    subject: `Confirm your account on Affilas`,
    text: message,
    html: `<p>${message}</p>`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('send ERROR', error)
    res.status(400).send('Message not sent.')
  }
}