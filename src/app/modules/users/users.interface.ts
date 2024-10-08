export interface IUser {
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  employeeId?: string;
  password: string;
  isApproved: boolean;
  department: string;
  shift?: string;
  
  leaveRequests?: ILeaveRequest[];
  attendanceRecords?: IAttendanceRecord[];
  
  joiningDate?: string;
  bloodGroup?: string;
  salary?: number;
  address?: string;
  jobPosition?: string;
  position?:string;
}

export interface ILeaveRequest {
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'Pending' | 'Approved' | 'Declined';
}

export interface IAttendanceRecord {
  date: Date;
  status: 'Present' | 'Absent' | 'Late' | 'Half-Day' | 'On Leave' | 'Holiday';
  outTime?: Date;
  overtime?: string;
  attendanceTime?: Date; // New field
}
