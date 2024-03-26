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

export {safeParseJson, formatDateTime}