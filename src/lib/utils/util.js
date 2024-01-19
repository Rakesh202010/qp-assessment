"use strict";

const fs = require("fs");

/**
 * Utility is the base class for all user defined utilty functions.
 * It contain all function that make user task less repetitive in terms
 */
class Utility {

    formatResponse(status, jasonData, errorMessage = null) {
        this.message = "";

        if (status === 200) {
            this.message = "Success";
        } else if (status === 304) {
            this.message = "Data Not modified";
        } else if (status === 400) {
            this.message = "Invalid Request";
        } else if (status === 401) {
            this.message = "Unauthorized Error";
        } else if (status === 403) {
            this.message = "Forbidden Error";
        } else if (status === 404) {
            this.message = "Data Not found";
        } else if (status === 440) {
            this.message = "Session timeout!";
        } else if (status === 498) {
            this.message = "Token expired!";
        } else if (status === 500) {
            this.message = "Internal server error!";
        }

        if (errorMessage) {
            this.message = errorMessage;
        }
        return {
            status,
            message: this.message,
            data: jasonData
        };
    }
}

module.exports = Utility;
