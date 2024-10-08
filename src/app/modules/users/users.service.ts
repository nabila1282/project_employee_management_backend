import { IUser } from "./users.interface";
import { IUserModel, User } from "./users.model";

export const addUserToDb = async (payload: IUser): Promise<IUser> => {
    try {
        const user = await new User(payload);
        await user.save();
        console.log('User details saved:', user);
        return user;
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            const duplicateKey = Object.keys(error.keyValue)[0];
            return Promise.reject(`Duplicate key error: ${duplicateKey}`);
        }
        console.error('Error saving user details:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};


export const getAllUsersFromDb = async (): Promise<IUser[]> => {
    try {
        const users = await User.find();
        console.log('All user details:', users);
        return users;
    } catch (error) {
        console.error('Error fetching all user details:', error);
        throw error;
    }
};
//find by id
export const getSingleUserFromDb = async (userId: string): Promise<IUserModel | null> => {
    try {
        const user = await User.findOne({ _id: userId });
        return user;
    } catch (error) {
        console.error('Error fetching single user:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};
// Update user properties by ID
export const updateUserById = async (userId: string, updatedData: Partial<IUser>): Promise<IUserModel | null> => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updatedData },
            { new: true } // Return the updated document
        );

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

//delete
export const deleteUserById = async (userId: string): Promise<void> => {
    try {
        const result = await User.deleteOne({ _id: userId });
        if (result.deletedCount === 1) {
            console.log('User deleted successfully');
        } else {
            console.log('User not found or not deleted');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};
