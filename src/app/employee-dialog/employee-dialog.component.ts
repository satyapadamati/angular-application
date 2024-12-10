import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService, Employee } from '../employee.service'; // Import the Employee service and interface

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {

  formType: string;  // 'add', 'update', or 'delete'
  currentEmployee: Employee = { id: 0, name: '', loc: '', sal: 0 }; // Initialize the employee object

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService  // Inject EmployeeService
  ) {
    this.formType = data.formType;  // 'add', 'update', or 'delete'
    if (this.formType === 'update' || this.formType === 'delete') {
      this.currentEmployee = { ...data.employee };  // Pre-fill employee data for update/delete
    }
  }

  onCancel(): void {
    this.dialogRef.close();  // Close the dialog without any action
  }

  onSubmit(): void {
    // Handle the action based on form type
    if (this.formType === 'add') {
      // Add new employee
      this.employeeService.createEmployee(this.currentEmployee).subscribe(() => {
        this.dialogRef.close(true);  // Close dialog and notify the parent component to refresh
      });
    } else if (this.formType === 'update') {
      // Update existing employee
      this.employeeService.updateEmployee(this.currentEmployee.id, this.currentEmployee).subscribe(() => {
        this.dialogRef.close(true);  // Close dialog and notify parent component to refresh
      });
    } else if (this.formType === 'delete') {
      // Delete employee
      this.employeeService.deleteEmployee(this.currentEmployee.id).subscribe(() => {
        this.dialogRef.close(true);  // Close dialog and notify parent component to refresh
      });
    }
  }
}
