import { createServer, Model, Factory, belongsTo, RestSerializer, hasMany } from "miragejs"
import { faker } from '@faker-js/faker';

export function fakeServer({ environment = 'test' }) {
    return createServer({
        environment,

        models: {
            // audit: Model.extend({
            //     organisation: belongsTo(),
            //     timeline: hasMany()
            // }),
            // timeline: Model.extend({
            //     audit: belongsTo()
            // }),
            organisation: Model
        },

        factories: {
            // audit: Factory.extend({
            //     publicId() { return faker.datatype.uuid() },
            //     applicationName() { return faker.commerce.department() },
            //     correlationId() { return faker.datatype.uuid() },
            //     summary() { return faker.lorem.slug() },
            //     actionType(i): string {
            //         const actionTypes = ['login', 'signup', 'orgcreation'];
            //         return actionTypes[i % actionTypes.length];
            //     },
            //     description() { return faker.lorem.sentence() },
            //     timestamp() { return faker.date.between('2022-01-01T00:00:00.000Z', '2022-03-01T00:00:00.000Z') },
            //     userName() { return faker.name.findName() },
            //     userEmail() { return faker.internet.email() },
            // }),
            organisation: Factory.extend({
                publicId() { return faker.datatype.uuid() },
                name() { return `${faker.address.county()} High School` }
            }),
            // timeline: Factory.extend({
            //     timestamp() { return faker.date.between('2022-01-01T00:00:00.000Z', '2022-03-01T00:00:00.000Z') },
            //     description() { return faker.lorem.sentence() },
            // })
        },

        serializers: {
            // auditWithTimeline: RestSerializer.extend({
            //     include: ["timeline", "organisation"],
            //     embed: true,
            // }),
            organisation: RestSerializer.extend(),
        },

        routes() {
            this.urlPrefix = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

            // this.get("/Audit", function (this: any, schema) {
            //     let data = this.serialize(schema.all('audit'), "audit-with-timeline");
            //     return {
            //         total: data.audits.length,
            //         data: [...data.audits.map((audit: any) => {
            //             audit.organisationName = audit.organisation.name;
            //             return audit;
            //         })]
            //     }
            // })

            // this.get("/Audit/:id", function (this: any, schema, req) {
            //     let data = this.serialize(schema.all('audit'), "audit-with-timeline");
            //     return data.audits.find((audit: any) => audit.publicId === req.params.id);
            // })

            this.get("/Organisation", function (this: any, schema, req) {
                let data = this.serialize(schema.all('organisation'), "organisation");
                return data.organisations;
            })
        },

        seeds(server) {
            server.createList("organisation", 2);
        }
    })
}
