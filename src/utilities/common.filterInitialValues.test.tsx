import React from "react";
import Text from "../components/Form/fields/Text";
import Collection from "../components/Form/fields/Collection";
import { filterInitialValues } from "../utilities/common";

// Collection fields

const collectionSimpleFields = {
    name: <Text />,
};

const collectionFields = {
    names: <Collection {...{ fields: collectionSimpleFields }} />,
};

test("Collection fields | No parameters", () => {
    expect(filterInitialValues(collectionFields)).toEqual({ names: [] });
});

test("Collection fields | Empty initialValues", () => {
    expect(filterInitialValues(collectionFields, {})).toEqual({ names: [] });
});

test("Collection fields | Empty initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(collectionFields, {}, {})).toEqual({ names: [] });
});

test("Collection fields | Undefined initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(collectionFields, undefined, {})).toEqual({ names: [] });
});

test("Collection fields | Simple initialValues", () => {
    expect(filterInitialValues(collectionFields, { names: [{ name: "John" }] })).toEqual({ names: [{ name: "John" }] });
});

test("Collection fields | Simple initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(collectionFields, { names: [{ name: "John" }] }, { names: [{ name: "Jack" }] })).toEqual(
        { names: [{ name: "Jack" }] }
    );
});

test("Collection fields | undefined initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(collectionFields, undefined, { names: [{ name: "Jack" }] })).toEqual({
        names: [{ name: "Jack" }],
    });
});

test("Collection fields | Redundant initialValues", () => {
    expect(filterInitialValues(collectionFields, { names: [{ notName: "John" }] })).toEqual({ names: [] });
});

test("Collection fields | Redundant initialValues and rededundant loadedInitialValues", () => {
    expect(
        filterInitialValues(collectionFields, { names: [{ notName: "John" }] }, { names: [{ notName: "Jack" }] })
    ).toEqual({ names: [] });
});

test("Collection fields | undefined initialValues and rededundant loadedInitialValues", () => {
    expect(filterInitialValues(collectionFields, undefined, { names: [{ notName: "Jack" }] })).toEqual({ names: [] });
});

test("Collection fields | Simple and redundant initialValues", () => {
    expect(filterInitialValues(collectionFields, { names: [{ name: "John", notName: "John" }] })).toEqual({
        names: [{ name: "John" }],
    });
});

test("Collection fields | Simple and redundant initialValues and simple and redundant loadedInitialValues", () => {
    expect(
        filterInitialValues(
            collectionFields,
            { names: [{ name: "John", notName: "John" }] },
            { names: [{ name: "Jack", notName: "Jack" }] }
        )
    ).toEqual({ names: [{ name: "Jack" }] });
});

test("Collection fields | undefined initialValues and simple and redundant loadedInitialValues", () => {
    expect(filterInitialValues(collectionFields, undefined, { names: [{ name: "Jack", notName: "Jack" }] })).toEqual({
        names: [{ name: "Jack" }],
    });
});

// Collection fields with path

const collectionPathFields = {
    names: <Collection {...{ path: "nested.names", fields: collectionSimpleFields }} />,
};

test("Collection fields with path | No parameters", () => {
    expect(filterInitialValues(collectionPathFields)).toEqual({ nested: { names: [] } });
});

test("Collection fields with path | Empty initialValues", () => {
    expect(filterInitialValues(collectionPathFields, {})).toEqual({ nested: { names: [] } });
});

test("Collection fields with path | Empty initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(collectionPathFields, {}, {})).toEqual({ nested: { names: [] } });
});

test("Collection fields with path | Undefined initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(collectionPathFields, undefined, {})).toEqual({ nested: { names: [] } });
});

test("Collection fields with path | Simple initialValues", () => {
    expect(filterInitialValues(collectionPathFields, { nested: { names: [{ name: "John" }] } })).toEqual({
        nested: { names: [{ name: "John" }] },
    });
});

