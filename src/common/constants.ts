export const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const Messages = {
    SUCCESS: 'Success',
    INVALID_PAGINATION: 'Invalid pagination parameters. Use positive integers for page and limit.',
    NO_DATA: 'No data available for the requested page.',
    SERVER_ERROR: 'An unexpected error occurred.',
} as const;


