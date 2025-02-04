export const isUndefined = (obj: unknown): obj is undefined =>
  typeof obj === 'undefined'

export const isNil = (val: unknown): val is null | undefined =>
  isUndefined(val) || val === null

export const isObject = (fn: unknown): fn is object =>
  !isNil(fn) && typeof fn === 'object'

export const isPlainObject = (fn: unknown): fn is object => {
  if (!isObject(fn)) {
    return false
  }
  const proto = Object.getPrototypeOf(fn)
  if (proto === null) {
    return true
  }
  const ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor
  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) ===
      Function.prototype.toString.call(Object)
  )
}

export const isFunction = (val: unknown): boolean => typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isConstructor = (val: unknown): boolean => val === 'constructor'

export const isEmpty = (array: unknown[]): boolean =>
  !(array && array.length > 0)
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
