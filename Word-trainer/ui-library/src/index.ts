export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = {
  label: string
  variant?: ButtonVariant
}

export const buildButtonLabel = (props: ButtonProps): string => {
  const variant = props.variant ?? 'primary'
  return `${variant.toUpperCase()}: ${props.label}`
}
