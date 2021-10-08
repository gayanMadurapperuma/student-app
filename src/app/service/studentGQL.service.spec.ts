import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import {
    ApolloTestingModule,
    ApolloTestingController,
  } from 'apollo-angular/testing';
import { StudentGQLService } from './studentGQL.service';
import { Student } from '../model/student';
import {} from '../model/student.update';
import { UpStudentGQL } from './gql/updateStudentGQL';
import {GET_STUDENT, UPDATE_STUDENT} from './utils/student.query';
import { of } from 'rxjs';

describe('STUDENT SERVICE', () => {
    let service: StudentGQLService;
    let apolloTestingController: ApolloTestingController;
    let updateStudent: UpStudentGQL;

    let allStudentGQL;
    let updateStudentGQL;
    let removeStudentGQL;

    beforeEach(() => {
        // TestBed.configureTestingModule({
        //     imports: [ApolloTestingModule],
        //     providers: [StudentGQLService]
        // });

        // service = TestBed.inject(StudentGQLService);
        // apolloTestingController = TestBed.inject(ApolloTestingController);
        // updateStudent = TestBed.inject(UpStudentGQL);

        // controller = TestBed.inject(ApolloTestingController);
        service = new StudentGQLService(allStudentGQL, updateStudent, removeStudentGQL);
    });

    // it('should WATCH QUERY via APOLLO', () => {
    //     service.getAllStudent().subscribe(student => {
    //         console.log(student);
    //         expect(true).toBeTruthy();
    //     })
    //     const op = apolloTestingController.expectOne(GET_STUDENT);

    //     op.flush({
    //         data: {
    //             getAllStudents: [
    //                 {
    //                     id: '1',
    //                     firstName: 'Mr Apollo',
    //                     middleName: 'middle',
    //                     lastName: 'last',
    //                     email: 'test@email.com',
    //                     dob: new Date('1992-11-20'),
    //                     age: 28
    //                 }
    //             ],
    //         }
    //     });
    //     apolloTestingController.verify();
    // })

    it('should return student data', () => {
        let mockResponse: Student[] = [
            {
                "id": 2937,
                "firstName": "Fenton",
                "middleName": "prnagygfhy",
                "lastName": "Murphy",
                "email": "f.murphy@randatmail.com",
                "dob": new Date("1992-11-30T00:00:00.000Z"),
                "age": 28
              },
              {
                "id": 2939,
                "firstName": "Preston",
                "middleName": "kxwaswqgvn",
                "lastName": "Stewart",
                "email": "p.stewart@randatmail.com",
                "dob": new Date("1992-12-02T00:00:00.000Z"),
                "age": 28
              }
        ];
        let response;
        spyOn(service, 'getAllStudent').and.returnValue(of(mockResponse));
        service.getAllStudent().subscribe(res => { response = res });
        expect(response).toEqual(mockResponse);
    })

    it('should update value', () => {
        let mockResponse: Student = {
            "id": 2939,
            "firstName": "Preston",
            "middleName": "kxwaswqgvn",
            "lastName": "Stewart",
            "email": "p.stewart@randatmail.com",
            "dob": new Date("1992-12-02T00:00:00.000Z"),
            "age": 28
        }
        let mockId = 2939;
        let mockUpdateRequest = {
            firstName: 'Preston'
        };
        const spy = spyOn(service, 'updateStudent').withArgs(mockId, mockUpdateRequest).and.returnValue();
        expect(spy).toHaveBeenCalled();
    })

    afterEach(() => {
    });
});