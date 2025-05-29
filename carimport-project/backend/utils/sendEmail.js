const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'zhanserik200523@gmail.com',
        pass: 'alkykcokahgaqntp'
    }
})

module.exports = async function sendEmail({ name, phone, country, comment, car }) {
    const mailOptions = {
        from: 'zhanserik200523@gmail.com',
        to: 'zhanserik200523@gmail.com',
        subject: 'Новая заявка на экспорт машины',
        html: `
            <h2>📦 Новая заявка</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Страна:</strong> ${country}</p>
            <p><strong>Комментарий:</strong> ${comment || '—'}</p>
            <p><strong>Машина:</strong> ${car?.brand} ${car?.model} (${car?.year})</p>
        `
    }

    await transporter.sendMail(mailOptions)
}
