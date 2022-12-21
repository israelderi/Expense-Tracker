import Action from "../models/Action.js";
import User from "../models/User.js";
 

export const getActions = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const list = await Promise.all(
            user.actions.map((id) =>{
                return Action.findById(id)
            })
        );
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

export const createAction = async(req, res) => {
    const userId = req.params.id;
    const newAction = new Action(req.body);
    try {
        const savedAction = await newAction.save();
        try {
            await User.findByIdAndUpdate(userId, {
               $push : {actions: savedAction._id}, 
            })
        } catch (error) {
            res.status(400).json(error)
        }
        res.status(200).json(savedAction)
    } catch (error) {
        res.status(400).json(error)
    }
};

export const deleteAction = async (req, res) => {
    const userId = req.params.userid;
    try {
        await Action.findByIdAndDelete(req.params.id)
        try {
            await User.findByIdAndUpdate(userId, {
                $pull: {actions: req.params.id }
            })
        } catch (error) {
            res.status(400).json({message: error.message});
        }
        res.status(200).json('action has been deleted!')
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getActionsByType2 = async (req, res) => {
    const category = req.query.category.split(",");
    try {
      const list = await Promise.all(
        category.map((category) => {
          return Action.find({ category: category });
        })
      );
      res.status(200).json(list);
    } catch (err) {
        res.status(400).json({message: err.message});
    } 
};

export const getActionsByType = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const category = req.query.category

        const list = await Promise.all(
            user.actions.map((id) =>{
                return Action.findById(id)
            })
        );
        const filterList = list.filter(function(item){
            return item.category === category
        })
        res.status(200).json(filterList)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};
