const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	
	console.log('motherfucking WORK BITCH', process.env.SENDGRID_API_KEY)

  const { email, message } = req.body

  const content = {
    to: email,
    from: 'cjol99@icloud.com',
    subject: `New Message From - product name`,
    text: message,
    html: `<p>${message}</p>`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }
}