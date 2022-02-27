import {MigrationInterface, QueryRunner} from "typeorm";

export class createUniqueIndex1645409743078 implements MigrationInterface {
    name = 'createUniqueIndex1645409743078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdDate"`);
    }

}
