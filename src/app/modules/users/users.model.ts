import { Schema, model, Document } from 'mongoose';
import { IUser, IAttendanceRecord,  } from './users.interface'; // Import the IUser, IAttendanceRecord, and IProfileInfo interfaces

export interface IUserModel extends IUser, Document { }



const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  employeeId: { type: String },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  department: { type: String },
  shift: { type: String },
  joiningDate: { type: String },
  bloodGroup: { type: String },
  salary: { type: Number },
  address: { type: String },
  jobPosition: { type: String },
  position: { type: String },
  leaveRequests: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
      reason: { type: String },
      status: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' }
    }
  ],
  attendanceRecords: [
    {
      date: { type: Date, required: true },
      status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Half-Day', 'On Leave', 'Holiday'],
        required: true
      },
      outTime: { type: Date },
      overtime: { type: String },
      attendanceTime: { type: Date },
    }
  ],
  
});

export const User = model<IUserModel>('User', userSchema);
