const supertest = require('supertest');
const app = require('../../server');
const request = supertest(app);

var req_token = undefined;
var userid = undefined;
const req_id = "609b19d821ac7b13b897d1ce";
const expectedUser = {
    "_id": "609b19d821ac7b13b897d1ce",
    "author": "42cefalo",
    "title": "Sweet home",
    "story": "Stay with me"
}

const reg_log_user = {
    username: "101cefalo",
    password: "101cefalo"
}

const newStory = {
    title: "riverrr",
    story: "Sunn"
}
const updatedStory = {
    title: "Riverrr"
}
describe('Integration test', () => {
    it('Register', async done => {
        const res = await request.post('/api/register').send(reg_log_user);
        expect(res.status).toBe(409);
        expect(res.text).toEqual('Username already in use');
        done();
    });

    it('Login', async done => {
        const res = await request.post('/api/login').send(reg_log_user);
        expect(res.status).toBe(200);
        expect(res.body.status).toEqual('User validated');
        req_token = res.body.data;
        done();
    });


    it('Get all story', async done => {
        const res = await request.get('/api/stories');
        expect(res.status).toBe(200);
        done();
    });

    it('Get one story', async done => {
        const res = await request.get('/api/stories/' + req_id);
        expect(res.status).toBe(200);
        const onestory = res.body;
        expect(onestory._id).toEqual(expectedUser._id);
        expect(onestory.author).toEqual(expectedUser.author);
        expect(onestory.title).toEqual(expectedUser.title);
        expect(onestory.story).toEqual(expectedUser.story);
        done();
    });

    it('Post new story', async done => {
        const res = await request.post('/api/stories')
            .set('Authorization', 'bearer ' + req_token)
            .send(newStory);
        
        const onestory = res.body.storyInfo;
        
        expect(res.status).toBe(201);
        expect(res.body.status).toEqual('Story created successfully');
        expect(onestory.author).toEqual(reg_log_user.username);
        expect(onestory.title).toEqual(newStory.title);
        expect(onestory.story).toEqual(newStory.story);
        userid = onestory._id;
        done();
    });


    it('Update story', async done => {
        const res = await request.put('/api/stories/'+ userid)
            .set('Authorization', 'bearer ' + req_token)
            .send(updatedStory);
        expect(res.status).toBe(200);
        expect(res.text).toEqual('Story updated');
        done();
    });

    it('Delete story', async done => {
        const res = await request.delete('/api/stories/'+ userid)
            .set('Authorization', 'bearer ' + req_token);
        expect(res.status).toBe(200);
        expect(res.text).toEqual('Story deleted');
        done();
    });

});

