import { utcToZonedTime, format } from "date-fns-tz";
export default {
  methods: {
    convertMoney(money) {
      if (money > 0) {
        const toCurrency = (n, curr, LanguageFormat = undefined) =>
          Intl.NumberFormat(LanguageFormat, {
            style: "currency",
            currency: curr,
          }).format(n);
        return toCurrency(money, "BRL");
      } else {
        return "Grátis";
      }
    },
    datetime(date) {
      const timeZone = this.$store.state.timezone;
      const zonedDate = utcToZonedTime(date, timeZone);

      const pattern = "dd/M/yyyy HH:mm:ss";
      const output = format(zonedDate, pattern, {
        timeZone,
      });

      return output;
    },
  },
};
