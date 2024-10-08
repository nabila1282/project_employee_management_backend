// department.model.ts

import { Schema, model, Document } from 'mongoose';
import { IDepartment } from './departments.interface';


export interface IDepartmentModel extends IDepartment, Document {}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String },
  // Add any other department-related fields here
});

export const Department = model<IDepartmentModel>('Department', departmentSchema);
