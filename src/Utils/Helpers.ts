import dayjs from "dayjs";

const safeParseJson = <T>(str: string | null): T | false => {
    try {
        const jsonValue: T = JSON.parse(str ?? "");
        return jsonValue;
    }catch {
        return false;
    }
}

const formatDateTime = (dateTime: string) => {
    
    return dayjs(dateTime).format("DD-MMM-YYYY hh:mm:ss A")
}

const formatDate = (dateTime: string) => {
    return dayjs(dateTime).format("DD-MMM-YYYY")
}

const formatDateISO = (dateTime: string) => {
    return dayjs(dateTime).toISOString()
}

const humanReadableDate = (dateTime: string) => {
    return dayjs(dateTime).format("DD MMM YYYY, hh:mm A")
}

export {safeParseJson, formatDateTime, formatDate, formatDateISO, humanReadableDate}