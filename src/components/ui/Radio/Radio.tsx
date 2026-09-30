import { Choice, type ChoiceProps } from '../Choice/Choice';

export type RadioProps = ChoiceProps;

/** Choix unique (mode de livraison, moyen de paiement) : à grouper dans un fieldset avec legend. */
export function Radio(props: RadioProps) {
  return <Choice kind="radio" {...props} />;
}
