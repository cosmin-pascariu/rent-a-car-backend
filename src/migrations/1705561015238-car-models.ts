import { MigrationInterface, QueryRunner } from "typeorm";

export class CarModels1705561015238 implements MigrationInterface {
    name = 'CarModels1705561015238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_models" ALTER COLUMN "is_deleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_models" ALTER COLUMN "is_deleted" DROP DEFAULT`);
    }

}
