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
 
  nb_member: number = 0;
  nb_Tools: number = 0;
  nb_Events: number = 0;
  nb_Articles: number = 0;
  
  chartData: ChartDataset[] = [
    {
      label: 'Distribution',
      data: [0, 0, 0, 0], // Default data
    }
  ];
  chartLabels: string[] = ['Member', 'Events', 'Tools', 'Articles'];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  constructor(
    private Ms: MemberService,
    private Ts: ToolService,
    private Es: EventService,
    private As: ArticleService
  ) {}

  ngOnInit(): void {
    this.As.getArticles().subscribe((tab) => {
      this.nb_Articles = tab.length;
      this.updatePieChart();
    });

    this.Ms.getMembers().subscribe((tab) => {
      this.nb_member = tab.length;
      this.updatePieChart();
    });

    this.Ts.getTools().subscribe((tab) => {
      this.nb_Tools = tab.length;
      this.updatePieChart();
    });

    this.Es.getEvents().subscribe((tab) => {
      this.nb_Events = tab.length;
      this.updatePieChart();
    });
  }

  // Update the pie chart data when values change
  updatePieChart(): void {
    this.chartData = [
      {
        label: 'Distribution',
        data: [this.nb_member, this.nb_Events, this.nb_Tools, this.nb_Articles],
      },
    ];
  }

  }
 
  


