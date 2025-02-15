const { gql } = require("apollo-server-express");

const schema = gql `
    type User {
        id: ID!
        username: String!
        email:String!
        created_at: String!
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Int!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }

    type Query {
        user(id: ID!): User
        users: [User]
        employees: [Employee]
        employee(id: ID!): Employee
        employeesByDeptOrDesignation(department: String, designation: String): [Employee]
        login(username: String!, password: String!): String
        
    }

    type Mutation {
        signup(
            username: String!
            email: String!
            password: String!
        ): User
        addEmployee(
            first_name: String!
            last_name: String!
            email: String! 
            gender: String! 
            designation: String! 
            salary: Float! 
            date_of_joining: String! 
            department: String! 
            employee_photo: String
        ): Employee
        updateEmployee(
            id: ID!
            first_name: String
            last_name: String
            email: String
            designation: String
            salary: Float
            department: String
        ): Employee
        deleteEmployee(id: ID!): Employee
    }
`;

module.exports = schema;