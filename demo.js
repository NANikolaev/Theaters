function logIn(req, res) {
    if (req.body.username == '' || req.body.password == '') {
      throw new Error('Missed field/s.')
    }
  
    return User.find({ username: req.body.username })
      .then(arr => {
        let user = arr[0]
        bcrypt.compare(req.body.password, user.password, function (err, istrue) {
          if (!istrue) { throw new Error('Invalid Password') }
          let payload = {
            username: user.username,
            id: user._id
          }
          let token = jwt.sign(payload, secret, { expiresIn: '1d' })
          return token
        })
  
      })
      .catch(err => { throw new Error('Invalid Username') })
  
  }




  async function logIn(req, res) {
    if (req.body.username == '' || req.body.password == '') {
      throw new Error('Missed field/s.')
    }
  
    let user= await User.findOne({ username: req.body.username })
    let isValidPass;
    if(user){
      isValidPass=await bcrypt.compare(req.body.password, user.password)
    }
    if(!user){throw new Error('Invalid Username')};
    if(!isValidPass){throw new Error('Invalid Password')};
  
    let payload = {
      username: user.username,
      id: user._id
    }
    let token = jwt.sign(payload, secret, { expiresIn: '1d' })
    return token
          
  }