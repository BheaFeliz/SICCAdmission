import { Flowbite } from 'flowbite-react'

const customTheme = {
  button: {
    color: {
      primary: 'bg-orange-400 hover:bg-orange-600',
    },
  },
}

const Theme = ({ children }) => {
  return <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
}

export default Theme
