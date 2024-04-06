import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.config";
import { Certificate } from "crypto";

type Bookmark = {
  userId : string,
  blogId: string,
}

// add blog to bookmark
const addBookmark = (async (req:Request, res:Response)=>{
  try {
    const bookmark : Bookmark = req.body;
    const createBookmark = await  prisma.bookmark.create({data: {
      user_id: bookmark.userId,
      blog_id: bookmark.blogId
    }});

    if(createBookmark){
      return res.status(200).json(createBookmark);
    }
    else{
      return res.status(400).send("Bookmark not created")
    }
  } catch (error) {
    console.log(error)
  }
})

// get blogs from bookmark
const getUserBookmark = (async (req:Request, res:Response)=>{
  try {
    const userId = req.params.id;
    const bookmarkedBlogs = await prisma.bookmark.findMany({
      where: {
        user_id: userId // Assuming userId is the variable for the user's ID
      },
      select: {
        blog: true
      }
    })

    if(bookmarkedBlogs){
      res.status(200).json(bookmarkedBlogs);
      return;
    }
    else{
      return res.status(404);
    }
  } catch (error) {
    console.log(error)
  }
})

// delete blogs from bookmark
const deleteUserBookmark = (async (req:Request, res:Response)=>{
  try {
    const bookmark : Bookmark = req.body;
    const deletedBookmarkedBlogs = await prisma.bookmark.delete({
      where: {
        user_id_blog_id:{
          user_id: bookmark.userId,
          blog_id: bookmark.blogId
        }
      },
    })

    if(deletedBookmarkedBlogs){
      res.status(200).json(deletedBookmarkedBlogs);
      return;
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = {addBookmark, getUserBookmark, deleteUserBookmark}