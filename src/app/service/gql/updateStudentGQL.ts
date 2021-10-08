import {Injectable} from '@angular/core';
import {Mutation, gql} from 'apollo-angular';
import { Student } from 'src/app/model/student';

export interface Response {
  updateStudent: Student;
}

@Injectable({
    providedIn: 'root',
})
export class UpStudentGQL extends Mutation {
  document = gql`
    mutation updateStudent($id: Float!, $studentInput: studentUpdateDTO!) {
        updateStudent (id: $id, studentInput: $studentInput) {
            id,
            firstName,
            email,
            middleName,
            dob,
            age
        }
    }
  `;
}