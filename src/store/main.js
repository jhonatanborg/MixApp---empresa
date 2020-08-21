const userSession = function() {
  const session = this.$store.state.user.session;
  if (session && session.token) {
    localStorage.setItem("token", session.token);
    this.$store.commit("error", "", { root: true });
    this.$store.commit("message", "Redirecionando para a página inicial", {
      root: true,
    });
    setTimeout(() => {
      this.$store.commit("message", "", { root: true });
      this.$router.push("/home");
    }, 2000);
  }
};

const error = function() {
  setTimeout(() => {
    this.$store.commit("error", "", { root: true });
  }, 3000);
};

export { userSession, error };
