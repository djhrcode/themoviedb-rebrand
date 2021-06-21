import { createResource } from "./types";

describe("createResource() use cases works properly", () => {
    const userSampleData = {
        full_name: "Daniel Hernández",
        email: "djhrcode@gmail.com",
        age: 18.5,
        is_admin: true,
    };

    const userSampleCollection = [
        userSampleData,
        userSampleData,
        userSampleData,
    ];

    const taskSampleData = {
        title: "Finish this tests",
        is_done: false,
        started_at: Date.now(),
        collaborators: userSampleCollection,
    };

    const UserResource = createResource((data, serializer) => ({
        fullName: serializer.string(data.full_name),
        email: serializer.string(data.email),
        age: serializer.int(data.age),
        isAdmin: serializer.boolean(data.is_admin),
    }));

    const TaskResource = createResource((data, serializer) => ({
        title: serializer.string(data.title),
        isDone: serializer.string(data.is_done),
        startedAt: serializer.int(data.started_at),
        collaborators: serializer.collection(UserResource, data.collaborators),
    }));

    test("createResource() should serialize primitive types properly", () => {
        const serialized = UserResource(userSampleData);

        expect(serialized.fullName).toBe(userSampleData.full_name);
        expect(serialized.email).toBe(userSampleData.email);
        expect(serialized.age).toBe(18);
        expect(serialized.isAdmin).toBe(true);
    });

    test("createResource().collection() should serialize arrays properly", () => {
        const serialized = UserResource.collection(userSampleCollection);

        expect(serialized[0].fullName).toBe(userSampleCollection[0].full_name);
        expect(serialized[0].email).toBe(userSampleCollection[0].email);
        expect(serialized[0].age).toBe(18);
        expect(serialized[0].isAdmin).toBe(userSampleCollection[0].is_admin);
        expect(serialized.length).toBe(userSampleCollection.length);
    });

    test("createResource() should serialize nested resources", () => {
        const serialized = TaskResource(taskSampleData);

        expect(serialized.title).toBe(taskSampleData.title);
        expect(serialized.isDone).toBe(taskSampleData.is_done);
        expect(serialized.startedAt).toBe(taskSampleData.started_at);
        expect(serialized.collaborators[0].fullName).toBe(
            userSampleCollection[0].full_name
        );
        expect(serialized.collaborators[0].email).toBe(
            userSampleCollection[0].email
        );
        expect(serialized.collaborators[0].age).toBe(18);
        expect(serialized.collaborators[0].isAdmin).toBe(
            userSampleCollection[0].is_admin
        );
        expect(serialized.collaborators.length).toBe(
            userSampleCollection.length
        );
    });

    test("createResource() should works properly as casts", () => {
        const DateCaster = createResource((data, serializer) =>
            serializer.instanceof(Date, new Date(data))
        );

        const URLCaster = createResource((data, serializer) =>
            serializer.instanceof(URL, new URL(data))
        );

        const JSONStringCaster = createResource((data) => JSON.parse(data));

        const FullNameCaster = createResource(
            (data, serializer) =>
                serializer.string(data.first_name) +
                " " +
                serializer.string(data.last_name)
        );

        const AddressResource = createResource((data, serializer) => ({
            line1: serializer.string(data.line_1),
            line2: serializer.string(data.line_2),
            city: serializer.string(data.city),
            country: serializer.string(data.country),
            postalCode: serializer.string(data.postal_code),
            state: serializer.string(data.state),
        }));

        const UserCastsResource = createResource((data, serializer) => ({
            fullName: serializer.resource(FullNameCaster, data),
            birthDate: serializer.resource(DateCaster, data.birth_date),
            address: serializer.resource(
                AddressResource,
                serializer.resource(JSONStringCaster, data.address)
            ),
        }));

        const userSampleData = {
            first_name: "John",
            last_name: "Smith",
            birth_date: "2021-03-30T17:29:55.000000Z",
            address: JSON.stringify({
                line_1: "Carrera 68D #40-53 Sur",
                line_2: "Conjunto Residencial Torres de Sevilla",
                city: "Bogotá D.C.",
                country: "Colombia",
                postal_code: 123456789,
                state: "Cundinamarca",
            }),
        };

        const serialized = UserCastsResource(userSampleData);

        expect(serialized.address).toStrictEqual(
            AddressResource(JSONStringCaster(userSampleData.address))
        );
        expect(serialized.fullName).toBe(
            userSampleData.first_name + " " + userSampleData.last_name
        );

        expect(serialized.birthDate).toBeInstanceOf(Date);
        expect(serialized.birthDate.getFullYear()).toBe(2021);
        expect(serialized.birthDate.getDate()).toBe(30);
        expect(serialized.birthDate.getMonth()).toBe(2);
    });
});
