/* Avion — boutique-demo · EmailSignup (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import TextInput from '../TextInput/TextInput.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— EmailSignup : inscription à la lettre d'information ——— */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function EmailSignup(props) {
  var tone = props.tone === 'dark' ? 'dark' : 'light';
  var v = React.useState(''),
    val = v[0],
    setVal = v[1];
  var s = React.useState('idle'),
    state = s[0],
    setState = s[1];
  function submit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(val.trim())) {
      setState('error');
      return;
    }
    if (!props.onSubscribe) {
      setState('success');
      return;
    }
    setState('loading');
    Promise.resolve(props.onSubscribe(val.trim())).then(
      function () {
        setState('success');
      },
      function () {
        setState('failed');
      },
    );
  }
  var H = 'h' + (props.headingLevel || 2);
  var msg =
    state === 'error'
      ? props.errorText || 'Adresse e-mail invalide'
      : state === 'failed'
        ? 'L’inscription n’a pas abouti. Réessayez.'
        : undefined;
  return (
    <section
      className={cx(
        'av-signup',
        'av-signup--' + tone,
        tone === 'dark' && 'av-on-inverse',
        props.compact && 'av-signup--compact',
        props.className,
      )}
    >
      <div className="av-signup__inner">
        <H className={cx('av-signup__title', props.compact ? 'h5' : 'h3')}>
          {props.title || 'Rejoignez notre lettre d’information'}
        </H>
        {!props.compact && (
          <p className="av-signup__text body-medium">
            {props.text || 'Offres exclusives, nouvelles collections, ventes privées et plus encore.'}
          </p>
        )}
        {props.benefits && (
          <ul className="av-signup__benefits">
            {props.benefits.map(function (b) {
              return (
                <li key={b} className="body-medium">
                  <Icon name="circle-check" size="md" />
                  {b}
                </li>
              );
            })}
          </ul>
        )}
        <form className="av-signup__form" noValidate={true} onSubmit={submit}>
          <TextInput
            variant={tone === 'dark' ? 'opaque' : 'primary'}
            label="Adresse e-mail"
            hideLabel={true}
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
            value={val}
            disabled={state === 'success'}
            onChange={function (e) {
              setVal(e.target.value);
              if (state === 'error' || state === 'failed') setState('idle');
            }}
            error={msg}
            success={state === 'success' ? props.successText || 'Merci, vous êtes inscrit' : undefined}
          />
          <Button
            type={tone === 'dark' ? 'white' : 'primary'}
            htmlType="submit"
            loading={state === 'loading'}
            loadingLabel="Inscription"
            disabled={state === 'success'}
            className="av-signup__btn"
          >
            S’inscrire
          </Button>
        </form>
      </div>
    </section>
  );
}

export default EmailSignup;
