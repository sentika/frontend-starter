import { DateUtils } from './utils/date/date';
import { iterateEls } from './utils/iterator/iterator';

export function app(): void {
    const btnEls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn');

    iterateEls<HTMLButtonElement>(btnEls, (btnEl: HTMLButtonElement) => {
        btnEl.addEventListener('click', () => {
            const original: Date = DateUtils.now();

            const dateISO: string = DateUtils.toISO(original);
            const date: Date = DateUtils.fromISO(dateISO);

            console.info(`Time is: ${date}. Remember that better date format is ISO8601: ${dateISO}`);
        });
    });
}
