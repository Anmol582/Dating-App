const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "59e91803607468",
        pass: "78c9d39e34382c",
    },
});
try{
    const sendMail = async (from, to, subject, text, html) => {
        const info = await transporter.sendMail({
            from: from,//'"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: to,//"bar@example.com, baz@example.com", // list of receivers
            subject: subject,//"Hello ✔", // Subject line
            text: text,//"Hello world?", // plain text body
            html: html//"<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        }
        module.exports = sendMail;
}
catch(error){
    console.log(error);
}



