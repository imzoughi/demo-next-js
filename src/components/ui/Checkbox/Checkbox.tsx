import { Choice, type ChoiceProps } from '../Choice/Choice';

export type CheckboxProps = ChoiceProps;

/** Case à cocher : toute la ligne (case + libellé) est cliquable, hauteur >= 44 px. */
export function Checkbox(props: CheckboxProps) {
  return <Choice kind="checkbox" {...props} />;
}
