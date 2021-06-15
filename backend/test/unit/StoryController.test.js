const SC = require('../../controller/StoryController');
const StorySchema = require('../../model/StorySchema');
const UserSchema = require('../../model/UserSchema');

var sinon = require("sinon");
//const { expect } = require('chai');



const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.body = jest.fn().mockReturnValue(res);
    return res;
};


afterEach(() => {
    jest.clearAllMocks();
});


describe('deleteStory', () => {
    test('story is deleted', async () => {
        const req = {
            body: {
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                }
            }
        };
        var stub = sinon.stub(StorySchema, 'deleteOne');
        const res = mockResponse();
        await SC.deleteStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Story deleted');
    });
    test('error: story is not deleted', async () => {
        const req = {
            body: {
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                }
            }
        };
        const expectedError = new Error('no delete');
        var stub = sinon.stub(StorySchema, 'deleteOne');
        stub.throws(expectedError);
        const res = mockResponse();
        await SC.deleteStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Not able to delete');
    });
});

describe('updateStory', () => {
    
    test('update with newtitle', async () => {
        const req = {
            body: {
                //newtitle: "updated with bangladesh",
                //newstory: undefined,
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                },
                user2: {
                    _id: 1234,
                    author: "cefalo46",
                    newtitle: "updated with bangladesh",
                    newstory: undefined
                }
            }
        };
        var stub = sinon.stub(StorySchema, 'updateMany');
        const res = mockResponse();
        await SC.updateStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Story updated');
    });

    test('update with newstory', async () => {
        const req = {
            body: {
                //newtitle: undefined,
                //newstory: "kpop lovers bangladesh",
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                },
                user2: {
                    _id: 1234,
                    author: "cefalo46",
                    newtitle: undefined,
                    newstory: "kpop lovers bangladesh"
                }
            }
        };
        var stub = sinon.stub(StorySchema, 'updateMany');
        const res = mockResponse();
        await SC.updateStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Story updated');
    });

    test('update with newstory and newtitle', async () => {
        const req = {
            body: {
                //newtitle: "updated with bangladesh",
                //newstory: "kpop lovers bangladesh",
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                },
                user2: {
                    _id: 1234,
                    author: "cefalo46",
                    newtitle: "updated with bangladesh",
                    newstory: "kpop lovers bangladesh"
                }
            }
        };
        var stub = sinon.stub(StorySchema, 'updateMany');
        const res = mockResponse();
        await SC.updateStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Story updated');
    });

    test('no update', async () => {
        const req = {
            body: {
                //newtitle: "updated with bangladesh",
                //newstory: "kpop lovers bangladesh",
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                },
                user2: {
                    _id: 1234,
                    author: "cefalo46",
                    newtitle: undefined,
                    newstory: undefined
                }
            }
        };
        var stub = sinon.stub(StorySchema, 'updateMany');
        const res = mockResponse();
        await SC.updateStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Story updated');
    });

    test('throw error', async () => {
        const req = {
            body: {
                newtitle: "updated with bangladesh",
                newstory: undefined,
                user1: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "norway",
                    story: "freshers"
                },
                user2: {
                    _id: 1234,
                    author: "cefalo46",
                    title: "updated with bangladesh",
                    newstory: undefined,
                }
            }
        };
        const expectedError = new Error('no update');
        var stub = sinon.stub(StorySchema, 'updateMany');
        stub.throws(expectedError);
        const res = mockResponse();
        await SC.updateStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Not able to update');
    });
});


describe('postStory', () => {
    test('no title in request body', async () => {
        const req = {
            body: {
                author: "bts",
                title: undefined,
                story: "7 members"
            }
        };
        const res = mockResponse();
        await SC.postStory(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Include title and story');
    });
    test('Story posted successfully', async () => {
        const req = {
            body: {
                author: "bts",
                title: "bangpd",
                story: "7 members"
            }
        };
        const expectedUser = {
            author: "bts",
            title: "bangpd",
            story: "7 members"
        }
        const res = mockResponse();
        var stub = sinon.stub(StorySchema.prototype, 'save');
        stub.returns(expectedUser);
        await SC.postStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(201);
    });
    test('throw error', async () => {
        const req = {
            body: {
                author: "bts",
                title: "bangpd",
                story: "7 members"
            }
        };
        const expectedError = new Error('story not saved');
        const res = mockResponse();
        var stub = sinon.stub(StorySchema.prototype, 'save');
        stub.throws(expectedError);
        await SC.postStory(req, res);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Story not saved in database');
    });
});





describe('getOneStory', () => {
    test('invalid story id', async () => {
        const req = {
            params: {
                id: 1234
            }
        };
        const res = mockResponse();
        const next = jest.fn();
        var stub = sinon.stub(StorySchema, 'findById');
        stub.returns(null);
        await SC.getOneStory(req, res, next);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Story not found');
        expect(next).toHaveBeenCalledTimes(0);

    });
    test('valid story id', async () => {
        const req = {
            params: {
                id: 1234
            }
        };
        const expectedUser = {
            author: 'cefalo46',
            title: 'bangpd',
            story: 'bts has 7 members'
        };
        const res = mockResponse();
        const next = jest.fn();
        var stub = sinon.stub(StorySchema, 'findById');
        stub.returns(expectedUser);
        await SC.getOneStory(req, res, next);
        stub.restore();
        expect(req.body).toBe(expectedUser);
        expect(next).toHaveBeenCalledTimes(1);

    });
    test('throw error', async () => {
        const req = {
            params: {
                id: 1234
            }
        };
        const expectedError=new Error('Story not in database');
        const res = mockResponse();
        const next = jest.fn();
        var stub = sinon.stub(StorySchema, 'findById');
        stub.throws(expectedError);
        await SC.getOneStory(req, res, next);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Invalid storyid');
        expect(next).toHaveBeenCalledTimes(0);

    });

});

describe('getAllStories', () => {
    test('Database has no user', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo44"
            }
        }
        const res = mockResponse();
        const next = jest.fn();
        var stub = sinon.stub(StorySchema, 'find');
        stub.returns(null);
        await SC.getAllStories(req, res, next);
        stub.restore();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('This user doesnot exist');
        expect(next).toHaveBeenCalledTimes(0);

    });

    test('Database has at least one user', async () => {
        const req = {
            body: {
                username: "cefalo46",
                password: "cefalo44"
            }
        }
        const expectedUsers = {
            user1: "Kim namjoon",
            user2: "Kim Taehyung"
        }
        const res = mockResponse();
        const next = jest.fn();
        var stub = sinon.stub(StorySchema, 'find');
        stub.returns(expectedUsers);
        await SC.getAllStories(req, res, next);
        stub.restore();
        expect(req.body).toBe(expectedUsers);
        expect(next).toHaveBeenCalledTimes(1);

    });
});


