const User = require("./models/User");
const Employee = require("./models/Employee");

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        users: async () => {
            return await User.find();
        },
        employees: async () => {
            return await Employee.find();
        },
        employee: async (_, { id }) => {
            const emp = await Employee.findById(id);
            if (emp){
                emp.date_of_joining = emp.date_of_joining.toISOString();
            }
            return emp;
        },
        employeesByDeptOrDesignation: async (_, { department, designation }) => {
            return await Employee.find({
                $or: [{ department }, { designation }]
            })
        },
        login: async (_, { username, password }) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    throw new Error("User not found");
                }
                if (user.password !== password) {
                    throw new Error("Invalid password");
                }
                return "Login successful";
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const user = new User({ username, email, password });
                return await user.save();
            } catch (error) {
                throw new Error(error.message);
            }
        },
        addEmployee: async (_, args) => {
            args.date_of_joining = new Date(args.date_of_joining);
            const employee = new Employee({ ...args });
            return await employee.save();
        },
        updateEmployee: async (_, { id, ...args}) => {
            return await Employee.findByIdAndUpdate(id, args, { new: true });
        },
        deleteEmployee: async (_, { id }) => {
            return await Employee.findByIdAndDelete(id);
        }
    }
};

module.exports = resolvers;