import React from "react";
import Text from "../components/Form/fields/Text";
import SelectApi from "../components/Form/fields/SelectApi";
import Collection from "../components/Form/fields/Collection";
import { transformInitialValues } from "../utilities/common";

// Collection fields

const collectionSimpleFields = {
    name: <Text />,
    select: <SelectApi {...{ endpoint: "" }} />,
};

const collectionFields = {
    names: <Collection {...{ fields: collectionSimpleFields }} />,
};

test("Collection fields | No parameters", () => {
    expect(transformInitialValues(collectionFields, {})).toEqual({});
});

test("Collection fields | Simple initialValues", () => {
    expect(
        transformInitialValues(collectionFields, {
            names: [{ name: "John", select: { representation: "Option 1", id: 1 } }],
        })
    ).toEqual({
        names: [{ name: "John", select: 1 }],
    });
});

test("Collection fields | Simple already transformed initialValues", () => {
    expect(
        transformInitialValues(collectionFields, {
            names: [{ name: "John", select: 1 }],
        })
    ).toEqual({
        names: [{ name: "John", select: 1 }],
    });
});

test("Collection fields | Simple mixed with already transformed initialValues", () => {
    expect(
        transformInitialValues(collectionFields, {
            names: [
                { name: "John" },
                { name: "Jack", select: 2 },
                { name: "Jill", select: { representation: "Option 1", id: 1 } },
            ],
        })
    ).toEqual({
        names: [{ name: "John" }, { name: "Jack", select: 2 }, { name: "Jill", select: 1 }],
    });
});

// Collection fields with path

const collectionPathFields = {
    names: <Collection {...{ path: "nested.names", fields: collectionSimpleFields }} />,
};

test("Collection fields with path | No parameters", () => {
    expect(transformInitialValues(collectionPathFields, {})).toEqual({});
});

test("Collection fields with path | Simple initialValues", () => {
    expect(
        transformInitialValues(collectionPathFields, {
            nested: { names: [{ name: "John", select: { representation: "Option 1", id: 1 } }] },
        })
    ).toEqual({
        nested: { names: [{ name: "John", select: 1 }] },
    });
});

test("Collection fields with path | Simple already transformed initialValues", () => {
    expect(
        transformInitialValues(collectionPathFields, {
            nested: { names: [{ name: "John", select: 1 }] },
        })
    ).toEqual({
        nested: { names: [{ name: "John", select: 1 }] },
    });
});

test("Collection fields with path | Simple mixed with already transformed initialValues", () => {
    expect(
        transformInitialValues(collectionPathFields, {
            nested: {
                names: [
                    { name: "John" },
                    { name: "Jack", select: 2 },
                    { name: "Jill", select: { representation: "Option 1", id: 1 } },
                ],
            },
        })
    ).toEqual({
        nested: { names: [{ name: "John" }, { name: "Jack", select: 2 }, { name: "Jill", select: 1 }] },
    });
});

// Simple fields

const simpleFields = {
    name: <Text />,
    select: <SelectApi {...{ endpoint: "" }} />,
};

test("Simple fields | Empty initialValues", () => {
    expect(transformInitialValues(simpleFields, {})).toEqual({});
});

test("Simple fields | Simple initialValues", () => {
    expect(
        transformInitialValues(simpleFields, { name: "John", select: { representation: "Option 1", id: 1 } })
    ).toEqual({ name: "John", select: 1 });
});

test("Simple fields | Simple already transformed initialValues", () => {
    expect(transformInitialValues(simpleFields, { name: "John", select: 1 })).toEqual({ name: "John", select: 1 });
});

// Simple fields with path

const simplePathFields = {
    name: <Text {...{ path: "nested.name" }} />,
    select: <SelectApi {...{ path: "nested.select", endpoint: "" }} />,
};

test("Simple fields with path | Empty initialValues", () => {
    expect(transformInitialValues(simplePathFields, {})).toEqual({});
});

test("Simple fields with path | Simple initialValues", () => {
    expect(
        transformInitialValues(simplePathFields, {
            nested: { name: "John", select: { representation: "Option 1", id: 1 } },
        })
    ).toEqual({ nested: { name: "John", select: 1 } });
});

test("Simple fields with path | Simple already transformed initialValues", () => {
    expect(transformInitialValues(simplePathFields, { nested: { name: "John", select: 1 } })).toEqual({
        nested: { name: "John", select: 1 },
    });
});

// Empty fields

test("Empty fields | Empty initialValues", () => {
    expect(transformInitialValues({}, {})).toEqual({});
});

test("Empty fields | Simple initialValues", () => {
    expect(transformInitialValues({}, { name: "John" })).toEqual({ name: "John" });
});
