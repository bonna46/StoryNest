const UC = require('../../controller/UserController');
const StorySchema = require('../../model/StorySchema');
const UserSchema = require('../../model/UserSchema');

var sinon = require("sinon");
const { resFormat } = require('../../controller/UserController');


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};


afterEach(() => {
    jest.clearAllMocks();
});


describe('resFormat', () => {
    test(('html type data'), async () => {
        const req = {
            body: {
                "_id": "606ad981ae0fc52ec0072a98",
                "author": "weqwwwthe course",
                "title": "hghgdfgweqwwok",
                "story": "weqwwwoka",
                "__v": 0
            },
            headers: {
                accept: 'text/html'
            },
        }

        const res = mockResponse();
        UC.resFormat(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

    });

    test(('csv type data'), async () => {
        const req = {
            body: {
                "_id": "606ad981ae0fc52ec0072a98",
                "author": "weqwwwthe course",
                "title": "hghgdfgweqwwok",
                "story": "weqwwwoka",
                "__v": 0
            },
            headers: {
                accept: 'text/csv'
            },
        }

        const res = mockResponse();
        UC.resFormat(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

    });


    test(('xml type data'), async () => {
        const req = {
            body: {
                "_id": "606ad981ae0fc52ec0072a98",
                "author": "weqwwwthe course",
                "title": "hghgdfgweqwwok",
                "story": "weqwwwoka",
                "__v": 0
            },
            headers: {
                accept: 'application/xml'
            },
        };
        var expectedUser = {
            "_id": "606ad981ae0fc52ec0072a98",
            "author": "weqwwwthe course",
            "title": "hghgdfgweqwwok",
            "story": "weqwwwoka",
            "__v": 0
        };

        const res = mockResponse();
        var st = sinon.stub(JSON, 'stringify');
        st.returns(expectedUser);
        var stub = sinon.stub(JSON, 'parse');
        stub.returns(expectedUser);
        UC.resFormat(req, res);
        stub.restore();
        st.restore();
        sinon.assert.calledOnce(stub);
        sinon.assert.calledOnce(st);
        expect(res.status).toHaveBeenCalledWith(200);

    });

    test(('json data type'), async () => {
        const req = {
            body: {
                "_id": "606ad981ae0fc52ec0072a98",
                "author": "weqwwwthe course",
                "title": "hghgdfgweqwwok",
                "story": "weqwwwoka",
                "__v": 0
            },
            headers: {
                accept: 'application/json'
            },
        }

        const res = mockResponse();
        UC.resFormat(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

    });

    test(('any other type data'), async () => {
        const req = {
            body: {
                "_id": "606ad981ae0fc52ec0072a98",
                "author": "weqwwwthe course",
                "title": "hghgdfgweqwwok",
                "story": "weqwwwoka",
                "__v": 0
            },
            headers: {
                accept: undefined
            },
        }

        const res = mockResponse();
        UC.resFormat(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

    });

});



describe('postUserInfo', () => {
    test(('register new user'), async () => {
        const req = {
            body: {
                username: 'cefalo46'
            },
            password: 'cefalo'
        }
        const res = mockResponse();
        var stud = sinon.stub(UserSchema, 'create');
        await UC.postUserInfo(req, res);
        stud.restore();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith('User created successfully');

    });

    test(('throw error'), async () => {
        const req = {
            body: {
                username: 'cefalo46'
            },
            password: 'cefalo'
        }
        var expectedError = new Error('User not created');
        const res = mockResponse();
        var stud = sinon.stub(UserSchema, 'create');
        stud.throws(expectedError);
        await UC.postUserInfo(req, res);
        stud.restore();

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('User not created');

    });
});
