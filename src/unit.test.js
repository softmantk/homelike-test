const config =require('./config')
const util = require('./util')
// const {server} = require('./loaders/index');
const axios = require('axios');
let app;

beforeAll(async () => {
    await util.delay(2000)
})
afterAll(() => {

})

describe('Server connection test', () => {
    test("Ping", async () => {
        const resp = await axios.get(`${config.server.BASE_URL}/ping`);
        expect(resp.data).toEqual('pong');
    });

});