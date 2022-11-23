import { ExpressionPart, IMExpressionMap } from 'jimu-core'

/**
 * Get expression parts from expressions
 * @param expressions
 */
export const getExpressionParts = (expressions: IMExpressionMap): ExpressionPart[] => {
  let parts = []
  for (const uniqueid in expressions) {
    const expression = expressions[uniqueid]
    const iparts = expression?.parts
    if (iparts != null) {
      parts = parts.concat(iparts)
    }
  }
  return parts
}
