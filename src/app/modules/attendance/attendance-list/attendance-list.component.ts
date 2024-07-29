import { ChangeDetectorRef, Component } from '@angular/core';
import { AttendanceService } from '../attendance-service/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent {
  list1: any[] = [];
  attendanceDetailData: any[] = [];
  selectedEmployee: any;
  selectedRecord: any;
  allEmployeesAttendanceData: any[]=[];

  showTabs: boolean = false;
  attendanceData: any[] = [];
  attendanceAttributeData: any[] = [];
  empRegId: string | null = null;
  fullName: string | null = null;
  searchModel = { month: '', year: '' };
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

  constructor(private attendanceService: AttendanceService, private cdr: ChangeDetectorRef, private toastr: ToastrService,) { }

  ngOnInit() {
    this.empRegId = this.getEmpRegId();
    if (this.empRegId) {
      this.fetchUserName(this.empRegId);
    }
  }

  ngAfterViewInit() {
    this.initializeDates();
    if (this.empRegId) {
      if (parseInt(this.empRegId, 10) === 6) {
        this.fetchAllEmployeesAttendanceDataForMonth();
      } else {
        this.fetchAttendanceDataForMonth(this.empRegId);
 }
 }
    this.cdr.detectChanges();
  }

  onSearch(form: NgForm) {
    const today = new Date();
    const selectedYear = Number(this.searchModel.year);
    const selectedMonth = Number(this.searchModel.month);
    const selectedDate = new Date(selectedYear, selectedMonth - 1, 1);

    if (selectedDate > today) {
      this.initializeDates(selectedYear, selectedMonth);
      this.clearAttendanceData();
      this.toastr.error('Data not available for the selected month and year.');
      return;
    }

    this.initializeDates(selectedYear, selectedMonth);
    if (this.empRegId) {
      if (parseInt(this.empRegId, 10) === 6) {
        this.fetchAllEmployeesAttendanceDataForMonth(selectedYear, selectedMonth);
      } else {
        this.fetchAttendanceDataForMonth(this.empRegId, selectedYear, selectedMonth);
 }
 }
  }
  isFormValid(): boolean {
    return !!this.searchModel.month && !!this.searchModel.year;
  }

  initializeDates(year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
    const daysInMonth = new Date(year, month, 0).getDate(); // Total days in the selected month
    this.list1 = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayString = day < 10 ? `0${day}` : day.toString();
      const monthString = month < 10 ? `0${month}` : month.toString();
      const formattedDate = `${dayString}-${monthString}-${year}`;
      this.list1.push({ date: formattedDate });
    }
  }

  clearAttendanceData() {
    this.attendanceDetailData = this.list1.map(() => ({ records: [] }));
    this.allEmployeesAttendanceData = this.allEmployeesAttendanceData.map(employee => ({
      ...employee,
      attendanceDetailData:[]
 }));
  }

  fetchAttendanceDataForMonth(empRegId: string, year: number = new Date().getFullYear(), month: number = new Date().getMonth() + 1) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate(); // Current date of the current month

    this.attendanceDetailData = Array(this.list1.length).fill(null).map(() => ({ records: [] }));

    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      // Do not fetch data for future dates
      return;
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      // Previous month or year, fetch whole month's data
      this.list1.forEach((dateItem, index) => {
        const [day, monthString, yearString] = dateItem.date.split('-');
        const apiDate = `${yearString}-${monthString}-${day}`;
        this.fetchDataForDate(empRegId, apiDate, index);
      });
    } else {
      // Current month, fetch data till current date
      this.list1.slice(0, currentDate).forEach((dateItem, index) => {
        const [day, monthString, yearString] = dateItem.date.split('-');
        const apiDate = `${yearString}-${monthString}-${day}`;
        this.fetchDataForDate(empRegId, apiDate, index);
      });
    }
  }

  fetchDataForDate(empRegId: string, apiDate: string, index: number) {
    const checkDate = new Date(apiDate);
    const isSunday = checkDate.getDay() === 0;

    if (!this.attendanceDetailData[index]) {
      this.attendanceDetailData[index] = { records: [] };
    }

    if (isSunday) {
      this.attendanceDetailData[index].records[0] = 'H';
    } else {
      this.attendanceService.getEmployeeAttendanceForDate(empRegId, apiDate).subscribe(
        res => {
          if (res) {
            this.attendanceDetailData[index].records[0] = 'P';
          }
        },
        error => {
          if (error.status === 500) {
            this.attendanceDetailData[index].records[0] = 'A';
          }
        }
      );
    }
  }

  toggleTabs() {
    this.showTabs = !this.showTabs;
  }

  openPopup(empRegId: string | null, record: any, date: string) {
    this.selectedRecord = record;
    const [day, monthString, yearString] = date.split('-');
    const validDate = `${yearString}-${monthString}-${day}`;
    this.showTabs = true;

    const dayOfWeek = new Date(`${yearString}-${monthString}-${day}`).getDay();
    if (dayOfWeek === 0) {
      this.selectedRecord = 'H';
    }
    else if (record === 'A') {
      this.selectedRecord = 'A';
    } else if (record === 'P') {
      this.getAttendanceList(validDate);
      this.getAttendanceAttributeData(validDate);
    }
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  getEmpRegId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload['EmpRegId'] || null;
    }
    return null;
  }
  fetchUserName(empRegId: string) {
    this.attendanceService.getUserNameById(empRegId).subscribe(
      response => {
        if (response && response.statusCode === 200) {
          this.fullName = response.data.fullName;
        } else {
          console.error('Failed to fetch user name');
        }
      },
      error => {
        console.error('Error fetching user name', error);
      }
    );
  }

  getAttendanceList(date: string): void {
    const empRegId = this.getEmpRegId();
    if (!empRegId) {
      console.error('User ID not found.');
      return;
    }

    this.attendanceService.getAttendanceListWithId(empRegId, date).subscribe(
      res => {
        this.attendanceData = res;
      },
      error => {
        console.error('Error fetching attendance data', error);
      }
    );
  }

  getAttendanceAttributeData(date: string): void {
    const empRegId = this.getEmpRegId();
    if (!empRegId) {
      console.error('User ID not found.');
      return;
    }

    this.attendanceService.getAttendanceListWithAttribute(empRegId, date).subscribe(
      res => {
        if (Object.keys(res).length === 0 && res.constructor === Object) {
          console.log('No attendance data available.');
        } else {
          this.attendanceAttributeData = [res];
        }
      },
      error => {
        console.error('Error fetching attendance data', error);
      }
    );
  }

  extractTime(timeString: string): string {
    if (!timeString) return '00:00';
    const timeParts = timeString.split(' ');
    if (timeParts.length < 5) return '00:00';
    return timeParts[3] + ' ' + timeParts[4];
}


