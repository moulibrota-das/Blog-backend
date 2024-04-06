import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.config";
import { redis } from "../lib/redis";
import { sendMessageToQueue } from "../lib/kafka";
type Blog = {
  title : string,
  description : string,
  content : string,
  authorId : string
}

// get all blogs
const getAllBlog = (async (req:Request, res:Response)=>{
  try {
    const blogs = await prisma.blogs.findMany({
      include:{
        author:{
          select:{
            name:true
          }
        }
      }
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(401).json(error);
  }
})

// get blog by id
const getBlog = (async (req:Request, res:Response)=>{
  try {
    const id = req.params.id;
    const cachedValue = await redis.get(id);

    if(cachedValue){
      console.log("cached data : true")
      res.status(200).json(JSON.parse(cachedValue));
      return;
    }
    
    const blog = await prisma.blogs.findUnique({
      where:{
        id: id
      },
      include:{
        author:{
          select:{
            name:true
          }
        }
      },
    });

    if(!blog){
      throw new Error("Blog not found")
    }
    console.log("cached data : false")
    res.status(200).json(blog);
    // await redis.set(id, JSON.stringify(blog));
    await sendMessageToQueue(JSON.stringify(blog));
  } catch (error) {
    res.status(401).send({error: error});
  }
})

// get blogs by title search
const getBlogByTitle = (async (req:Request, res:Response)=>{
  try {
    const title = req.params.title;
    const blogs = await prisma.blogs.findMany({
      where:{
        title:{
          search: title,
        },
      },
      include:{
        author:{
          select:{
            name:true
          }
        }
      }
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(401).json(error);
  }
})

// add blog
const addBlog = (async (req:Request, res:Response)=>{
  try {
    const blog : Blog = req.body;
    const createBlog = await prisma.blogs.create({
      data:{
        title:blog.title,
        description:blog.description,
        content:blog.content,
        authorId : blog.authorId
      }
    })
    //implement message broker to add the blog to redis
    res.status(200).json(createBlog);
    await sendMessageToQueue(JSON.stringify(blog));
  } catch (error) {
    res.status(400).send(error);
  }
})

// update a blog
const updateBlog = (async (req:Request, res:Response)=>{
  try {
    const blog : Blog = req.body;
    const blogId = req.body.id;
    const updatedBlog = await prisma.blogs.update({
      where: {
        id : blogId
      },
      data: {
        title:blog.title,
        description:blog.description,
        content:blog.content,
        authorId : blog.authorId
      }
    })
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).send(error);
  }
})

// delete a blog
const deleteBlog = (async (req:Request, res:Response)=>{
  try {
    const id = req.params.id;
    const deletedBlog = await prisma.blogs.delete({
      where:{
        id: id
      }
    });
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(401).json(error);
  }
})

module.exports = {getAllBlog, getBlog, getBlogByTitle, addBlog, updateBlog, deleteBlog}