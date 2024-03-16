"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (!global.__db) {
    global.__db = new client_1.PrismaClient();
}
prisma = global.__db;
exports.default = prisma;
