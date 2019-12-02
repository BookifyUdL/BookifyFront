import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from '../../models/comment/comment';
import { DataCommentService } from '../../models/comments/data-comment.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {

  @ViewChild('editComment', {static: false}) editTemplate: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Comment>;
  comments: Comment[];

  displayedColumns: string[] = ['id', 'commentType', 'comment', 'url', 'subReview', 'user', 'userLiked', 'action'];
  registerForm: FormGroup;
  current: Comment;

  constructor(private modalService: NgbModal, private dataService: DataCommentService) { }

  ngOnInit() {
    this.dataService.getComments().subscribe(
      result => {
        this.comments = result.comments;
        this.dataSource = new MatTableDataSource(this.comments);
        this.dataSource.paginator = this.paginator;
      }
    );

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
    this.dataService.deleteComment(id)
      .subscribe(() => {
          this.comments.forEach((item, index) => {
            if (item._id === id) {
              this.comments.splice(index, 1);
            }
          });

          this.dataSource.data = this.comments;
        }
      );
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
    const toUpdate = [];

    this.current = comment;

    if (this.current.commentType !== this.registerForm.get('commentType').value) {
      this.current.commentType = this.registerForm.get('commentType').value;
      toUpdate.push({propName: "comment_type", value: this.registerForm.get('commentType').value});
    }

    if (this.current.comment !== this.registerForm.get('comment').value) {
      this.current.comment = this.registerForm.get('comment').value;
      toUpdate.push({propName: "message", value: this.registerForm.get('comment').value});
    }

    if (this.current.url !== this.registerForm.get('url').value) {
      this.current.url = this.registerForm.get('url').value;
      toUpdate.push({propName: "uri", value: this.registerForm.get('url').value});
    }

    if (this.current.subReview !== this.registerForm.get('subReview').value) {
      this.current.subReview = this.registerForm.get('subReview').value;
      toUpdate.push({propName: "subreviews", value: this.registerForm.get('subReview').value});
    }

    if (this.current.user !== this.registerForm.get('user').value) {
      this.current.user = this.registerForm.get('user').value;
      toUpdate.push({propName: "user", value: this.registerForm.get('user').value});
    }

    if (this.current.userLiked !== this.registerForm.get('userLiked').value) {
      this.current.userLiked = this.registerForm.get('userLiked').value;
      toUpdate.push({propName: "user_liked", value: this.registerForm.get('userLiked').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateComment(this.current._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.comments;
          this.modalService.dismissAll();
        }
      );

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
