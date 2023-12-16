import { Component } from '@angular/core';
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
export class DashboardComponent {
  nb_Members:number=0;
  nb_Tools:number=0;
  nb_Events:number=0;
  nb_Articles:number=0;
  constructor(private Ms:MemberService,private Ts:ToolService,private Es:EventService){
    this.nb_Members=this.Ms.tab.length;
    this.nb_Tools=this.Ts.tab.length;
    this.nb_Events=this.Es.tab.length;
    for (let i = 0; i < this.nb_Members; i++) {
      this.chartLabels.push(this.Ms.tab[i].name)
      
    }

  }
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'number of articles',
      data: this.getNumbers()
    }
  ];
  chartLabels: String[] = [];
  chartOptions: ChartOptions = {};
  stab:number[]=[]
  getNumbers(){
    this.Ms.getNbPubByMember().subscribe((x)=>this.stab=x)
    return this.stab
  }
  chartLabelsPie: String[] = ["Student","Teacher"];
  chartOptionsPie: ChartOptions = {};
  chartDataPie: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'nombre ',
      data: this.getNumbersStudent()
    }
  ];
  Studenttab:number[]=[]
  getNumbersStudent(){
    this.Ms.getNbStudByTeacher().subscribe((x)=>this.Studenttab=x)
    return this.Studenttab
  }
}
