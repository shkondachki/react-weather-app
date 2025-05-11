export type Unit = "celsius" | "fahrenheit";

export function convertTemperature(tempInCelsius: number, unit: Unit): number {
    return unit === "fahrenheit"
        ? tempInCelsius * 9 / 5 + 32
        : tempInCelsius;
}