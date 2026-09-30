/* Avion — boutique-demo · AuthForm (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import Icon from '../Icon/Icon.jsx';
import TextInput from '../TextInput/TextInput.jsx';
import TextLink from '../TextLink/TextLink.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— EmailSignup : inscription à la lettre d'information ——— */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* ——— AuthForm : connexion et création de compte ——— */
function AuthForm(props) {
  var m = React.useState(props.mode === 'register' ? 'register' : 'login'),
    mode = m[0],
    setMode = m[1];
  var v = React.useState({}),
    vals = v[0],
    setVals = v[1];
  var e = React.useState({}),
    errs = e[0],
    setErrs = e[1];
  var g = React.useState(null),
    global = g[0],
    setGlobal = g[1];
  var l = React.useState(false),
    loading = l[0],
    setLoading = l[1];
  var formRef = React.useRef(null);
  var FIELDS =
    mode === 'login'
      ? [
          ['email', 'Adresse e-mail', 'email', 'email'],
          ['password', 'Mot de passe', 'password', 'current-password'],
        ]
      : [
          ['firstName', 'Prénom', 'text', 'given-name'],
          ['lastName', 'Nom', 'text', 'family-name'],
          ['email', 'Adresse e-mail', 'email', 'email'],
          ['password', 'Mot de passe', 'password', 'new-password'],
        ];
  function set(k, x) {
    var n = Object.assign({}, vals);
    n[k] = x;
    setVals(n);
    if (errs[k]) {
      var ne = Object.assign({}, errs);
      delete ne[k];
      setErrs(ne);
    }
  }
  function validate() {
    var r = {};
    FIELDS.forEach(function (f) {
      if (!(vals[f[0]] || '').trim()) r[f[0]] = 'Ce champ est obligatoire';
    });
    if (!r.email && vals.email && !EMAIL_RE.test(vals.email.trim())) r.email = 'Adresse e-mail invalide';
    if (mode === 'register' && !r.password && (vals.password || '').length < 8)
      r.password = 'Au moins 8 caractères';
    return r;
  }
  function submit(ev) {
    ev.preventDefault();
    setGlobal(null);
    var r = validate();
    setErrs(r);
    var keys = FIELDS.map(function (f) {
      return f[0];
    }).filter(function (k) {
      return r[k];
    });
    if (keys.length) {
      setTimeout(function () {
        var el = formRef.current && formRef.current.querySelector('[name="' + keys[0] + '"]');
        if (el) el.focus();
      }, 0);
      return;
    }
    if (!props.onSubmit) return;
    setLoading(true);
    Promise.resolve(props.onSubmit(mode, vals)).then(
      function () {
        setLoading(false);
      },
      function (err) {
        setLoading(false);
        setGlobal(
          (err && err.message) ||
            (mode === 'login'
              ? 'Adresse e-mail ou mot de passe incorrect.'
              : 'La création du compte n’a pas abouti. Réessayez.'),
        );
      },
    );
  }
  var nErr = Object.keys(errs).length;
  function tab(k, label) {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={mode === k ? 'true' : 'false'}
        className={cx('av-auth__tab body-medium', mode === k && 'is-active')}
        onClick={function () {
          setMode(k);
          setErrs({});
          setGlobal(null);
        }}
      >
        {label}
      </button>
    );
  }
  return (
    <section className={cx('av-auth', props.className)} aria-label="Mon compte">
      <div className="av-auth__tabs" role="tablist" aria-label="Connexion ou création de compte">
        {tab('login', 'Connexion')}
        {tab('register', 'Créer un compte')}
      </div>
      <form ref={formRef} className="av-auth__form" noValidate={true} onSubmit={submit} role="tabpanel">
        <h2 className="h3">{mode === 'login' ? 'Connectez-vous' : 'Créez votre compte'}</h2>
        {(global || nErr > 1) && (
          <div className="av-auth__alert body-medium" role="alert">
            <Icon name="circle-alert" size="md" />
            <span>{global || nErr + ' champs sont à corriger.'}</span>
          </div>
        )}
        <div className="av-auth__fields">
          {FIELDS.map(function (f) {
            return (
              <TextInput
                key={mode + f[0]}
                name={f[0]}
                label={f[1]}
                type={f[2]}
                autoComplete={f[3]}
                value={vals[f[0]] || ''}
                onChange={function (x) {
                  set(f[0], x.target.value);
                }}
                error={errs[f[0]]}
                hint={mode === 'register' && f[0] === 'password' ? '8 caractères minimum.' : undefined}
                className={
                  mode === 'register' && (f[0] === 'firstName' || f[0] === 'lastName')
                    ? 'av-auth__half'
                    : undefined
                }
              />
            );
          })}
        </div>
        {mode === 'login' ? (
          <div className="av-auth__row">
            <Checkbox
              label="Se souvenir de moi"
              checked={!!vals.remember}
              onChange={function (x) {
                set('remember', x.target.checked);
              }}
            />
            <TextLink tone="brand" href={props.forgotHref || '#'} onClick={props.onForgot}>
              Mot de passe oublié
            </TextLink>
          </div>
        ) : (
          <Checkbox
            label="Recevoir la lettre d’information"
            hint="Facultatif. Désinscription en un clic."
            checked={!!vals.newsletter}
            onChange={function (x) {
              set('newsletter', x.target.checked);
            }}
          />
        )}
        <Button
          htmlType="submit"
          loading={loading}
          loadingLabel={mode === 'login' ? 'Connexion' : 'Création du compte'}
          fullWidth={true}
        >
          {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
        </Button>
      </form>
    </section>
  );
}

export default AuthForm;
