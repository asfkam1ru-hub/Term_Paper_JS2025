declare module 'ui-library' {
  export type ButtonVariant = 'primary' | 'secondary'

  export type ButtonProps = {
    label: string
    variant?: ButtonVariant
  }

  export const buildButtonLabel: (props: ButtonProps) => string
}
