import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import "./facialExpression.css";
export default function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);

  // 1. Load models once
  useEffect(() => {
    const MODEL_URL = "/models";

    const load = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };
    load();
  }, []);

  // 2. Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((err) => console.error("Camera Error:", err));
  };

  // 3. Detect expression only when button is clicked
  const detectExpressionOnce = async () => {
    const video = videoRef.current;
    if (!video) return;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    let highestScore = 0;
    let topExpression = "";

    for (const [expression, score] of Object.entries(
      detections[0].expressions
    )) {
      if (score > highestScore) {
        highestScore = score;
        topExpression = expression;
      }
    }
    axios
      .get(`http://localhost:3000/song?mood=${topExpression}`)
      .then((Response) => {
        console.log(Response.data);
        setSongs(Response.data.songs)
      });

    console.log(
      `Expression: ${topExpression} (${(highestScore * 100).toFixed(1)}%)`
    );
  };

  // 4. JSX
  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <button onClick={detectExpressionOnce}>Detect Mood</button>
    </div>
  );
}
