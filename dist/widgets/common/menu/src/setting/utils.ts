import { React, ThemeNavType, Immutable } from 'jimu-core'
import { getNavigationVariables } from 'jimu-theme'
import { NavigationVariant } from 'jimu-ui'
import { MenuNavigationType } from '../runtime/menu-navigation'
const { useMemo } = React

export const getMenuNavigationVariant = (
  type: MenuNavigationType,
  navStyle: ThemeNavType
): NavigationVariant => {
  const variants = getNavigationVariables()
  let variant = variants?.[type]?.[navStyle]

  const activeColor = navStyle === 'pills' ? 'var(--white)' : 'var(--primary)'

  const mixin = {
    item: {
      default: {
        icon: {
          size: '14px'
        },
        size: '14px'
      },
      active: {
        icon: {
          color: activeColor,
          size: '14px'
        },
        size: '14px'
      },
      hover: {
        icon: {
          color: 'var(--primary)',
          size: '14px'
        },
        size: '14px'
      }
    }
  } as Partial<NavigationVariant>
  variant = Immutable(variant).merge(mixin, { deep: true })
  return variant
}

// Get theme navigation variants from theme
export const useMenuNavigationVariant = (
  type: MenuNavigationType,
  menuStyle: ThemeNavType,
  advanced: boolean,
  advanceVariant: NavigationVariant
): NavigationVariant => {
  return useMemo(() => {
    if (advanced) return advanceVariant
    return getMenuNavigationVariant(type, menuStyle)
  }, [advanced, advanceVariant, type, menuStyle])
}