fetchAllEmployeesAttendanceDataForMonth(year: number = new Date().getFullYear(), month: number = new Date().getMonth() + 1) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  // Fetch all employee details
  this.attendanceService.getAllEmployees().subscribe(
    employees => {
      // Initialize attendance data for all employees
      this.allEmployeesAttendanceData = employees.map(employee => ({
        fullName: employee.fullName,
        attendanceDetailData: Array(this.list1.length).fill(null).map(() => ({ records: [] }))
      }));

      // Fetch attendance data for each employee
      employees.forEach((employee, empIndex) => {
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          // Previous month or year, fetch whole month's data
          this.list1.forEach((dateItem, dateIndex) => {
            const [day, monthString, yearString] = dateItem.date.split('-');
            const apiDate = `${yearString}-${monthString}-${day}`;
            this.fetchDataForEmployeeDate(employee.empPersDtlId, apiDate, empIndex, dateIndex);
          });
        } else if (year === currentYear && month === currentMonth) {
          // Current month, fetch data till current date
          this.list1.slice(0, currentDate).forEach((dateItem, dateIndex) => {
            const [day, monthString, yearString] = dateItem.date.split('-');
            const apiDate = `${yearString}-${monthString}-${day}`;
            this.fetchDataForEmployeeDate(employee.empPersDtlId, apiDate, empIndex, dateIndex);
          });
        }
      });
    },
    error => {
      console.error('Error fetching employee details', error);
    }
  );
}

fetchDataForEmployeeDate(empPersDtlId: number, apiDate: string, empIndex: number, dateIndex: number) {
  const checkDate = new Date(apiDate);
  const isSunday = checkDate.getDay() === 0;

  if (isSunday) {
    this.allEmployeesAttendanceData[empIndex].attendanceDetailData[dateIndex].records[0] = 'H';
  } else {
    this.attendanceService.getEmployeeAttendanceForDate(empPersDtlId.toString(), apiDate).subscribe(
      res => {
        if (res) {
          this.allEmployeesAttendanceData[empIndex].attendanceDetailData[dateIndex].records[0] = 'P';
        }
      },
      error => {
        if (error.status === 500) {
          this.allEmployeesAttendanceData[empIndex].attendanceDetailData[dateIndex].records[0] = 'A';
        }
      }
    );
  }
}

 
isEmpRegIdSix(): boolean {
  return this.empRegId ? parseInt(this.empRegId, 10) ===6:false;
}

}