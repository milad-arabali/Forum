import {Component, OnInit} from '@angular/core';
import {ChartService} from "./shared/chart.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  showLabels = true;
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
  viewpie: any;
  explodeSlices: any;
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
  update$: Subject<any> = new Subject();
  constructor(private chartServices: ChartService) {
  }

  ngOnInit() {
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

    setTimeout(() => {
      // this.category[0].value.push(this.subjectCategory)
      // this.category[1].value.push(this.subjectCategory)
      // this.category[2].value.push(this.subjectCategory)
      const objIndex = this.category.find((obj => obj.value === 1));
      console.log("old value", objIndex);
      objIndex.value=this.subjectCategory;
      console.log("new value", objIndex);

      this.updateChart()
      // this.category[objIndex].value = this.subjectCategory
    }, 500)

  //
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   setTimeout(() => {
  //     this.data = {
  //       labels: ['A', 'B', 'C'],
  //       datasets: [
  //         {
  //           data: [Number(this.subjectCategory), Number(this.activeCategory), Number(this.inactiveCategory)],
  //           backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
  //           hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
  //         }
  //       ]
  //     };
  //   }, 500)
  //   setTimeout(() => {
  //     this.dataSubject = {
  //       labels: ['A', 'B', 'C'],
  //       datasets: [
  //         {
  //           data: [Number(this.subject), Number(this.activeSubject), Number(this.inactiveSubject)],
  //           backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
  //           hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
  //         }
  //       ]
  //     };
  //   }, 500)
  //   setTimeout(() => {
  //     this.dataUsers = {
  //       labels: ['کاربران ثبت نامی ', 'کاربران تایید شد', 'کاربران تایید نشده'],
  //       datasets: [
  //         {
  //           data: [this.usersStatusRegistered, this.usersStatusConfirm, this.usersStatusReject],
  //           backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
  //           hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
  //         }
  //       ]
  //     };
  //   }, 500)
  //   this.options = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           usePointStyle: true,
  //           color: textColor
  //         }
  //       }
  //     }
  //   };
  }
  updateChart(){
    this.update$.next(true);
  }
}
