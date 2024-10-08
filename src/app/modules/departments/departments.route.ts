import express from 'express';
import { createDepartment, deleteDepartment, getAllDepartments, getSingleDepartmentById, updateDepartment } from './departments.controller'; 

const router = express.Router();

router.post('/create-department', createDepartment);
router.get('/get-all-departments', getAllDepartments);
// Define the route to get a single department by ID
router.get('/get-department/:departmentId', getSingleDepartmentById);
router.put('/update-department/:departmentId', updateDepartment);
//delete
router.delete('/delete/:departmentId', deleteDepartment);
export default router;
