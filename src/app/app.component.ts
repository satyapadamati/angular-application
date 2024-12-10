import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeService } from './employee.service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees = [];
  displayedColumns: string[] = ['select', 'id', 'name', 'loc', 'sal'];
  selection = new SelectionModel<any>(false, []); // `false` means single selection by default
  dataSource = new MatTableDataSource<any>(this.employees);

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.map(employee => ({
        id: employee.id || 0,
        name: employee.name || '',
        location: employee.loc || '',  // Ensure correct binding for location
        salary: employee.sal || 0       // Ensure correct binding for salary
      }));
    });
  }

  // Method for selecting a row
  onRowSelect(row: any) {
    this.selection.toggle(row);
  }

  // For selecting all rows
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Open dialog based on formType (add, update, delete)
  openDialog(formType: string): void {
    const selectedEmployee = this.selection.selected[0]; // Get the first selected row's employee data

    if (!selectedEmployee && formType !== 'add') {
      alert("Please select an employee to perform the action.");
      return; // If no employee is selected for update/delete, show an alert
    }

    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: { formType, employee: selectedEmployee }
    });

    // After dialog closes, refresh the employee list
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();  // Refresh the employee list after action
      }
    });
  }
}
