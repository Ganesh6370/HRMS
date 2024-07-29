import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { manualattendList } from 'src/app/shared/models/attendance';
import { AttendanceService } from '../attendance-service/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss']
})
export class EmployeeAttendanceComponent implements AfterViewInit {
  list1: any[] = [];
  manualattendList: manualattendList[] = [];
  displayedColumns: string[] = ['manualAttendanceId', 'entryDate', 'inTime', 'outTime','totalTime','statusName'];
  dataSource = new MatTableDataSource<manualattendList>;

  selection = new SelectionModel<manualattendList>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  years = [2022, 2023, 2024, 2025, 2026];

  constructor(private attendanceService: AttendanceService, private toastr: ToastrService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAttendanceList();
    this.getAttendanceAttributeData();
    this.fetchAttendanceDataForWeek(); 
    
  }

  attendanceData: any[] = [];
  attendanceAttributeData: any[]=[];
  attendanceWeekData: any[]=[];
  searchModel: any ={};
  today: string | undefined;
   
  isFormValid(): boolean {
    return !!this.searchModel.month && !!this.searchModel.year;
 }

  getEmpRegId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload['EmpRegId']||null;
    }
    return null;
  }

  getAttendanceList(): void {
    const empRegId = this.getEmpRegId();
    if (!empRegId) {
      console.error('User ID not found.');
      return;
    }

    this.attendanceService.getEmployeeAttendanceWithId(empRegId).subscribe(
      res => {
        this.attendanceData = res;
      },
      error => {
        // console.error('Error fetching attendance data', error);
      }
    );
  }

  getAttendanceAttributeData(): void {
    const empRegId = this.getEmpRegId();
    if (!empRegId) {
      console.error('User ID not found.');
      return;
    }
  
    this.attendanceService.getEmployeeAttendanceWithAttribute(empRegId).subscribe(
      res => {
        if (Object.keys(res).length === 0 && res.constructor === Object) {
          console.log('No attendance data available.');
        } else {
          // Assign the fetched data to attendanceAttributeData
          this.attendanceAttributeData = [res];
        }
      },
      error => {
        // console.error('Error fetching attendance data', error);
      }
    );
  }
  
  fetchAttendanceDataForWeek(): void {
    const empRegId = this.getEmpRegId();
    if (!empRegId) {
      console.error('User ID not found.');
      return;
    }
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();

    const endIndex = currentDayIndex === 0 ? 6 : currentDayIndex ;

    for (let index = 0; index < endIndex; index++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - currentDate.getDay() + index + 1);
      const formattedDate = this.formatDate(date);
      this.attendanceService.getAttendanceDataForDay(empRegId, formattedDate).subscribe(
        (data: any) => {
          this.attendanceWeekData[index] = data;
        },
      );
    }
  }

   

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
  }
  
  extractTime(timeString: string): string {
    if (!timeString) return '00:00';
    const timeParts = timeString.split(' ');
    if (timeParts.length < 5) return '00:00';
    return timeParts[3] + ' ' +timeParts[4];
}

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  getDayOfWeek(index: number): string {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[index];
  }
  calculateProgress(totalTime: string): number {
    if (!totalTime) return 0;
    const [hours, minutes] = totalTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const progress = (totalMinutes / (8 * 60)) * 100;
    return Math.min(progress, 100);
  }
  getProgressBarColor(index: number): string {
    const colors = ['bg-info', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-primary'];
    return colors[index % colors.length];
}


onSearch(form: NgForm) {
  const today = new Date();
  const selectedYear = Number(this.searchModel.year);
  const selectedMonth = Number(this.searchModel.month);
  const selectedDate = new Date(selectedYear, selectedMonth - 1, 1);

  if (selectedDate > today) {
    this.toastr.error('Data not available for the selected month and year.');
  }

  this.fetchAttendanceDataForUser(selectedYear, selectedMonth);
}
 

fetchAttendanceDataForUser(selectedYear: number, selectedMonth: number): void {
  const empRegId = this.getEmpRegId();
  if (empRegId) {
    this.attendanceService.getEmployeeAttendanceListWithId(empRegId).subscribe(res => {
      // Filter data based on selected month and year
      const filteredData = res.filter((item: any) => {
        const itemDate = new Date(item.entryDate);
        return itemDate.getFullYear() === selectedYear && (itemDate.getMonth() + 1) === selectedMonth;
      });
      console.log('Filtered data:', filteredData);  // Log the filtered data
      this.manualattendList = filteredData;
      this.dataSource.data = this.manualattendList;
    }, err => {
      console.error('Error fetching attendance data:', err);  // Log any errors
    });
  } else {
    console.error('User ID is null or undefined');
 }
 }
 ngOnInit() {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
  const day = todayDate.getDate().toString().padStart(2, '0');
  this.today = `${year}-${month}-${day}`;

  // Generate years for the dropdown 
  const currentYear = new Date().getFullYear();
  for (let y = 2020; y <= 2030; y++) {
    this.years.push(y);
  }

  this.fetchAttendanceDataForUser(currentYear, todayDate.getMonth()+1);
 }
}