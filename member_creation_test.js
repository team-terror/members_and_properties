var assert = require('assert');
var member_creation = require('./member_creation');

describe('create user', function() {
    describe('post', function() {
        it('should return a 201 when the user is created', function() {
            member = member_creation('Awesome Guy', 'awesomeguy@whoa.com', 'thisisprettycool');
            assert.equal(member.status, 201);
        });
    })
});
