const db = require('../models');
const User = db.user;
const Setting = db.setting;

exports.getAllUsers = async (req, res) => {
  const { count, rows } = await User.findAndCountAll({
    attributes: { exclude: ['password'] },
    include: Setting
  });
  res.status(200).send({ count: count, users: rows });
};

exports.getUserById = async (req, res) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    include: Setting,
    where: { id: req.params.id },
  });
  res.status(200).send(user);
};

exports.create = (req, res) => {
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      birthday: req.body.birthday,
      setting: {
        nightTheme: false,
        notification: true,
      },
    },
    {
      include: [User.setting],
    }
  )
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User was registered successfully!' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err || 'Some error occurred',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Tutorial with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then(user => {
      if (user == 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating User with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then(user => {
      if (user == 1) {
        res.send({
          message: 'User was deleted successfully.',
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found or req.body is empty.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete User with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};
