const { User } = require ('../models');

const userController = {
    // get all Users
    getAllUsers(req, res) {
      User.find({})
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    // get User by Id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    createUser({ body }, res) {
      User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(userData => {
          if (!userData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(userData);
        })
        .catch(err => res.json(err));
    },

    // delete user
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(userData => {
          if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params}, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: { _id: params.friendId} } },
        { new: true , runValidators: true}
      )
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true}
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
    }
};

module.exports = userController;