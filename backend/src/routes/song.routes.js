const express=require("express");
const multer=require("multer");
const uploadFile = require("../service/storage.service");
const router=express.Router();
const upload=multer({storage:multer.memoryStorage()});
const songmodel =require("../models/Song.model");


router.post("/",upload.single("audio"),async(req,res)=>{
  console.log(req.body);

  const filedata=await uploadFile(req.file);
  const song=await songmodel.create({
    title:req.body.title,
    artist:req.body.artist,
    audio:filedata.url,
    mood:req.body.mood,
  })
  res.status(201).json({
    message:"Songs created successfully",
    song:song
  })
})

router.get("/",async(req,res)=>{
  const {mood}=req.query;

 const songs=await songmodel.find({
  mood:mood
 })
 res.status(200).json({
  message:"Songs fetch sucess",
  songs
 })
})

module.exports=router;