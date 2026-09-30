/* Avion — boutique-demo · Skeleton (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Skeleton : squelette de chargement au ratio de l'élément remplacé ——— */
function Skeleton(props) {
  var shape = ['card', 'line', 'image'].indexOf(props.shape) >= 0 ? props.shape : 'line';
  var ratio = props.ratio || '4 / 5';
  var lines = props.lines || 1;
  var body;
  if (shape === 'image')
    body = (
      <span
        className="av-skel av-skel--image"
        style={{
          aspectRatio: ratio,
        }}
      />
    );
  else if (shape === 'card')
    body = (
      <span className="av-skel-card">
        <span
          className="av-skel av-skel--image"
          style={{
            aspectRatio: ratio,
          }}
        />
        <span className="av-skel av-skel--line av-skel--title" />
        <span className="av-skel av-skel--line av-skel--short" />
      </span>
    );
  else
    body = (
      <span className="av-skel-lines">
        {Array.from({
          length: lines,
        }).map(function (_, i) {
          return (
            <span
              key={i}
              className={cx('av-skel', 'av-skel--line', i === lines - 1 && lines > 1 && 'av-skel--short')}
              style={
                props.width && lines === 1
                  ? {
                      width: props.width,
                    }
                  : null
              }
            />
          );
        })}
      </span>
    );
  return (
    <span className={cx('av-skel-wrap', 'av-skel-wrap--' + shape, props.className)} aria-hidden="true">
      {body}
    </span>
  );
}

export default Skeleton;
