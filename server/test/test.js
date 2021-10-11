var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("UberEats", function () {
    describe('Login Test', function () {

        // it('Incorrect Password',() => {
        //     agent.post("/grubhub/login")
        //         .send({ email_id: "customer@sjsu.edu", password: "password" })
        //         .then(function (res) {
        //             expect(res.text).to.equal("INCORRECT_PASSWORD");
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // });

        // it('Invalid User', () => {
        //     agent.post("/grubhub/login")
        //         .send({ email_id: "user@sjsu.edu", password: "password" })
        //         .then(function (res) {
        //             expect(res.text).to.equal("NO_USER");
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // });

        it('Successful Login',() => {
            agent.post("/login")
                .send({ email_id: "customer@sjsu.edu", password: "P@ssword" })
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Owner Signup Test', () => {

        it('Owner Already Exists', () => {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Owner", res_name: "Restaurant", res_cuisine: "Cuisine", email_id: "owner@sjsu.edu", password: "password", res_zip_code: "23342", address:"San Jose", phone_number: "980765551"})
                .then(function (res) {
                    expect(res.text).to.equal("USER_EXISTS");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Owner Signup', () => {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Owner", res_name: "Restaurant", res_cuisine: "Cuisine", email_id: "owner@sjsu.edu", password: "password", res_zip_code: "23342", address:"San Jose", phone_number: "980765551"})
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Customer Signup Test', () => {

        it('Customer Already Exists', () => {
            agent.post("/grubhub/signup/customer")
                .send({ name: "Customer", email_id: "customer@sjsu.edu", password: "password", address:"San Jose", phone_number: "980765551"})
                .then(function (res) {
                    expect(res.text).to.equal("USER_EXISTS");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Successful Customer Signup', () => {
            agent.post("/grubhub/signup/restaurant")
                .send({ name: "Customer", email_id: "customer@sjsu.edu", password: "password", address:"San Jose", phone_number: "980765551"})
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Customer Profile Test', () => {

        it('Fetch Customer Name from user id',function () {
            agent.get("/grubhub/profile/customer/55")
                .then(function (res) {
                    expect(JSON.parse(res.text)[0].name).to.equal('Customer');
                })
                .catch(error => {
                    console.log(error);
                });
        });

    });

    describe('Restaurant Profile Test', () => {

        it('Fetch Restaurant Name from Owner user id',function () {
            agent.get("/grubhub/profile/restaurant/56")
                .then(function (res) {
                    expect(JSON.parse(res.text)[0].res_name).to.equal('Tipsy Topsy');
                })
                .catch(error => {
                    console.log(error);
                });
        });

    });

    describe('Menu Sections Test', () => {

        it('Fetch Menu Section Name for given section id',function () {
            agent.get("/grubhub/menu/sectionitem/46")
                .then(function (res) {
                    expect(JSON.parse(res.text).menu_section_name).to.equal("Lunch");
                })
                .catch(error => {
                    console.log(error);
                });
        });

    });

    describe('Menu Items Test', () => {

        it('Fetch Menu Item Name for given item id',function () {
            agent.get("/grubhub/menu/menuitem/25")
                .then(function (res) {
                    expect(JSON.parse(res.text).item_name).to.equal("Dosa");
                })
                .catch(error => {
                    console.log(error);
                });
        });

    });

    describe('Order Items Test', () => {

        it('Fetch Items in given Order id',function () {
            agent.get("/grubhub/orders/orderitems/10")
                .then(function (res) {
                    expect(JSON.parse(res.text).length).to.be.at.least(1);
                })
                .catch(error => {
                    console.log(error);
                });
        });

    });

});