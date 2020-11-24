import { strToQueryParams } from "utils/client/url"

export const DEFAULT_COLUMN_DELIMITER = "="
export const DEFAULT_ROW_DELIMITER = "&"

export const decodeComponent = decodeURIComponent
export const encodeComponent = encodeURIComponent

// Note: assumes that neither no key nor value in obj has a newline or tab character
export const objectToPatch = (
    obj: any,
    rowDelimiter = DEFAULT_ROW_DELIMITER,
    columnDelimiter = DEFAULT_COLUMN_DELIMITER
) =>
    Object.keys(obj)
        .map((key) =>
            [key, obj[key]].map(encodeComponent).join(columnDelimiter)
        )
        .join(rowDelimiter)

export const objectFromPatch = (
    patch = "",
    rowDelimiter = DEFAULT_ROW_DELIMITER,
    columnDelimiter = DEFAULT_COLUMN_DELIMITER
) => {
    const obj: any = {}
    patch.split(rowDelimiter).forEach((line) => {
        line = line.trim()
        if (!line) return
        // As long as encode() correctly escapes columnDelimiters,
        // there can only be up to 2 elements after the split().
        const [key, value] = line.split(columnDelimiter).map(decodeComponent)
        obj[key] = value
    })
    return obj
}

export const getPatchFromQueryString = (
    queryString = "",
    patchKeyword = "patch"
) => strToQueryParams(queryString)[patchKeyword] ?? ""
