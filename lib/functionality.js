import { videos } from "../constants";

export const getAllPosts = async ()=>{
  try {
    const posts = videos;
    return posts
  } catch (error) {
    throw new Error(error)

  }
}

export const getLatestPosts = async ()=>{
  try {
    const posts = videos;
    return posts.reverse().slice(0,5)
  } catch (error) {
    throw new Error(error)

  }
}
