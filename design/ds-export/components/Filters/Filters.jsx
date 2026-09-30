/* Avion — boutique-demo · Filters (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import FilterChip from '../FilterChip/FilterChip.jsx';
import FiltersSheet from '../FiltersSheet/FiltersSheet.jsx';
import TextLink from '../TextLink/TextLink.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Filters : barre de filtres, compteur, puces actives, « Tout effacer », panneau FiltersSheet ——— */
function Filters(props) {
  var groups = props.groups || [],
    sel = props.selected || {};
  var st = React.useState(null),
    open = st[0],
    setOpen = st[1];
  var active = [];
  groups.forEach(function (g) {
    (sel[g.id] || []).forEach(function (v) {
      var o = g.options.filter(function (x) {
        return x.value === v;
      })[0];
      active.push({
        g: g.id,
        v: v,
        label: o ? o.label : v,
      });
    });
  });
  var n = props.resultCount;
  var sortLabel = (
    (props.sortOptions || []).filter(function (o) {
      return o.value === props.sort;
    })[0] || {}
  ).label;
  function removeOne(a) {
    var next = Object.assign({}, sel);
    next[a.g] = (sel[a.g] || []).filter(function (x) {
      return x !== a.v;
    });
    if (props.onChange) props.onChange(next);
    if (props.onAnnounce) props.onAnnounce('Filtre « ' + a.label + ' » retiré');
  }
  var live = React.useState(''),
    msg = live[0],
    setMsg = live[1];
  return (
    <section className={cx('av-sec', 'av-filters', props.className)} aria-label="Filtres">
      <div className="av-sec__inner">
        <div className="av-filters__bar">
          <div className="av-filters__groups">
            {groups.map(function (g) {
              var k = (sel[g.id] || []).length;
              return (
                <Button
                  key={g.id}
                  type="ghost"
                  size="sm"
                  iconRight="chevron-down"
                  aria-haspopup="dialog"
                  onClick={function () {
                    setOpen(g.id);
                  }}
                >
                  {g.legend + (k ? ' (' + k + ')' : '')}
                </Button>
              );
            })}
          </div>
          <div className="av-filters__mobile">
            <Button
              type="secondary"
              size="sm"
              iconRight="sliders-horizontal"
              aria-haspopup="dialog"
              onClick={function () {
                setOpen('filters');
              }}
            >
              {'Filtres' + (active.length ? ' (' + active.length + ')' : '')}
            </Button>
            <Button
              type="secondary"
              size="sm"
              iconRight="chevron-down"
              aria-haspopup="dialog"
              onClick={function () {
                setOpen('sort');
              }}
            >
              Tri
            </Button>
          </div>
          {props.sortOptions && (
            <div className="av-filters__sort">
              <Button
                type="ghost"
                size="sm"
                iconRight="chevron-down"
                aria-haspopup="dialog"
                onClick={function () {
                  setOpen('sort');
                }}
              >
                {'Trier par : ' +
                  (sortLabel ? sortLabel.charAt(0).toLocaleLowerCase('fr') + sortLabel.slice(1) : '')}
              </Button>
            </div>
          )}
        </div>
        <div className="av-filters__active">
          <p className="av-filters__count body-medium" role="status">
            {n + ' produit' + (n > 1 ? 's' : '')}
          </p>
          {active.map(function (a) {
            return (
              <FilterChip
                key={a.g + ':' + a.v}
                label={a.label}
                onRemove={function () {
                  setMsg('Filtre « ' + a.label + ' » retiré');
                  removeOne(a);
                }}
              />
            );
          })}
          {active.length > 0 && (
            <TextLink
              tone="brand"
              onClick={function () {
                setMsg('Tous les filtres ont été effacés');
                if (props.onClear) props.onClear();
              }}
            >
              Tout effacer
            </TextLink>
          )}
          <span className="av-visually-hidden" aria-live="polite">
            {msg}
          </span>
        </div>
      </div>
      <FiltersSheet
        open={!!open}
        section={open}
        onClose={function () {
          setOpen(null);
        }}
        groups={groups}
        selected={sel}
        onChange={props.onChange}
        resultCount={n}
        sortOptions={props.sortOptions}
        sort={props.sort}
        onSortChange={props.onSortChange}
        onClear={props.onClear}
      />
    </section>
  );
}

export default Filters;
