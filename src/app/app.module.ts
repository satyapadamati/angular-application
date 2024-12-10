import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
import { MatButtonModule } from '@angular/material/button';  // Import MatButtonModule
import { MatInputModule } from '@angular/material/input';  // Import MatInputModule
import { MatCheckboxModule } from '@angular/material/checkbox';  // Import MatCheckboxModule
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppComponent } from './app.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { EmployeeService } from './employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,  // Include MatTableModule here
    MatDialogModule,  // Include MatDialogModule here
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,  // Include MatCheckboxModule for checkboxes
    HttpClientModule,  // Include HttpClientModule for HTTP requests
    FormsModule  // Include FormsModule for two-way data binding in forms
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
