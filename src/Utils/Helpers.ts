const safeParseJson = <T>(str: string | null): T | false => {
    try {
        const jsonValue: T = JSON.parse(str ?? "");
        return jsonValue;
    }catch {
        return false;
    }
}

export {safeParseJson}