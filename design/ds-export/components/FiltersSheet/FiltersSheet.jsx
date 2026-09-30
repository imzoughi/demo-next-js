/* Avion — boutique-demo · FiltersSheet (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import Drawer from '../Drawer/Drawer.jsx';
import Icon from '../Icon/Icon.jsx';
import Radio from '../Radio/Radio.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— FiltersSheet : filtres et tri en panneau (bas en mobile, droite dès 768 px) ——— */
function FiltersSheet(props) {
  var sortRef = React.useRef(null);
  var sortName = 'av-sort' + React.useId().replace(/:/g, '');
  var groups = props.groups || [],
    sel = props.selected || {};
  var n = props.resultCount;
  var nActive = Object.keys(sel).reduce(function (k, g) {
    return k + (sel[g] || []).length;
  }, 0);
  function toggle(g, v, on) {
    var cur = (sel[g] || []).slice();
    if (on) cur.push(v);
    else
      cur = cur.filter(function (x) {
        return x !== v;
      });
    var next = Object.assign({}, sel);
    next[g] = cur;
    if (props.onChange) props.onChange(next);
  }
  var footer = (
    <div className="av-sheet__actions">
      <Button type="ghost" disabled={!nActive} onClick={props.onClear}>
        Tout effacer
      </Button>
      <Button disabled={n === 0} onClick={props.onApply || props.onClose} fullWidth={true} aria-live="polite">
        {n === 0 ? 'Aucun résultat' : 'Voir les ' + n + ' résultat' + (n > 1 ? 's' : '')}
      </Button>
    </div>
  );
  return (
    <Drawer
      open={props.open}
      static={props.static}
      onClose={props.onClose}
      onClosed={props.onClosed}
      side="bottom"
      title="Filtres et tri"
      footer={footer}
      className={cx('av-sheet', props.className)}
      initialFocus={props.section && props.section !== 'filters' ? sortRef : undefined}
    >
      {n === 0 && (
        <p className="av-sheet__none body-medium" role="status">
          <Icon name="circle-alert" size="sm" />
          Aucun produit ne correspond à ces filtres. Retirez-en un.
        </p>
      )}
      <fieldset
        className="av-sheet__group"
        ref={props.section === 'sort' ? sortRef : undefined}
        tabIndex={-1}
      >
        <legend className="h5">Trier par</legend>
        {(props.sortOptions || []).map(function (o) {
          return (
            <Radio
              key={o.value}
              name={sortName}
              value={o.value}
              label={o.label}
              checked={props.sort === o.value}
              onChange={function () {
                if (props.onSortChange) props.onSortChange(o.value);
              }}
            />
          );
        })}
      </fieldset>
      {groups.map(function (g) {
        return (
          <fieldset
            key={g.id}
            className="av-sheet__group"
            ref={props.section === g.id ? sortRef : undefined}
            tabIndex={-1}
          >
            <legend className="h5">{g.legend}</legend>
            {g.options.map(function (o) {
              var on = (sel[g.id] || []).indexOf(o.value) >= 0;
              return (
                <Checkbox
                  key={o.value}
                  label={o.label}
                  count={o.count}
                  checked={on}
                  disabled={!on && o.count === 0}
                  onChange={function (e) {
                    toggle(g.id, o.value, e.target.checked);
                  }}
                />
              );
            })}
          </fieldset>
        );
      })}
    </Drawer>
  );
}

export default FiltersSheet;
