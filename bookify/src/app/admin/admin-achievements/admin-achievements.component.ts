import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Achievement} from '../../achievement/achievements';
import {Genre} from '../../genre/genre';

@Component({
  selector: 'app-admin-achievements',
  templateUrl: './admin-achievements.component.html',
  styleUrls: ['./admin-achievements.component.css']
})
export class AdminAchievementsComponent implements OnInit {

  @ViewChild('editAchievement', {static: false}) editAchievementTemplate: ElementRef;

  dataSource: MatTableDataSource<Achievement>;
  achievements: Achievement[] = [
    {_id : '1', text: 'Read 5 books', points: 10, rank: 3},
    {_id : '2', text: 'Read 10 books', points: 20, rank: 2},
    {_id : '3', text: 'Read 20 books', points: 30, rank: 1},
    {_id : '4', text: 'Rate a book', points: 3, rank: 10},
    {_id : '5', text: 'Comment on a book', points: 3, rank: 10}
  ];

  displayedColumns: string[] = ['id', 'text', 'rank', 'points', 'action'];
  registerForm: FormGroup;
  newAchievementForm: FormGroup;
  myControl = new FormControl();
  currentAchiev: Achievement;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.achievements);

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      text: new FormControl(['', Validators.required]),
      points: new FormControl(['', Validators.required]),
      rank: new FormControl(['', Validators.required])
    });

    this.newAchievementForm = new FormGroup({
      name: new FormControl(['', Validators.required]),
      text: new FormControl(['', Validators.required]),
      points: new FormControl(['', Validators.required]),
      rank: new FormControl(['', Validators.required])
    });
  }

  remove(id: any) {
    this.achievements = this.achievements.filter(achievement => String(achievement._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.achievements);
  }


  openEditAchievement(achievement: Achievement) {
    this.myControl.setValue(achievement.text);
    this.currentAchiev = achievement;
    this.openModal(this.editAchievementTemplate, 'modal-edit-achievement');
  }

  onNewAchievement() {
    const achievement = new Achievement();
    achievement.text = this.newAchievementForm.get('text').value;
    achievement.rank = this.newAchievementForm.get('rank').value;
    achievement.points = this.newAchievementForm.get('points').value;
    achievement._id = String(Number(this.achievements[this.achievements.length - 1]._id) + 1);

    this.achievements.push(achievement);
    this.dataSource = new MatTableDataSource(this.achievements);
    this.modalService.dismissAll();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
      this.registerForm.reset();
      this.newAchievementForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newAchievementForm.reset();
    });
  }
}
