const chai = require("chai");
const supertest = require("supertest")

let expect = chai.expect;
const requester = supertest('http://localhost:8080/')

mongoose.connect("mongodb+srv://avalenti3003:Teclado3003@proyectocoder.wcbxmpy.mongodb.net/eccomerce-test")
