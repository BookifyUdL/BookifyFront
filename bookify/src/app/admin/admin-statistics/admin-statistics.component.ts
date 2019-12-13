import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit{

  constructor() { }

  // clicks
  lineChartColors = [
    {
      backgroundColor: 'rgba(255, 255, 255, .7)',
    },
  ];

  chartOptions = {
    title: { display: true, text: 'CLICKS', fontSize: 24, fontColor: 'black' },
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'black',
        },
        gridLines: {
          color: '#5f5e5e'
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'black',
          min: 0,
          beginAtZero: true,

        },
        gridLines: {
          color: '#5f5e5e'
        },
        scaleLabel: {
          display: true,
          fontColor: 'black',
        }
      }],
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'black',
        },
      }
  };

  chartData = [
    { data: [], label: 'Clicks' },
  ];

  chartLabels = ['10/11', '11/11', '12/11', '13/11', '14/11'];

  // Premium
  PremiumLineChartColors = [
    {
      backgroundColor: 'rgba(255, 255, 255, .7)',
    },
  ];

  PremiumChartOptions = {
    title: { display: true, text: 'PREMIUM', fontSize: 24, fontColor: 'black' },
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'black',
        },
        gridLines: {
          color: '#5f5e5e'
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'black',
          min: 0,
          beginAtZero: true,

        },
        gridLines: {
          color: '#5f5e5e'
        },
        scaleLabel: {
          display: true,
          fontColor: 'black',
        }
      }],
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'black',
      },
    }
  };

  PremiumChartData = [
    { data: [], label: 'Premium users' },
  ];

  PremiumChartLabels = ['10/11', '11/11', '12/11', '13/11', '14/11'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit(): void {
      this.chartData[0].data.push(3);
      this.chartData[0].data.push(10);
      this.chartData[0].data.push(15);
      this.chartData[0].data.push(17);
      this.chartData[0].data.push(18);

      this.PremiumChartData[0].data.push(3);
      this.PremiumChartData[0].data.push(10);
      this.PremiumChartData[0].data.push(15);
      this.PremiumChartData[0].data.push(17);
      this.PremiumChartData[0].data.push(18);
  }
}
