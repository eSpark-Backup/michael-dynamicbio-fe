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


export const formatEventTime = (startDate, startTime, endDate = null, endTime = null) => {
  const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  const timeZoneOffset = new Date().getTimezoneOffset() / -60;
  const timeZoneString = `(UTC ${timeZoneOffset >= 0 ? "+" : ""}${timeZoneOffset}:00)`;

  const startDateStr = new Intl.DateTimeFormat("en-US", options).format(startDate);
  const startTimeStr = new Intl.DateTimeFormat("en-US", timeOptions).format(startTime);

  if (!endDate || !endTime) {
    return `${startDateStr}, ${startTimeStr} ${timeZoneString}`;
  }

  const endDateStr = new Intl.DateTimeFormat("en-US", options).format(endDate);
  const endTimeStr = new Intl.DateTimeFormat("en-US", timeOptions).format(endTime);

  if (startDate.toDateString() === endDate.toDateString()) {
    return `${startDateStr}, ${startTimeStr} - ${endTimeStr} ${timeZoneString}`;
  } else {
    return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr} ${timeZoneString}`;
  }
};
