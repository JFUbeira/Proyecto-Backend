import userModel from '../models/user.model.js'
class UserManager {
    async getUsers() {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                console.log('Error: User not found');
            } else {
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(user) {
        try {
            const { first_name, last_name, email, age, password } = user;

            if (!first_name || !last_name || !email || !age || !password) {
                console.log('Error: All fields are required');
            } else if (await userModel.findOne({ email })) {
                console.log('Error: User already exists');
            } else {
                const newUser = new userModel({
                    first_name,
                    last_name,
                    email,
                    age,
                    password,
                    role: 'user'
                });
                await newUser.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(uid, updatedUser) {
        try {
            const user = await userModel.findById(uid);

            if (!user) {
                console.log('Error: User not found');
            } else {
                Object.assign(user, updatedUser); // Update fields
                await user.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(id) {
        try {
            const result = await userModel.findByIdAndDelete(id);
            if (!result) {
                console.log('Error: User not found');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserManager;
