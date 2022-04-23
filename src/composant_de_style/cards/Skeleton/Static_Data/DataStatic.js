import { faker } from '@faker-js/faker';



// ----------------------------------------------------------------------

const users = [...Array(5)].map((_, index) => ({
    id: faker.datatype.uuid(),

    title: faker.name.findName(),



}));

export default users;
