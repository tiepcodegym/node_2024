import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import * as jwt from "jsonwebtoken";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;


    // @OneToMany(type => CustomData, dataSource => dataSource.user) customDatas: CustomData[];

    generateJwt() {
        const payload = {
            id: this.id,
            name: this.name,
            email: this.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    }

}