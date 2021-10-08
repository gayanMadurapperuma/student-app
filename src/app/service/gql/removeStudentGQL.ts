import {Injectable} from '@angular/core';
import {Mutation, gql} from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class RemoveStudentGQL extends Mutation {
  document = gql`
    mutation RemoveStudent($id: Float!) {
        removeStudent(id: $id)
    }
  `;
}