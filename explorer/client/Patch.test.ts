#! /usr/bin/env yarn jest

import {
    DEFAULT_COLUMN_DELIMITER,
    DEFAULT_ROW_DELIMITER,
    encodeComponent,
    objectFromPatch,
    objectToPatch,
} from "./Patch"

const specialCharacters = "!*'();:@&=+$,/?#[]-_.~|\"\\"

it("can create a patch", () => {
    const tests = [
        { patch: "", object: {} },
        { object: { foo: "bar" }, patch: `foo${DEFAULT_COLUMN_DELIMITER}bar` },
        {
            object: {
                [`a${DEFAULT_COLUMN_DELIMITER}${specialCharacters}${DEFAULT_ROW_DELIMITER}c`]: `a${DEFAULT_COLUMN_DELIMITER}${specialCharacters}${DEFAULT_ROW_DELIMITER}b`,
                [`${DEFAULT_COLUMN_DELIMITER}${DEFAULT_ROW_DELIMITER}`]: specialCharacters,
            },
            patch: `${encodeComponent(
                `a${DEFAULT_COLUMN_DELIMITER}${specialCharacters}${DEFAULT_ROW_DELIMITER}c`
            )}${DEFAULT_COLUMN_DELIMITER}${encodeComponent(
                `a${DEFAULT_COLUMN_DELIMITER}${specialCharacters}${DEFAULT_ROW_DELIMITER}b`
            )}${DEFAULT_ROW_DELIMITER}${encodeComponent(
                `${DEFAULT_COLUMN_DELIMITER}${DEFAULT_ROW_DELIMITER}`
            )}${DEFAULT_COLUMN_DELIMITER}${encodeComponent(specialCharacters)}`,
        },
    ]
    tests.forEach((test) => {
        expect(objectToPatch(test.object)).toEqual(test.patch)
        expect(objectFromPatch(test.patch)).toEqual(test.object)
    })
})
