export const theme = {
  colors: {
    background: "#F0EBD8",
    card: "#659ee9",
    option: "#9ddeee",
    form: "#3E5C76",
    darkinput: "#1D2D44",
    lightinput: "#d2d7df",
    button: "#c9def4",
    component: "#3E5C76",
    primary: "#e07b39", // color for highlights, buttons, active states (testing so might change)
    text: "#1a1a1a", // default text color
    textMuted: "#7a7a7a", // text like placeholders or subtitles color
    border: "#e0e0e0",
    logo: "#deecbd",
  },

  borderRadius: {
    sm: 8, // rounding
    md: 15, // card rounding
    lg: 24, // large container rounding
    full: 999, // full rounding, for buttons?
  },

  shadow: {
    card: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4, //in android
    },
  },

  spacing: {
    xs: 4, // tight spacing
    sm: 8, // some padding in components
    md: 16, // standard padding
    lg: 24, // larger padding for larger containers
    xl: 32, // top bottom padding
  },

  container: {
    page: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column",
      padding: 10,
    },

    scrollview: {
      flex: 1,
      flexDirection: "column",
      padding: 10,
    },

    form: {
      margin: 10,
      padding: 10,
      gap: 15,
    },

    component: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      gap: 10,
    },

    subcomponent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 1,
      paddingHorizontal: 20,
      margin: 2,
    },
    card: {
      overflow: "hidden",
      padding: 20,
      margin: 20,
      gap: 18,
      flex: 1,
    },
  },

  arrow: {
    fontSize: 35,
    color: "black",
    alignSelf: "flex-start",
    margin: 10,
    padding: 10,
  },

  image: {
    width: "100%",
    height: 140,
  },
} as const;
