/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        "teal-purple-text": "tealPurple 2s ease-in-out infinite",
      },
      keyframes: {
        tealPurple: {
          '0%': { 
            "background": "linear-gradient(45deg, #2dd4bf, #3bbdf6, #3b82f6)" ,
            "-webkit-background-clip": "text",
            "background-clip": "text",
            "color": "transparent"
          },
          '33%': { 
            "background": "linear-gradient(45deg, #2dd4bf, #3bbdf6, #3b82f6)",
            "-webkit-background-clip": "text",
            "background-clip": "text",
            "color": "transparent"
          },
          '66%': { 
            "background": "linear-gradient(45deg, #3b82f6, #2dd4bf, #3bbdf6)",
            "-webkit-background-clip": "text",
            "background-clip": "text",
            "color": "transparent"
           },
          '100%': { 
            "background": "linear-gradient(45deg, #3bbdf6, #3b82f6, #2dd4bf)",
            "-webkit-background-clip": "text",
            "background-clip": "text",
            "color": "transparent"
           },
        }
      },
      backgroundImage: {
        "linear-gradient-45-teal-blue-transparent": "linear-gradient(45deg, #2dd4bfab, #3bbdf6, #3b82f6ab)",
        "linear-gradient-45-teal-blue": "linear-gradient(45deg, #2dd4bf, #3bbdf6, #3b82f6)",
        "linear-gradient-45-blue-teal": "linear-gradient(45deg, #3b82f6, #3bbdf6, #2dd4bf )",
        "linear-gradient-225-teal-blue": "linear-gradient(225deg, #2dd4bf, #3bbdf6, #3b82f6)",
        "linear-gradient-225-blue-teal": "linear-gradient(225deg, #3b82f6, #3bbdf6,  #2dd4bf)",
      }
    },
  },
  plugins: [],
}

