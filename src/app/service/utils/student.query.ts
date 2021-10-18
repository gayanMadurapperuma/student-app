import {gql} from 'apollo-angular';

export const GET_STUDENT = gql`
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
    }
`;

export const UPDATE_STUDENT = gql`
    mutation ($id: Float!, $studentInput: studentUpdateDTO!) {
        updateStudent (id: $id, studentInput: $studentInput) {
            id,
            firstName,
            email,
            middleName,
            lastName,
            dob,
            age
        }
    }
`;

export const REMOVE_STUDENT =  gql`
    mutation RemoveStudent($id: Float!) {
        removeStudent(id: $id)
    }
`;
