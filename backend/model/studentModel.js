import { EntitySchema } from "typeorm";

const Contact = new EntitySchema({
    name: 'Student',
    tableName: 'students',
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
        subject: {
            type: 'varchar',
            length: 100,
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

export default Contact;
