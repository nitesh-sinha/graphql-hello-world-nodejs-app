const db = require('./db')
const Query = {
    // resolver function for "greeting" Query
    greeting: () => { 
        return 'Hello from nodeJS app. I am ready to be tested'
    },
    // resolver function for "students" Query
    students: () => db.students.list(),
    // resolver function for "studentById" Query
    studentById: (root, args, context, info) => {
        // root will contain the Query object itself
        // args will contain the parameter "id" passed in input user query
        return db.students.get(args.id);
    }
}

// Every Student object will invoke this resolver
const Student = {
    // resolver for fullName attribute in Student object
    // Note that this attribute does not exist in the database but
    // exists in the schema object, which means that users can
    // query for this field as per their need. Hence the need for its
    // resolver.
    fullName: (root, args, context, info) => {
        return root.firstName + " " + root.lastName;
    },
    college: (root) => {
        // Here root will contain the Student object itself
        return db.colleges.get(root.collegeId)
    }

}

// Mutation object will be used for modification(create, update and delete)
// to the data
const Mutation = {
    createStudent: (root, args, context, info) => {
        return db.students.create({
            firstName: args.firstName,
            lastName: args.lastName,
            collegeId: args.collegeId
        })
    },

    create_and_return_student: (root, args, context, info) => {
        const student_id = db.students.create({
            firstName: args.firstName,
            lastName: args.lastName,
            collegeId: args.collegeId
        })
        
        return db.students.get(student_id)
    },

    // deleteStudent: (root, args, context, info) => db.students.delete(args.id)

    deleteStudent: (root, args, context, info) => {
        db.students.delete(args.id);
        return "Successfully deleted student";
    }
}

// Export the resolver objects so they can be called from outside this module
module.exports = {Query, Student,Mutation}