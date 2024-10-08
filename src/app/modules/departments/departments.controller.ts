import { Request, Response, NextFunction } from 'express';
import { addDepartmentToDb, deleteDepartmentById, getAllDepartmentsFromDb, getSingleDepartmentFromDb, updateDepartmentById } from './departments.services';
 

export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departmentData = req.body; // Assuming your request body contains department data
        const department = await addDepartmentToDb(departmentData);
        res.status(200).json({
            status: 'success',
            data: department,
        });
    } catch (error) {
        if (typeof error === 'string') {
            // If the error is a custom message, send it to the client
            res.status(400).json({
                status: 'error',
                message: error,
            });
        } else {
            console.error('Error creating department:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error creating department',
            });
        }
    }
};

export const getAllDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departments = await getAllDepartmentsFromDb();
        res.status(200).json({
            status: 'success',
            data: departments,
        });
    } catch (error) {
        console.error('Error fetching all departments:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching all departments',
        });
    }
};

//single id find
export const getSingleDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    const departmentIdToFind = req.params.departmentId; // Assuming your route parameter is named "departmentId"
    
    try {
        const department = await getSingleDepartmentFromDb(departmentIdToFind); // Call the function to get the department by ID
        
        if (department) {
            res.status(200).json({
                status: 'success',
                data: department,
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Department not found',
            });
        }
    } catch (error) {
        console.error('Error fetching single department:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching single department',
        });
    }
};

//update
export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departmentId = req.params.departmentId; // Assuming the department ID is passed as a route parameter
        const updatedData = req.body; // Assuming your request body contains the updated department data

        const updatedDepartment = await updateDepartmentById(departmentId, updatedData);

        if (updatedDepartment) {
            res.status(200).json({
                status: 'success',
                data: updatedDepartment,
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Department not found',
            });
        }
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating department',
        });
    }
};

//delete
export const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departmentId = req.params.departmentId; // Assuming the department ID is passed as a route parameter

        await deleteDepartmentById(departmentId);

        res.status(200).json({
            status: 'success',
            message: 'Department deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error deleting department',
        });
    }
};
