import { faker } from '@faker-js/faker';



// ----------------------------------------------------------------------

const users = [...Array(6)].map((_, index) => ({
    id: faker.datatype.uuid(),

    name: faker.name.findName(),
    emaill: faker.name.findName(),
    role: faker.name.findName(),
    phone: faker.name.findName(),


}));

export default users;