test("Collection fields with path | Simple initialValues and simple loadedInitialValues", () => {
    expect(
        filterInitialValues(
            collectionPathFields,
            { nested: { names: [{ name: "John" }] } },
            { nested: { names: [{ name: "Jack" }] } }
        )
    ).toEqual({ nested: { names: [{ name: "Jack" }] } });
});

test("Collection fields with path | undefined initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(collectionPathFields, undefined, { nested: { names: [{ name: "Jack" }] } })).toEqual({
        nested: { names: [{ name: "Jack" }] },
    });
});

test("Collection fields with path | Redundant initialValues", () => {
    expect(filterInitialValues(collectionPathFields, { nested: { names: [{ notName: "John" }] } })).toEqual({
        nested: { names: [] },
    });
});

test("Collection fields with path | Redundant initialValues and rededundant loadedInitialValues", () => {
    expect(
        filterInitialValues(
            collectionPathFields,
            { nested: { names: [{ notName: "John" }] } },
            { nested: { names: [{ notName: "Jack" }] } }
        )
    ).toEqual({ nested: { names: [] } });
});

test("Collection fields with path | undefined initialValues and rededundant loadedInitialValues", () => {
    expect(filterInitialValues(collectionPathFields, undefined, { nested: { names: [{ notName: "Jack" }] } })).toEqual({
        nested: { names: [] },
    });
});

test("Collection fields with path | Simple and redundant initialValues", () => {
    expect(
        filterInitialValues(collectionPathFields, { nested: { names: [{ name: "John", notName: "John" }] } })
    ).toEqual({
        nested: { names: [{ name: "John" }] },
    });
});

test("Collection fields with path | Simple and redundant initialValues and simple and redundant loadedInitialValues", () => {
    expect(
        filterInitialValues(
            collectionPathFields,
            { nested: { names: [{ name: "John", notName: "John" }] } },
            { nested: { names: [{ name: "Jack", notName: "Jack" }] } }
        )
    ).toEqual({ nested: { names: [{ name: "Jack" }] } });
});

test("Collection fields with path | undefined initialValues and simple and redundant loadedInitialValues", () => {
    expect(
        filterInitialValues(collectionPathFields, undefined, { nested: { names: [{ name: "Jack", notName: "Jack" }] } })
    ).toEqual({
        nested: { names: [{ name: "Jack" }] },
    });
});

// Simple fields

const simpleFields = {
    name: <Text />,
};

test("Simple fields | No parameters", () => {
    expect(filterInitialValues(simpleFields)).toEqual({});
});

test("Simple fields | Empty initialValues", () => {
    expect(filterInitialValues(simpleFields, {})).toEqual({});
});

test("Simple fields | Empty initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, {}, {})).toEqual({});
});

test("Simple fields | Undefined initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, undefined, {})).toEqual({});
});

test("Simple fields | Simple initialValues", () => {
    expect(filterInitialValues(simpleFields, { name: "John" })).toEqual({ name: "John" });
});

test("Simple fields | Simple initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, { name: "John" }, { name: "Jack" })).toEqual({ name: "Jack" });
});

test("Simple fields | undefined initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, undefined, { name: "Jack" })).toEqual({ name: "Jack" });
});

test("Simple fields | Redundant initialValues", () => {
    expect(filterInitialValues(simpleFields, { notName: "John" })).toEqual({});
});

test("Simple fields | Redundant initialValues and rededundant loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, { notName: "John" }, { notName: "Jack" })).toEqual({});
});

test("Simple fields | undefined initialValues and rededundant loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, undefined, { notName: "Jack" })).toEqual({});
});

test("Simple fields | Simple and redundant initialValues", () => {
    expect(filterInitialValues(simpleFields, { name: "John", notName: "John" })).toEqual({ name: "John" });
});

