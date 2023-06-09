// color design tokens export
export const tokensDark = {
  grey: {
    0: "#FEFCFE",
    50: "#F7F8F9",
    100: "#e9e9e9",
    200: "#cfcfd0",
    300: "#9f9fa1",
    400: "#6f7071",
    500: "#3f4042",
    600: "#272829",
    700: "#1f1e1e",
    800: "#1f2020",
    900: "#12161B",
    1000: "#0F1013",
  },
  primary: {
    100: "#d5e6e8",
    200: "#abced1",
    300: "#81b5ba",
    400: "#579da3",
    500: "#2d848c",
    600: "#246a70",
    700: "#1b4f54",
    800: "#123538",
    900: "#091a1c",
  },
  secondary: {
    50: "#f2eefd",
    100: "#e3dafc",
    200: "#c6b5f8",
    300: "#aa91f5",
    400: "#8d6cf1",
    500: "#7147ee",
    600: "#5a39be",
    700: "#442b8f",
    800: "#2d1c5f",
    900: "#170e30",
  },
  blue: {
    100: "#D0E2FF",
    200: "#A3C5FF",
    300: "#76A8FF",
    400: "#498BFF",
    500: "#1C6EFF",
    600: "#1959CC",
    700: "#143C99",
    800: "#0F2666",
    900: "#091933",
  },
  cyan: {
    100: "#A4E9E0",
    200: "#7EDDD1",
    300: "#58D1C2",
    400: "#32C5B3",
    500: "#19BAAB",
    600: "#179D91",
    700: "#148076",
    800: "#0F635C",
    900: "#0B4852",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              dark: tokensDark.primary[600],
              main: tokensDark.primary[400],
              light: tokensDark.primary[200],
            },
            secondary: {
              ...tokensDark.secondary,
              dark: tokensDark.secondary[700],
              main: tokensDark.secondary[400],
              light: tokensDark.secondary[100],
            },
            grey: {
              ...tokensDark.grey,
              dark: tokensDark.grey[100],
              light: tokensDark.grey[400],
              bg: tokensDark.grey[800],
              text: tokensDark.grey[0],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[1000],
              alt: tokensDark.grey[900],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              dark: tokensDark.primary[300],
              main: tokensDark.primary[500],
              light: tokensDark.primary[600],
            },
            secondary: {
              ...tokensLight.secondary,
              dark: tokensDark.secondary[200],
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            grey: {
              ...tokensDark.grey,
              dark: tokensDark.grey[800],
              light: tokensDark.grey[600],
              bg: tokensDark.grey[200],
              text: tokensDark.grey[1000],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[50],
              alt: tokensDark.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
