import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurverysUsers1614460819992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surverys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "survery_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timesptamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKSurvery",
                        referencedTableName: "surverys",
                        referencedColumnNames: ["id"],
                        columnNames: ["survery_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surverys_users")
    }

}
