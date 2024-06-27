export const capitalizeFirstLetter = (string) => {
  if (string == null || typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const capitalizeAllLetters = (string) => {
  if (string == null || typeof string !== 'string') {
    return '';
  }
  return string.toUpperCase();
};


export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
