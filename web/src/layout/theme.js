import { ThemeProvider } from 'flowbite-react'

const customTheme = {
  button: {
    color: {
      primary: 'bg-orange-400 hover:bg-orange-600',
    },
  },
}

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={{ theme: customTheme }}>
      {children}
    </ThemeProvider>
  )
}

export default Theme
