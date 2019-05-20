## NodeJS app to explore GraphQL API design methodology

This app uses a simple flat file as its database; however it can be swapped with a SQL or NoSQL database as per need.


## Sample input queries and corresponding outputs:
-----------------------------------------------
**Case 1**: Querying a Student object based on input attribute("id")

__Input__

`{
  greeting
  students {
    firstName
    email
  }
  studentById(id:"S001") {
    email
  }
}`

__Output__

`{
  "data": {
    "greeting": "Hello from nodeJS app. I am ready to be tested",
    "students": [
      {
        "firstName": "Rahul",
        "email": "rahul@abc.com"
      },
      {
        "firstName": "Simran",
        "email": "simran@xyz.com"
      },
      {
        "nafirstNameme": "Adi",
        "email": "adi@abc.com"
      }
    ],
    "studentById": {
      "email": "rahul@abc.com"
    }
  }
}`




**Case 2**: Querying for an attribute(fullName) in Student object which is not defined in the database.
---------------------------------------------------

__Input__

`{
  greeting
  students {
    fullName
    email
  }
  studentById(id:"S001") {
    email
  }
}`


__Output__

`{
  "data": {
    "greeting": "Hello from nodeJS app. I am ready to be tested",
    "students": [
      {
        "fullName": "Rahul DN",
        "email": "rahul@abc.com"
      },
      {
        "fullName": "Simran BN",
        "email": "simran@xyz.com"
      },
      {
        "fullName": "Adi SN",
        "email": "adi@abc.com"
      }
    ],
    "studentById": {
      "email": "rahul@abc.com"
    }
  }
}`




**Case 3**: Nested query where one object refers to another object within it.

__Input__

`{
  students {
    fullName
		college {
      name
      location
    }
  }
}`


__Output__

`{
  "data": {
    "students": [
      {
        "fullName": "Rahul DN",
        "college": {
          "name": "Georgia Tech",
          "location": "Atlanta"
        }
      },
      {
        "fullName": "Simran BN",
        "college": {
          "name": "Stanford",
          "location": "Palo-Alto"
        }
      },
      {
        "fullName": "Adi SN",
        "college": {
          "name": "Georgia Tech",
          "location": "Atlanta"
        }
      }
    ]
  }
}`


**Case 4**: Mutation(add a student to the database)

__Input__

`mutation {
  createStudent(firstName: "Jay", lastName: "D", collegeId:"COL-002")
}`



__Output(Returns the id of the student that was added)__

`{
  "data": {
    "createStudent": "SJodm0Jp4"
  }
}`


**Case 5**: Create an object via Mutation(add a student to the database) and return that object

__Input__

`mutation {
  create_and_return_student(firstName: "Henry", lastName: "J", collegeId:"COL-002") {
    fullName
    id
    college {
      name
      rating
    }
  }
}`


__Output__

`{
  "data": {
    "create_and_return_student": {
      "fullName": "Henry J",
      "id": "rJo1BR1pE",
      "college": {
        "name": "Georgia Tech",
        "rating": 4.6
      }
    }
  }
}`
