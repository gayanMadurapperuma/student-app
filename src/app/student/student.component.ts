import { Component, Inject, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { NotifierService } from 'angular-notifier';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Student} from '../model/student';
import {GET_STUDENT, REMOVE_STUDENT} from '../service/utils/student.query';
import {products} from './product';
import {AxiosService} from '../service/student.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { GatewayService } from '../service/gateway.service';
import { AllStudentGQL } from '../service/gql/allStudentGQL';
import { HttpStatusCode } from '@angular/common/http';
import { StudentGQLService } from '../service/studentGQL.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentGQLService, NotifierService]
})
export class StudentComponent implements OnInit {

  students: Student[];
  product: any[] = products;
  file: File = null;
  job: any = null;
  removeSelected: number;
  private readonly notifier: NotifierService;
  private editedRowIndex: number;
  public gridView: GridDataResult;
  public formGroup: FormGroup;
  public pageSize = 10;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  constructor(public dialog: MatDialog, private apollo: Apollo, notificationService: NotifierService, private readonly axiosService: AxiosService, private readonly gatewayService: GatewayService, private allStudentGQL: AllStudentGQL, private studentGQLService: StudentGQLService) { 
    this.notifier = notificationService;
  }

  ngOnInit(): void {
    this.gatewayService.onFetchJobStatus().subscribe((data: any) => {
      const {statusCode} = data;
      if(statusCode === HttpStatusCode.Ok){
        this.notifier.notify('success', 'Bulk insert job completed');
        this.getAllStudents();
      } else {
        this.notifier.notify('error', 'Bulk insert job failed')
      }
    });
    this.getAllStudents(); 
  }

  getAllStudents(){
    this.studentGQLService.getAllStudent().subscribe(
      data => {
        this.students = data;
        this.loadItems();
      },
      () => {
        this.notifier.notify('error', 'Fetching all student failed')
      }
    )
  }

  editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'firstName': new FormControl(dataItem.firstName, Validators.required),
      'middleName': new FormControl(dataItem.middleName),
      'lastName': new FormControl(dataItem.lastName, Validators.required),
      'email': new FormControl(
              dataItem.email,
              Validators.compose([Validators.required, Validators.email])),
      'dob': new FormControl(new Date(dataItem.dob), Validators.compose([Validators.required]))
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  cancelHandler({sender, rowIndex}): void {
    this.closeEditor(sender, rowIndex);
  }

  saveHandler({sender, rowIndex, formGroup, dataItem}): void {
    this.studentGQLService.updateStudent(dataItem.id, formGroup.value);
    sender.closeRow(rowIndex);
  }

  removeHandler({dataItem}): void {
    this.removeSelected = dataItem.id;
    this.openDialog();
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public pageChange(event: PageChangeEvent): void {
    this.gridState.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    console.log(this.students.slice(this.gridState.skip, this.gridState.skip + this.gridState.take));
    this.gridView = {
      data:  this.students.slice(this.gridState.skip, this.gridState.skip + this.gridState.take),
      total: this.students.length,
    };
  }


  selectFile(file: FileList){
    this.file = file.item(0);
  }

  async uploadFile(){
    try {
      const formData = new FormData();
      formData.append('file', this.file);
      await this.axiosService.uploadFile(formData); 
    } catch (error) {
      this.notifier.notify('error', 'Upload Failed')
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(RemoveConfirmation, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((remove) => {
      if(remove){
        this.apollo.mutate({
          mutation: REMOVE_STUDENT,
          variables: {
            id: this.removeSelected
          },
          refetchQueries: [
            { query: GET_STUDENT }
          ]
        }).subscribe()
      }
    });
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './student.dialog.html',
})
export class RemoveConfirmation {

  constructor(
    public dialogRef: MatDialogRef<RemoveConfirmation>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
