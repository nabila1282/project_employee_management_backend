import { IDepartment } from "./departments.interface";
import { Department, IDepartmentModel } from "./departments.model";


export const addDepartmentToDb = async (payload: IDepartment): Promise<IDepartment> => {
    try {
        const department = await new Department(payload);
        await department.save();
        console.log('Department details saved:', department);
        return department;
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            const duplicateKey = Object.keys(error.keyValue)[0];
            return Promise.reject(`Duplicate key error: ${duplicateKey}`);
        }
        console.error('Error saving department details:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export const getAllDepartmentsFromDb = async (): Promise<IDepartment[]> => {
    try {
        const departments = await Department.find();
        console.log('All department details:', departments);
        return departments;
    } catch (error) {
        console.error('Error fetching all department details:', error);
        throw error;
    }
};

export const getSingleDepartmentFromDb = async (departmentId: string): Promise<IDepartmentModel | null> => {
    try {
        const department = await Department.findOne({ _id: departmentId });
        return department;
    } catch (error) {
        console.error('Error fetching single department:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export const updateDepartmentById = async (departmentId: string, updatedData: Partial<IDepartment>): Promise<IDepartmentModel | null> => {
    try {
        const updatedDepartment = await Department.findOneAndUpdate(
            { _id: departmentId },
            { $set: updatedData },
            { new: true } // Return the updated document
        );

        return updatedDepartment;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export const deleteDepartmentById = async (departmentId: string): Promise<void> => {
    try {
        const result = await Department.deleteOne({ _id: departmentId });
        if (result.deletedCount === 1) {
            console.log('Department deleted successfully');
        } else {
            console.log('Department not found or not deleted');
        }
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};
