import bcrypt from 'bcryptjs';
const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        bio: 'I am a software engineer',
        image: '',
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        bio: 'I am a software engineer',
        image: '',

    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        bio: 'I am a software engineer',
        image: '',
    }
];
export default users;