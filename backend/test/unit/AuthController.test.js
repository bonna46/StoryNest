const AC = require('../../controller/AuthController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StorySchema = require('../../model/StorySchema');
const UserSchema = require('../../model/UserSchema');

var sinon = require("sinon");



const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

afterEach(() => {
    jest.clearAllMocks();
});


describe('verifySameUser', () => {
    test('throw error', async () => {
        const req = {
            body: {
                author: "cefalo46"
            },
            params: {
                id: 1234
            },
            token: "Valid token"
        };
        const expectedUser = {
            username: "cefalo46"
        }
        const res = mockResponse();
        var next = jest.fn();
        const expectedError = new Error('try catch error');
        var stub = sinon.stub(jwt, 'verify');
        stub.throws(expectedError);
        await AC.verifySameUser(req, res, next);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Story not found');
    });
    test('user and author not same', async () => {
        const req = {
            body: {
                author: "cefalo46"
            },
            params: {
                id: 1234
            },
            token: "Valid token"
        };
        const expectedUser = {
            username: "cefalo46"
        }
        const storyInfo = {
            author: "bts",
            title: "bangpd",
            story: "7 members"
        }
        const res = mockResponse();
        var next = jest.fn();
        var stub = sinon.stub(jwt, 'verify');
        stub.returns(expectedUser);
        var st = sinon.stub(StorySchema, 'findById');
        st.returns(storyInfo);
        await AC.verifySameUser(req, res, next);
        stub.restore();
        st.restore();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('User hasnot permission to edit');
    });
    test('user and author same', async () => {
        const req = {
            body: {
                newtitle: "updated with bangladesh",
                newstory: "freshers",
                user1: {
                    author: String,
                    title: String,
                    story: String
                },
                user2: {
                    author: String,
                    title: String,
                    story: String
                }
            },
            params: {
                id: 1234
            },
            token: "Valid token"
        };
        const oldUser = {
            author: "cefalo46",
            title: "norway",
            story: "freshers"
        }
        const expectedUser = {
            username: "cefalo46"
        }
        const res = mockResponse();
        var next = jest.fn();
        var stub = sinon.stub(jwt, 'verify');
        stub.returns(expectedUser);
        var st = sinon.stub(StorySchema, 'findById');
        st.returns(oldUser);
        await AC.verifySameUser(req, res, next);
        stub.restore();
        st.restore();

        expect(req.body.user1).toBe(oldUser);
        expect(next).toHaveBeenCalledTimes(1);

    });
});



describe('getAuthor', () => {
    test('throw error', async () => {
        const req = {
            body: {
                author: "cefalo46"
            }
        };
        const res = mockResponse();
        var next = jest.fn();
        const expectedError = new Error('oops');
        var stub = sinon.stub(jwt, 'verify');
        stub.throws(expectedError);
        AC.getAuthor(req, res, next);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Token is not valid');
    });
    test('get Proper author', async () => {
        const req = {
            body: {
                author: String
            }
        };
        const expectedAuthor = { username: "cefalo46" };
        const res = mockResponse();
        var next = jest.fn();
        var stub = sinon.stub(jwt, 'verify');
        stub.returns(expectedAuthor);
        AC.getAuthor(req, res, next);
        stub.restore();

        expect(req.body.author).toBe(expectedAuthor.username);
        expect(next).toHaveBeenCalledTimes(1);
    });
});


describe('verifyBearerToken', () => {
    test('Invalid bearertoken', async () => {
        const req = {
            headers: {
                authorization: null
            }
        };
        const res = mockResponse();
        var next = jest.fn();
        await AC.verifyBearerToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('User is forbidden to edit');
    });

    test('Valid bearertoken', async () => {
        const req = {
            headers: {
                authorization: 'valid bearer'
            },
            token: String
        };
        const res = mockResponse();
        var next = jest.fn();
        await AC.verifyBearerToken(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(req.token).toBe('bearer');
    });
});


describe('isValidUser', () => {
    test('invalid user without password', async () => {
        const req = {
            body: {
                username: "cefalo46"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        AC.isValidUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Include proper username and password');

    });

    test('find user in database', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo46"
            }
        }

        const res = mockResponse();
        const next = jest.fn();

        var expectedUser = {
            username: "cefalo46"
        };
        var findone = sinon.stub(UserSchema, 'findOne');
        await AC.isValidUser(req, res, next);
        findone.restore();
        sinon.assert.calledOnce(findone);
        sinon.assert.calledWith(findone, expectedUser);
    });

    test('invalid user not in database', async () => {
        const req = {
            body: {
                username: "cefalo44",
                password: "cefalo46"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        var stub = sinon.stub(UserSchema, 'findOne');
        stub.returns(null);
        await AC.isValidUser(req, res, next);
        //var p = await UserSchema.findOne(req.body.username);

        sinon.assert.calledOnce(stub);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('This user doesnot exist');
        expect(next).toHaveBeenCalledTimes(0);
    });

    test('Valid User Validation with bcrypt', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo"
            }
        };
        const expectedUser = {
            username: "cefalo46",
            password: "$2a$10$EBDVGZPJNznaMwUcrfH.duuhg0Q8HbRNZJi67xNQNyz5Fuj3zOm12"
        }
        const res = mockResponse();
        const next = jest.fn();
        var st = sinon.stub(UserSchema, 'findOne');
        st.returns(expectedUser);
        var stud = sinon.stub(bcrypt, 'compare');
        stud.returns(true);
        var token = sinon.stub(jwt, 'sign');
        token.returns('Valid-token');

        await AC.isValidUser(req, res, next);
        sinon.assert.calledOnce(stud);
        sinon.assert.calledOnce(st);
        sinon.assert.calledOnce(token);
        stud.restore();
        st.restore();
        token.restore();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ status: 'User validated', data: 'Valid-token' });

    });


    test('Invalid User Validation with bcrypt', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo44"
            }
        };
        const expectedUser = {
            username: "cefalo46",
            password: "invalid-token"
        }
        const res = mockResponse();
        const next = jest.fn();
        var st = sinon.stub(UserSchema, 'findOne');
        st.returns(expectedUser);
        var stud = sinon.stub(bcrypt, 'compare');
        stud.returns(false);
        await AC.isValidUser(req, res, next);
        sinon.assert.calledOnce(stud);
        sinon.assert.calledOnce(st);
        stud.restore();
        st.restore();

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('Invalid username or password');

    });
    test('throw error', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo44"
            }
        };
        var expectedError = new Error('Raised an error');
        const res = mockResponse();
        var next = jest.fn();
        var stud = sinon.stub(UserSchema, 'findOne');
        stud.throws(expectedError);
        await AC.isValidUser(req, res, next);
        stud.restore();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(expectedError);

    });


});



describe('generateHashedPassword', () => {
    test('register with hashed password', async () => {
        const req = {
            body: {
                password: "cefalo46"
            }
        }
        var bcryptHash = sinon.stub(bcrypt, 'hash');
        const res = mockResponse();
        const next = jest.fn();
        AC.generateHashedPassword(req, res, next);
        bcryptHash.restore();
        sinon.assert.calledOnce(bcryptHash);
        sinon.assert.calledWith(bcryptHash, "cefalo46", 10);
    })
});

describe('IsvalidUserPassFormat', () => {
    test('invalid user without password', async () => {
        const req = {
            body: {
                username: "cefalo46"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        AC.isValidUserPassFormat(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Include proper username and password');
        expect(next).toHaveBeenCalledTimes(0);

    });
    test('invalid user without username', async () => {
        const req = {
            body: {
                password: "cefalo46"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        AC.isValidUserPassFormat(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Include proper username and password');
        expect(next).toHaveBeenCalledTimes(0);

    });
    test('invalid user password length < 5 ', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefa"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        AC.isValidUserPassFormat(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Length should be at least 5');

        expect(next).toHaveBeenCalledTimes(0);

    });
    test('Valid user', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo46"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        AC.isValidUserPassFormat(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);

    });

});
