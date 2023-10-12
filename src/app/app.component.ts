import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmpformComponent } from './add-edit-empform/add-edit-empform.component';
import { ServiceService } from './shared/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularCRUD';
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'exp',
    'salary',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private service:ServiceService){}
  ngOnInit():void{
    this.getEmplyeeList();
  }

  openAddEditEmpForm(){
    const dialogref = this.dialog.open(AddEditEmpformComponent);
    dialogref.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmplyeeList();
        }
      }
    })
  }
  editEmpForm(data:any){
    const dialogref = this.dialog.open(AddEditEmpformComponent,{
      data
    });
    dialogref.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmplyeeList();
        }
      }
    })
  }
  getEmplyeeList(){
    this.service.getAllEmployee().subscribe({
      next :(val:any)=>{
        // console.log(val);
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error :(val:any)=>{
        alert(val);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmp(id:any){
    this.service.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert("Employee Deleted Successfully!!");
        this.getEmplyeeList();  // for refresh the employee list
      },
      error: console.log,
    })
  }
}
