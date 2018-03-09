var http = require('http');
const expect =require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');
//=>./->relative path, ../-> back one directory from test into server directive 
//=>then server-> is file name
const {app}=require('./../server'); 
//const {app}=require('./../routes/app'); 
const {Doctor}=require('./../models/doctor');//
const {User}=require('./../models/user');//
const {doctors,populateDoctors,users,populateUsers}=require('./seed/seed');

var server = http.createServer(app);
beforeEach(populateUsers);
//beforeEach(populateDoctors);
/*
describe('GET /users/me',()=>{
    it('should return user if authenticated',(done)=>{
        request(server)
        .get('/api/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            //expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
     it('should return 401 if user not authenticated',(done)=>{
        request(server)
        .get('/api/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });
//});

*/

describe('POST /api/users',()=>{
    it('should create a user',(done)=>{
         var email='test@example.com';
         var password='testPass';
        var firstName='Santosh';
        var mobile='9684567891';
        request(server)
        .post('/api/users')
        .set('x-auth',users[0].tokens[0].token)
        .send({email})
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
       .end((err)=>{
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user)=>{
                expect(user).toExist();
               //expect(user.password).toNotBe(password);
                done();
            }).catch((e)=>done(e));
        });
        
    });

    it('should return validation error if request is invalid',(done)=>{
        request(server)
        .post('/api/users')
        .send({
            email:'sant',
            password:'abc'
        })
        .expect(400)
        .end(done);
    });

    it('should not create a user if email in use',(done)=>{
        request(server)
        .post('/api/users')
        .send({
            email:users[0].email,
            password:'password123!'
        })
        .expect(400)
        .end(done);
    });
});


describe('GET /api/users/me',()=>{
    it('should return user if authenticated',(done)=>{
        request(server)
        .get('/api/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should return 401 if user not authenticated',(done)=>{
        request(server)
        .get('/api/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});


describe('POST /api/users/login',()=>{
    it('should login user and return auth token',(done)=>{
        request(server)
        .post('/api/users/login')
        .send({
            email:users[1].email,
            password:users[1].password
        })
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toExist();
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            User.findById(users[1]._id).then((user)=>{
                expect(user.tokens[1]).toInclude({
                    access:'auth',
                    token:res.headers['x-auth']
                });
                done();
            }).catch((e)=>done(e));
        });
    });
    it('should reject invalid token',(done)=>{
         request(server)
        .post('/api/users/login')
        .send({
            email:users[1].email,
            password:'fackPassword'
        })
        .expect(400)
        .expect((res)=>{
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            User.findById(users[1]._id).then((user)=>{
                expect(user.tokens.length).toBe(1)
                done();
            }).catch((e)=>done(e));
        });
    });
});

describe('DELETE /api/users/me/token',()=>{
    it('should removed auth token on logout',(done)=>{
        // DELETE /users/me/token
        // set x-auth equal to token
        //200
        //find the user , verify the length has to zero
        request(server)
        .delete('/api/users/me/token')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            User.findById(users[0]._id).then((user)=>{
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e)=>done(e));
        });
    });
});
