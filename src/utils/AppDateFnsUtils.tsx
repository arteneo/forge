import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

class AppDateFnsUtils extends DateFnsUtils {
    dateFormat = "dd-MM-yyyy";
    dateTime24hFormat = "dd-MM-yyyy HH:mm";
    dateTimeSeconds24hFormat = "dd-MM-yyyy HH:mm:ss";
    time24hFormat = "HH:mm";

    // eslint-disable-next-line
    formatDate = (date: any) => {
        if (!date) {
            return;
        }

        return format(new Date(date), this.dateFormat, { locale: this.locale });
    };

    // eslint-disable-next-line
    formatDateTime = (date: any) => {
        if (!date) {
            return;
        }

        return format(new Date(date), this.dateTime24hFormat, { locale: this.locale });
    };

    // eslint-disable-next-line
    formatDateTimeSeconds = (date: any) => {
        if (!date) {
            return;
        }

        return format(new Date(date), this.dateTimeSeconds24hFormat, { locale: this.locale });
    };

    // eslint-disable-next-line
    formatTime = (date: any) => {
        if (!date) {
            return;
        }

        return format(new Date(date), this.time24hFormat, { locale: this.locale });
    };
}

export default AppDateFnsUtils;
