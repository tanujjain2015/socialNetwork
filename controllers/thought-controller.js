const { Thought, User } = require ('../models');

const thoughtController = {
    // get all pizzas
    getAllThoughts(req, res) {
       Thought.find({})
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },
  
    // get one pizza by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    // createPizza
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { username: body.username },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No User found with this username' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    // update pizza by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
          if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
      Thought.findByIdAndDelete({ _id: params.id })
      .then(Deletethought => {
        if (!Deletethought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        return User.findOneAndUpdate(
          { username: Deletethought.username },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.id },
        { $push: { reactions: body } },
        {new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v',
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought data associated with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 
      },
      
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId }} },
            {new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought associated with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 

    }
  };

module.exports = thoughtController;