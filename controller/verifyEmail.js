const nodemailer = require("nodemailer");

const otps = {};

const sendmail = async (req, res , next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otps[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        secure: true, 
        port: 465,
        auth: {
            user: 'amitathiya999@gmail.com', 
            pass: 'jfkhzhblhlamukje',
        },
    });

    const mailOptions = {
        from: 'amitathiya999@gmail.com', 
        to: email, 
        subject: 'please varify your Email for Sign up', 
        text: `This is your OTP(One Time Password) ${otp}. Exprire in next 5 minutes`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Email failed to send!');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email successfully sent!');
        }
    });
    next();
};


const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
      return res.status(400).send('Email and OTP are required');
  }

  const otpData = otps[email];

  if (!otpData) {
      return res.status(400).send('OTP not found for the given email');
  }

  if (otpData.expiresAt < Date.now()) {
      delete otps[email]; // Remove expired OTP
      return res.status(400).send('OTP has expired');
  }

  if (otpData.otp !== parseInt(otp, 10)) {
      return res.status(400).send('Invalid OTP');
  }

  delete otps[email]; // OTP is valid; remove it after successful verification
  next();
};


module.exports = {sendmail , verifyOtp};
