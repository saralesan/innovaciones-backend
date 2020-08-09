const contactSchema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "message": {
            "type": "string"
        }
    },
    "required": [
        "name",
        "email",
        "message"
    ]
};

module.exports = contactSchema;