export const getColorClass = (colorName) => {
    const colorMap = {
        blue: "text-blue",
        red: "text-red",
        green: "text-green",
        yellow: "text-yellow",
        purple: "text-purple",
        black: "text-black",
        orange: "text-orange",
    };

    return colorMap[colorName] || "text-darkBlue";
};
