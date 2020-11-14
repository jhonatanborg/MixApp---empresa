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
      }
    },
    convertDate(date) {
      return date
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
    },
    compareDate(expires) {
      if (expires) {
        var date = new Date(
          expires
            .split("/")
            .reverse()
            .join("/")
        );
        return new Date() <= date ? true : false;
      }
      return true;
    },
  },
};