test("Simple fields | Simple and redundant initialValues and simple and redundant loadedInitialValues", () => {
    expect(
        filterInitialValues(simpleFields, { name: "John", notName: "John" }, { name: "Jack", notName: "Jack" })
    ).toEqual({ name: "Jack" });
});

test("Simple fields | undefined initialValues and simple and redundant loadedInitialValues", () => {
    expect(filterInitialValues(simpleFields, undefined, { name: "Jack", notName: "Jack" })).toEqual({ name: "Jack" });
});

// Simple fields with path

const simplePathFields = {
    name: <Text {...{ path: "nested.name" }} />,
};

test("Simple fields with path | No parameters", () => {
    expect(filterInitialValues(simplePathFields)).toEqual({});
});

test("Simple fields with path | Empty initialValues", () => {
    expect(filterInitialValues(simplePathFields, {})).toEqual({});
});

test("Simple fields with path | Empty initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(simplePathFields, {}, {})).toEqual({});
});

test("Simple fields with path | Undefined initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues(simplePathFields, undefined, {})).toEqual({});
});

test("Simple fields with path | Simple initialValues", () => {
    expect(filterInitialValues(simplePathFields, { nested: { name: "John" } })).toEqual({ nested: { name: "John" } });
});

test("Simple fields with path | Simple initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(simplePathFields, { nested: { name: "John" } }, { nested: { name: "Jack" } })).toEqual({
        nested: { name: "Jack" },
    });
});

test("Simple fields with path | undefined initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues(simplePathFields, undefined, { nested: { name: "Jack" } })).toEqual({
        nested: { name: "Jack" },
    });
});

test("Simple fields with path | Redundant initialValues", () => {
    expect(filterInitialValues(simplePathFields, { nested: { notName: "John" } })).toEqual({});
});

test("Simple fields with path | Redundant initialValues and rededundant loadedInitialValues", () => {
    expect(
        filterInitialValues(simplePathFields, { nested: { notName: "John" } }, { nested: { notName: "Jack" } })
    ).toEqual({});
});

test("Simple fields with path | undefined initialValues and rededundant loadedInitialValues", () => {
    expect(filterInitialValues(simplePathFields, undefined, { nested: { notName: "Jack" } })).toEqual({});
});

test("Simple fields with path | Simple and redundant initialValues", () => {
    expect(filterInitialValues(simplePathFields, { nested: { name: "John", notName: "John" } })).toEqual({
        nested: { name: "John" },
    });
});

test("Simple fields with path | Simple and redundant initialValues and simple and redundant loadedInitialValues", () => {
    expect(
        filterInitialValues(
            simplePathFields,
            { nested: { name: "John", notName: "John" } },
            { nested: { name: "Jack", notName: "Jack" } }
        )
    ).toEqual({ nested: { name: "Jack" } });
});

test("Simple fields with path | undefined initialValues and simple and redundant loadedInitialValues", () => {
    expect(filterInitialValues(simplePathFields, undefined, { nested: { name: "Jack", notName: "Jack" } })).toEqual({
        nested: { name: "Jack" },
    });
});

// Empty fields

test("Empty fields | No parameters", () => {
    expect(filterInitialValues({})).toEqual({});
});

test("Empty fields | Empty initialValues", () => {
    expect(filterInitialValues({}, {})).toEqual({});
});

test("Empty fields | Empty initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues({}, {}, {})).toEqual({});
});

test("Empty fields | Undefined initialValues and empty loadedInitialValues", () => {
    expect(filterInitialValues({}, undefined, {})).toEqual({});
});

test("Empty fields | Simple initialValues", () => {
    expect(filterInitialValues({}, { name: "John" })).toEqual({});
});

test("Empty fields | Simple initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues({}, { name: "John" }, { name: "Jack" })).toEqual({});
});

test("Empty fields | undefined initialValues and simple loadedInitialValues", () => {
    expect(filterInitialValues({}, undefined, { name: "Jack" })).toEqual({});
});
