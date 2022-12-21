import UserModel from '../models/User.js';
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = new UserModel({
            ...req.body,
            password: hash
        })
        await user.save()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send("Error creating user");
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })
        if (!user) return res.status(400).send("User not found !");
        const PasswordCompare = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!PasswordCompare) return res.status(400).send("Worng password !");
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send("Worng user name or password !");
    }
};