import { createI18n } from "vue-i18n";
import zh from "../src/locale/zh-Hant.json"; // Path to your translation messages
import en from "../src/locale/en.json"; // Path to your translation messages
const messages = {
	zh,
	en,
};
const instance = createI18n({
	locale: "zh", // Default locale
	fallbackLocale: "zh", // Fallback to default if translation not found
	messages,
});

export default instance;

export const i18n = instance.global;
