// for popper toggle
export function stopPropagation (evt: React.MouseEvent<HTMLDivElement>) {
  evt.stopPropagation()
  evt.nativeEvent?.stopImmediatePropagation()
}

export function replaceAttr (srcStr: string, tag: string, attr: string, val: string | number) {
  if (typeof srcStr === 'undefined' || typeof tag === 'undefined' || typeof attr === 'undefined' || typeof val === 'undefined') {
    return ''
  }

  const reg = new RegExp('<' + tag + '[^>]*(' + attr + '=[\'\"](\\w*%?)[\'\"])?[^>]*>', 'gi')
  return srcStr.replace(reg, function (match) {
    if (match.indexOf(attr) > 0) {
      //replace attr
      const subReg = new RegExp(attr + '=[\'\"](\\w*%?)[\'\"]', 'gi')
      return match.replace(subReg, attr + '="' + val + '"')
    } else {
      //add attr
      return match.substr(0, tag.length + 1) + ' ' + attr + '="' + val + '" ' + match.substr(tag.length + 2, match.length)
    }
  })
}
