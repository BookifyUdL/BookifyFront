import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Achievement} from '../../models/achievement/achievements';
import {DataAchievementService} from '../../models/achievement/data-achievement.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-achievements',
  templateUrl: './admin-achievements.component.html',
  styleUrls: ['./admin-achievements.component.css']
})
export class AdminAchievementsComponent implements OnInit {

  @ViewChild('editAchievement', {static: false}) editAchievementTemplate: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Achievement>;
  achievements: Achievement[];

  displayedColumns: string[] = ['id', 'name', 'rank', 'points', 'action'];
  registerForm: FormGroup;
  newAchievementForm: FormGroup;
  myControl = new FormControl();
  currentAchiev: Achievement;

  constructor(private modalService: NgbModal, private dataService: DataAchievementService) { }

  ngOnInit() {
    this.dataService.getAchievements().subscribe(
      result => {
        this.achievements = result.achievements;
        this.dataSource = new MatTableDataSource(this.achievements);
        this.dataSource.data = this.achievements;
        this.dataSource.paginator = this.paginator;
      }
    );

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
      points: new FormControl(['', Validators.required]),
      rank: new FormControl(['', Validators.required])
    });

    this.newAchievementForm = new FormGroup({
      name: new FormControl(['', Validators.required]),
      points: new FormControl(['', Validators.required]),
      rank: new FormControl(['', Validators.required])
    });
  }

  remove(id: any) {
    this.dataService.deleteAchievement(id)
      .subscribe(() => {
          this.achievements.forEach((item, index) => {
            if (item._id === id) {
              this.achievements.splice(index, 1);
            }
          });

          this.dataSource.data = this.achievements;
        }
      );
  }

  onEditAchievement() {
    const toUpdate = [];

    if (this.currentAchiev.name !== this.registerForm.get('name').value) {
      this.currentAchiev.name = this.registerForm.get('name').value;
      toUpdate.push({propName: "name", value: this.registerForm.get('name').value});
    }

    if (this.currentAchiev.points !== this.registerForm.get('points').value) {
      this.currentAchiev.points = this.registerForm.get('points').value;
      toUpdate.push({propName: "points", value: this.registerForm.get('points').value});
    }

    if (this.currentAchiev.rank !== this.registerForm.get('rank').value) {
      this.currentAchiev.rank = this.registerForm.get('rank').value;
      toUpdate.push({propName: "rank", value: this.registerForm.get('rank').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateAchievement(this.currentAchiev._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.achievements;
          this.modalService.dismissAll();
        }
      );
  }

  openEditAchievement(achievement: Achievement) {
    this.myControl.setValue(achievement.name);
    this.currentAchiev = achievement;
    this.registerForm.controls['name'].setValue(achievement.name);
    this.registerForm.controls['points'].setValue(achievement.points);
    this.registerForm.controls['rank'].setValue(achievement.rank);
    this.openModal(this.editAchievementTemplate, 'modal-edit-achievement');
  }

  onNewAchievement() {
    const achievement = new Achievement();
    achievement.name = this.newAchievementForm.get('name').value;
    achievement.rank = this.newAchievementForm.get('rank').value;
    achievement.points = this.newAchievementForm.get('points').value;

    this.dataService.newAchievement(achievement)
      .subscribe(res => {
          this.achievements.push(res['createdAchievement']);
          this.dataSource.data = this.achievements;
        }, (err) => {
          console.log(err);
        }
      );

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
