"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
process.on('uncaughtException', (error, origin) => {
    console.log(`${origin} signal received. \n${error}`);
});
