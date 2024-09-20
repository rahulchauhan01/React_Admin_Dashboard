import { EntitySchema } from 'typeorm';

const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
            length: 100,
        },
        email: {
            type: 'varchar',
            length: 100,
        },
        phone: {
            type: 'varchar',
            length: 15,
        },
        password: {
            type: 'varchar',
            length: 255,
        },
        created_at: {
            type: 'timestamp',
            createDate: true, 
        },
        updated_at: {
            type: 'timestamp',
            updateDate: true, 
        },
    },
});

export default User;
