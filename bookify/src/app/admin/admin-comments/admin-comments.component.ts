import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from '../../models/comment/comment';
import {Item} from '../../models/item/item';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {

  @ViewChild('editComment', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<Comment>;
  comments: Comment[] = [
    {_id : '1', commentType: 1, comment: 'Baffled', url: '', subReview: [], user: null, userLiked: []},
    {_id : '2', commentType: 1, comment: 'Amazing', url: '', subReview: [], user: null, userLiked: []},
    {_id : '3', commentType: 2, comment: 'Worst book that I\'ve ever read.', url: 'asd.com/image1.png', subReview: [], user: null,
      userLiked: []},
    {_id : '4', commentType: 3, comment: 'Uninteresting at its best', url: 'asd.com/gif1.gif', subReview: [], user: null, userLiked: []},
  ];

  displayedColumns: string[] = ['id', 'commentType', 'comment', 'url', 'subReview', 'user', 'userLiked', 'action'];
  registerForm: FormGroup;
  current: Comment;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.comments);

    this.registerForm = new FormGroup({
      _id: new FormControl(['', Validators.required]),
      commentType: new FormControl(['', Validators.required]),
      comment: new FormControl(['', Validators.required]),
      url: new FormControl(['', Validators.required]),
      subReview: new FormControl(),
      user: new FormControl(),
      userLiked: new FormControl()
    });
  }

  remove(id: any) {
    this.comments = this.comments.filter(comment => String(comment._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.comments);
  }

  onEditComment() {
    this.current.commentType = this.registerForm.get('commentType').value;
    this.current.comment = this.registerForm.get('comment').value;
    this.current.url = this.registerForm.get('url').value;
    this.current.subReview = this.registerForm.get('subReview').value;
    this.current.user = this.registerForm.get('user').value;
    this.current.userLiked = this.registerForm.get('userLiked').value;
    this.modalService.dismissAll();
  }

  openEditComment(comment: Comment) {
    this.current = comment;
    this.registerForm.controls['commentType'].setValue(comment.commentType);
    this.registerForm.controls['comment'].setValue(comment.comment);
    this.registerForm.controls['url'].setValue(comment.url);
    this.registerForm.controls['subReview'].setValue(comment.subReview);
    this.registerForm.controls['user'].setValue(comment.user);
    this.registerForm.controls['userLiked'].setValue(comment.userLiked);
    this.registerForm.controls['userLiked'].setValue(comment.userLiked);
    this.openModal(this.editTemplate, 'modal-edit-comment');
  }


  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
      this.registerForm.reset();
    }, (reason) => {
      this.registerForm.reset();
    });
  }
}
