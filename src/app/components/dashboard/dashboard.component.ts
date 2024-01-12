import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/services/article.service';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import{ChartDataset , ChartOptions} from 'chart.js'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nb_Students:number=0;
  nb_Teachers:number=0;
  nb_Tools:number=0;
  nb_Events:number=0;
  nb_Articles:number=0;
  
  chartLabels: String[] = [];
  chartOptions: ChartOptions = {};
  
  Studenttab:number[]=[]
  chartLabelsPie: String[] = ["Teacher","Student"];
  chartLabelsBar: String[] = ["Teacher","Student","Tools","Events","Articles"];
  chartDataPie!: ChartDataset[];
  backgroundColor= [
    'rgba(255, 99, 132)',
    'rgba(255, 159, 64)',
    'rgba(255, 205, 86)',
    'rgba(75, 192, 192)',
    'rgba(54, 162, 235)'
  ]
  chartDataBar: ChartDataset[]=[{label: 'Bar Chart',backgroundColor:this.backgroundColor,data: [this.nb_Teachers,this.nb_Students,this.nb_Tools,this.nb_Events,this.nb_Articles]}];
  constructor(private Ms:MemberService,private Ts:ToolService,private Es:EventService,private As:ArticleService){}
  ngOnInit(): void {
    this.As.getArticles().subscribe((tab)=>{
      this.nb_Articles=tab.length;
      this.updateBarChart()
    })
    this.Ms.getAllStudents().subscribe((tab)=>{
      this.nb_Students=tab.length;
      this.updateBarChart()
    })
    this.Ms.getAllTeachers().subscribe((tab)=>{
      this.nb_Teachers=tab.length;
      this.updateBarChart()
    })
    this.Ts.getTools().subscribe((tab)=>{
      this.nb_Tools=tab.length;
      this.updateBarChart()
    })
    this.Es.getEvents().subscribe((tab)=>{
      this.nb_Events=tab.length;
      this.updateBarChart()

    })
    this.Ms.getNbStudByTeacher().then((x)=>{
      this.chartDataPie = [
        {
          label: 'nombre',
          data: x
        }
      ];
      console.log(x);
      

    })

  }
  updateBarChart(){
    this.chartDataBar=[{label: 'Bar Chart',backgroundColor:this.backgroundColor,data: [this.nb_Teachers,this.nb_Students,this.nb_Tools,this.nb_Events,this.nb_Articles]}];
  }

  

}
