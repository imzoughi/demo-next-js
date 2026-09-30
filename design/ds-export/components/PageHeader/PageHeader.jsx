/* Avion — boutique-demo · PageHeader (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— PageHeader : H1 de la page, sur image (voile color-scrim) ou sans image ——— */
function PageHeader(props) {
  return (
    <header className={cx('av-sec', 'av-pagehead', props.image && 'av-pagehead--image', props.className)}>
      {props.image && <img className="av-pagehead__img" src={props.image} alt="" />}
      <div className="av-sec__inner av-pagehead__inner">
        <h1 className="av-pagehead__title h1">{props.title}</h1>
        {props.text && <p className="av-pagehead__text body-large">{props.text}</p>}
      </div>
    </header>
  );
}

export default PageHeader;
