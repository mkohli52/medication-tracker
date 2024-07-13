export default function getTimeOfDay(date) {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return ["MORNING"];
    if (hour >= 12 && hour < 18) return ["MORNING", "AFTERNOON"];
    return ["MORNING", "AFTERNOON", "NIGHT"];
}