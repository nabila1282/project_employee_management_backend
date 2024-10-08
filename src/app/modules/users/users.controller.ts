import { Request, Response, NextFunction } from 'express';
import {  addUserToDb, deleteUserById, getAllUsersFromDb, getSingleUserFromDb, updateUserById } from './users.service'; 

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body; // Assuming your request body contains user data
        const user = await addUserToDb(userData);
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        if (typeof error === 'string') {
            // If the error is a custom message, send it to the client
            res.status(400).json({
                status: 'error',
                message: error,
            });
        } else {
            console.error('Error creating user:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error creating user',
            });
        }
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersFromDb();
        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching all users',
        });
    }
};
//single id find
export const getSingleUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userIdToFind = req.params.userId; // Assuming your route parameter is named "userId"
    
    try {
        const user = await getSingleUserFromDb(userIdToFind); // Call the function to get the user by ID
        
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user,
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error('Error fetching single user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching single user',
        });
    }
};
//update
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
        const updatedData = req.body; // Assuming your request body contains the updated user data

        const updatedUser = await updateUserById(userId, updatedData);

        if (updatedUser) {
            res.status(200).json({
                status: 'success',
                data: updatedUser,
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating user',
        });
    }
};

//delete
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

        await deleteUserById(userId);

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error deleting user',
        });
    }
};