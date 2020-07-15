const router = require ("express").Router();

const {getAllThoughts,getThoughtById,createThought,updateThought,deleteThought, addReaction, removeReaction} = require('../../controllers/thought-controller');

  // Set up GET all and POST at /api/pizzas
router.route('/').get(getAllThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:id/reaction').post(addReaction).delete(removeReaction);

router.route('/:id/reaction/:reactionId').delete(removeReaction);


module.exports = router;