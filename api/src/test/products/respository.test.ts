import { Database } from '../../main/database/database';
import { expect } from 'chai';
import { ProductRespository } from '../../main/products/repository';
import { Product } from '../../main/products/model';
import { fail } from 'assert';
import { ProductCategory } from '../../main/products/category';

Database.create();

describe('Product Repository', () => {
    afterEach(async () => {
        try {
            const client = await Database.getConnection().connect();
            const sql = `TRUNCATE TABLE products`;
            const result = await client.query(
                sql,
                []);
            client.release();
        } catch (err) {
            fail('should clean database');
        }
    });


    it('should add without problem', async () => {
        const repository = new ProductRespository();
        const product = new Product('Sofá', 'bem lindo', [], 1000, 0, ProductCategory.COUCH);
        try {
            const inserted = await repository.add(product);
            expect(inserted.id).to.be.greaterThan(0);
        } catch (err) {
            fail(`Should add product correctly ${err}`);
        }
    });

    it('should get product after insert', async () => {
        const repository = new ProductRespository();
        const product = new Product('Sofá', 'bem lindo', [], 1000, 0, ProductCategory.COUCH);
        try {
            const inserted = await repository.add(product);
            expect(inserted.id).to.be.greaterThan(0);
            if (inserted.id) {
                const searched = await repository.get(inserted.id);
                expect(searched.id).to.be.equal(inserted.id);
            } else {
                fail('should return id');
            }
        } catch (err) {
            fail(`Should add product correctly ${err}`);
        }
    });

    it('should search documents', async () => {
        const repository = new ProductRespository();
        const product = new Product('Sofá', 'bem lindo', [], 1000, 0, ProductCategory.COUCH);
        try {
            for (let i = 0; i < 100; i++) {
                const inserted = await repository.add(product);
            }
            const response = await repository.search('sofá', 16, 1);
            expect(response.results.length).to.be.equal(16);
            expect(response.total.count).to.be.equal('100');
        } catch (err) {
            fail(`Should add product correctly ${err}`);
        }
    });

    it('should not remove accents for search', async () => {
        const repository = new ProductRespository();
        const product = new Product('Sofá', 'bem lindo', [], 1000, 0, ProductCategory.COUCH);
        try {
            for (let i = 0; i < 100; i++) {
                const inserted = await repository.add(product);
            }
            const response = await repository.search('sofa', 16, 1);
            expect(response.results.length).to.be.equal(0);
            expect(response.total.count).to.be.equal('0');
        } catch (err) {
            fail(`Should add product correctly ${err}`);
        }
    });
});
