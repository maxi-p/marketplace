const supertest = require('supertest');
const request = supertest('https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/');

const { expect } = require('chai');

//const TOKEN = process.env.USER_TOKEN;
var userId = -1;
var postId = -1;
var verifyNum = -1;

describe('User Testing', () => {
    it('POST /register', () => {
        const data = {
            firstname: "Unit",
            lastname: "Test",
            username: "UnitTester",
            password: "Automated",
            email: "unitTest@mail.com",
            phoneNumber: "121212121"
        };
    
        return request
            .post('register')
            .send(data)
            .then((res) => {
                userId = res.body._id;
                verifyNum = res.body.verifyNum;
                expect(res.body.error).to.be.empty;
            });
    });
      
    it('POST /emailVerify', () => {
        const data = {
            id: userId,
            verifyNum: verifyNum
        };

        return request
            .post('emailVerify')
            .send(data)
            .then((res) => {
                expect(res.body.error).to.be.empty;
            });

    });
    
    it('POST /login', () => {
        const data = {
            username: "UnitTester",
            password: "Automated"
        };
    
        return request
            .post('login')
            .send(data)
            .then((res) => {
                expect(res.body.error).to.be.empty;
            });
    });

    it('POST /editUser', () => {
        const data = {
            id: userId,
            firstName: "EditedUnit",
            lastName: "EditedTest",
            username: "UnitTester",
            password: "Automated",
            email: "newEmail@email.com",
            phoneNumber: "212121221",
            aboutMe: "I have been edited"
        };
    
        return request
            .post('editUser')
            .send(data)
            .then((res) => {
                expect(res.body.error).to.be.empty;
            });
    });
});

describe('Post Testing', () => {
    it('POST /createPost', () => {
        const data = {
            username: "UnitTester",
            name: "Unit Test",
            genre: "Unit Testing!",
            price: 22.49,
            desc: "Just Testing",
            condition: "Good"
        };
    
        return request
            .post('createPost')
            .send(data)
            .then((res) => {
                postId = res.body._id;
                expect(res.body.error).to.be.empty;
            });
    });

    it('POST /editPost', () => {
        const data = {
            id: postId,
            username: "UnitTester12",
            name: "Unit Test Edit",
            genre: "Unit Testing!",
            price: 49.01,
            desc: "Just Testing",
            condition: "Mid"
        };
    
        return request
            .post('editPost')
            .send(data)
            .then((res) => {
                expect(res.body.error).to.be.empty;
            });
    });
      
    it('POST /searchPost', () => {
        const data = {
            username: "UnitTester12",
            name: "Unit Test Edit",
            genre: "Unit Testing!"
        };

        return request
            .post('searchPost')
            .send(data)
            .then((res) => {
                expect(res.body.results).to.be.not.empty;
            });
    });

    it('POST /deletePost', () => {
        const data = {
            id: postId
        };

        return request
            .post('deletePost')
            .send(data)
            .then((res) => {
                expect(res.body.error).to.be.empty;
            });
    });

    it('POST /getPost', () => {
        const data = {
            postId: postId
        };

        return request
            .post('getPost')
            .send(data)
            .then((res) => {
                expect(res.body.error).to.be.not.empty;
            });
    });
});