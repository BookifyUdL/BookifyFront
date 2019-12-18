import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStatisticsService } from '../../models/statistics/data-statistics.service';
import {MatTableDataSource} from '@angular/material';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit{

  constructor(private modalService: NgbModal, private dataService: DataStatisticsService) { }

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

  chartLabels = [];

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

  PremiumChartLabels = [];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit(): void {
    const format = 'dd/MM/yyyy';
    const locale = 'en-ES';

    this.dataService.getStatisticByType(1).subscribe(
      result => {
        result.statistics.forEach(elem => {
            const formattedDate = formatDate(elem.time, format, locale);
            this.chartLabels.push(formattedDate);
            this.chartData[0].data.push(elem.quantity);
        });
      }
    );

    this.dataService.getStatisticByType(2).subscribe(
      result => {
        result.statistics.forEach(elem => {
          const formattedDate = formatDate(elem.time, format, locale);
          this.PremiumChartLabels.push(formattedDate);
          this.PremiumChartData[0].data.push(elem.quantity);
        });
      }
    );
  }
}
