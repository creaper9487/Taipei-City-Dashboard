import { createI18n } from "vue-i18n";
import zh from "../src/locale/zh-Hant.json"; // Path to your translation messages
import en from "../src/locale/English.json"; // Path to your translation messages
import Khmer from "../src/locale/Khmer.json"; // Path to your translation messages
import Burmese from "../src/locale/Burmese.json"; // Path to your translation messages
import indonesian from "../src/locale/Indonesian.json"; // Path to your translation messages
import vietnamese from "../src/locale/Vietnamese.json"; // Path to your translation messages
import thai from "../src/locale/Thai.json"; // Path to your translation messages
import japanese from "../src/locale/Japanese.json"; // Path to your translation messages
import malayalam from "../src/locale/Malayalam.json"; // Path to your translation messages

const messages = {
	zh,
	en,
	Khmer,
	Burmese,
	indonesian,
	vietnamese,
	thai,
	japanese,
	malayalam,
};
const instance = createI18n({
	locale: "zh", // Default locale
	fallbackLocale: "zh", // Fallback to default if translation not found
	messages,
});

export default instance;

export const i18n = instance.global;
