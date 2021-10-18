import { TestBed } from '@angular/core/testing';
import { Apollo, QueryRef } from 'apollo-angular';
import {
    ApolloTestingModule,
    ApolloTestingController,
  } from 'apollo-angular/testing';
import { StudentGQLService } from './studentGQL.service';
import { Student } from '../model/student';
import {} from '../model/student.update';
import { UpStudentGQL } from './gql/updateStudentGQL';
import {GET_STUDENT, REMOVE_STUDENT, UPDATE_STUDENT} from './utils/student.query';
import { of } from 'rxjs';
import { AllStudentGQL } from './gql/allStudentGQL';

describe('STUDENT SERVICE', () => {
    let service: StudentGQLService;
    let apollo: Apollo;
    let apolloTestingController: ApolloTestingController;
    let httpClientSpy: { get: jasmine.Spy };
    let allStudentSyp: jasmine.SpyObj<AllStudentGQL>

    beforeEach(() => {
        // httpClientSpy = jasmine.createSpyObj('allStudentGQL', ['watch']);
        const spy = jasmine.createSpyObj('AllStudentGQL', [ 'watch' ])
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule],
            providers: [StudentGQLService, { provide: AllStudentGQL, useValue: spy }]
        });
        apollo = TestBed.inject(Apollo);
        apolloTestingController = TestBed.inject(ApolloTestingController);
        service = TestBed.inject(StudentGQLService);
        allStudentSyp = TestBed.inject(AllStudentGQL) as jasmine.SpyObj<AllStudentGQL>;
        // service = new StudentGQLService(httpClientSpy as any, null, null);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should call', () => {
    //     expect(service.getAllStudent()).toBeDefined();
    // })

    it('shold be defined', () => {
            const stubValueGetAll: any = [
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
        // const gql = jasmine.createSpyObj('AllStudentGQL', [ 'watch' ]);
        // all.watch.and.returnValue({
        //   valueChanges: of(stubValueGetAll)
        // });
        // let ref: QueryRef<>
        // allStudentSyp.watch.and.returnValue({valueChanges: of})
        // service.getAllStudent().subscribe(res => console.log(res));

        // const service1 = new StudentGQLService(gql, null, null);
        service.getAllStudent().subscribe(data => {
            expect(data).toEqual(stubValueGetAll);
        })
        // expect(gql.watch.get.calls.count()).toBe(1, 'one Call')
        // expect(service1.getAllStudent()).toEqual(stubValueGetAll)

        // service.getAllStudent().subscribe(data => {
        //     console.log(data);    
        // })
        // spyOn(AllStudentGQL, 'watch').and.returnValue(of(mockResponse));
        // expect(service.getAllStudent()).toHaveBeenCalled()
        // expect(service.getAllStudent).toBeDefined();
    })

    // it('should be defined - update', () => {
    //     expect(service.updateStudent(1, {})).toBeTruthy();
    // })

    // it('test', () => {
    //     service.getAllStudent().subscribe(data => {
    //         console.log(data);
    //     })
    // })

    // it('#getAllStudents should return all students', ()=> {
    //     const stubValueGetAll: any = [
    //         {
    //             "id": 2937,
    //             "firstName": "Fenton",
    //             "middleName": "prnagygfhy",
    //             "lastName": "Murphy",
    //             "email": "f.murphy@randatmail.com",
    //             "dob": new Date("1992-11-30T00:00:00.000Z"),
    //             "age": 28
    //           },
    //           {
    //             "id": 2939,
    //             "firstName": "Preston",
    //             "middleName": "kxwaswqgvn",
    //             "lastName": "Stewart",
    //             "email": "p.stewart@randatmail.com",
    //             "dob": new Date("1992-12-02T00:00:00.000Z"),
    //             "age": 28
    //           }
    //     ];
    //     // httpClientSpy.get.and.returnValue(stubValueGetAll);
    //     // service.getAllStudent().subscribe(students => {
    //     //     // expect(students).toEqual()
    //     //     console.log(students);
    //     // })
    //     // studentsServiceSpy.getAllStudent.and.returnValue(stubValueGetAll);
    //     // expect(studentsServiceSpy.getAllStudent()).toEqual(stubValueGetAll);
    // });

    // it('should return student data - (Service Function)', () => {
    //     let mockResponse: Student[] = [
    //         {
    //             "id": 2937,
    //             "firstName": "Fenton",
    //             "middleName": "prnagygfhy",
    //             "lastName": "Murphy",
    //             "email": "f.murphy@randatmail.com",
    //             "dob": new Date("1992-11-30T00:00:00.000Z"),
    //             "age": 28
    //           },
    //           {
    //             "id": 2939,
    //             "firstName": "Preston",
    //             "middleName": "kxwaswqgvn",
    //             "lastName": "Stewart",
    //             "email": "p.stewart@randatmail.com",
    //             "dob": new Date("1992-12-02T00:00:00.000Z"),
    //             "age": 28
    //           }
    //     ];
    //     let response;
    //     // spyOn(AllStudentGQL, 'watch').and.returnValue(of(mockResponse));
    //     service.getAllStudent().subscribe(res => { response = res });
    //     expect(response).toEqual(mockResponse);
    // })

    it('update function have be defined', () => {
        let spy = spyOn(service, 'updateStudent');
        expect(spy).toBeDefined();
    })

    it('remove function have be defined', () => {
        let spy = spyOn(service, 'removeStudent');
        expect(spy).toBeDefined();
    })

    it('should return all student', () => {
        const allStudent = [
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
        ]
        apollo.query<any>({ query:  GET_STUDENT}).subscribe(result => {
            expect(result.data).toEqual({getAllStudents: allStudent});
        })

        const getAll = apolloTestingController.expectOne(GET_STUDENT);
        getAll.flush({
            data: {
                getAllStudents: allStudent
            }
        })

        apolloTestingController.verify()
    })

    it('should update a student and return updated student', () => {

        const UPDATE_STD = {
            mutation: UPDATE_STUDENT,
            variables: {
                id: 2937,
                studentInput: {
                    "firstName": "ABC",
                    "middleName": "EFG",
                    "lastName": "HIJ",
                    "email": "ABC.HIJ@randatmail.com",
                }
            }
          }

        apollo.mutate<any>(UPDATE_STD).subscribe(result => {
            expect(result.data).toEqual({updateStudent: {
                    "id": 2937,
                    "firstName": "ABC",
                    "middleName": "EFG",
                    "lastName": "HIJ",
                    "email": "ABC.HIJ@randatmail.com",
                    "dob": new Date("1992-11-30T00:00:00.000Z"),
                    "age": 28
                }
            })
        })
        const updateStudent = apolloTestingController.expectOne((operation) => {
            expect(operation.query.definitions).toEqual(UPDATE_STD.mutation.definitions);
            return true;
        }) 
        expect(updateStudent.operation.variables.id).toEqual(2937);
        expect(updateStudent.operation.variables.studentInput).toEqual({
            "firstName": "ABC",
            "middleName": "EFG",
            "lastName": "HIJ",
            "email": "ABC.HIJ@randatmail.com",
        }); 

        updateStudent.flush({
            data: {
                updateStudent: {
                    "id": 2937,
                    "firstName": "ABC",
                    "middleName": "EFG",
                    "lastName": "HIJ",
                    "email": "ABC.HIJ@randatmail.com",
                    "dob": new Date("1992-11-30T00:00:00.000Z"),
                    "age": 28
                }
              }
        })
        apolloTestingController.verify()
    })

    it('should remove student and return removed Id', () => {
        const REMOVE_STD = {
            mutation: REMOVE_STUDENT,
            variables: {
                id: 2937
            }
        }
        apollo.mutate<any>(REMOVE_STD).subscribe(result => {
            expect(result.data).toEqual({removeStudent: 2937})
        })
        const updateStudent = apolloTestingController.expectOne((operation) => {
            expect(operation.query.definitions).toEqual(REMOVE_STD.mutation.definitions);
            return true;
        }) 
        expect(updateStudent.operation.variables.id).toEqual(2937);
        updateStudent.flush({
            data: {removeStudent: 2937}
        })
        apolloTestingController.verify()
    })
});