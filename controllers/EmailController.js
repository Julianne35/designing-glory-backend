const mongoose = require("mongoose");
const CreateEmail = mongoose.model("email");

const nodemailer = require("nodemailer");

//function baseRoute
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

//create email
exports.createEmail = async (req, res) => {
  console.log(req.body);
  let userEmail = new CreateEmail({
    email: req.body.email,
    name: req.body.name,
    textarea: req.body.textarea,
  });
  console.log("userEmail:", userEmail);
  await userEmail.save((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      res.status(200).json({
        message: "Email Created",
        data,
      });
    }
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "shareverseapponline@gmail.com",
      pass: "MommyandNoah2018",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: "shareverseapponline@gmail.com",
    to: "jbosko28@gmail.com",
    subject: "Message from Designing Glory Website",
    html: `
    <html>
       <body style='color: #fff'>
          <table style='font-family: Arial;'>
             <tbody>
                <tr>
                  <td style='background: #b6b5b5; padding: 10px;'>
                  Name:
                  </td>
                  <td style='background: #b6b5b5; padding: 10px;'>
                  ${userEmail.name}
                  </td>
                </tr>
                <tr>
                  <td style='background: #b6b5b5; padding: 10px;'>
                  Email:
                  </td>
                  <td style='background: #b6b5b5; padding: 10px;'>
                  ${userEmail.email}
                  </td>
                </tr>
                <tr>
                  <td style='background: #b6b5b5; padding: 10px;'>
                  Message:</td>
                  <td style='background: #b6b5b5; padding: 10px;'>
                  ${userEmail.textarea}
                  </td>
                </tr>
       </body>
  </html>`,
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      return res.status(500).send({
        errmsg:
          "google not alowing app to run - check https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4NYVqVCWvYUkJPFvUqRgO6iMHhefyRwbmmu-UbGNtMMZN0ToN5TuqufnlMR6sC6UYBojKVi1fYldessyo5wv1TnRwKdlQ.",
      });
    } else {
      return res
        .status(200)
        .send(
          "Thank you" +
            userEmail.name +
            "for your email. We will be in contact!"
        );
    }
  });
};

// get all
exports.getAll = async (req, res) => {
  const data = await CreateEmail
    .find(req.query);
  res.json(data);
};

//get name
// exports.getName = async (req, res) => {
//   // get id from URL by using req.params
//   let nameID = req.params.id;
//   // we use mongodb's findById() functionality here
//   await CreateEmail.findById({ _id: nameID }, (err, data) => {
//     if (err) {
//       res.status(500).json({
//         message: "Something went wrong, please try again later.",
//       });
//     } else {
//       console.log(data);
//       res.status(200).json({
//         message: "Post found",
//         data,
//       });
//     }
//   });
// };
