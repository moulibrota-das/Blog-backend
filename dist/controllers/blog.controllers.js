"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_config_1 = __importDefault(require("../db/prisma.config"));
//get all blogs
const getAllBlog = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield prisma_config_1.default.blogs.findMany();
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
//get blog by id
const getBlog = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const blog = yield prisma_config_1.default.blogs.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
//get blogs by title search
const getBlogByTitle = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.params.title;
        const blogs = yield prisma_config_1.default.blogs.findMany({
            where: {
                title: {
                    search: title,
                },
            }
        });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
//add blog
const addBlog = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = req.body;
        const createBlog = yield prisma_config_1.default.blogs.create({
            data: {
                title: blog.title,
                description: blog.description,
                content: blog.content,
                authorId: blog.authorId
            }
        });
        res.status(200).json(createBlog);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//update a blog
const updateBlog = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = req.body;
        const id = req.params.id;
        const updatedBlog = yield prisma_config_1.default.blogs.update({
            where: {
                id: id
            },
            data: {
                title: blog.title,
                description: blog.description,
                content: blog.content,
                authorId: blog.authorId
            }
        });
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//delete a blog
const deleteBlog = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedBlog = yield prisma_config_1.default.blogs.delete({
            where: {
                id: id
            }
        });
        res.status(200).json(deletedBlog);
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
module.exports = { getAllBlog, getBlog, getBlogByTitle, addBlog, updateBlog, deleteBlog };
