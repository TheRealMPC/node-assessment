const usersData = require('./userData.json');

module.exports = {
  
  getAll: (req, res) => {
    let favoriteUsers = usersData.filter((e) => {
      if (req.query.favorites) {
        return e.favorites.includes('react')
      } else if (req.query.age) {
        return req.query.age > e.age
      } else if (req.query.lastname) {
        return req.query.lastname === e.last_name
      } else if (req.query.email) {
        return req.query.email === e.email
      }
      return true
    })
    res.status(200).send(favoriteUsers)
  },

  userId: (req, res) => {
    let userIdFunc = usersData.filter((e) => {
      return e.id === Number(req.params.id)
    })
    if (userIdFunc.length > 0) {
      res.status(200).send(userIdFunc[0])
    } else {
      res.status(404).json(null)
    }
  },

  getAdmin: (req, res) => {
    let admin = [];
    for (let i = usersData.length - 1; i >= 0; i--) {
      if (usersData[i].type === 'admin') {
        admin.unshift(usersData[i])
      }
    }
    res.status(200).send(admin)
  },

  nonAdmin: (req, res) =>  {
    let notAdmin = []
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].type !== 'admin') {
        notAdmin.push(usersData[i])
      }
    }
    res.status(200).send(notAdmin)
  },

  getByType: (req, res) => {
    result = usersData.filter((e) => {
      return e.type === req.params.type
    })
    res.status(200).send(result)
  },

  updateUser: (req, res) => {
    let update = usersData.splice(req.params.id-1, 1, req.body)
    res.status(200).send(usersData)
  },

  addUser: (req, res) => {
    req.body.id = usersData.length+1
    usersData.push(req.body)
    res.status(200).send(usersData)
  },

  deleteUser: (req, res) => {
    let remove = usersData.splice(req.params.id - 1, 1)
    res.status(200).send(usersData)
    }

};
