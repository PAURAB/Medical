const express=require('express');
const router=express.Router();
const path = require('path');
const User = require('../model/userSchema');



router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const rootFolderPath = path.dirname(__dirname);
const filePath_sign = path.join(rootFolderPath, 'public', 'signup.html');
const filePath_log = path.join(rootFolderPath, 'public', 'login.html');
const filePath_pat = path.join(rootFolderPath, 'public', 'dashboard', 'pat_dash.html');


router.get('/', (req, res) => {
    res.send(`Hello world from the router app.js`);
});

router.get('/about', (req, res) => {
    console.log(`Hello my About`);
    res.send(`Hello About world from the router`);
});

router.get('/contact', (req, res) => {
    res.send(`Hello Contact world from the server`);
});

router.get('/login', (req, res) => {
    res.sendFile(filePath_log);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email: email });

      if (!user) {
          res.status(404).send('User not found');
      } else {
          if (user.password === password) {
              res.sendFile(filePath_pat);
          } else {
              res.status(401).send('Incorrect password');
          }
      }
  } catch (err) {
      res.status(500).send('Internal Server Error');
  }
});


router.get('/signup', (req, res) => {
    res.sendFile(filePath_sign);
    // console.log(__dirname );
  });

// router.get('/signup', (req, res) => {
//     res.send(`Hello Registration world from the server`);
// });
router.post('/signup', (req, res) => {
    const { name, email, password,cpassword,phone,age,city } = req.body;
  
    const newUser = new User({ name, email, password,cpassword,phone,age,city });
  
    newUser.save()
      .then(() => {
        res.send('User created successfully');
      })
      .catch((error) => {
        res.status(500).send('Error creating user');
      });
  });

module.exports= router;