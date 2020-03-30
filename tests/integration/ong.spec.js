const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
     // await connection.migrate.rollback(); //para limpar o banco antes de testar mais esta dando erro quando uso 
      await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to crate a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', 'id ong') para test das profiles
        .send({
            name: "ONG DE TEST DO TDD",
            email: "contatosr@gmail.com",
            whatsapp: "5585996206599",
            city: "Fortaleza",
            uf: "CE"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});