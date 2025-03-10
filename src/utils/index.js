import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const generateThumbnail = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.crossOrigin = "anonymous";
    video.muted = true; // Required for some browsers
    video.playsInline = true; // Prevents fullscreen on iOS

    video.onloadeddata = () => {
      video.currentTime = 0.5; // Move to the 2-second mark

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailURL = canvas.toDataURL("image/png");

        // Cleanup
        URL.revokeObjectURL(video.src);
        resolve(thumbnailURL);
      };

      // Manually trigger seeking to ensure onseeked fires
      video.play().then(() => {
        video.pause();
      }).catch(reject);
    };

    video.onerror = (error) => {
      reject(error);
    };
  });
};
