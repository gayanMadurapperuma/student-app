import {Injectable} from '@angular/core';
import {Query, gql, Subscription} from 'apollo-angular';
import { Student } from '../../model/student';

export interface Response {
  getAllStudents: Student[];
}

@Injectable({
  providedIn: 'root',
})
export class AllStudentGQL extends Query<Response> {
  document = gql`
    query {
        getAllStudents {
            id
            firstName
            middleName
            lastName
            email
            dob
            age
        }
    }`;
}