export const TextAlignment = {
  verticalAlignment: ['baseline', 'top', 'middle', 'bottom'],
  horizontalAlignment: ['left', 'right', 'center', 'justify']
}

export const getCorrespondingAlignment = (alignment: string): string => {
  let index = TextAlignment.horizontalAlignment.indexOf(alignment)
  if (index > -1) {
    return TextAlignment.verticalAlignment[index]
  } else {
    index = TextAlignment.verticalAlignment.indexOf(alignment)
    if (index > -1) {
      return TextAlignment.horizontalAlignment[index]
    }
  }
}
