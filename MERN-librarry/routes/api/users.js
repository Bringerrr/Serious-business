const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get All users
// @access  Public
router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.post('/', (req, res) => {
  const newUser = new User({
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  newUser.save()
  .then(user => res.json(user))
  .catch(err => res.json(err));
});


// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Public
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   PATCH api/users/:id
// @desc    add user's film_storage
// @access  Public
router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {$push: {film_storage: req.body}},
    {safe: true, upsert: true, new: true},
    (err, film) => {
        if (err) return res.status(500).send(err)
        console.log(film)
        return res.send({film:film, id:film.film_storage});
        }
    )
  } 
);

// @route   PATCH api/users/pull/:id
// @desc    pull user's film_storage
// @access  Public
router.patch('/pull/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {$pull: {film_storage: req.body}},
    {safe: true, upsert: true, new: true},
    (err, film) => {
        if (err) return res.status(500).send(err)
        console.log(film)
        return res.send(film);
        }
    )
  } 
);


//add uniq item
// router.post('/find/:id/:imdbid', (req, res) => {
//   let route = 200;
//   User.findOne({_id:req.params.id,"film_storage.imdbID":req.params.imdbid},(err, obj)=>{
//     let array
//           if(obj) 
//           // if(err){
//           //   res.send(route)
//           //   res.send(err)
//           //     User.findByIdAndUpdate(
//           //       req.params.id,
//           //       {$push: {film_storage: req.body}},
//           //       {safe: true, upsert: true, new: true},
//           //       (err, film) => {
//           //           if (err) return res.status(500).send(err)
//           //             console.log(film)
//           //             return res.send(film);
//           //           }
//           //       )
//           // }
//             res.send(JSON.stringify(obj))  
//     } 
//   )
// });

  // User.findOne({_id:req.params.id, imdbID:req.params.imdbid}, (err, obj)=>{
  //   if(err){
  //     console.log(err)
  //     res.status(500).send()
  //   }else{
  //     if(!obj){
  //       res.status(404).send();
  //     }else{ 
  //       res.status(500).send(obj);

  //     }
  //   }
  // }
  //   )
  // });




// @route   EDIT api/users/filmdel/:id
// @desc    EDIT user's attribute
// @access  Public

// router.put('/edit/:id', (req, res) => {
//   User.findOne({_id:req.params.id}, (err, obj)=>{
//     if(err){
//       console.log(err)
//       res.status(500).send()
//     }else{
//       if(!obj){
//         res.status(404).send();
//       }else{
//         if(req.body.first_name){
//           obj.first_name = req.body.first_name;
//         }

//         if(req.body.last_name){
//           obj.last_name = req.body.last_name
//         }

//         obj.remove(req.body, (err,res)=>{
//           if (err){
//                 console.log(err);
//                 res.status(500).send();
//               } else {
//                 res.json(obj);
//               }
//         })

//         // obj.save((err, updtObj)=>{
//         //   if(err){
//         //     console.log(err);
//         //     res.status(500).send();
//         //   } else {
//         //     res.send(updtObj);
//         //   }
//         // });
//       }
//     }

//   })
// });

// @route   POST api/users/auth/:email/:password
// @desc    user login 
// @access  Public
router.post('/auth/:email/:password', (req, res) => {
  User.findOne({email:req.params.email,password:req.params.password})
  .then(user  => {
    req.session.user = user;
    return res.json(user)
  })
  .catch(err => res.send(true));
    }
);

// @route   GET api/users/dashboard
// @desc    create login session
// @access  Public
router.get('/dashboard', (req, res) => {
  if(!req.session.user){
     return res.status(401).send(false)
  }
  return res.status(200).send(req.session.user)
});

// @route   GET api/users/signout
// @desc    user sign out 
// @access  Public
router.get('/signout', (req, res) => {
  req.session.destroy();
  return res.status(200).send("Farewell");
});


module.exports = router;
