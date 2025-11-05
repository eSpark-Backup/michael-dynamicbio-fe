import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import mitt from "mitt";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
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

  if (diffDays < 0) {
    return "Poll ended";
  }

  return `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
};

export function convertToFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);

    if (!isEmpty) {
      formData.append(key, value);
    }
  });

  return formData;
}

export function toCapitalized(str) {
  const lower = str?.toLowerCase();
  return str ? lower.charAt(0).toUpperCase() + lower.slice(1) : null;
}

export const getDesc = (item) => {
  switch (item?.type) {
    case "birthday":
      return dayjs().isSame(dayjs(item?.dob), "day")
        ? `Celebrate ${item?.firstName} ${item?.lastName}'s birthday today`
        : `Celebrate ${item?.firstName} ${
            item?.lastName
          }'s recent birthday on ${dayjs(item?.dob).format("MMM D")}`;
    case "anniversary":
      return `Completed ${item?.yearsCompleted} year at ${item?.company}`;
    case "jobChange":
      return `Started a new position as ${item?.designation} at ${item?.company}`;
    case "educationChange":
      return item?.changeType === "startedEducation"
        ? `Congratulate ${item?.firstName} ${item?.lastName} on starting school at ${item?.institution}`
        : `Congratulate ${item?.firstName} ${item?.lastName} on completing school at ${item?.institution}`;
    default:
      return "";
  }
};

export const getMessage = (item) => {
  let message = "";

  switch (item?.type) {
    case "birthday":
      message = "Wishing you a very happy birthday!";
      break;
    case "anniversary":
      message = `Congrats on your ${item?.yearsCompleted} year anniversary at ${item?.company}`;
      break;
    case "jobChange":
      message = `Congrats on starting your new role at ${item?.company}`;
      break;
    case "educationChange":
      message =
        item?.changeType === "startedEducation"
          ? `Congrats on starting at ${item?.institution}`
          : `Congrats on finishing up at ${item?.institution}`;
      break;
  }
  return message;
};

export const yearOptions = Array.from({ length: 101 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: year.toString(), value: year.toString() };
});

export const checkDate = (startMonth, startYear, endMonth, endYear) => {
  if (!startMonth || !startYear || !endMonth || !endYear) {
    return true;
  }

  const months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const sMonth = months[startMonth];
  const eMonth = months[endMonth];
  const sYear = parseInt(startYear);
  const eYear = parseInt(endYear);

  if (isNaN(sMonth) || isNaN(eMonth) || isNaN(sYear) || isNaN(eYear)) {
    return true;
  }

  if (sYear > eYear || (sYear === eYear && sMonth > eMonth)) {
    return false;
  } else {
    return true;
  }
};

export function formatChatTimestamp(isoDate) {
  const now = dayjs();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = dayjs(isoDate).tz(userTimeZone);

  if (date.isToday()) {
    return `Today ${date.format("h:mma")}`;
  } else if (date.isYesterday()) {
    return `Yesterday ${date.format("h:mma")}`;
  } else if (now.diff(date, "day") < 7) {
    return date.format("dddd h:mma");
  } else {
    return date.format("MMM D, h:mma");
  }
}

export const toBase64 = (file) =>
  new Promise((resolve) => {
    if (!file) return resolve(null);
    if (typeof file === "string") return resolve(file);
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } else resolve(null);
  });

export const handleTabClick = (index, setStep, tabRefs, scrollContainerRef) => {
  setStep(index);
  const tab = tabRefs.current[index];
  const container = scrollContainerRef.current;
  if (tab && container) {
    const tabLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;
    const containerWidth = container.offsetWidth;
    const isMobile = window.innerWidth < 1024;
    const scrollTo = isMobile
      ? tabLeft - containerWidth / 2 + tabWidth / 2.3
      : tabLeft - containerWidth / 1 + 0 / 2;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });
  }
};
