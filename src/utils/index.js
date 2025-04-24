import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import mitt from "mitt";

dayjs.extend(utc);
dayjs.extend(timezone);

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
      video
        .play()
        .then(() => {
          video.pause();
        })
        .catch(reject);
    };

    video.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatEventTime = (
  startDate,
  startTime,
  endDate = null,
  endTime = null
) => {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  const timeZoneOffset = new Date().getTimezoneOffset() / -60;
  const timeZoneString = `(UTC ${
    timeZoneOffset >= 0 ? "+" : ""
  }${timeZoneOffset}:00)`;

  const startDateStr = new Intl.DateTimeFormat("en-US", options).format(
    startDate
  );
  const startTimeStr = new Intl.DateTimeFormat("en-US", timeOptions).format(
    startTime
  );

  if (!endDate || !endTime) {
    return `${startDateStr}, ${startTimeStr} ${timeZoneString}`;
  }

  const endDateStr = new Intl.DateTimeFormat("en-US", options).format(endDate);
  const endTimeStr = new Intl.DateTimeFormat("en-US", timeOptions).format(
    endTime
  );

  if (startDate.toDateString() === endDate.toDateString()) {
    return `${startDateStr}, ${startTimeStr} - ${endTimeStr} ${timeZoneString}`;
  } else {
    return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr} ${timeZoneString}`;
  }
};
export function maskEmail(email) {
  const [name, domain] = email.split("@");
  if (name.length > 2) {
    const maskedName = name.slice(0, 2) + "*".repeat(name.length - 2);
    return `${maskedName}@${domain}`;
  }
  return email;
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    return true;
  } catch (error) {
    toast.error("Failed to copy to clipboard");
    return false;
  }
};

export function formatEventPostTime(startTime, endTime = null) {
  const start = dayjs.utc(startTime).local();
  const today = dayjs().startOf("day");

  let dateLabel;
  if (start.isSame(today, "day")) {
    dateLabel = "Today";
  } else if (start.isSame(today.add(1, "day"), "day")) {
    dateLabel = "Tomorrow";
  } else {
    dateLabel = start.format("MMMM D, YYYY");
  }

  const formattedStartTime = start.format("h:mm A");

  if (!endTime) {
    return `${dateLabel}, ${formattedStartTime}`;
  }

  const end = dayjs.utc(endTime).local();
  const formattedEndTime = end.format("h:mm A");

  return `${dateLabel}, ${formattedStartTime} - ${formattedEndTime}`;
}

export function formatEventTimeLocal(startTime, endTime) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  const dateFormat = "ddd, MMM D, YYYY";
  const timeFormat = "h:mm A";

  const dateStr = start.format(dateFormat);
  const startTimeStr = start.format(timeFormat);
  const endTimeStr = end.format(timeFormat);

  if (start.isSame(end, "minute")) {
    return `${dateStr}, ${startTimeStr}`;
  }

  return `${dateStr}, ${startTimeStr} - ${endTimeStr}`;
}

export const eventBus = mitt();

export const formatDate = (isoString) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

export const addDays = (days) => {
  const now = new Date();
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const getDaysLeft = (isoDate) => {
  const now = new Date();

  const futureDate = new Date(isoDate);
  const diffTime = futureDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
};