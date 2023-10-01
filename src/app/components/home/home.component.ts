import {Component, OnInit} from '@angular/core';
import {ChartService} from "./shared/chart.service";
import {Subject} from "rxjs";
import * as moment from "jalali-moment";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  test: number;
  name = 'Angular';
  width: number = 700;
  height: number = 300;
  view: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  items: any[] = [];
  public category = [
    {
      "name": "تعداد دسته بندی ها",
      "value": 1
    },
    {
      "name": "تعداد کل دسته بندی های فعال",
      "value": 2
    },
    {
      "name": "تعداد کل دسته بندی های غیر فعال",
      "value": 3
    }
  ];
  public single = [
    {
      "name": "تعداد دسته بندی ها",
      "value": 2
    },
    {
      "name": "تعداد کل دسته بندی های فعال",
      "value": 23
    },
    {
      "name": "تعداد کل دسته بندی های غیر فعال",
      "value": 32
    }
  ];
  // public single = [
  //   {
  //     "name": "China",
  //     "value": 50
  //   },
  //   {
  //     "name": "USA",
  //     "value": 11
  //   },
  //   {
  //     "name": "Norway",
  //     "value": 29
  //   },
  //   {
  //     "name": "Japan",
  //     "value": 2
  //   },
  //   {
  //     "name": "Germany",
  //     "value": 19
  //   },
  //   {
  //     "name": "France",
  //     "value": 20
  //   }
  // ];
  public multi = [
    {
      "name": "China",
      "series": [
        {
          "name": "2018",
          "value": 22
        },
        {
          "name": "2017",
          "value": 12
        }
      ]
    },
    {
      "name": "USA",
      "series": [
        {
          "name": "2018",
          "value": 11
        },
        {
          "name": "2017",
          "value": 30
        }
      ]
    },
    {
      "name": "Norway",
      "series": [
        {
          "name": "2018",
          "value": 29
        },
        {
          "name": "2017",
          "value": 20
        }
      ]
    },
    {
      "name": "Japan",
      "series": [
        {
          "name": "2018",
          "value": 27
        },
        {
          "name": "2017",
          "value": 20
        }
      ]
    },
    {
      "name": "Germany",
      "series": [
        {
          "name": "2018",
          "value": 19
        },
        {
          "name": "2017",
          "value": 12
        }
      ]
    },
    {
      "name": "France",
      "series": [
        {
          "name": "2018",
          "value": 20
        },
        {
          "name": "2017",
          "value": 14
        }
      ]
    }
  ];
  data: any;
  options: any;
  subjectCategory: number;
  activeCategory: number;
  inactiveCategory: number;
  dataSubject: any;
  subject: number;
  activeSubject: number;
  inactiveSubject: number;
  dataUsers: any;
  allUser: number;
  usersStatusConfirm: number;
  usersStatusRegistered: number;
  usersStatusReject: number;
  saveSubject: any;
  bayGroupList: any[] = [];
  bayGroupList1: any[] = [];
  daysAgo = '';

  daysAgo1 = '';
  daysAgo2 = '';
  currentTime9=moment().add(-9,'days');
  currentTime8=moment().add(-8,'days');
  currentTime7=moment().add(-7,'days');
  currentTime6=moment().add(-6,'days');
  currentTime5=moment().add(-5,'days');
  currentTime4=moment().add(-4,'days');
  currentTime3=moment().add(-3,'days');
  currentTime2=moment().add(-2,'days');
  currentTime1=moment().add(-1,'days');
  saveSubject9:number;
  saveSubject8:number;
  saveSubject7:number;
  saveSubject6:number;
  saveSubject5:number;
  saveSubject4:number;
  saveSubject3:number;
  saveSubject2:number;
  saveSubject1:number;
  saveUsers1:number;
  saveUsers2:number;
  saveUsers3:number;
  saveUsers4:number;
  saveUsers5:number;
  saveUsers6:number;
  saveUsers7:number;
  saveUsers8:number;
  saveUsers9:number;
  saveVote1:number;
  saveVote2:number;
  saveVote3:number;
  saveVote4:number;
  saveVote5:number;
  saveVote6:number;
  saveVote7:number;
  saveVote8:number;
  saveVote9:number;


  time:any;
  constructor(private chartServices: ChartService) {
    for (let i = 0; i < 10; i++) {
      this.daysAgo1 = moment().subtract(i, 'day').locale('fa').format('YYYY-MM-DD')
      this.daysAgo2 = moment().subtract(i, 'day').format('YYYY-MM-DD')
      this.bayGroupList.push(this.daysAgo1)
      this.bayGroupList1.push(this.daysAgo2)
    }
    // console.log("fsfsfsffff", this.bayGroupList);
    // console.log("fsfsfsffff", this.bayGroupList1);
  }


  ngOnInit() {

    this.dateConverter(new Date())

    this.chartServices.getAllSubjectCategory().subscribe(
      value => {
        this.subjectCategory = value.length;
      }
    )
    this.chartServices.getActiveCategory().subscribe(
      value => {
        this.activeCategory = value.length;
      }
    )
    this.chartServices.getInactiveCategory().subscribe(
      value => {
        this.inactiveCategory = value.length;
      }
    )
    this.chartServices.getAllSubject().subscribe(
      value => {
        this.subject = value.length;
      }
    )
    this.chartServices.getActiveSubject().subscribe(
      value => {
        this.activeSubject = value.length;
      }
    )
    this.chartServices.getInactiveSubject().subscribe(
      value => {
        this.inactiveSubject = value.length;
      }
    )
    this.chartServices.getAllUsers().subscribe(
      value => {
        this.allUser = value.length;
      }
    )
    this.chartServices.getUsersStatusConfirm().subscribe(
      value => {
        this.usersStatusConfirm = value.length;
      }
    )
    this.chartServices.getUsersStatusRegistered().subscribe(
      value => {
        this.usersStatusRegistered = value.length;
      }
    )
    this.chartServices.getUsersStatusReject().subscribe(
      value => {
        this.usersStatusReject = value.length;
      }
    )

    this.chartServices.getTimeDateSubject(this.currentTime9.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject9 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime8.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject8 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime7.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject7 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime6.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject6 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime5.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject5 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime4.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject4 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime3.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject3 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime2.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject2 = value.length;
      }
    )
    this.chartServices.getTimeDateSubject(this.currentTime1.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveSubject1 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime1.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers1 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime2.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers2 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime3.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers3 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime4.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers4 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime5.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers5 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime6.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers6 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime7.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers7 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime8.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers8 = value.length;
      }
    )
    this.chartServices.getTimeSaveUsers(this.currentTime9.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveUsers9 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime1.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote1 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime2.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote2 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime3.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote3 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime4.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote4 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime5.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote5 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime6.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote6 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime7.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote7 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime8.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote8 = value.length;
      }
    )
    this.chartServices.getTimeDateComment(this.currentTime9.format('YYYY-MM-DD')).subscribe(
      value => {
        this.saveVote9 = value.length;
      }
    )

    this.bayGroupList.push(moment(this.daysAgo).locale('fa').format('YYYY/MM/DD'))
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    setTimeout(() => {
      this.data = {
        labels: ['دسته بندی فعال', 'دسته بندی غیرفعال'],
        datasets: [
          {
            data: [Number(this.activeCategory), Number(this.inactiveCategory)],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
    }, 500)
    setTimeout(() => {
      this.dataSubject = {
        labels: ['موضوعات فعال', 'موضوعات غیر فعال'],
        datasets: [
          {
            data: [Number(this.activeSubject), Number(this.inactiveSubject)],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
    }, 500)
    setTimeout(() => {
      this.dataUsers = {
        labels: ['کاربران ثبت نامی ', 'کاربران تایید شد', 'کاربران تایید نشده'],
        datasets: [
          {
            data: [this.usersStatusRegistered, this.usersStatusConfirm, this.usersStatusReject],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
    }, 500)
    setTimeout(() => {
      this.dataUsers = {
        labels: ['کاربران ثبت نامی ', 'کاربران تایید شد', 'کاربران تایید نشده'],
        datasets: [
          {
            data: [this.usersStatusRegistered, this.usersStatusConfirm, this.usersStatusReject],
            fontFamily:[documentStyle.getPropertyValue('font-family: BTitrBold;')],
            backgroundColor:
              [documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor:
              [documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
    }, 500)
    setTimeout(() => {
      this.saveSubject = {
        labels: this.bayGroupList,
        datasets: [
          {
            type: 'bar',
            label: 'موضوعات ثبت شده',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            data: [
              this.saveSubject9,
              this.saveSubject8,
              this.saveSubject7,
              this.saveSubject6,
              this.saveSubject5,
              this.saveSubject4,
              this.saveSubject3,
              this.saveSubject2,
              this.saveSubject1]
          },
          {
            type: 'bar',
            label: 'کاربران ثبت شده',
            backgroundColor: documentStyle.getPropertyValue('--green-500'),
            data: [
              this.saveUsers9,
              this.saveUsers8,
              this.saveUsers7,
              this.saveUsers6,
              this.saveUsers5,
              this.saveUsers4,
              this.saveUsers3,
              this.saveUsers2,
              this.saveUsers1]
          },
          {
            type: 'bar',
            label: 'دیدگاه های ثبت شده',
            backgroundColor: documentStyle.getPropertyValue('--red-500'),
            data: [
              this.saveVote9,
              this.saveVote8,
              this.saveVote7,
              this.saveVote6,
              this.saveVote5,
              this.saveVote4,
              this.saveVote3,
              this.saveVote2,
              this.saveVote1]
          },
        ]
      };
    }, 500)
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
  dateConverter(dateIn) {
    dateIn.setHours(12);
    let dateIn10days = new Date(dateIn.setDate(dateIn.getDate() + 10));
    let dateFor10days = new Date(dateIn.setDate(dateIn.getDate() - 20));
    let strIn10Days =
      dateIn10days.getFullYear() + '-' + ('0' + (dateIn10days.getMonth() + 1)).slice(-2) + '-' + ('0' + dateIn10days.getDate()).slice(-2);
    let strFor10Days =
      dateFor10days.getFullYear() + '-' + ('0' + (dateFor10days.getMonth() + 1)).slice(-2) + '-' + ('0' + dateFor10days.getDate()).slice(-2);
    console.log("dsdsdsdsd", strFor10Days);
    this.daysAgo = strFor10Days;
  }

}
