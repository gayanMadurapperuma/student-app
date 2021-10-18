import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../model/student';
import { StudentUpdate } from '../model/student.update';
import { AllStudentGQL } from './gql/allStudentGQL';
import { UpStudentGQL } from './gql/updateStudentGQL';
import { RemoveStudentGQL } from './gql/removeStudentGQL';
import { UPDATE_STUDENT } from './utils/student.query';

@Injectable()
export class StudentGQLService {
    constructor(private allStudentGQL: AllStudentGQL, private upStudentGQL: UpStudentGQL, private removeStudentGQL: RemoveStudentGQL){}

    getAllStudent(): Observable<Student[]> {
        return this.allStudentGQL.watch(null, {
            fetchPolicy: 'network-only'
        })
        .valueChanges
        .pipe(
          map(result => {
            return result.data.getAllStudents;
          })
        );
    }

    updateStudent(id: number, studentInput : StudentUpdate) {
        this.upStudentGQL.mutate({
            id,
            studentInput
        }).subscribe();
    }

    removeStudent(id: number) {
        this.removeStudentGQL.mutate({
            id
        }).subscribe();
    }
}