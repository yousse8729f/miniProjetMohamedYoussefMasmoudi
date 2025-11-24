var M0 = Object.defineProperty,
  x0 = Object.defineProperties;
var O0 = Object.getOwnPropertyDescriptors;
var Th = Object.getOwnPropertySymbols;
var P0 = Object.prototype.hasOwnProperty,
  E0 = Object.prototype.propertyIsEnumerable;
var Ah = (e, n, t) =>
    n in e ? M0(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (e[n] = t),
  w = (e, n) => {
    for (var t in (n ||= {})) P0.call(n, t) && Ah(e, t, n[t]);
    if (Th) for (var t of Th(n)) E0.call(n, t) && Ah(e, t, n[t]);
    return e;
  },
  k = (e, n) => x0(e, O0(n));
var au;
function $s() {
  return au;
}
function Bt(e) {
  let n = au;
  return (au = e), n;
}
var Nh = Symbol('NotFound');
function $r(e) {
  return e === Nh || e?.name === '\u0275NotFound';
}
var je = null,
  Gs = !1,
  cu = 1,
  D0 = null,
  Ve = Symbol('SIGNAL');
function A(e) {
  let n = je;
  return (je = e), n;
}
function Ys() {
  return je;
}
var Gr = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producers: void 0,
  producersTail: void 0,
  consumers: void 0,
  consumersTail: void 0,
  recomputing: !1,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  kind: 'unknown',
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Wr(e) {
  if (Gs) throw new Error('');
  if (je === null) return;
  je.consumerOnSignalRead(e);
  let n = je.producersTail;
  if (n !== void 0 && n.producer === e) return;
  let t,
    r = je.recomputing;
  if (r && ((t = n !== void 0 ? n.nextProducer : je.producers), t !== void 0 && t.producer === e)) {
    (je.producersTail = t), (t.lastReadVersion = e.version);
    return;
  }
  let o = e.consumersTail;
  if (o !== void 0 && o.consumer === je && (!r || S0(o, je))) return;
  let i = Zr(je),
    s = {
      producer: e,
      consumer: je,
      nextProducer: t,
      prevConsumer: o,
      lastReadVersion: e.version,
      nextConsumer: void 0,
    };
  (je.producersTail = s), n !== void 0 ? (n.nextProducer = s) : (je.producers = s), i && Lh(e, s);
}
function kh() {
  cu++;
}
function Ks(e) {
  if (!(Zr(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === cu)) {
    if (!e.producerMustRecompute(e) && !oi(e)) {
      Zs(e);
      return;
    }
    e.producerRecomputeValue(e), Zs(e);
  }
}
function lu(e) {
  if (e.consumers === void 0) return;
  let n = Gs;
  Gs = !0;
  try {
    for (let t = e.consumers; t !== void 0; t = t.nextConsumer) {
      let r = t.consumer;
      r.dirty || I0(r);
    }
  } finally {
    Gs = n;
  }
}
function uu() {
  return je?.consumerAllowSignalWrites !== !1;
}
function I0(e) {
  (e.dirty = !0), lu(e), e.consumerMarkedDirty?.(e);
}
function Zs(e) {
  (e.dirty = !1), (e.lastCleanEpoch = cu);
}
function qr(e) {
  return e && Rh(e), A(e);
}
function Rh(e) {
  (e.producersTail = void 0), (e.recomputing = !0);
}
function ri(e, n) {
  A(n), e && Fh(e);
}
function Fh(e) {
  e.recomputing = !1;
  let n = e.producersTail,
    t = n !== void 0 ? n.nextProducer : e.producers;
  if (t !== void 0) {
    if (Zr(e))
      do t = du(t);
      while (t !== void 0);
    n !== void 0 ? (n.nextProducer = void 0) : (e.producers = void 0);
  }
}
function oi(e) {
  for (let n = e.producers; n !== void 0; n = n.nextProducer) {
    let t = n.producer,
      r = n.lastReadVersion;
    if (r !== t.version || (Ks(t), r !== t.version)) return !0;
  }
  return !1;
}
function ii(e) {
  if (Zr(e)) {
    let n = e.producers;
    for (; n !== void 0; ) n = du(n);
  }
  (e.producers = void 0),
    (e.producersTail = void 0),
    (e.consumers = void 0),
    (e.consumersTail = void 0);
}
function Lh(e, n) {
  let t = e.consumersTail,
    r = Zr(e);
  if (
    (t !== void 0
      ? ((n.nextConsumer = t.nextConsumer), (t.nextConsumer = n))
      : ((n.nextConsumer = void 0), (e.consumers = n)),
    (n.prevConsumer = t),
    (e.consumersTail = n),
    !r)
  )
    for (let o = e.producers; o !== void 0; o = o.nextProducer) Lh(o.producer, o);
}
function du(e) {
  let n = e.producer,
    t = e.nextProducer,
    r = e.nextConsumer,
    o = e.prevConsumer;
  if (
    ((e.nextConsumer = void 0),
    (e.prevConsumer = void 0),
    r !== void 0 ? (r.prevConsumer = o) : (n.consumersTail = o),
    o !== void 0)
  )
    o.nextConsumer = r;
  else if (((n.consumers = r), !Zr(n))) {
    let i = n.producers;
    for (; i !== void 0; ) i = du(i);
  }
  return t;
}
function Zr(e) {
  return e.consumerIsAlwaysLive || e.consumers !== void 0;
}
function Qs(e) {
  D0?.(e);
}
function S0(e, n) {
  let t = n.producersTail;
  if (t !== void 0) {
    let r = n.producers;
    do {
      if (r === e) return !0;
      if (r === t) break;
      r = r.nextProducer;
    } while (r !== void 0);
  }
  return !1;
}
function Js(e, n) {
  return Object.is(e, n);
}
function Xs(e, n) {
  let t = Object.create(T0);
  (t.computation = e), n !== void 0 && (t.equal = n);
  let r = () => {
    if ((Ks(t), Wr(t), t.value === ni)) throw t.error;
    return t.value;
  };
  return (r[Ve] = t), Qs(t), r;
}
var Ws = Symbol('UNSET'),
  qs = Symbol('COMPUTING'),
  ni = Symbol('ERRORED'),
  T0 = k(w({}, Gr), {
    value: Ws,
    dirty: !0,
    error: null,
    equal: Js,
    kind: 'computed',
    producerMustRecompute(e) {
      return e.value === Ws || e.value === qs;
    },
    producerRecomputeValue(e) {
      if (e.value === qs) throw new Error('');
      let n = e.value;
      e.value = qs;
      let t = qr(e),
        r,
        o = !1;
      try {
        (r = e.computation()), A(null), (o = n !== Ws && n !== ni && r !== ni && e.equal(n, r));
      } catch (i) {
        (r = ni), (e.error = i);
      } finally {
        ri(e, t);
      }
      if (o) {
        e.value = n;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function A0() {
  throw new Error();
}
var jh = A0;
function Vh(e) {
  jh(e);
}
function fu(e) {
  jh = e;
}
var N0 = null;
function pu(e, n) {
  let t = Object.create(ea);
  (t.value = e), n !== void 0 && (t.equal = n);
  let r = () => Bh(t);
  return (r[Ve] = t), Qs(t), [r, (s) => Yr(t, s), (s) => hu(t, s)];
}
function Bh(e) {
  return Wr(e), e.value;
}
function Yr(e, n) {
  uu() || Vh(e), e.equal(e.value, n) || ((e.value = n), k0(e));
}
function hu(e, n) {
  uu() || Vh(e), Yr(e, n(e.value));
}
var ea = k(w({}, Gr), { equal: Js, value: void 0, kind: 'signal' });
function k0(e) {
  e.version++, kh(), lu(e), N0?.(e);
}
function L(e) {
  return typeof e == 'function';
}
function Kr(e) {
  let t = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (t.prototype = Object.create(Error.prototype)), (t.prototype.constructor = t), t;
}
var ta = Kr(
  (e) =>
    function (t) {
      e(this),
        (this.message = t
          ? `${t.length} errors occurred during unsubscription:
${t.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = t);
    }
);
function pr(e, n) {
  if (e) {
    let t = e.indexOf(n);
    0 <= t && e.splice(t, 1);
  }
}
var ie = class e {
  constructor(n) {
    (this.initialTeardown = n),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let n;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: t } = this;
      if (t)
        if (((this._parentage = null), Array.isArray(t))) for (let i of t) i.remove(this);
        else t.remove(this);
      let { initialTeardown: r } = this;
      if (L(r))
        try {
          r();
        } catch (i) {
          n = i instanceof ta ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            Uh(i);
          } catch (s) {
            (n = n ?? []), s instanceof ta ? (n = [...n, ...s.errors]) : n.push(s);
          }
      }
      if (n) throw new ta(n);
    }
  }
  add(n) {
    var t;
    if (n && n !== this)
      if (this.closed) Uh(n);
      else {
        if (n instanceof e) {
          if (n.closed || n._hasParent(this)) return;
          n._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(n);
      }
  }
  _hasParent(n) {
    let { _parentage: t } = this;
    return t === n || (Array.isArray(t) && t.includes(n));
  }
  _addParent(n) {
    let { _parentage: t } = this;
    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
  }
  _removeParent(n) {
    let { _parentage: t } = this;
    t === n ? (this._parentage = null) : Array.isArray(t) && pr(t, n);
  }
  remove(n) {
    let { _finalizers: t } = this;
    t && pr(t, n), n instanceof e && n._removeParent(this);
  }
};
ie.EMPTY = (() => {
  let e = new ie();
  return (e.closed = !0), e;
})();
var gu = ie.EMPTY;
function na(e) {
  return e instanceof ie || (e && 'closed' in e && L(e.remove) && L(e.add) && L(e.unsubscribe));
}
function Uh(e) {
  L(e) ? e() : e.unsubscribe();
}
var Dt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Qr = {
  setTimeout(e, n, ...t) {
    let { delegate: r } = Qr;
    return r?.setTimeout ? r.setTimeout(e, n, ...t) : setTimeout(e, n, ...t);
  },
  clearTimeout(e) {
    let { delegate: n } = Qr;
    return (n?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function ra(e) {
  Qr.setTimeout(() => {
    let { onUnhandledError: n } = Dt;
    if (n) n(e);
    else throw e;
  });
}
function si() {}
var Hh = mu('C', void 0, void 0);
function zh(e) {
  return mu('E', void 0, e);
}
function $h(e) {
  return mu('N', e, void 0);
}
function mu(e, n, t) {
  return { kind: e, value: n, error: t };
}
var hr = null;
function Jr(e) {
  if (Dt.useDeprecatedSynchronousErrorHandling) {
    let n = !hr;
    if ((n && (hr = { errorThrown: !1, error: null }), e(), n)) {
      let { errorThrown: t, error: r } = hr;
      if (((hr = null), t)) throw r;
    }
  } else e();
}
function Gh(e) {
  Dt.useDeprecatedSynchronousErrorHandling && hr && ((hr.errorThrown = !0), (hr.error = e));
}
var gr = class extends ie {
    constructor(n) {
      super(),
        (this.isStopped = !1),
        n ? ((this.destination = n), na(n) && n.add(this)) : (this.destination = L0);
    }
    static create(n, t, r) {
      return new sn(n, t, r);
    }
    next(n) {
      this.isStopped ? _u($h(n), this) : this._next(n);
    }
    error(n) {
      this.isStopped ? _u(zh(n), this) : ((this.isStopped = !0), this._error(n));
    }
    complete() {
      this.isStopped ? _u(Hh, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(n) {
      this.destination.next(n);
    }
    _error(n) {
      try {
        this.destination.error(n);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  R0 = Function.prototype.bind;
function vu(e, n) {
  return R0.call(e, n);
}
var wu = class {
    constructor(n) {
      this.partialObserver = n;
    }
    next(n) {
      let { partialObserver: t } = this;
      if (t.next)
        try {
          t.next(n);
        } catch (r) {
          oa(r);
        }
    }
    error(n) {
      let { partialObserver: t } = this;
      if (t.error)
        try {
          t.error(n);
        } catch (r) {
          oa(r);
        }
      else oa(n);
    }
    complete() {
      let { partialObserver: n } = this;
      if (n.complete)
        try {
          n.complete();
        } catch (t) {
          oa(t);
        }
    }
  },
  sn = class extends gr {
    constructor(n, t, r) {
      super();
      let o;
      if (L(n) || !n) o = { next: n ?? void 0, error: t ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && Dt.useDeprecatedNextContext
          ? ((i = Object.create(n)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: n.next && vu(n.next, i),
              error: n.error && vu(n.error, i),
              complete: n.complete && vu(n.complete, i),
            }))
          : (o = n);
      }
      this.destination = new wu(o);
    }
  };
function oa(e) {
  Dt.useDeprecatedSynchronousErrorHandling ? Gh(e) : ra(e);
}
function F0(e) {
  throw e;
}
function _u(e, n) {
  let { onStoppedNotification: t } = Dt;
  t && Qr.setTimeout(() => t(e, n));
}
var L0 = { closed: !0, next: si, error: F0, complete: si };
var Xr = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function st(e) {
  return e;
}
function yu(...e) {
  return Cu(e);
}
function Cu(e) {
  return e.length === 0
    ? st
    : e.length === 1
    ? e[0]
    : function (t) {
        return e.reduce((r, o) => o(r), t);
      };
}
var V = (() => {
  class e {
    constructor(t) {
      t && (this._subscribe = t);
    }
    lift(t) {
      let r = new e();
      return (r.source = this), (r.operator = t), r;
    }
    subscribe(t, r, o) {
      let i = V0(t) ? t : new sn(t, r, o);
      return (
        Jr(() => {
          let { operator: s, source: a } = this;
          i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
        }),
        i
      );
    }
    _trySubscribe(t) {
      try {
        return this._subscribe(t);
      } catch (r) {
        t.error(r);
      }
    }
    forEach(t, r) {
      return (
        (r = Wh(r)),
        new r((o, i) => {
          let s = new sn({
            next: (a) => {
              try {
                t(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(t) {
      var r;
      return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
    }
    [Xr]() {
      return this;
    }
    pipe(...t) {
      return Cu(t)(this);
    }
    toPromise(t) {
      return (
        (t = Wh(t)),
        new t((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (n) => new e(n)), e;
})();
function Wh(e) {
  var n;
  return (n = e ?? Dt.Promise) !== null && n !== void 0 ? n : Promise;
}
function j0(e) {
  return e && L(e.next) && L(e.error) && L(e.complete);
}
function V0(e) {
  return (e && e instanceof gr) || (j0(e) && na(e));
}
function bu(e) {
  return L(e?.lift);
}
function H(e) {
  return (n) => {
    if (bu(n))
      return n.lift(function (t) {
        try {
          return e(t, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function z(e, n, t, r, o) {
  return new Mu(e, n, t, r, o);
}
var Mu = class extends gr {
  constructor(n, t, r, o, i, s) {
    super(n),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = t
        ? function (a) {
            try {
              t(a);
            } catch (c) {
              n.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              n.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              n.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: t } = this;
      super.unsubscribe(), !t && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }
};
function eo() {
  return H((e, n) => {
    let t = null;
    e._refCount++;
    let r = z(n, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        t = null;
        return;
      }
      let o = e._connection,
        i = t;
      (t = null), o && (!i || o === i) && o.unsubscribe(), n.unsubscribe();
    });
    e.subscribe(r), r.closed || (t = e.connect());
  });
}
var to = class extends V {
  constructor(n, t) {
    super(),
      (this.source = n),
      (this.subjectFactory = t),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      bu(n) && (this.lift = n.lift);
  }
  _subscribe(n) {
    return this.getSubject().subscribe(n);
  }
  getSubject() {
    let n = this._subject;
    return (!n || n.isStopped) && (this._subject = this.subjectFactory()), this._subject;
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: n } = this;
    (this._subject = this._connection = null), n?.unsubscribe();
  }
  connect() {
    let n = this._connection;
    if (!n) {
      n = this._connection = new ie();
      let t = this.getSubject();
      n.add(
        this.source.subscribe(
          z(
            t,
            void 0,
            () => {
              this._teardown(), t.complete();
            },
            (r) => {
              this._teardown(), t.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        n.closed && ((this._connection = null), (n = ie.EMPTY));
    }
    return n;
  }
  refCount() {
    return eo()(this);
  }
};
var qh = Kr(
  (e) =>
    function () {
      e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
    }
);
var re = (() => {
    class e extends V {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(t) {
        let r = new ia(this, this);
        return (r.operator = t), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new qh();
      }
      next(t) {
        Jr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers || (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(t);
          }
        });
      }
      error(t) {
        Jr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = t);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(t);
          }
        });
      }
      complete() {
        Jr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: t } = this;
            for (; t.length; ) t.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
      }
      get observed() {
        var t;
        return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
      }
      _trySubscribe(t) {
        return this._throwIfClosed(), super._trySubscribe(t);
      }
      _subscribe(t) {
        return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
      }
      _innerSubscribe(t) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? gu
          : ((this.currentObservers = null),
            i.push(t),
            new ie(() => {
              (this.currentObservers = null), pr(i, t);
            }));
      }
      _checkFinalizedStatuses(t) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? t.error(o) : i && t.complete();
      }
      asObservable() {
        let t = new V();
        return (t.source = this), t;
      }
    }
    return (e.create = (n, t) => new ia(n, t)), e;
  })(),
  ia = class extends re {
    constructor(n, t) {
      super(), (this.destination = n), (this.source = t);
    }
    next(n) {
      var t, r;
      (r = (t = this.destination) === null || t === void 0 ? void 0 : t.next) === null ||
        r === void 0 ||
        r.call(t, n);
    }
    error(n) {
      var t, r;
      (r = (t = this.destination) === null || t === void 0 ? void 0 : t.error) === null ||
        r === void 0 ||
        r.call(t, n);
    }
    complete() {
      var n, t;
      (t = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null ||
        t === void 0 ||
        t.call(n);
    }
    _subscribe(n) {
      var t, r;
      return (r = (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(n)) !== null &&
        r !== void 0
        ? r
        : gu;
    }
  };
var Te = class extends re {
  constructor(n) {
    super(), (this._value = n);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(n) {
    let t = super._subscribe(n);
    return !t.closed && n.next(this._value), t;
  }
  getValue() {
    let { hasError: n, thrownError: t, _value: r } = this;
    if (n) throw t;
    return this._throwIfClosed(), r;
  }
  next(n) {
    super.next((this._value = n));
  }
};
var xu = {
  now() {
    return (xu.delegate || Date).now();
  },
  delegate: void 0,
};
var sa = class extends ie {
  constructor(n, t) {
    super();
  }
  schedule(n, t = 0) {
    return this;
  }
};
var ai = {
  setInterval(e, n, ...t) {
    let { delegate: r } = ai;
    return r?.setInterval ? r.setInterval(e, n, ...t) : setInterval(e, n, ...t);
  },
  clearInterval(e) {
    let { delegate: n } = ai;
    return (n?.clearInterval || clearInterval)(e);
  },
  delegate: void 0,
};
var aa = class extends sa {
  constructor(n, t) {
    super(n, t), (this.scheduler = n), (this.work = t), (this.pending = !1);
  }
  schedule(n, t = 0) {
    var r;
    if (this.closed) return this;
    this.state = n;
    let o = this.id,
      i = this.scheduler;
    return (
      o != null && (this.id = this.recycleAsyncId(i, o, t)),
      (this.pending = !0),
      (this.delay = t),
      (this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(i, this.id, t)),
      this
    );
  }
  requestAsyncId(n, t, r = 0) {
    return ai.setInterval(n.flush.bind(n, this), r);
  }
  recycleAsyncId(n, t, r = 0) {
    if (r != null && this.delay === r && this.pending === !1) return t;
    t != null && ai.clearInterval(t);
  }
  execute(n, t) {
    if (this.closed) return new Error('executing a cancelled action');
    this.pending = !1;
    let r = this._execute(n, t);
    if (r) return r;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(n, t) {
    let r = !1,
      o;
    try {
      this.work(n);
    } catch (i) {
      (r = !0), (o = i || new Error('Scheduled action threw falsy error'));
    }
    if (r) return this.unsubscribe(), o;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: n, scheduler: t } = this,
        { actions: r } = t;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        pr(r, this),
        n != null && (this.id = this.recycleAsyncId(t, n, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var no = class e {
  constructor(n, t = e.now) {
    (this.schedulerActionCtor = n), (this.now = t);
  }
  schedule(n, t = 0, r) {
    return new this.schedulerActionCtor(this, n).schedule(r, t);
  }
};
no.now = xu.now;
var ca = class extends no {
  constructor(n, t = no.now) {
    super(n, t), (this.actions = []), (this._active = !1);
  }
  flush(n) {
    let { actions: t } = this;
    if (this._active) {
      t.push(n);
      return;
    }
    let r;
    this._active = !0;
    do if ((r = n.execute(n.state, n.delay))) break;
    while ((n = t.shift()));
    if (((this._active = !1), r)) {
      for (; (n = t.shift()); ) n.unsubscribe();
      throw r;
    }
  }
};
var Zh = new ca(aa);
var et = new V((e) => e.complete());
function Yh(e) {
  return e && L(e.schedule);
}
function Kh(e) {
  return e[e.length - 1];
}
function la(e) {
  return L(Kh(e)) ? e.pop() : void 0;
}
function Rn(e) {
  return Yh(Kh(e)) ? e.pop() : void 0;
}
function Jh(e, n, t, r) {
  function o(i) {
    return i instanceof t
      ? i
      : new t(function (s) {
          s(i);
        });
  }
  return new (t || (t = Promise))(function (i, s) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done ? i(u.value) : o(u.value).then(a, c);
    }
    l((r = r.apply(e, n || [])).next());
  });
}
function Qh(e) {
  var n = typeof Symbol == 'function' && Symbol.iterator,
    t = n && e[n],
    r = 0;
  if (t) return t.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      },
    };
  throw new TypeError(n ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function mr(e) {
  return this instanceof mr ? ((this.v = e), this) : new mr(e);
}
function Xh(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = t.apply(e, n || []),
    o,
    i = [];
  return (
    (o = Object.create((typeof AsyncIterator == 'function' ? AsyncIterator : Object).prototype)),
    a('next'),
    a('throw'),
    a('return', s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (_) {
      return Promise.resolve(_).then(f, d);
    };
  }
  function a(f, _) {
    r[f] &&
      ((o[f] = function (O) {
        return new Promise(function (M, b) {
          i.push([f, O, M, b]) > 1 || c(f, O);
        });
      }),
      _ && (o[f] = _(o[f])));
  }
  function c(f, _) {
    try {
      l(r[f](_));
    } catch (O) {
      h(i[0][3], O);
    }
  }
  function l(f) {
    f.value instanceof mr ? Promise.resolve(f.value.v).then(u, d) : h(i[0][2], f);
  }
  function u(f) {
    c('next', f);
  }
  function d(f) {
    c('throw', f);
  }
  function h(f, _) {
    f(_), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function eg(e) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var n = e[Symbol.asyncIterator],
    t;
  return n
    ? n.call(e)
    : ((e = typeof Qh == 'function' ? Qh(e) : e[Symbol.iterator]()),
      (t = {}),
      r('next'),
      r('throw'),
      r('return'),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function r(i) {
    t[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (l) {
      i({ value: l, done: a });
    }, s);
  }
}
var ua = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function da(e) {
  return L(e?.then);
}
function fa(e) {
  return L(e[Xr]);
}
function pa(e) {
  return Symbol.asyncIterator && L(e?.[Symbol.asyncIterator]);
}
function ha(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function B0() {
  return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var ga = B0();
function ma(e) {
  return L(e?.[ga]);
}
function va(e) {
  return Xh(this, arguments, function* () {
    let t = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield mr(t.read());
        if (o) return yield mr(void 0);
        yield yield mr(r);
      }
    } finally {
      t.releaseLock();
    }
  });
}
function _a(e) {
  return L(e?.getReader);
}
function ce(e) {
  if (e instanceof V) return e;
  if (e != null) {
    if (fa(e)) return U0(e);
    if (ua(e)) return H0(e);
    if (da(e)) return z0(e);
    if (pa(e)) return tg(e);
    if (ma(e)) return $0(e);
    if (_a(e)) return G0(e);
  }
  throw ha(e);
}
function U0(e) {
  return new V((n) => {
    let t = e[Xr]();
    if (L(t.subscribe)) return t.subscribe(n);
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}
function H0(e) {
  return new V((n) => {
    for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
    n.complete();
  });
}
function z0(e) {
  return new V((n) => {
    e.then(
      (t) => {
        n.closed || (n.next(t), n.complete());
      },
      (t) => n.error(t)
    ).then(null, ra);
  });
}
function $0(e) {
  return new V((n) => {
    for (let t of e) if ((n.next(t), n.closed)) return;
    n.complete();
  });
}
function tg(e) {
  return new V((n) => {
    W0(e, n).catch((t) => n.error(t));
  });
}
function G0(e) {
  return tg(va(e));
}
function W0(e, n) {
  var t, r, o, i;
  return Jh(this, void 0, void 0, function* () {
    try {
      for (t = eg(e); (r = yield t.next()), !r.done; ) {
        let s = r.value;
        if ((n.next(s), n.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = t.return) && (yield i.call(t));
      } finally {
        if (o) throw o.error;
      }
    }
    n.complete();
  });
}
function tt(e, n, t, r = 0, o = !1) {
  let i = n.schedule(function () {
    t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function wa(e, n = 0) {
  return H((t, r) => {
    t.subscribe(
      z(
        r,
        (o) => tt(r, e, () => r.next(o), n),
        () => tt(r, e, () => r.complete(), n),
        (o) => tt(r, e, () => r.error(o), n)
      )
    );
  });
}
function ya(e, n = 0) {
  return H((t, r) => {
    r.add(e.schedule(() => t.subscribe(r), n));
  });
}
function ng(e, n) {
  return ce(e).pipe(ya(n), wa(n));
}
function rg(e, n) {
  return ce(e).pipe(ya(n), wa(n));
}
function og(e, n) {
  return new V((t) => {
    let r = 0;
    return n.schedule(function () {
      r === e.length ? t.complete() : (t.next(e[r++]), t.closed || this.schedule());
    });
  });
}
function ig(e, n) {
  return new V((t) => {
    let r;
    return (
      tt(t, n, () => {
        (r = e[ga]()),
          tt(
            t,
            n,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                t.error(s);
                return;
              }
              i ? t.complete() : t.next(o);
            },
            0,
            !0
          );
      }),
      () => L(r?.return) && r.return()
    );
  });
}
function Ca(e, n) {
  if (!e) throw new Error('Iterable cannot be null');
  return new V((t) => {
    tt(t, n, () => {
      let r = e[Symbol.asyncIterator]();
      tt(
        t,
        n,
        () => {
          r.next().then((o) => {
            o.done ? t.complete() : t.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function sg(e, n) {
  return Ca(va(e), n);
}
function ag(e, n) {
  if (e != null) {
    if (fa(e)) return ng(e, n);
    if (ua(e)) return og(e, n);
    if (da(e)) return rg(e, n);
    if (pa(e)) return Ca(e, n);
    if (ma(e)) return ig(e, n);
    if (_a(e)) return sg(e, n);
  }
  throw ha(e);
}
function le(e, n) {
  return n ? ag(e, n) : ce(e);
}
function P(...e) {
  let n = Rn(e);
  return le(e, n);
}
function Fn(e, n) {
  let t = L(e) ? e : () => e,
    r = (o) => o.error(t());
  return new V(n ? (o) => n.schedule(r, 0, o) : r);
}
function Ou(e) {
  return !!e && (e instanceof V || (L(e.lift) && L(e.subscribe)));
}
var an = Kr(
  (e) =>
    function () {
      e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
    }
);
function S(e, n) {
  return H((t, r) => {
    let o = 0;
    t.subscribe(
      z(r, (i) => {
        r.next(e.call(n, i, o++));
      })
    );
  });
}
var { isArray: q0 } = Array;
function Z0(e, n) {
  return q0(n) ? e(...n) : e(n);
}
function ba(e) {
  return S((n) => Z0(e, n));
}
var { isArray: Y0 } = Array,
  { getPrototypeOf: K0, prototype: Q0, keys: J0 } = Object;
function Ma(e) {
  if (e.length === 1) {
    let n = e[0];
    if (Y0(n)) return { args: n, keys: null };
    if (X0(n)) {
      let t = J0(n);
      return { args: t.map((r) => n[r]), keys: t };
    }
  }
  return { args: e, keys: null };
}
function X0(e) {
  return e && typeof e == 'object' && K0(e) === Q0;
}
function xa(e, n) {
  return e.reduce((t, r, o) => ((t[r] = n[o]), t), {});
}
function ro(...e) {
  let n = Rn(e),
    t = la(e),
    { args: r, keys: o } = Ma(e);
  if (r.length === 0) return le([], n);
  let i = new V(eC(r, n, o ? (s) => xa(o, s) : st));
  return t ? i.pipe(ba(t)) : i;
}
function eC(e, n, t = st) {
  return (r) => {
    cg(
      n,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          cg(
            n,
            () => {
              let l = le(e[c], n),
                u = !1;
              l.subscribe(
                z(
                  r,
                  (d) => {
                    (i[c] = d), u || ((u = !0), a--), a || r.next(t(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function cg(e, n, t) {
  e ? tt(t, e, n) : n();
}
function lg(e, n, t, r, o, i, s, a) {
  let c = [],
    l = 0,
    u = 0,
    d = !1,
    h = () => {
      d && !c.length && !l && n.complete();
    },
    f = (O) => (l < r ? _(O) : c.push(O)),
    _ = (O) => {
      i && n.next(O), l++;
      let M = !1;
      ce(t(O, u++)).subscribe(
        z(
          n,
          (b) => {
            o?.(b), i ? f(b) : n.next(b);
          },
          () => {
            M = !0;
          },
          void 0,
          () => {
            if (M)
              try {
                for (l--; c.length && l < r; ) {
                  let b = c.shift();
                  s ? tt(n, s, () => _(b)) : _(b);
                }
                h();
              } catch (b) {
                n.error(b);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      z(n, f, () => {
        (d = !0), h();
      })
    ),
    () => {
      a?.();
    }
  );
}
function ve(e, n, t = 1 / 0) {
  return L(n)
    ? ve((r, o) => S((i, s) => n(r, i, o, s))(ce(e(r, o))), t)
    : (typeof n == 'number' && (t = n), H((r, o) => lg(r, o, e, t)));
}
function oo(e = 1 / 0) {
  return ve(st, e);
}
function ug() {
  return oo(1);
}
function Ln(...e) {
  return ug()(le(e, Rn(e)));
}
function ci(e) {
  return new V((n) => {
    ce(e()).subscribe(n);
  });
}
function li(...e) {
  let n = la(e),
    { args: t, keys: r } = Ma(e),
    o = new V((i) => {
      let { length: s } = t;
      if (!s) {
        i.complete();
        return;
      }
      let a = new Array(s),
        c = s,
        l = s;
      for (let u = 0; u < s; u++) {
        let d = !1;
        ce(t[u]).subscribe(
          z(
            i,
            (h) => {
              d || ((d = !0), l--), (a[u] = h);
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (l || i.next(r ? xa(r, a) : a), i.complete());
            }
          )
        );
      }
    });
  return n ? o.pipe(ba(n)) : o;
}
function Ae(e, n) {
  return H((t, r) => {
    let o = 0;
    t.subscribe(z(r, (i) => e.call(n, i, o++) && r.next(i)));
  });
}
function It(e) {
  return H((n, t) => {
    let r = null,
      o = !1,
      i;
    (r = n.subscribe(
      z(t, void 0, void 0, (s) => {
        (i = ce(e(s, It(e)(n)))), r ? (r.unsubscribe(), (r = null), i.subscribe(t)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(t));
  });
}
function dg(e, n, t, r, o) {
  return (i, s) => {
    let a = t,
      c = n,
      l = 0;
    i.subscribe(
      z(
        s,
        (u) => {
          let d = l++;
          (c = a ? e(c, u, d) : ((a = !0), u)), r && s.next(c);
        },
        o &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function cn(e, n) {
  return L(n) ? ve(e, n, 1) : ve(e, 1);
}
function Pu(e, n = Zh) {
  return H((t, r) => {
    let o = null,
      i = null,
      s = null,
      a = () => {
        if (o) {
          o.unsubscribe(), (o = null);
          let l = i;
          (i = null), r.next(l);
        }
      };
    function c() {
      let l = s + e,
        u = n.now();
      if (u < l) {
        (o = this.schedule(void 0, l - u)), r.add(o);
        return;
      }
      a();
    }
    t.subscribe(
      z(
        r,
        (l) => {
          (i = l), (s = n.now()), o || ((o = n.schedule(c, e)), r.add(o));
        },
        () => {
          a(), r.complete();
        },
        void 0,
        () => {
          i = o = null;
        }
      )
    );
  });
}
function jn(e) {
  return H((n, t) => {
    let r = !1;
    n.subscribe(
      z(
        t,
        (o) => {
          (r = !0), t.next(o);
        },
        () => {
          r || t.next(e), t.complete();
        }
      )
    );
  });
}
function at(e) {
  return e <= 0
    ? () => et
    : H((n, t) => {
        let r = 0;
        n.subscribe(
          z(t, (o) => {
            ++r <= e && (t.next(o), e <= r && t.complete());
          })
        );
      });
}
function Oa(e = tC) {
  return H((n, t) => {
    let r = !1;
    n.subscribe(
      z(
        t,
        (o) => {
          (r = !0), t.next(o);
        },
        () => (r ? t.complete() : t.error(e()))
      )
    );
  });
}
function tC() {
  return new an();
}
function ln(e) {
  return H((n, t) => {
    try {
      n.subscribe(t);
    } finally {
      t.add(e);
    }
  });
}
function un(e, n) {
  let t = arguments.length >= 2;
  return (r) => r.pipe(e ? Ae((o, i) => e(o, i, r)) : st, at(1), t ? jn(n) : Oa(() => new an()));
}
function io(e) {
  return e <= 0
    ? () => et
    : H((n, t) => {
        let r = [];
        n.subscribe(
          z(
            t,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) t.next(o);
              t.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function Eu(e, n) {
  let t = arguments.length >= 2;
  return (r) => r.pipe(e ? Ae((o, i) => e(o, i, r)) : st, io(1), t ? jn(n) : Oa(() => new an()));
}
function Du(e, n) {
  return H(dg(e, n, arguments.length >= 2, !0));
}
function Su(e = {}) {
  let {
    connector: n = () => new re(),
    resetOnError: t = !0,
    resetOnComplete: r = !0,
    resetOnRefCountZero: o = !0,
  } = e;
  return (i) => {
    let s,
      a,
      c,
      l = 0,
      u = !1,
      d = !1,
      h = () => {
        a?.unsubscribe(), (a = void 0);
      },
      f = () => {
        h(), (s = c = void 0), (u = d = !1);
      },
      _ = () => {
        let O = s;
        f(), O?.unsubscribe();
      };
    return H((O, M) => {
      l++, !d && !u && h();
      let b = (c = c ?? n());
      M.add(() => {
        l--, l === 0 && !d && !u && (a = Iu(_, o));
      }),
        b.subscribe(M),
        !s &&
          l > 0 &&
          ((s = new sn({
            next: (ne) => b.next(ne),
            error: (ne) => {
              (d = !0), h(), (a = Iu(f, t, ne)), b.error(ne);
            },
            complete: () => {
              (u = !0), h(), (a = Iu(f, r)), b.complete();
            },
          })),
          ce(O).subscribe(s));
    })(i);
  };
}
function Iu(e, n, ...t) {
  if (n === !0) {
    e();
    return;
  }
  if (n === !1) return;
  let r = new sn({
    next: () => {
      r.unsubscribe(), e();
    },
  });
  return ce(n(...t)).subscribe(r);
}
function Tu(e) {
  return Ae((n, t) => e <= t);
}
function ui(...e) {
  let n = Rn(e);
  return H((t, r) => {
    (n ? Ln(e, t, n) : Ln(e, t)).subscribe(r);
  });
}
function Be(e, n) {
  return H((t, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    t.subscribe(
      z(
        r,
        (c) => {
          o?.unsubscribe();
          let l = 0,
            u = i++;
          ce(e(c, u)).subscribe(
            (o = z(
              r,
              (d) => r.next(n ? n(c, d, u, l++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function so(e) {
  return H((n, t) => {
    ce(e).subscribe(z(t, () => t.complete(), si)), !t.closed && n.subscribe(t);
  });
}
function fe(e, n, t) {
  let r = L(e) || n || t ? { next: e, error: n, complete: t } : e;
  return r
    ? H((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          z(
            i,
            (c) => {
              var l;
              (l = r.next) === null || l === void 0 || l.call(r, c), i.next(c);
            },
            () => {
              var c;
              (a = !1), (c = r.complete) === null || c === void 0 || c.call(r), i.complete();
            },
            (c) => {
              var l;
              (a = !1), (l = r.error) === null || l === void 0 || l.call(r, c), i.error(c);
            },
            () => {
              var c, l;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (l = r.finalize) === null || l === void 0 || l.call(r);
            }
          )
        );
      })
    : st;
}
function fg(e) {
  let n = A(null);
  try {
    return e();
  } finally {
    A(n);
  }
}
var Ia = 'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss',
  y = class extends Error {
    code;
    constructor(n, t) {
      super(co(n, t)), (this.code = n);
    }
  };
function nC(e) {
  return `NG0${Math.abs(e)}`;
}
function co(e, n) {
  return `${nC(e)}${n ? ': ' + n : ''}`;
}
var _t = globalThis;
function W(e) {
  for (let n in e) if (e[n] === W) return n;
  throw Error('');
}
function gg(e, n) {
  for (let t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]);
}
function fn(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return `[${e.map(fn).join(', ')}]`;
  if (e == null) return '' + e;
  let n = e.overriddenName || e.name;
  if (n) return `${n}`;
  let t = e.toString();
  if (t == null) return '' + t;
  let r = t.indexOf(`
`);
  return r >= 0 ? t.slice(0, r) : t;
}
function Sa(e, n) {
  return e ? (n ? `${e} ${n}` : e) : n || '';
}
var rC = W({ __forward_ref__: W });
function lt(e) {
  return (
    (e.__forward_ref__ = lt),
    (e.toString = function () {
      return fn(this());
    }),
    e
  );
}
function Ne(e) {
  return zu(e) ? e() : e;
}
function zu(e) {
  return typeof e == 'function' && e.hasOwnProperty(rC) && e.__forward_ref__ === lt;
}
function x(e) {
  return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
}
function we(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function hi(e) {
  return oC(e, Ta);
}
function $u(e) {
  return hi(e) !== null;
}
function oC(e, n) {
  return (e.hasOwnProperty(n) && e[n]) || null;
}
function iC(e) {
  let n = e?.[Ta] ?? null;
  return n || null;
}
function Nu(e) {
  return e && e.hasOwnProperty(Ea) ? e[Ea] : null;
}
var Ta = W({ ɵprov: W }),
  Ea = W({ ɵinj: W }),
  C = class {
    _desc;
    ngMetadataName = 'InjectionToken';
    ɵprov;
    constructor(n, t) {
      (this._desc = n),
        (this.ɵprov = void 0),
        typeof t == 'number'
          ? (this.__NG_ELEMENT_ID__ = t)
          : t !== void 0 &&
            (this.ɵprov = x({
              token: this,
              providedIn: t.providedIn || 'root',
              factory: t.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function Gu(e) {
  return e && !!e.ɵproviders;
}
var Wu = W({ ɵcmp: W }),
  qu = W({ ɵdir: W }),
  Zu = W({ ɵpipe: W }),
  Yu = W({ ɵmod: W }),
  fi = W({ ɵfac: W }),
  Cr = W({ __NG_ELEMENT_ID__: W }),
  pg = W({ __NG_ENV_ID__: W });
function gi(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function mg(e) {
  return typeof e == 'function'
    ? e.name || e.toString()
    : typeof e == 'object' && e != null && typeof e.type == 'function'
    ? e.type.name || e.type.toString()
    : gi(e);
}
var vg = W({ ngErrorCode: W }),
  sC = W({ ngErrorMessage: W }),
  aC = W({ ngTokenPath: W });
function Ku(e, n) {
  return _g('', -200, n);
}
function Aa(e, n) {
  throw new y(-201, !1);
}
function _g(e, n, t) {
  let r = new y(n, e);
  return (r[vg] = n), (r[sC] = e), t && (r[aC] = t), r;
}
function cC(e) {
  return e[vg];
}
var ku;
function wg() {
  return ku;
}
function $e(e) {
  let n = ku;
  return (ku = e), n;
}
function Qu(e, n, t) {
  let r = hi(e);
  if (r && r.providedIn == 'root') return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (t & 8) return null;
  if (n !== void 0) return n;
  Aa(e, 'Injector');
}
var lC = {},
  vr = lC,
  uC = '__NG_DI_FLAG__',
  Ru = class {
    injector;
    constructor(n) {
      this.injector = n;
    }
    retrieve(n, t) {
      let r = _r(t) || 0;
      try {
        return this.injector.get(n, r & 8 ? null : vr, r);
      } catch (o) {
        if ($r(o)) return o;
        throw o;
      }
    }
  };
function dC(e, n = 0) {
  let t = $s();
  if (t === void 0) throw new y(-203, !1);
  if (t === null) return Qu(e, void 0, n);
  {
    let r = fC(n),
      o = t.retrieve(e, r);
    if ($r(o)) {
      if (r.optional) return null;
      throw o;
    }
    return o;
  }
}
function E(e, n = 0) {
  return (wg() || dC)(Ne(e), n);
}
function p(e, n) {
  return E(e, _r(n));
}
function _r(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function fC(e) {
  return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) };
}
function Fu(e) {
  let n = [];
  for (let t = 0; t < e.length; t++) {
    let r = Ne(e[t]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new y(900, !1);
      let o,
        i = 0;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = pC(a);
        typeof c == 'number' ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      n.push(E(o, i));
    } else n.push(E(r));
  }
  return n;
}
function pC(e) {
  return e[uC];
}
function Vn(e, n) {
  let t = e.hasOwnProperty(fi);
  return t ? e[fi] : null;
}
function yg(e, n, t) {
  if (e.length !== n.length) return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = n[r];
    if ((t && ((o = t(o)), (i = t(i))), i !== o)) return !1;
  }
  return !0;
}
function Cg(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function Na(e, n) {
  e.forEach((t) => (Array.isArray(t) ? Na(t, n) : n(t)));
}
function Ju(e, n, t) {
  n >= e.length ? e.push(t) : e.splice(n, 0, t);
}
function mi(e, n) {
  return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
}
function bg(e, n) {
  let t = [];
  for (let r = 0; r < e; r++) t.push(n);
  return t;
}
function Mg(e, n, t, r) {
  let o = e.length;
  if (o == n) e.push(t, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = t);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > n; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[n] = t), (e[n + 1] = r);
  }
}
function ka(e, n, t) {
  let r = lo(e, n);
  return r >= 0 ? (e[r | 1] = t) : ((r = ~r), Mg(e, r, n, t)), r;
}
function Ra(e, n) {
  let t = lo(e, n);
  if (t >= 0) return e[t | 1];
}
function lo(e, n) {
  return hC(e, n, 1);
}
function hC(e, n, t) {
  let r = 0,
    o = e.length >> t;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << t];
    if (n === s) return i << t;
    s > n ? (o = i) : (r = i + 1);
  }
  return ~(o << t);
}
var Un = {},
  Ge = [],
  Ut = new C(''),
  Xu = new C('', -1),
  ed = new C(''),
  pi = class {
    get(n, t = vr) {
      if (t === vr) {
        let o = _g('', -201);
        throw ((o.name = '\u0275NotFound'), o);
      }
      return t;
    }
  };
function td(e) {
  return e[Yu] || null;
}
function Hn(e) {
  return e[Wu] || null;
}
function nd(e) {
  return e[qu] || null;
}
function xg(e) {
  return e[Zu] || null;
}
function Ht(e) {
  return { ɵproviders: e };
}
function Og(e) {
  return Ht([{ provide: Ut, multi: !0, useValue: e }]);
}
function Pg(...e) {
  return { ɵproviders: rd(!0, e), ɵfromNgModule: !0 };
}
function rd(e, ...n) {
  let t = [],
    r = new Set(),
    o,
    i = (s) => {
      t.push(s);
    };
  return (
    Na(n, (s) => {
      let a = s;
      Da(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && Eg(o, i),
    t
  );
}
function Eg(e, n) {
  for (let t = 0; t < e.length; t++) {
    let { ngModule: r, providers: o } = e[t];
    od(o, (i) => {
      n(i, r);
    });
  }
}
function Da(e, n, t, r) {
  if (((e = Ne(e)), !e)) return !1;
  let o = null,
    i = Nu(e),
    s = !i && Hn(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Nu(c)), i)) o = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let c = typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
      for (let l of c) Da(l, n, t, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      try {
        Na(i.imports, (u) => {
          Da(u, n, t, r) && ((l ||= []), l.push(u));
        });
      } finally {
      }
      l !== void 0 && Eg(l, n);
    }
    if (!a) {
      let l = Vn(o) || (() => new o());
      n({ provide: o, useFactory: l, deps: Ge }, o),
        n({ provide: ed, useValue: o, multi: !0 }, o),
        n({ provide: Ut, useValue: () => E(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let l = e;
      od(c, (u) => {
        n(u, l);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function od(e, n) {
  for (let t of e) Gu(t) && (t = t.ɵproviders), Array.isArray(t) ? od(t, n) : n(t);
}
var gC = W({ provide: String, useValue: W });
function Dg(e) {
  return e !== null && typeof e == 'object' && gC in e;
}
function mC(e) {
  return !!(e && e.useExisting);
}
function vC(e) {
  return !!(e && e.useFactory);
}
function wr(e) {
  return typeof e == 'function';
}
function Ig(e) {
  return !!e.useClass;
}
var vi = new C(''),
  Pa = {},
  hg = {},
  Au;
function _i() {
  return Au === void 0 && (Au = new pi()), Au;
}
var _e = class {},
  yr = class extends _e {
    parent;
    source;
    scopes;
    records = new Map();
    _ngOnDestroyHooks = new Set();
    _onDestroyHooks = [];
    get destroyed() {
      return this._destroyed;
    }
    _destroyed = !1;
    injectorDefTypes;
    constructor(n, t, r, o) {
      super(),
        (this.parent = t),
        (this.source = r),
        (this.scopes = o),
        ju(n, (s) => this.processProvider(s)),
        this.records.set(Xu, ao(void 0, this)),
        o.has('environment') && this.records.set(_e, ao(void 0, this));
      let i = this.records.get(vi);
      i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(ed, Ge, { self: !0 })));
    }
    retrieve(n, t) {
      let r = _r(t) || 0;
      try {
        return this.get(n, vr, r);
      } catch (o) {
        if ($r(o)) return o;
        throw o;
      }
    }
    destroy() {
      di(this), (this._destroyed = !0);
      let n = A(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let t = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of t) r();
      } finally {
        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), A(n);
      }
    }
    onDestroy(n) {
      return di(this), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n);
    }
    runInContext(n) {
      di(this);
      let t = Bt(this),
        r = $e(void 0),
        o;
      try {
        return n();
      } finally {
        Bt(t), $e(r);
      }
    }
    get(n, t = vr, r) {
      if ((di(this), n.hasOwnProperty(pg))) return n[pg](this);
      let o = _r(r),
        i,
        s = Bt(this),
        a = $e(void 0);
      try {
        if (!(o & 4)) {
          let l = this.records.get(n);
          if (l === void 0) {
            let u = bC(n) && hi(n);
            u && this.injectableDefInScope(u) ? (l = ao(Lu(n), Pa)) : (l = null),
              this.records.set(n, l);
          }
          if (l != null) return this.hydrate(n, l, o);
        }
        let c = o & 2 ? _i() : this.parent;
        return (t = o & 8 && t === vr ? null : t), c.get(n, t);
      } catch (c) {
        let l = cC(c);
        throw l === -200 || l === -201 ? new y(l, null) : c;
      } finally {
        $e(a), Bt(s);
      }
    }
    resolveInjectorInitializers() {
      let n = A(null),
        t = Bt(this),
        r = $e(void 0),
        o;
      try {
        let i = this.get(Ut, Ge, { self: !0 });
        for (let s of i) s();
      } finally {
        Bt(t), $e(r), A(n);
      }
    }
    toString() {
      let n = [],
        t = this.records;
      for (let r of t.keys()) n.push(fn(r));
      return `R3Injector[${n.join(', ')}]`;
    }
    processProvider(n) {
      n = Ne(n);
      let t = wr(n) ? n : Ne(n && n.provide),
        r = wC(n);
      if (!wr(n) && n.multi === !0) {
        let o = this.records.get(t);
        o || ((o = ao(void 0, Pa, !0)), (o.factory = () => Fu(o.multi)), this.records.set(t, o)),
          (t = n),
          o.multi.push(n);
      }
      this.records.set(t, r);
    }
    hydrate(n, t, r) {
      let o = A(null);
      try {
        if (t.value === hg) throw Ku(fn(n));
        return (
          t.value === Pa && ((t.value = hg), (t.value = t.factory(void 0, r))),
          typeof t.value == 'object' &&
            t.value &&
            CC(t.value) &&
            this._ngOnDestroyHooks.add(t.value),
          t.value
        );
      } finally {
        A(o);
      }
    }
    injectableDefInScope(n) {
      if (!n.providedIn) return !1;
      let t = Ne(n.providedIn);
      return typeof t == 'string'
        ? t === 'any' || this.scopes.has(t)
        : this.injectorDefTypes.has(t);
    }
    removeOnDestroy(n) {
      let t = this._onDestroyHooks.indexOf(n);
      t !== -1 && this._onDestroyHooks.splice(t, 1);
    }
  };
function Lu(e) {
  let n = hi(e),
    t = n !== null ? n.factory : Vn(e);
  if (t !== null) return t;
  if (e instanceof C) throw new y(204, !1);
  if (e instanceof Function) return _C(e);
  throw new y(204, !1);
}
function _C(e) {
  if (e.length > 0) throw new y(204, !1);
  let t = iC(e);
  return t !== null ? () => t.factory(e) : () => new e();
}
function wC(e) {
  if (Dg(e)) return ao(void 0, e.useValue);
  {
    let n = id(e);
    return ao(n, Pa);
  }
}
function id(e, n, t) {
  let r;
  if (wr(e)) {
    let o = Ne(e);
    return Vn(o) || Lu(o);
  } else if (Dg(e)) r = () => Ne(e.useValue);
  else if (vC(e)) r = () => e.useFactory(...Fu(e.deps || []));
  else if (mC(e)) r = (o, i) => E(Ne(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
  else {
    let o = Ne(e && (e.useClass || e.provide));
    if (yC(e)) r = () => new o(...Fu(e.deps));
    else return Vn(o) || Lu(o);
  }
  return r;
}
function di(e) {
  if (e.destroyed) throw new y(205, !1);
}
function ao(e, n, t = !1) {
  return { factory: e, value: n, multi: t ? [] : void 0 };
}
function yC(e) {
  return !!e.deps;
}
function CC(e) {
  return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
}
function bC(e) {
  return typeof e == 'function' || (typeof e == 'object' && e.ngMetadataName === 'InjectionToken');
}
function ju(e, n) {
  for (let t of e) Array.isArray(t) ? ju(t, n) : t && Gu(t) ? ju(t.ɵproviders, n) : n(t);
}
function ke(e, n) {
  let t;
  e instanceof yr ? (di(e), (t = e)) : (t = new Ru(e));
  let r,
    o = Bt(t),
    i = $e(void 0);
  try {
    return n();
  } finally {
    Bt(o), $e(i);
  }
}
function Sg() {
  return wg() !== void 0 || $s() != null;
}
var St = 0,
  I = 1,
  R = 2,
  Oe = 3,
  wt = 4,
  qe = 5,
  br = 6,
  uo = 7,
  pe = 8,
  zn = 9,
  zt = 10,
  ee = 11,
  fo = 12,
  sd = 13,
  Mr = 14,
  Ze = 15,
  $n = 16,
  xr = 17,
  $t = 18,
  wi = 19,
  ad = 20,
  dn = 21,
  Fa = 22,
  yi = 23,
  ut = 24,
  La = 25,
  Or = 26,
  ue = 27,
  Tg = 1,
  cd = 6,
  Gn = 7,
  Ci = 8,
  Pr = 9,
  ye = 10;
function Gt(e) {
  return Array.isArray(e) && typeof e[Tg] == 'object';
}
function Tt(e) {
  return Array.isArray(e) && e[Tg] === !0;
}
function ld(e) {
  return (e.flags & 4) !== 0;
}
function Wn(e) {
  return e.componentOffset > -1;
}
function ja(e) {
  return (e.flags & 1) === 1;
}
function Wt(e) {
  return !!e.template;
}
function po(e) {
  return (e[R] & 512) !== 0;
}
function Er(e) {
  return (e[R] & 256) === 256;
}
var Ag = 'svg',
  Ng = 'math';
function yt(e) {
  for (; Array.isArray(e); ) e = e[St];
  return e;
}
function ud(e, n) {
  return yt(n[e]);
}
function At(e, n) {
  return yt(n[e.index]);
}
function bi(e, n) {
  return e.data[n];
}
function Va(e, n) {
  return e[n];
}
function dd(e, n, t, r) {
  t >= e.data.length && ((e.data[t] = null), (e.blueprint[t] = null)), (n[t] = r);
}
function Ct(e, n) {
  let t = n[e];
  return Gt(t) ? t : t[St];
}
function kg(e) {
  return (e[R] & 4) === 4;
}
function Ba(e) {
  return (e[R] & 128) === 128;
}
function Rg(e) {
  return Tt(e[Oe]);
}
function qt(e, n) {
  return n == null ? null : e[n];
}
function fd(e) {
  e[xr] = 0;
}
function pd(e) {
  e[R] & 1024 || ((e[R] |= 1024), Ba(e) && xi(e));
}
function Fg(e, n) {
  for (; e > 0; ) (n = n[Mr]), e--;
  return n;
}
function Mi(e) {
  return !!(e[R] & 9216 || e[ut]?.dirty);
}
function Ua(e) {
  e[zt].changeDetectionScheduler?.notify(8), e[R] & 64 && (e[R] |= 1024), Mi(e) && xi(e);
}
function xi(e) {
  e[zt].changeDetectionScheduler?.notify(0);
  let n = Bn(e);
  for (; n !== null && !(n[R] & 8192 || ((n[R] |= 8192), !Ba(n))); ) n = Bn(n);
}
function hd(e, n) {
  if (Er(e)) throw new y(911, !1);
  e[dn] === null && (e[dn] = []), e[dn].push(n);
}
function Lg(e, n) {
  if (e[dn] === null) return;
  let t = e[dn].indexOf(n);
  t !== -1 && e[dn].splice(t, 1);
}
function Bn(e) {
  let n = e[Oe];
  return Tt(n) ? n[Oe] : n;
}
function gd(e) {
  return (e[uo] ??= []);
}
function md(e) {
  return (e.cleanup ??= []);
}
function jg(e, n, t, r) {
  let o = gd(n);
  o.push(t), e.firstCreatePass && md(e).push(r, o.length - 1);
}
var B = { lFrame: Kg(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Vu = !1;
function Vg() {
  return B.lFrame.elementDepthCount;
}
function Bg() {
  B.lFrame.elementDepthCount++;
}
function vd() {
  B.lFrame.elementDepthCount--;
}
function Ug() {
  return B.bindingsEnabled;
}
function _d() {
  return B.skipHydrationRootTNode !== null;
}
function wd(e) {
  return B.skipHydrationRootTNode === e;
}
function yd() {
  B.skipHydrationRootTNode = null;
}
function F() {
  return B.lFrame.lView;
}
function he() {
  return B.lFrame.tView;
}
function nt(e) {
  return (B.lFrame.contextLView = e), e[pe];
}
function rt(e) {
  return (B.lFrame.contextLView = null), e;
}
function Re() {
  let e = Cd();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Cd() {
  return B.lFrame.currentTNode;
}
function Hg() {
  let e = B.lFrame,
    n = e.currentTNode;
  return e.isParent ? n : n.parent;
}
function ho(e, n) {
  let t = B.lFrame;
  (t.currentTNode = e), (t.isParent = n);
}
function bd() {
  return B.lFrame.isParent;
}
function Md() {
  B.lFrame.isParent = !1;
}
function zg() {
  return B.lFrame.contextLView;
}
function xd() {
  return Vu;
}
function Od(e) {
  let n = Vu;
  return (Vu = e), n;
}
function Oi() {
  let e = B.lFrame,
    n = e.bindingRootIndex;
  return n === -1 && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n;
}
function $g(e) {
  return (B.lFrame.bindingIndex = e);
}
function qn() {
  return B.lFrame.bindingIndex++;
}
function Pd(e) {
  let n = B.lFrame,
    t = n.bindingIndex;
  return (n.bindingIndex = n.bindingIndex + e), t;
}
function Gg() {
  return B.lFrame.inI18n;
}
function Wg(e, n) {
  let t = B.lFrame;
  (t.bindingIndex = t.bindingRootIndex = e), Ha(n);
}
function qg() {
  return B.lFrame.currentDirectiveIndex;
}
function Ha(e) {
  B.lFrame.currentDirectiveIndex = e;
}
function Zg(e) {
  let n = B.lFrame.currentDirectiveIndex;
  return n === -1 ? null : e[n];
}
function Ed() {
  return B.lFrame.currentQueryIndex;
}
function za(e) {
  B.lFrame.currentQueryIndex = e;
}
function MC(e) {
  let n = e[I];
  return n.type === 2 ? n.declTNode : n.type === 1 ? e[qe] : null;
}
function Dd(e, n, t) {
  if (t & 4) {
    let o = n,
      i = e;
    for (; (o = o.parent), o === null && !(t & 1); )
      if (((o = MC(i)), o === null || ((i = i[Mr]), o.type & 10))) break;
    if (o === null) return !1;
    (n = o), (e = i);
  }
  let r = (B.lFrame = Yg());
  return (r.currentTNode = n), (r.lView = e), !0;
}
function $a(e) {
  let n = Yg(),
    t = e[I];
  (B.lFrame = n),
    (n.currentTNode = t.firstChild),
    (n.lView = e),
    (n.tView = t),
    (n.contextLView = e),
    (n.bindingIndex = t.bindingStartIndex),
    (n.inI18n = !1);
}
function Yg() {
  let e = B.lFrame,
    n = e === null ? null : e.child;
  return n === null ? Kg(e) : n;
}
function Kg(e) {
  let n = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = n), n;
}
function Qg() {
  let e = B.lFrame;
  return (B.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Id = Qg;
function Ga() {
  let e = Qg();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function Jg(e) {
  return (B.lFrame.contextLView = Fg(e, B.lFrame.contextLView))[pe];
}
function hn() {
  return B.lFrame.selectedIndex;
}
function Zn(e) {
  B.lFrame.selectedIndex = e;
}
function Pi() {
  let e = B.lFrame;
  return bi(e.tView, e.selectedIndex);
}
function Xg() {
  return B.lFrame.currentNamespace;
}
var em = !0;
function Wa() {
  return em;
}
function qa(e) {
  em = e;
}
function Bu(e, n = null, t = null, r) {
  let o = Sd(e, n, t, r);
  return o.resolveInjectorInitializers(), o;
}
function Sd(e, n = null, t = null, r, o = new Set()) {
  let i = [t || Ge, Pg(e)];
  return (r = r || (typeof e == 'object' ? void 0 : fn(e))), new yr(i, n || _i(), r || null, o);
}
var ct = class e {
    static THROW_IF_NOT_FOUND = vr;
    static NULL = new pi();
    static create(n, t) {
      if (Array.isArray(n)) return Bu({ name: '' }, t, n, '');
      {
        let r = n.name ?? '';
        return Bu({ name: r }, n.parent, n.providers, r);
      }
    }
    static ɵprov = x({ token: e, providedIn: 'any', factory: () => E(Xu) });
    static __NG_ELEMENT_ID__ = -1;
  },
  J = new C(''),
  gn = (() => {
    class e {
      static __NG_ELEMENT_ID__ = xC;
      static __NG_ENV_ID__ = (t) => t;
    }
    return e;
  })(),
  Uu = class extends gn {
    _lView;
    constructor(n) {
      super(), (this._lView = n);
    }
    get destroyed() {
      return Er(this._lView);
    }
    onDestroy(n) {
      let t = this._lView;
      return hd(t, n), () => Lg(t, n);
    }
  };
function xC() {
  return new Uu(F());
}
var We = class {
    _console = console;
    handleError(n) {
      this._console.error('ERROR', n);
    }
  },
  Ye = new C('', {
    providedIn: 'root',
    factory: () => {
      let e = p(_e),
        n;
      return (t) => {
        e.destroyed && !n
          ? setTimeout(() => {
              throw t;
            })
          : ((n ??= e.get(We)), n.handleError(t));
      };
    },
  }),
  tm = { provide: Ut, useValue: () => void p(We), multi: !0 },
  OC = new C('', {
    providedIn: 'root',
    factory: () => {
      let e = p(J).defaultView;
      if (!e) return;
      let n = p(Ye),
        t = (i) => {
          n(i.reason), i.preventDefault();
        },
        r = (i) => {
          i.error ? n(i.error) : n(new Error(i.message, { cause: i })), i.preventDefault();
        },
        o = () => {
          e.addEventListener('unhandledrejection', t), e.addEventListener('error', r);
        };
      typeof Zone < 'u' ? Zone.root.run(o) : o(),
        p(gn).onDestroy(() => {
          e.removeEventListener('error', r), e.removeEventListener('unhandledrejection', t);
        });
    },
  });
function Td() {
  return Ht([Og(() => void p(OC))]);
}
function Ad(e) {
  return typeof e == 'function' && e[Ve] !== void 0;
}
function dt(e, n) {
  let [t, r, o] = pu(e, n?.equal),
    i = t,
    s = i[Ve];
  return (i.set = r), (i.update = o), (i.asReadonly = nm.bind(i)), i;
}
function nm() {
  let e = this[Ve];
  if (e.readonlyFn === void 0) {
    let n = () => this();
    (n[Ve] = e), (e.readonlyFn = n);
  }
  return e.readonlyFn;
}
function Nd(e) {
  return Ad(e) && typeof e.set == 'function';
}
var pn = class {},
  go = new C('', { providedIn: 'root', factory: () => !1 });
var kd = new C(''),
  Za = new C('');
var Zt = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      destroyed = !1;
      pendingTask = new Te(!1);
      get hasPendingTasks() {
        return this.destroyed ? !1 : this.pendingTask.value;
      }
      get hasPendingTasksObservable() {
        return this.destroyed
          ? new V((t) => {
              t.next(!1), t.complete();
            })
          : this.pendingTask;
      }
      add() {
        !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
        let t = this.taskId++;
        return this.pendingTasks.add(t), t;
      }
      has(t) {
        return this.pendingTasks.has(t);
      }
      remove(t) {
        this.pendingTasks.delete(t),
          this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1);
      }
      ngOnDestroy() {
        this.pendingTasks.clear(),
          this.hasPendingTasks && this.pendingTask.next(!1),
          (this.destroyed = !0),
          this.pendingTask.unsubscribe();
      }
      static ɵprov = x({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })(),
  Ya = (() => {
    class e {
      internalPendingTasks = p(Zt);
      scheduler = p(pn);
      errorHandler = p(Ye);
      add() {
        let t = this.internalPendingTasks.add();
        return () => {
          this.internalPendingTasks.has(t) &&
            (this.scheduler.notify(11), this.internalPendingTasks.remove(t));
        };
      }
      run(t) {
        let r = this.add();
        t().catch(this.errorHandler).finally(r);
      }
      static ɵprov = x({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })();
function Ei(...e) {}
var Rd = (() => {
    class e {
      static ɵprov = x({ token: e, providedIn: 'root', factory: () => new Hu() });
    }
    return e;
  })(),
  Hu = class {
    dirtyEffectCount = 0;
    queues = new Map();
    add(n) {
      this.enqueue(n), this.schedule(n);
    }
    schedule(n) {
      n.dirty && this.dirtyEffectCount++;
    }
    remove(n) {
      let t = n.zone,
        r = this.queues.get(t);
      r.has(n) && (r.delete(n), n.dirty && this.dirtyEffectCount--);
    }
    enqueue(n) {
      let t = n.zone;
      this.queues.has(t) || this.queues.set(t, new Set());
      let r = this.queues.get(t);
      r.has(n) || r.add(n);
    }
    flush() {
      for (; this.dirtyEffectCount > 0; ) {
        let n = !1;
        for (let [t, r] of this.queues)
          t === null ? (n ||= this.flushQueue(r)) : (n ||= t.run(() => this.flushQueue(r)));
        n || (this.dirtyEffectCount = 0);
      }
    }
    flushQueue(n) {
      let t = !1;
      for (let r of n) r.dirty && (this.dirtyEffectCount--, (t = !0), r.run());
      return t;
    }
  };
function Li(e) {
  return { toString: e }.toString();
}
function kC(e) {
  return typeof e == 'function';
}
var ic = class {
  previousValue;
  currentValue;
  firstChange;
  constructor(n, t, r) {
    (this.previousValue = n), (this.currentValue = t), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Lm(e, n, t, r) {
  n !== null ? n.applyValueToInputSignal(n, r) : (e[t] = r);
}
var ft = (() => {
  let e = () => jm;
  return (e.ngInherit = !0), e;
})();
function jm(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = FC), RC;
}
function RC() {
  let e = Bm(this),
    n = e?.current;
  if (n) {
    let t = e.previous;
    if (t === Un) e.previous = n;
    else for (let r in n) t[r] = n[r];
    (e.current = null), this.ngOnChanges(n);
  }
}
function FC(e, n, t, r, o) {
  let i = this.declaredInputs[r],
    s = Bm(e) || LC(e, { previous: Un, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[i];
  (a[i] = new ic(l && l.currentValue, t, c === Un)), Lm(e, n, o, t);
}
var Vm = '__ngSimpleChanges__';
function Bm(e) {
  return e[Vm] || null;
}
function LC(e, n) {
  return (e[Vm] = n);
}
var rm = [];
var X = function (e, n = null, t) {
  for (let r = 0; r < rm.length; r++) {
    let o = rm[r];
    o(e, n, t);
  }
};
function jC(e, n, t) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = n.type.prototype;
  if (r) {
    let s = jm(n);
    (t.preOrderHooks ??= []).push(e, s), (t.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (t.preOrderHooks ??= []).push(0 - e, o),
    i && ((t.preOrderHooks ??= []).push(e, i), (t.preOrderCheckHooks ??= []).push(e, i));
}
function VC(e, n) {
  for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
    let i = e.data[t].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = i;
    s && (e.contentHooks ??= []).push(-t, s),
      a && ((e.contentHooks ??= []).push(t, a), (e.contentCheckHooks ??= []).push(t, a)),
      c && (e.viewHooks ??= []).push(-t, c),
      l && ((e.viewHooks ??= []).push(t, l), (e.viewCheckHooks ??= []).push(t, l)),
      u != null && (e.destroyHooks ??= []).push(t, u);
  }
}
function tc(e, n, t) {
  Um(e, n, 3, t);
}
function nc(e, n, t, r) {
  (e[R] & 3) === t && Um(e, n, t, r);
}
function Fd(e, n) {
  let t = e[R];
  (t & 3) === n && ((t &= 16383), (t += 1), (e[R] = t));
}
function Um(e, n, t, r) {
  let o = r !== void 0 ? e[xr] & 65535 : 0,
    i = r ?? -1,
    s = n.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof n[c + 1] == 'number') {
      if (((a = n[c]), r != null && a >= r)) break;
    } else
      n[c] < 0 && (e[xr] += 65536),
        (a < i || i == -1) && (BC(e, t, n, c), (e[xr] = (e[xr] & 4294901760) + c + 2)),
        c++;
}
function om(e, n) {
  X(4, e, n);
  let t = A(null);
  try {
    n.call(e);
  } finally {
    A(t), X(5, e, n);
  }
}
function BC(e, n, t, r) {
  let o = t[r] < 0,
    i = t[r + 1],
    s = o ? -t[r] : t[r],
    a = e[s];
  o ? e[R] >> 14 < e[xr] >> 16 && (e[R] & 3) === n && ((e[R] += 16384), om(a, i)) : om(a, i);
}
var vo = -1,
  Ir = class {
    factory;
    name;
    injectImpl;
    resolving = !1;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(n, t, r, o) {
      (this.factory = n), (this.name = o), (this.canSeeViewProviders = t), (this.injectImpl = r);
    }
  };
function UC(e) {
  return (e.flags & 8) !== 0;
}
function HC(e) {
  return (e.flags & 16) !== 0;
}
function zC(e, n, t) {
  let r = 0;
  for (; r < t.length; ) {
    let o = t[r];
    if (typeof o == 'number') {
      if (o !== 0) break;
      r++;
      let i = t[r++],
        s = t[r++],
        a = t[r++];
      e.setAttribute(n, s, a, i);
    } else {
      let i = o,
        s = t[++r];
      $C(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++;
    }
  }
  return r;
}
function Hm(e) {
  return e === 3 || e === 4 || e === 6;
}
function $C(e) {
  return e.charCodeAt(0) === 64;
}
function _o(e, n) {
  if (!(n === null || n.length === 0))
    if (e === null || e.length === 0) e = n.slice();
    else {
      let t = -1;
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        typeof o == 'number'
          ? (t = o)
          : t === 0 || (t === -1 || t === 2 ? im(e, t, o, null, n[++r]) : im(e, t, o, null, null));
      }
    }
  return e;
}
function im(e, n, t, r, o) {
  let i = 0,
    s = e.length;
  if (n === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == 'number') {
        if (a === n) {
          s = -1;
          break;
        } else if (a > n) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == 'number') break;
    if (a === t) {
      o !== null && (e[i + 1] = o);
      return;
    }
    i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, n), (i = s + 1)),
    e.splice(i++, 0, t),
    o !== null && e.splice(i++, 0, o);
}
function zm(e) {
  return e !== vo;
}
function sc(e) {
  return e & 32767;
}
function GC(e) {
  return e >> 16;
}
function ac(e, n) {
  let t = GC(e),
    r = n;
  for (; t > 0; ) (r = r[Mr]), t--;
  return r;
}
var Zd = !0;
function cc(e) {
  let n = Zd;
  return (Zd = e), n;
}
var WC = 256,
  $m = WC - 1,
  Gm = 5,
  qC = 0,
  Yt = {};
function ZC(e, n, t) {
  let r;
  typeof t == 'string' ? (r = t.charCodeAt(0) || 0) : t.hasOwnProperty(Cr) && (r = t[Cr]),
    r == null && (r = t[Cr] = qC++);
  let o = r & $m,
    i = 1 << o;
  n.data[e + (o >> Gm)] |= i;
}
function lc(e, n) {
  let t = Wm(e, n);
  if (t !== -1) return t;
  let r = n[I];
  r.firstCreatePass &&
    ((e.injectorIndex = n.length), Ld(r.data, e), Ld(n, null), Ld(r.blueprint, null));
  let o = kf(e, n),
    i = e.injectorIndex;
  if (zm(o)) {
    let s = sc(o),
      a = ac(o, n),
      c = a[I].data;
    for (let l = 0; l < 8; l++) n[i + l] = a[s + l] | c[s + l];
  }
  return (n[i + 8] = o), i;
}
function Ld(e, n) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
}
function Wm(e, n) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    n[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function kf(e, n) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let t = 0,
    r = null,
    o = n;
  for (; o !== null; ) {
    if (((r = Qm(o)), r === null)) return vo;
    if ((t++, (o = o[Mr]), r.injectorIndex !== -1)) return r.injectorIndex | (t << 16);
  }
  return vo;
}
function Yd(e, n, t) {
  ZC(e, n, t);
}
function YC(e, n) {
  if (n === 'class') return e.classes;
  if (n === 'style') return e.styles;
  let t = e.attrs;
  if (t) {
    let r = t.length,
      o = 0;
    for (; o < r; ) {
      let i = t[o];
      if (Hm(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == 'number') for (o++; o < r && typeof t[o] == 'string'; ) o++;
      else {
        if (i === n) return t[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function qm(e, n, t) {
  if (t & 8 || e !== void 0) return e;
  Aa(n, 'NodeInjector');
}
function Zm(e, n, t, r) {
  if ((t & 8 && r === void 0 && (r = null), (t & 3) === 0)) {
    let o = e[zn],
      i = $e(void 0);
    try {
      return o ? o.get(n, r, t & 8) : Qu(n, r, t & 8);
    } finally {
      $e(i);
    }
  }
  return qm(r, n, t);
}
function Ym(e, n, t, r = 0, o) {
  if (e !== null) {
    if (n[R] & 2048 && !(r & 2)) {
      let s = XC(e, n, t, r, Yt);
      if (s !== Yt) return s;
    }
    let i = Km(e, n, t, r, Yt);
    if (i !== Yt) return i;
  }
  return Zm(n, t, r, o);
}
function Km(e, n, t, r, o) {
  let i = QC(t);
  if (typeof i == 'function') {
    if (!Dd(n, e, r)) return r & 1 ? qm(o, t, r) : Zm(n, t, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & 8))) Aa(t);
      else return s;
    } finally {
      Id();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = Wm(e, n),
      c = vo,
      l = r & 1 ? n[Ze][qe] : null;
    for (
      (a === -1 || r & 4) &&
      ((c = a === -1 ? kf(e, n) : n[a + 8]),
      c === vo || !am(r, !1) ? (a = -1) : ((s = n[I]), (a = sc(c)), (n = ac(c, n))));
      a !== -1;

    ) {
      let u = n[I];
      if (sm(i, a, u.data)) {
        let d = KC(a, n, t, s, r, l);
        if (d !== Yt) return d;
      }
      (c = n[a + 8]),
        c !== vo && am(r, n[I].data[a + 8] === l) && sm(i, a, n)
          ? ((s = u), (a = sc(c)), (n = ac(c, n)))
          : (a = -1);
    }
  }
  return o;
}
function KC(e, n, t, r, o, i) {
  let s = n[I],
    a = s.data[e + 8],
    c = r == null ? Wn(a) && Zd : r != s && (a.type & 3) !== 0,
    l = o & 1 && i === a,
    u = rc(a, s, t, c, l);
  return u !== null ? Si(n, s, u, a, o) : Yt;
}
function rc(e, n, t, r, o) {
  let i = e.providerIndexes,
    s = n.data,
    a = i & 1048575,
    c = e.directiveStart,
    l = e.directiveEnd,
    u = i >> 20,
    d = r ? a : a + u,
    h = o ? a + u : l;
  for (let f = d; f < h; f++) {
    let _ = s[f];
    if ((f < c && t === _) || (f >= c && _.type === t)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && Wt(f) && f.type === t) return c;
  }
  return null;
}
function Si(e, n, t, r, o) {
  let i = e[t],
    s = n.data;
  if (i instanceof Ir) {
    let a = i;
    if (a.resolving) {
      let f = mg(s[t]);
      throw Ku(f);
    }
    let c = cc(a.canSeeViewProviders);
    a.resolving = !0;
    let l = s[t].type || s[t],
      u,
      d = a.injectImpl ? $e(a.injectImpl) : null,
      h = Dd(e, r, 0);
    try {
      (i = e[t] = a.factory(void 0, o, s, e, r)),
        n.firstCreatePass && t >= r.directiveStart && jC(t, s[t], n);
    } finally {
      d !== null && $e(d), cc(c), (a.resolving = !1), Id();
    }
  }
  return i;
}
function QC(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let n = e.hasOwnProperty(Cr) ? e[Cr] : void 0;
  return typeof n == 'number' ? (n >= 0 ? n & $m : JC) : n;
}
function sm(e, n, t) {
  let r = 1 << e;
  return !!(t[n + (e >> Gm)] & r);
}
function am(e, n) {
  return !(e & 2) && !(e & 1 && n);
}
var Dr = class {
  _tNode;
  _lView;
  constructor(n, t) {
    (this._tNode = n), (this._lView = t);
  }
  get(n, t, r) {
    return Ym(this._tNode, this._lView, n, _r(r), t);
  }
};
function JC() {
  return new Dr(Re(), F());
}
function _n(e) {
  return Li(() => {
    let n = e.prototype.constructor,
      t = n[fi] || Kd(n),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[fi] || Kd(o);
      if (i && i !== t) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function Kd(e) {
  return zu(e)
    ? () => {
        let n = Kd(Ne(e));
        return n && n();
      }
    : Vn(e);
}
function XC(e, n, t, r, o) {
  let i = e,
    s = n;
  for (; i !== null && s !== null && s[R] & 2048 && !po(s); ) {
    let a = Km(i, s, t, r | 2, Yt);
    if (a !== Yt) return a;
    let c = i.parent;
    if (!c) {
      let l = s[ad];
      if (l) {
        let u = l.get(t, Yt, r);
        if (u !== Yt) return u;
      }
      (c = Qm(s)), (s = s[Mr]);
    }
    i = c;
  }
  return o;
}
function Qm(e) {
  let n = e[I],
    t = n.type;
  return t === 2 ? n.declTNode : t === 1 ? e[qe] : null;
}
function ji(e) {
  return YC(Re(), e);
}
function eb() {
  return xo(Re(), F());
}
function xo(e, n) {
  return new Ke(At(e, n));
}
var Ke = (() => {
  class e {
    nativeElement;
    constructor(t) {
      this.nativeElement = t;
    }
    static __NG_ELEMENT_ID__ = eb;
  }
  return e;
})();
function tb(e) {
  return e instanceof Ke ? e.nativeElement : e;
}
function nb() {
  return this._results[Symbol.iterator]();
}
var uc = class {
  _emitDistinctChangesOnly;
  dirty = !0;
  _onDirty = void 0;
  _results = [];
  _changesDetected = !1;
  _changes = void 0;
  length = 0;
  first = void 0;
  last = void 0;
  get changes() {
    return (this._changes ??= new re());
  }
  constructor(n = !1) {
    this._emitDistinctChangesOnly = n;
  }
  get(n) {
    return this._results[n];
  }
  map(n) {
    return this._results.map(n);
  }
  filter(n) {
    return this._results.filter(n);
  }
  find(n) {
    return this._results.find(n);
  }
  reduce(n, t) {
    return this._results.reduce(n, t);
  }
  forEach(n) {
    this._results.forEach(n);
  }
  some(n) {
    return this._results.some(n);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(n, t) {
    this.dirty = !1;
    let r = Cg(n);
    (this._changesDetected = !yg(this._results, r, t)) &&
      ((this._results = r),
      (this.length = r.length),
      (this.last = r[this.length - 1]),
      (this.first = r[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.next(this);
  }
  onDirty(n) {
    this._onDirty = n;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe());
  }
  [Symbol.iterator] = nb;
};
function Jm(e) {
  return (e.flags & 128) === 128;
}
var Rf = (function (e) {
    return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e;
  })(Rf || {}),
  Xm = new Map(),
  rb = 0;
function ob() {
  return rb++;
}
function ib(e) {
  Xm.set(e[wi], e);
}
function Qd(e) {
  Xm.delete(e[wi]);
}
var cm = '__ngContext__';
function wo(e, n) {
  Gt(n) ? ((e[cm] = n[wi]), ib(n)) : (e[cm] = n);
}
function ev(e) {
  return nv(e[fo]);
}
function tv(e) {
  return nv(e[wt]);
}
function nv(e) {
  for (; e !== null && !Tt(e); ) e = e[wt];
  return e;
}
var Jd;
function Ff(e) {
  Jd = e;
}
function rv() {
  if (Jd !== void 0) return Jd;
  if (typeof document < 'u') return document;
  throw new y(210, !1);
}
var Mc = new C('', { providedIn: 'root', factory: () => sb }),
  sb = 'ng',
  xc = new C(''),
  Kn = new C('', { providedIn: 'platform', factory: () => 'unknown' });
var Oo = new C('', {
  providedIn: 'root',
  factory: () => rv().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
});
var ab = 'h',
  cb = 'b';
var ov = 'r';
var iv = 'di';
var sv = !1,
  av = new C('', { providedIn: 'root', factory: () => sv });
var lb = (e, n, t, r) => {};
function ub(e, n, t, r) {
  lb(e, n, t, r);
}
function Oc(e) {
  return (e.flags & 32) === 32;
}
var db = () => null;
function cv(e, n, t = !1) {
  return db(e, n, t);
}
function lv(e, n) {
  let t = e.contentQueries;
  if (t !== null) {
    let r = A(null);
    try {
      for (let o = 0; o < t.length; o += 2) {
        let i = t[o],
          s = t[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          za(i), a.contentQueries(2, n[s], s);
        }
      }
    } finally {
      A(r);
    }
  }
}
function Xd(e, n, t) {
  za(0);
  let r = A(null);
  try {
    n(e, t);
  } finally {
    A(r);
  }
}
function uv(e, n, t) {
  if (ld(n)) {
    let r = A(null);
    try {
      let o = n.directiveStart,
        i = n.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = t[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      A(r);
    }
  }
}
var mn = (function (e) {
    return (
      (e[(e.Emulated = 0)] = 'Emulated'),
      (e[(e.None = 2)] = 'None'),
      (e[(e.ShadowDom = 3)] = 'ShadowDom'),
      e
    );
  })(mn || {}),
  Ka;
function fb() {
  if (Ka === void 0 && ((Ka = null), _t.trustedTypes))
    try {
      Ka = _t.trustedTypes.createPolicy('angular', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Ka;
}
function Pc(e) {
  return fb()?.createHTML(e) || e;
}
var Qa;
function pb() {
  if (Qa === void 0 && ((Qa = null), _t.trustedTypes))
    try {
      Qa = _t.trustedTypes.createPolicy('angular#unsafe-bypass', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Qa;
}
function lm(e) {
  return pb()?.createScriptURL(e) || e;
}
var vn = class {
    changingThisBreaksApplicationSecurity;
    constructor(n) {
      this.changingThisBreaksApplicationSecurity = n;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ia})`;
    }
  },
  ef = class extends vn {
    getTypeName() {
      return 'HTML';
    }
  },
  tf = class extends vn {
    getTypeName() {
      return 'Style';
    }
  },
  nf = class extends vn {
    getTypeName() {
      return 'Script';
    }
  },
  rf = class extends vn {
    getTypeName() {
      return 'URL';
    }
  },
  of = class extends vn {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function Rt(e) {
  return e instanceof vn ? e.changingThisBreaksApplicationSecurity : e;
}
function wn(e, n) {
  let t = dv(e);
  if (t != null && t !== n) {
    if (t === 'ResourceURL' && n === 'URL') return !0;
    throw new Error(`Required a safe ${n}, got a ${t} (see ${Ia})`);
  }
  return t === n;
}
function dv(e) {
  return (e instanceof vn && e.getTypeName()) || null;
}
function Lf(e) {
  return new ef(e);
}
function jf(e) {
  return new tf(e);
}
function Vf(e) {
  return new nf(e);
}
function Bf(e) {
  return new rf(e);
}
function Uf(e) {
  return new of(e);
}
function hb(e) {
  let n = new af(e);
  return gb() ? new sf(n) : n;
}
var sf = class {
    inertDocumentHelper;
    constructor(n) {
      this.inertDocumentHelper = n;
    }
    getInertBodyElement(n) {
      n = '<body><remove></remove>' + n;
      try {
        let t = new window.DOMParser().parseFromString(Pc(n), 'text/html').body;
        return t === null
          ? this.inertDocumentHelper.getInertBodyElement(n)
          : (t.firstChild?.remove(), t);
      } catch {
        return null;
      }
    }
  },
  af = class {
    defaultDoc;
    inertDocument;
    constructor(n) {
      (this.defaultDoc = n),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument('sanitization-inert'));
    }
    getInertBodyElement(n) {
      let t = this.inertDocument.createElement('template');
      return (t.innerHTML = Pc(n)), t;
    }
  };
function gb() {
  try {
    return !!new window.DOMParser().parseFromString(Pc(''), 'text/html');
  } catch {
    return !1;
  }
}
var mb = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Vi(e) {
  return (e = String(e)), e.match(mb) ? e : 'unsafe:' + e;
}
function yn(e) {
  let n = {};
  for (let t of e.split(',')) n[t] = !0;
  return n;
}
function Bi(...e) {
  let n = {};
  for (let t of e) for (let r in t) t.hasOwnProperty(r) && (n[r] = !0);
  return n;
}
var fv = yn('area,br,col,hr,img,wbr'),
  pv = yn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  hv = yn('rp,rt'),
  vb = Bi(hv, pv),
  _b = Bi(
    pv,
    yn(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
    )
  ),
  wb = Bi(
    hv,
    yn(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
    )
  ),
  um = Bi(fv, _b, wb, vb),
  gv = yn('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  yb = yn(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
  ),
  Cb = yn(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
  ),
  bb = Bi(gv, yb, Cb),
  Mb = yn('script,style,template'),
  cf = class {
    sanitizedSomething = !1;
    buf = [];
    sanitizeChildren(n) {
      let t = n.firstChild,
        r = !0,
        o = [];
      for (; t; ) {
        if (
          (t.nodeType === Node.ELEMENT_NODE
            ? (r = this.startElement(t))
            : t.nodeType === Node.TEXT_NODE
            ? this.chars(t.nodeValue)
            : (this.sanitizedSomething = !0),
          r && t.firstChild)
        ) {
          o.push(t), (t = Pb(t));
          continue;
        }
        for (; t; ) {
          t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
          let i = Ob(t);
          if (i) {
            t = i;
            break;
          }
          t = o.pop();
        }
      }
      return this.buf.join('');
    }
    startElement(n) {
      let t = dm(n).toLowerCase();
      if (!um.hasOwnProperty(t)) return (this.sanitizedSomething = !0), !Mb.hasOwnProperty(t);
      this.buf.push('<'), this.buf.push(t);
      let r = n.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o),
          s = i.name,
          a = s.toLowerCase();
        if (!bb.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let c = i.value;
        gv[a] && (c = Vi(c)), this.buf.push(' ', s, '="', fm(c), '"');
      }
      return this.buf.push('>'), !0;
    }
    endElement(n) {
      let t = dm(n).toLowerCase();
      um.hasOwnProperty(t) &&
        !fv.hasOwnProperty(t) &&
        (this.buf.push('</'), this.buf.push(t), this.buf.push('>'));
    }
    chars(n) {
      this.buf.push(fm(n));
    }
  };
function xb(e, n) {
  return (
    (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function Ob(e) {
  let n = e.nextSibling;
  if (n && e !== n.previousSibling) throw mv(n);
  return n;
}
function Pb(e) {
  let n = e.firstChild;
  if (n && xb(e, n)) throw mv(n);
  return n;
}
function dm(e) {
  let n = e.nodeName;
  return typeof n == 'string' ? n : 'FORM';
}
function mv(e) {
  return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
}
var Eb = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  Db = /([^\#-~ |!])/g;
function fm(e) {
  return e
    .replace(/&/g, '&amp;')
    .replace(Eb, function (n) {
      let t = n.charCodeAt(0),
        r = n.charCodeAt(1);
      return '&#' + ((t - 55296) * 1024 + (r - 56320) + 65536) + ';';
    })
    .replace(Db, function (n) {
      return '&#' + n.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var Ja;
function Hf(e, n) {
  let t = null;
  try {
    Ja = Ja || hb(e);
    let r = n ? String(n) : '';
    t = Ja.getInertBodyElement(r);
    let o = 5,
      i = r;
    do {
      if (o === 0) throw new Error('Failed to sanitize html because the input is unstable');
      o--, (r = i), (i = t.innerHTML), (t = Ja.getInertBodyElement(r));
    } while (r !== i);
    let a = new cf().sanitizeChildren(pm(t) || t);
    return Pc(a);
  } finally {
    if (t) {
      let r = pm(t) || t;
      for (; r.firstChild; ) r.firstChild.remove();
    }
  }
}
function pm(e) {
  return 'content' in e && Ib(e) ? e.content : null;
}
function Ib(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === 'TEMPLATE';
}
var Fe = (function (e) {
  return (
    (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.HTML = 1)] = 'HTML'),
    (e[(e.STYLE = 2)] = 'STYLE'),
    (e[(e.SCRIPT = 3)] = 'SCRIPT'),
    (e[(e.URL = 4)] = 'URL'),
    (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    e
  );
})(Fe || {});
function Qt(e) {
  let n = _v();
  return n ? n.sanitize(Fe.URL, e) || '' : wn(e, 'URL') ? Rt(e) : Vi(gi(e));
}
function vv(e) {
  let n = _v();
  if (n) return lm(n.sanitize(Fe.RESOURCE_URL, e) || '');
  if (wn(e, 'ResourceURL')) return lm(Rt(e));
  throw new y(904, !1);
}
function Sb(e, n) {
  return (n === 'src' &&
    (e === 'embed' || e === 'frame' || e === 'iframe' || e === 'media' || e === 'script')) ||
    (n === 'href' && (e === 'base' || e === 'link'))
    ? vv
    : Qt;
}
function zf(e, n, t) {
  return Sb(n, t)(e);
}
function _v() {
  let e = F();
  return e && e[zt].sanitizer;
}
function wv(e) {
  return e instanceof Function ? e() : e;
}
function Tb(e, n, t) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(n, t);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = n.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    t = o + 1;
  }
}
var yv = 'ng-template';
function Ab(e, n, t, r) {
  let o = 0;
  if (r) {
    for (; o < n.length && typeof n[o] == 'string'; o += 2)
      if (n[o] === 'class' && Tb(n[o + 1].toLowerCase(), t, 0) !== -1) return !0;
  } else if ($f(e)) return !1;
  if (((o = n.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < n.length && typeof (i = n[o]) == 'string'; ) if (i.toLowerCase() === t) return !0;
  }
  return !1;
}
function $f(e) {
  return e.type === 4 && e.value !== yv;
}
function Nb(e, n, t) {
  let r = e.type === 4 && !t ? yv : e.value;
  return n === r;
}
function kb(e, n, t) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? Lb(o) : 0,
    s = !1;
  for (let a = 0; a < n.length; a++) {
    let c = n[a];
    if (typeof c == 'number') {
      if (!s && !Nt(r) && !Nt(c)) return !1;
      if (s && Nt(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (((r = 2 | (r & 1)), (c !== '' && !Nb(e, c, t)) || (c === '' && n.length === 1))) {
          if (Nt(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !Ab(e, o, c, t)) {
          if (Nt(r)) return !1;
          s = !0;
        }
      } else {
        let l = n[++a],
          u = Rb(c, o, $f(e), t);
        if (u === -1) {
          if (Nt(r)) return !1;
          s = !0;
          continue;
        }
        if (l !== '') {
          let d;
          if ((u > i ? (d = '') : (d = o[u + 1].toLowerCase()), r & 2 && l !== d)) {
            if (Nt(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return Nt(r) || s;
}
function Nt(e) {
  return (e & 1) === 0;
}
function Rb(e, n, t, r) {
  if (n === null) return -1;
  let o = 0;
  if (r || !t) {
    let i = !1;
    for (; o < n.length; ) {
      let s = n[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = n[++o];
        for (; typeof a == 'string'; ) a = n[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return jb(n, e);
}
function Cv(e, n, t = !1) {
  for (let r = 0; r < n.length; r++) if (kb(e, n[r], t)) return !0;
  return !1;
}
function Fb(e) {
  let n = e.attrs;
  if (n != null) {
    let t = n.indexOf(5);
    if ((t & 1) === 0) return n[t + 1];
  }
  return null;
}
function Lb(e) {
  for (let n = 0; n < e.length; n++) {
    let t = e[n];
    if (Hm(t)) return n;
  }
  return e.length;
}
function jb(e, n) {
  let t = e.indexOf(4);
  if (t > -1)
    for (t++; t < e.length; ) {
      let r = e[t];
      if (typeof r == 'number') return -1;
      if (r === n) return t;
      t++;
    }
  return -1;
}
function Vb(e, n) {
  e: for (let t = 0; t < n.length; t++) {
    let r = n[t];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
      return !0;
    }
  }
  return !1;
}
function hm(e, n) {
  return e ? ':not(' + n.trim() + ')' : n;
}
function Bb(e) {
  let n = e[0],
    t = 1,
    r = 2,
    o = '',
    i = !1;
  for (; t < e.length; ) {
    let s = e[t];
    if (typeof s == 'string')
      if (r & 2) {
        let a = e[++t];
        o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
    else o !== '' && !Nt(s) && ((n += hm(i, o)), (o = '')), (r = s), (i = i || !Nt(r));
    t++;
  }
  return o !== '' && (n += hm(i, o)), n;
}
function Ub(e) {
  return e.map(Bb).join(',');
}
function Hb(e) {
  let n = [],
    t = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == 'string') o === 2 ? i !== '' && n.push(i, e[++r]) : o === 8 && t.push(i);
    else {
      if (!Nt(o)) break;
      o = i;
    }
    r++;
  }
  return t.length && n.push(1, ...t), n;
}
var pt = {};
function zb(e, n) {
  return e.createText(n);
}
function $b(e, n, t) {
  e.setValue(n, t);
}
function bv(e, n, t) {
  return e.createElement(n, t);
}
function dc(e, n, t, r, o) {
  e.insertBefore(n, t, r, o);
}
function Mv(e, n, t) {
  e.appendChild(n, t);
}
function gm(e, n, t, r, o) {
  r !== null ? dc(e, n, t, r, o) : Mv(e, n, t);
}
function xv(e, n, t, r) {
  e.removeChild(null, n, t, r);
}
function Gb(e, n, t) {
  e.setAttribute(n, 'style', t);
}
function Wb(e, n, t) {
  t === '' ? e.removeAttribute(n, 'class') : e.setAttribute(n, 'class', t);
}
function Ov(e, n, t) {
  let { mergedAttrs: r, classes: o, styles: i } = t;
  r !== null && zC(e, n, r), o !== null && Wb(e, n, o), i !== null && Gb(e, n, i);
}
function Gf(e, n, t, r, o, i, s, a, c, l, u) {
  let d = ue + r,
    h = d + o,
    f = qb(d, h),
    _ = typeof l == 'function' ? l() : l;
  return (f[I] = {
    type: e,
    blueprint: f,
    template: t,
    queries: null,
    viewQuery: a,
    declTNode: n,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: h,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == 'function' ? i() : i,
    pipeRegistry: typeof s == 'function' ? s() : s,
    firstChild: null,
    schemas: c,
    consts: _,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function qb(e, n) {
  let t = [];
  for (let r = 0; r < n; r++) t.push(r < e ? null : pt);
  return t;
}
function Zb(e) {
  let n = e.tView;
  return n === null || n.incompleteFirstPass
    ? (e.tView = Gf(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : n;
}
function Wf(e, n, t, r, o, i, s, a, c, l, u) {
  let d = n.blueprint.slice();
  return (
    (d[St] = o),
    (d[R] = r | 4 | 128 | 8 | 64 | 1024),
    (l !== null || (e && e[R] & 2048)) && (d[R] |= 2048),
    fd(d),
    (d[Oe] = d[Mr] = e),
    (d[pe] = t),
    (d[zt] = s || (e && e[zt])),
    (d[ee] = a || (e && e[ee])),
    (d[zn] = c || (e && e[zn]) || null),
    (d[qe] = i),
    (d[wi] = ob()),
    (d[br] = u),
    (d[ad] = l),
    (d[Ze] = n.type == 2 ? e[Ze] : d),
    d
  );
}
function Yb(e, n, t) {
  let r = At(n, e),
    o = Zb(t),
    i = e[zt].rendererFactory,
    s = qf(e, Wf(e, o, null, Pv(t), r, n, null, i.createRenderer(r, t), null, null, null));
  return (e[n.index] = s);
}
function Pv(e) {
  let n = 16;
  return e.signals ? (n = 4096) : e.onPush && (n = 64), n;
}
function Ev(e, n, t, r) {
  if (t === 0) return -1;
  let o = n.length;
  for (let i = 0; i < t; i++) n.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function qf(e, n) {
  return e[fo] ? (e[sd][wt] = n) : (e[fo] = n), (e[sd] = n), n;
}
function D(e = 1) {
  Dv(he(), F(), hn() + e, !1);
}
function Dv(e, n, t, r) {
  if (!r)
    if ((n[R] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && tc(n, i, t);
    } else {
      let i = e.preOrderHooks;
      i !== null && nc(n, i, 0, t);
    }
  Zn(t);
}
var Ec = (function (e) {
  return (
    (e[(e.None = 0)] = 'None'),
    (e[(e.SignalBased = 1)] = 'SignalBased'),
    (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
    e
  );
})(Ec || {});
function lf(e, n, t, r) {
  let o = A(null);
  try {
    let [i, s, a] = e.inputs[t],
      c = null;
    (s & Ec.SignalBased) !== 0 && (c = n[i][Ve]),
      c !== null && c.transformFn !== void 0
        ? (r = c.transformFn(r))
        : a !== null && (r = a.call(n, r)),
      e.setInput !== null ? e.setInput(n, c, r, t, i) : Lm(n, c, i, r);
  } finally {
    A(o);
  }
}
var Kt = (function (e) {
    return (e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e;
  })(Kt || {}),
  Kb;
function Zf(e, n) {
  return Kb(e, n);
}
var Ui = new Set();
var Iv = new C('', { providedIn: 'root', factory: () => ({ queue: new Set(), isScheduled: !1 }) });
function mm(e, n, t, r) {
  let o = e?.[Or]?.enter;
  if (n !== null && o && o.has(t.index)) {
    let i = r.get(Iv);
    for (let s of o.get(t.index).animateFns) i.queue.add(s);
  }
}
function mo(e, n, t, r, o, i, s, a) {
  if (o != null) {
    let c,
      l = !1;
    Tt(o) ? (c = o) : Gt(o) && ((l = !0), (o = o[St]));
    let u = yt(o);
    e === 0 && r !== null
      ? (mm(a, r, i, t), s == null ? Mv(n, r, u) : dc(n, r, u, s || null, !0))
      : e === 1 && r !== null
      ? (mm(a, r, i, t), dc(n, r, u, s || null, !0))
      : e === 2
      ? vm(a, i, t, (d) => {
          xv(n, u, l, d);
        })
      : e === 3 &&
        vm(a, i, t, () => {
          n.destroyNode(u);
        }),
      c != null && cM(n, e, t, c, i, r, s);
  }
}
function Qb(e, n) {
  let t = e.get(Iv);
  if (Array.isArray(n)) for (let r of n) t.queue.add(r);
  else t.queue.add(n);
}
function Jb(e, n) {
  Sv(e, n), (n[St] = null), (n[qe] = null);
}
function Xb(e, n, t, r, o, i) {
  (r[St] = o), (r[qe] = n), Ic(e, r, t, 1, o, i);
}
function Sv(e, n) {
  n[zt].changeDetectionScheduler?.notify(9), Ic(e, n, n[ee], 2, null, null);
}
function eM(e) {
  let n = e[fo];
  if (!n) return jd(e[I], e);
  for (; n; ) {
    let t = null;
    if (Gt(n)) t = n[fo];
    else {
      let r = n[ye];
      r && (t = r);
    }
    if (!t) {
      for (; n && !n[wt] && n !== e; ) Gt(n) && jd(n[I], n), (n = n[Oe]);
      n === null && (n = e), Gt(n) && jd(n[I], n), (t = n && n[wt]);
    }
    n = t;
  }
}
function Yf(e, n) {
  let t = e[Pr],
    r = t.indexOf(n);
  t.splice(r, 1);
}
function Dc(e, n) {
  if (Er(n)) return;
  let t = n[ee];
  t.destroyNode && Ic(e, n, t, 3, null, null), eM(n);
}
function jd(e, n) {
  if (Er(n)) return;
  let t = A(null);
  try {
    (n[R] &= -129),
      (n[R] |= 256),
      n[ut] && ii(n[ut]),
      rM(e, n),
      nM(e, n),
      n[I].type === 1 && n[ee].destroy();
    let r = n[$n];
    if (r !== null && Tt(n[Oe])) {
      r !== n[Oe] && Yf(r, n);
      let o = n[$t];
      o !== null && o.detachView(e);
    }
    Qd(n);
  } finally {
    A(t);
  }
}
function vm(e, n, t, r) {
  let o = e?.[Or];
  if (o == null || o.leave == null || !o.leave.has(n.index)) return r(!1);
  if (o.skipLeaveAnimations) return (o.skipLeaveAnimations = !1), r(!1);
  Qb(t, () => {
    if (o.leave && o.leave.has(n.index)) {
      let s = o.leave.get(n.index),
        a = [];
      if (s)
        for (let c = 0; c < s.animateFns.length; c++) {
          let l = s.animateFns[c],
            { promise: u } = l();
          a.push(u);
        }
      (o.running = Promise.allSettled(a)), tM(e, r);
    } else e && Ui.delete(e), r(!1);
  });
}
function tM(e, n) {
  let t = e[Or]?.running;
  if (t) {
    t.then(() => {
      (e[Or].running = void 0), Ui.delete(e), n(!0);
    });
    return;
  }
  n(!1);
}
function nM(e, n) {
  let t = e.cleanup,
    r = n[uo];
  if (t !== null)
    for (let s = 0; s < t.length - 1; s += 2)
      if (typeof t[s] == 'string') {
        let a = t[s + 3];
        a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2);
      } else {
        let a = r[t[s + 1]];
        t[s].call(a);
      }
  r !== null && (n[uo] = null);
  let o = n[dn];
  if (o !== null) {
    n[dn] = null;
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      a();
    }
  }
  let i = n[yi];
  if (i !== null) {
    n[yi] = null;
    for (let s of i) s.destroy();
  }
}
function rM(e, n) {
  let t;
  if (e != null && (t = e.destroyHooks) != null)
    for (let r = 0; r < t.length; r += 2) {
      let o = n[t[r]];
      if (!(o instanceof Ir)) {
        let i = t[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            X(4, a, c);
            try {
              c.call(a);
            } finally {
              X(5, a, c);
            }
          }
        else {
          X(4, o, i);
          try {
            i.call(o);
          } finally {
            X(5, o, i);
          }
        }
      }
    }
}
function Tv(e, n, t) {
  return oM(e, n.parent, t);
}
function oM(e, n, t) {
  let r = n;
  for (; r !== null && r.type & 168; ) (n = r), (r = n.parent);
  if (r === null) return t[St];
  if (Wn(r)) {
    let { encapsulation: o } = e.data[r.directiveStart + r.componentOffset];
    if (o === mn.None || o === mn.Emulated) return null;
  }
  return At(r, t);
}
function Av(e, n, t) {
  return sM(e, n, t);
}
function iM(e, n, t) {
  return e.type & 40 ? At(e, t) : null;
}
var sM = iM,
  _m;
function Kf(e, n, t, r) {
  let o = Tv(e, r, n),
    i = n[ee],
    s = r.parent || n[qe],
    a = Av(s, r, n);
  if (o != null)
    if (Array.isArray(t)) for (let c = 0; c < t.length; c++) gm(i, o, t[c], a, !1);
    else gm(i, o, t, a, !1);
  _m !== void 0 && _m(i, r, n, t, o);
}
function Di(e, n) {
  if (n !== null) {
    let t = n.type;
    if (t & 3) return At(n, e);
    if (t & 4) return uf(-1, e[n.index]);
    if (t & 8) {
      let r = n.child;
      if (r !== null) return Di(e, r);
      {
        let o = e[n.index];
        return Tt(o) ? uf(-1, o) : yt(o);
      }
    } else {
      if (t & 128) return Di(e, n.next);
      if (t & 32) return Zf(n, e)() || yt(e[n.index]);
      {
        let r = Nv(e, n);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = Bn(e[Ze]);
          return Di(o, r);
        } else return Di(e, n.next);
      }
    }
  }
  return null;
}
function Nv(e, n) {
  if (n !== null) {
    let r = e[Ze][qe],
      o = n.projection;
    return r.projection[o];
  }
  return null;
}
function uf(e, n) {
  let t = ye + e + 1;
  if (t < n.length) {
    let r = n[t],
      o = r[I].firstChild;
    if (o !== null) return Di(r, o);
  }
  return n[Gn];
}
function Qf(e, n, t, r, o, i, s) {
  for (; t != null; ) {
    let a = r[zn];
    if (t.type === 128) {
      t = t.next;
      continue;
    }
    let c = r[t.index],
      l = t.type;
    if ((s && n === 0 && (c && wo(yt(c), r), (t.flags |= 2)), !Oc(t)))
      if (l & 8) Qf(e, n, t.child, r, o, i, !1), mo(n, e, a, o, c, t, i, r);
      else if (l & 32) {
        let u = Zf(t, r),
          d;
        for (; (d = u()); ) mo(n, e, a, o, d, t, i, r);
        mo(n, e, a, o, c, t, i, r);
      } else l & 16 ? kv(e, n, r, t, o, i) : mo(n, e, a, o, c, t, i, r);
    t = s ? t.projectionNext : t.next;
  }
}
function Ic(e, n, t, r, o, i) {
  Qf(t, r, e.firstChild, n, o, i, !1);
}
function aM(e, n, t) {
  let r = n[ee],
    o = Tv(e, t, n),
    i = t.parent || n[qe],
    s = Av(i, t, n);
  kv(r, 0, n, t, o, s);
}
function kv(e, n, t, r, o, i) {
  let s = t[Ze],
    c = s[qe].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      mo(n, e, t[zn], o, u, r, i, t);
    }
  else {
    let l = c,
      u = s[Oe];
    Jm(r) && (l.flags |= 128), Qf(e, n, l, u, o, i, !0);
  }
}
function cM(e, n, t, r, o, i, s) {
  let a = r[Gn],
    c = yt(r);
  a !== c && mo(n, e, t, i, a, o, s);
  for (let l = ye; l < r.length; l++) {
    let u = r[l];
    Ic(u[I], u, e, n, i, a);
  }
}
function lM(e, n, t, r, o) {
  if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
  else {
    let i = r.indexOf('-') === -1 ? void 0 : Kt.DashCase;
    o == null
      ? e.removeStyle(t, r, i)
      : (typeof o == 'string' &&
          o.endsWith('!important') &&
          ((o = o.slice(0, -10)), (i |= Kt.Important)),
        e.setStyle(t, r, o, i));
  }
}
function Rv(e, n, t, r, o) {
  let i = hn(),
    s = r & 2;
  try {
    Zn(-1), s && n.length > ue && Dv(e, n, ue, !1), X(s ? 2 : 0, o, t), t(r, o);
  } finally {
    Zn(i), X(s ? 3 : 1, o, t);
  }
}
function Fv(e, n, t) {
  gM(e, n, t), (t.flags & 64) === 64 && mM(e, n, t);
}
function Jf(e, n, t = At) {
  let r = n.localNames;
  if (r !== null) {
    let o = n.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? t(n, e) : e[s];
      e[o++] = a;
    }
  }
}
function uM(e, n, t, r) {
  let i = r.get(av, sv) || t === mn.ShadowDom,
    s = e.selectRootElement(n, i);
  return dM(s), s;
}
function dM(e) {
  fM(e);
}
var fM = () => null;
function pM(e) {
  return e === 'class'
    ? 'className'
    : e === 'for'
    ? 'htmlFor'
    : e === 'formaction'
    ? 'formAction'
    : e === 'innerHtml'
    ? 'innerHTML'
    : e === 'readonly'
    ? 'readOnly'
    : e === 'tabindex'
    ? 'tabIndex'
    : e;
}
function Lv(e, n, t, r, o, i) {
  let s = n[I];
  if (Xf(e, s, n, t, r)) {
    Wn(e) && hM(n, e.index);
    return;
  }
  e.type & 3 && (t = pM(t)), jv(e, n, t, r, o, i);
}
function jv(e, n, t, r, o, i) {
  if (e.type & 3) {
    let s = At(e, n);
    (r = i != null ? i(r, e.value || '', t) : r), o.setProperty(s, t, r);
  } else e.type & 12;
}
function hM(e, n) {
  let t = Ct(n, e);
  t[R] & 16 || (t[R] |= 64);
}
function gM(e, n, t) {
  let r = t.directiveStart,
    o = t.directiveEnd;
  Wn(t) && Yb(n, t, e.data[r + t.componentOffset]), e.firstCreatePass || lc(t, n);
  let i = t.initialInputs;
  for (let s = r; s < o; s++) {
    let a = e.data[s],
      c = Si(n, e, s, t);
    if ((wo(c, n), i !== null && CM(n, s - r, c, a, t, i), Wt(a))) {
      let l = Ct(t.index, n);
      l[pe] = Si(n, e, s, t);
    }
  }
}
function mM(e, n, t) {
  let r = t.directiveStart,
    o = t.directiveEnd,
    i = t.index,
    s = qg();
  try {
    Zn(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        l = n[a];
      Ha(a), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && vM(c, l);
    }
  } finally {
    Zn(-1), Ha(s);
  }
}
function vM(e, n) {
  e.hostBindings !== null && e.hostBindings(1, n);
}
function _M(e, n) {
  let t = e.directiveRegistry,
    r = null;
  if (t)
    for (let o = 0; o < t.length; o++) {
      let i = t[o];
      Cv(n, i.selectors, !1) && ((r ??= []), Wt(i) ? r.unshift(i) : r.push(i));
    }
  return r;
}
function wM(e, n, t, r, o, i) {
  let s = At(e, n);
  yM(n[ee], s, i, e.value, t, r, o);
}
function yM(e, n, t, r, o, i, s) {
  if (i == null) e.removeAttribute(n, o, t);
  else {
    let a = s == null ? gi(i) : s(i, r || '', o);
    e.setAttribute(n, o, a, t);
  }
}
function CM(e, n, t, r, o, i) {
  let s = i[n];
  if (s !== null)
    for (let a = 0; a < s.length; a += 2) {
      let c = s[a],
        l = s[a + 1];
      lf(r, t, c, l);
    }
}
function Vv(e, n, t, r, o) {
  let i = ue + t,
    s = n[I],
    a = o(s, n, e, r, t);
  (n[i] = a), ho(e, !0);
  let c = e.type === 2;
  return (
    c ? (Ov(n[ee], a, e), (Vg() === 0 || ja(e)) && wo(a, n), Bg()) : wo(a, n),
    Wa() && (!c || !Oc(e)) && Kf(s, n, a, e),
    e
  );
}
function Bv(e) {
  let n = e;
  return bd() ? Md() : ((n = n.parent), ho(n, !1)), n;
}
function bM(e, n) {
  let t = e[zn];
  if (!t) return;
  let r;
  try {
    r = t.get(Ye, null);
  } catch {
    r = null;
  }
  r?.(n);
}
function Xf(e, n, t, r, o) {
  let i = e.inputs?.[r],
    s = e.hostDirectiveInputs?.[r],
    a = !1;
  if (s)
    for (let c = 0; c < s.length; c += 2) {
      let l = s[c],
        u = s[c + 1],
        d = n.data[l];
      lf(d, t[l], u, o), (a = !0);
    }
  if (i)
    for (let c of i) {
      let l = t[c],
        u = n.data[c];
      lf(u, l, r, o), (a = !0);
    }
  return a;
}
function MM(e, n) {
  let t = Ct(n, e),
    r = t[I];
  xM(r, t);
  let o = t[St];
  o !== null && t[br] === null && (t[br] = cv(o, t[zn])), X(18), ep(r, t, t[pe]), X(19, t[pe]);
}
function xM(e, n) {
  for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t]);
}
function ep(e, n, t) {
  $a(n);
  try {
    let r = e.viewQuery;
    r !== null && Xd(1, r, t);
    let o = e.template;
    o !== null && Rv(e, n, o, 1, t),
      e.firstCreatePass && (e.firstCreatePass = !1),
      n[$t]?.finishViewCreation(e),
      e.staticContentQueries && lv(e, n),
      e.staticViewQueries && Xd(2, e.viewQuery, t);
    let i = e.components;
    i !== null && OM(n, i);
  } catch (r) {
    throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
  } finally {
    (n[R] &= -5), Ga();
  }
}
function OM(e, n) {
  for (let t = 0; t < n.length; t++) MM(e, n[t]);
}
function Hi(e, n, t, r) {
  let o = A(null);
  try {
    let i = n.tView,
      a = e[R] & 4096 ? 4096 : 16,
      c = Wf(
        e,
        i,
        t,
        a,
        null,
        n,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      l = e[n.index];
    c[$n] = l;
    let u = e[$t];
    return u !== null && (c[$t] = u.createEmbeddedView(i)), ep(i, c, t), c;
  } finally {
    A(o);
  }
}
function yo(e, n) {
  return !n || n.firstChild === null || Jm(e);
}
function Ti(e, n, t, r, o = !1) {
  for (; t !== null; ) {
    if (t.type === 128) {
      t = o ? t.projectionNext : t.next;
      continue;
    }
    let i = n[t.index];
    i !== null && r.push(yt(i)), Tt(i) && Uv(i, r);
    let s = t.type;
    if (s & 8) Ti(e, n, t.child, r);
    else if (s & 32) {
      let a = Zf(t, n),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = Nv(n, t);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = Bn(n[Ze]);
        Ti(c[I], c, a, r, !0);
      }
    }
    t = o ? t.projectionNext : t.next;
  }
  return r;
}
function Uv(e, n) {
  for (let t = ye; t < e.length; t++) {
    let r = e[t],
      o = r[I].firstChild;
    o !== null && Ti(r[I], r, o, n);
  }
  e[Gn] !== e[St] && n.push(e[Gn]);
}
function Hv(e) {
  if (e[La] !== null) {
    for (let n of e[La]) n.impl.addSequence(n);
    e[La].length = 0;
  }
}
var zv = [];
function PM(e) {
  return e[ut] ?? EM(e);
}
function EM(e) {
  let n = zv.pop() ?? Object.create(IM);
  return (n.lView = e), n;
}
function DM(e) {
  e.lView[ut] !== e && ((e.lView = null), zv.push(e));
}
var IM = k(w({}, Gr), {
  consumerIsAlwaysLive: !0,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    xi(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[ut] = this;
  },
});
function SM(e) {
  let n = e[ut] ?? Object.create(TM);
  return (n.lView = e), n;
}
var TM = k(w({}, Gr), {
  consumerIsAlwaysLive: !0,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    let n = Bn(e.lView);
    for (; n && !$v(n[I]); ) n = Bn(n);
    n && pd(n);
  },
  consumerOnSignalRead() {
    this.lView[ut] = this;
  },
});
function $v(e) {
  return e.type !== 2;
}
function Gv(e) {
  if (e[yi] === null) return;
  let n = !0;
  for (; n; ) {
    let t = !1;
    for (let r of e[yi])
      r.dirty &&
        ((t = !0),
        r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()));
    n = t && !!(e[R] & 8192);
  }
}
var AM = 100;
function Wv(e, n = 0) {
  let r = e[zt].rendererFactory,
    o = !1;
  o || r.begin?.();
  try {
    NM(e, n);
  } finally {
    o || r.end?.();
  }
}
function NM(e, n) {
  let t = xd();
  try {
    Od(!0), df(e, n);
    let r = 0;
    for (; Mi(e); ) {
      if (r === AM) throw new y(103, !1);
      r++, df(e, 1);
    }
  } finally {
    Od(t);
  }
}
function kM(e, n, t, r) {
  if (Er(n)) return;
  let o = n[R],
    i = !1,
    s = !1;
  $a(n);
  let a = !0,
    c = null,
    l = null;
  i ||
    ($v(e)
      ? ((l = PM(n)), (c = qr(l)))
      : Ys() === null
      ? ((a = !1), (l = SM(n)), (c = qr(l)))
      : n[ut] && (ii(n[ut]), (n[ut] = null)));
  try {
    fd(n), $g(e.bindingStartIndex), t !== null && Rv(e, n, t, 2, r);
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && tc(n, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && nc(n, f, 0, null), Fd(n, 0);
      }
    if ((s || RM(n), Gv(n), qv(n, 0), e.contentQueries !== null && lv(e, n), !i))
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && tc(n, f);
      } else {
        let f = e.contentHooks;
        f !== null && nc(n, f, 1), Fd(n, 1);
      }
    LM(e, n);
    let d = e.components;
    d !== null && Yv(n, d, 0);
    let h = e.viewQuery;
    if ((h !== null && Xd(2, h, r), !i))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && tc(n, f);
      } else {
        let f = e.viewHooks;
        f !== null && nc(n, f, 2), Fd(n, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), n[Fa])) {
      for (let f of n[Fa]) f();
      n[Fa] = null;
    }
    i || (Hv(n), (n[R] &= -73));
  } catch (u) {
    throw (i || xi(n), u);
  } finally {
    l !== null && (ri(l, c), a && DM(l)), Ga();
  }
}
function qv(e, n) {
  for (let t = ev(e); t !== null; t = tv(t))
    for (let r = ye; r < t.length; r++) {
      let o = t[r];
      Zv(o, n);
    }
}
function RM(e) {
  for (let n = ev(e); n !== null; n = tv(n)) {
    if (!(n[R] & 2)) continue;
    let t = n[Pr];
    for (let r = 0; r < t.length; r++) {
      let o = t[r];
      pd(o);
    }
  }
}
function FM(e, n, t) {
  X(18);
  let r = Ct(n, e);
  Zv(r, t), X(19, r[pe]);
}
function Zv(e, n) {
  Ba(e) && df(e, n);
}
function df(e, n) {
  let r = e[I],
    o = e[R],
    i = e[ut],
    s = !!(n === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && n === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && oi(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[R] &= -9217),
    s)
  )
    kM(r, e, r.template, e[pe]);
  else if (o & 8192) {
    let a = A(null);
    try {
      Gv(e), qv(e, 1);
      let c = r.components;
      c !== null && Yv(e, c, 1), Hv(e);
    } finally {
      A(a);
    }
  }
}
function Yv(e, n, t) {
  for (let r = 0; r < n.length; r++) FM(e, n[r], t);
}
function LM(e, n) {
  let t = e.hostBindingOpCodes;
  if (t !== null)
    try {
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        if (o < 0) Zn(~o);
        else {
          let i = o,
            s = t[++r],
            a = t[++r];
          Wg(s, i);
          let c = n[i];
          X(24, c), a(2, c), X(25, c);
        }
      }
    } finally {
      Zn(-1);
    }
}
function tp(e, n) {
  let t = xd() ? 64 : 1088;
  for (e[zt].changeDetectionScheduler?.notify(n); e; ) {
    e[R] |= t;
    let r = Bn(e);
    if (po(e) && !r) return e;
    e = r;
  }
  return null;
}
function Kv(e, n, t, r) {
  return [e, !0, 0, n, null, r, null, t, null, null];
}
function Qv(e, n) {
  let t = ye + n;
  if (t < e.length) return e[t];
}
function zi(e, n, t, r = !0) {
  let o = n[I];
  if ((jM(o, n, e, t), r)) {
    let s = uf(t, e),
      a = n[ee],
      c = a.parentNode(e[Gn]);
    c !== null && Xb(o, e[qe], a, n, c, s);
  }
  let i = n[br];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Jv(e, n) {
  let t = Ai(e, n);
  return t !== void 0 && Dc(t[I], t), t;
}
function Ai(e, n) {
  if (e.length <= ye) return;
  let t = ye + n,
    r = e[t];
  if (r) {
    let o = r[$n];
    o !== null && o !== e && Yf(o, r), n > 0 && (e[t - 1][wt] = r[wt]);
    let i = mi(e, ye + n);
    Jb(r[I], r);
    let s = i[$t];
    s !== null && s.detachView(i[I]), (r[Oe] = null), (r[wt] = null), (r[R] &= -129);
  }
  return r;
}
function jM(e, n, t, r) {
  let o = ye + r,
    i = t.length;
  r > 0 && (t[o - 1][wt] = n),
    r < i - ye ? ((n[wt] = t[o]), Ju(t, ye + r, n)) : (t.push(n), (n[wt] = null)),
    (n[Oe] = t);
  let s = n[$n];
  s !== null && t !== s && Xv(s, n);
  let a = n[$t];
  a !== null && a.insertView(e), Ua(n), (n[R] |= 128);
}
function Xv(e, n) {
  let t = e[Pr],
    r = n[Oe];
  if (Gt(r)) e[R] |= 2;
  else {
    let o = r[Oe][Ze];
    n[Ze] !== o && (e[R] |= 2);
  }
  t === null ? (e[Pr] = [n]) : t.push(n);
}
var Yn = class {
  _lView;
  _cdRefInjectingView;
  _appRef = null;
  _attachedToViewContainer = !1;
  exhaustive;
  get rootNodes() {
    let n = this._lView,
      t = n[I];
    return Ti(t, n, t.firstChild, []);
  }
  constructor(n, t) {
    (this._lView = n), (this._cdRefInjectingView = t);
  }
  get context() {
    return this._lView[pe];
  }
  set context(n) {
    this._lView[pe] = n;
  }
  get destroyed() {
    return Er(this._lView);
  }
  destroy() {
    if (this._appRef) this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      let n = this._lView[Oe];
      if (Tt(n)) {
        let t = n[Ci],
          r = t ? t.indexOf(this) : -1;
        r > -1 && (Ai(n, r), mi(t, r));
      }
      this._attachedToViewContainer = !1;
    }
    Dc(this._lView[I], this._lView);
  }
  onDestroy(n) {
    hd(this._lView, n);
  }
  markForCheck() {
    tp(this._cdRefInjectingView || this._lView, 4);
  }
  detach() {
    this._lView[R] &= -129;
  }
  reattach() {
    Ua(this._lView), (this._lView[R] |= 128);
  }
  detectChanges() {
    (this._lView[R] |= 1024), Wv(this._lView);
  }
  checkNoChanges() {}
  attachToViewContainerRef() {
    if (this._appRef) throw new y(902, !1);
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null;
    let n = po(this._lView),
      t = this._lView[$n];
    t !== null && !n && Yf(t, this._lView), Sv(this._lView[I], this._lView);
  }
  attachToAppRef(n) {
    if (this._attachedToViewContainer) throw new y(902, !1);
    this._appRef = n;
    let t = po(this._lView),
      r = this._lView[$n];
    r !== null && !t && Xv(r, this._lView), Ua(this._lView);
  }
};
var Co = (() => {
  class e {
    _declarationLView;
    _declarationTContainer;
    elementRef;
    static __NG_ELEMENT_ID__ = VM;
    constructor(t, r, o) {
      (this._declarationLView = t), (this._declarationTContainer = r), (this.elementRef = o);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(t, r) {
      return this.createEmbeddedViewImpl(t, r);
    }
    createEmbeddedViewImpl(t, r, o) {
      let i = Hi(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: r,
        dehydratedView: o,
      });
      return new Yn(i);
    }
  }
  return e;
})();
function VM() {
  return np(Re(), F());
}
function np(e, n) {
  return e.type & 4 ? new Co(n, e, xo(e, n)) : null;
}
function $i(e, n, t, r, o) {
  let i = e.data[n];
  if (i === null) (i = BM(e, n, t, r, o)), Gg() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = t), (i.value = r), (i.attrs = o);
    let s = Hg();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return ho(i, !0), i;
}
function BM(e, n, t, r, o) {
  let i = Cd(),
    s = bd(),
    a = s ? i : i && i.parent,
    c = (e.data[n] = HM(e, a, t, n, r, o));
  return UM(e, c, i, s), c;
}
function UM(e, n, t, r) {
  e.firstChild === null && (e.firstChild = n),
    t !== null &&
      (r
        ? t.child == null && n.parent !== null && (t.child = n)
        : t.next === null && ((t.next = n), (n.prev = t)));
}
function HM(e, n, t, r, o, i) {
  let s = n ? n.injectorIndex : -1,
    a = 0;
  return (
    _d() && (a |= 128),
    {
      type: t,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: null,
      inputs: null,
      hostDirectiveInputs: null,
      outputs: null,
      hostDirectiveOutputs: null,
      directiveToIndex: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: n,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
var hL = new RegExp(`^(\\d+)*(${cb}|${ab})*(.*)`);
function zM(e) {
  let n = e[cd] ?? [],
    r = e[Oe][ee],
    o = [];
  for (let i of n) i.data[iv] !== void 0 ? o.push(i) : $M(i, r);
  e[cd] = o;
}
function $M(e, n) {
  let t = 0,
    r = e.firstChild;
  if (r) {
    let o = e.data[ov];
    for (; t < o; ) {
      let i = r.nextSibling;
      xv(n, r, !1), (r = i), t++;
    }
  }
}
var GM = () => null,
  WM = () => null;
function fc(e, n) {
  return GM(e, n);
}
function e_(e, n, t) {
  return WM(e, n, t);
}
var t_ = class {},
  Sc = class {},
  ff = class {
    resolveComponentFactory(n) {
      throw new y(917, !1);
    }
  },
  Gi = class {
    static NULL = new ff();
  },
  Sr = class {},
  Qn = (() => {
    class e {
      destroyNode = null;
      static __NG_ELEMENT_ID__ = () => qM();
    }
    return e;
  })();
function qM() {
  let e = F(),
    n = Re(),
    t = Ct(n.index, e);
  return (Gt(t) ? t : e)[ee];
}
var n_ = (() => {
  class e {
    static ɵprov = x({ token: e, providedIn: 'root', factory: () => null });
  }
  return e;
})();
var oc = {},
  pf = class {
    injector;
    parentInjector;
    constructor(n, t) {
      (this.injector = n), (this.parentInjector = t);
    }
    get(n, t, r) {
      let o = this.injector.get(n, oc, r);
      return o !== oc || t === oc ? o : this.parentInjector.get(n, t, r);
    }
  };
function pc(e, n, t) {
  let r = t ? e.styles : null,
    o = t ? e.classes : null,
    i = 0;
  if (n !== null)
    for (let s = 0; s < n.length; s++) {
      let a = n[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = Sa(o, a);
      else if (i == 2) {
        let c = a,
          l = n[++s];
        r = Sa(r, c + ': ' + l + ';');
      }
    }
  t ? (e.styles = r) : (e.stylesWithoutHost = r), t ? (e.classes = o) : (e.classesWithoutHost = o);
}
function T(e, n = 0) {
  let t = F();
  if (t === null) return E(e, n);
  let r = Re();
  return Ym(r, t, Ne(e), n);
}
function ZM(e, n, t, r, o) {
  let i = r === null ? null : { '': -1 },
    s = o(e, t);
  if (s !== null) {
    let a = s,
      c = null,
      l = null;
    for (let u of s)
      if (u.resolveHostDirectives !== null) {
        [a, c, l] = u.resolveHostDirectives(s);
        break;
      }
    QM(e, n, t, a, i, c, l);
  }
  i !== null && r !== null && YM(t, r, i);
}
function YM(e, n, t) {
  let r = (e.localNames = []);
  for (let o = 0; o < n.length; o += 2) {
    let i = t[n[o + 1]];
    if (i == null) throw new y(-301, !1);
    r.push(n[o], i);
  }
}
function KM(e, n, t) {
  (n.componentOffset = t), (e.components ??= []).push(n.index);
}
function QM(e, n, t, r, o, i, s) {
  let a = r.length,
    c = !1;
  for (let h = 0; h < a; h++) {
    let f = r[h];
    !c && Wt(f) && ((c = !0), KM(e, t, h)), Yd(lc(t, n), e, f.type);
  }
  rx(t, e.data.length, a);
  for (let h = 0; h < a; h++) {
    let f = r[h];
    f.providersResolver && f.providersResolver(f);
  }
  let l = !1,
    u = !1,
    d = Ev(e, n, a, null);
  a > 0 && (t.directiveToIndex = new Map());
  for (let h = 0; h < a; h++) {
    let f = r[h];
    if (
      ((t.mergedAttrs = _o(t.mergedAttrs, f.hostAttrs)),
      XM(e, t, n, d, f),
      nx(d, f, o),
      s !== null && s.has(f))
    ) {
      let [O, M] = s.get(f);
      t.directiveToIndex.set(f.type, [d, O + t.directiveStart, M + t.directiveStart]);
    } else (i === null || !i.has(f)) && t.directiveToIndex.set(f.type, d);
    f.contentQueries !== null && (t.flags |= 4),
      (f.hostBindings !== null || f.hostAttrs !== null || f.hostVars !== 0) && (t.flags |= 64);
    let _ = f.type.prototype;
    !l &&
      (_.ngOnChanges || _.ngOnInit || _.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(t.index), (l = !0)),
      !u &&
        (_.ngOnChanges || _.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(t.index), (u = !0)),
      d++;
  }
  JM(e, t, i);
}
function JM(e, n, t) {
  for (let r = n.directiveStart; r < n.directiveEnd; r++) {
    let o = e.data[r];
    if (t === null || !t.has(o)) wm(0, n, o, r), wm(1, n, o, r), Cm(n, r, !1);
    else {
      let i = t.get(o);
      ym(0, n, i, r), ym(1, n, i, r), Cm(n, r, !0);
    }
  }
}
function wm(e, n, t, r) {
  let o = e === 0 ? t.inputs : t.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s;
      e === 0 ? (s = n.inputs ??= {}) : (s = n.outputs ??= {}),
        (s[i] ??= []),
        s[i].push(r),
        r_(n, i);
    }
}
function ym(e, n, t, r) {
  let o = e === 0 ? t.inputs : t.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s = o[i],
        a;
      e === 0 ? (a = n.hostDirectiveInputs ??= {}) : (a = n.hostDirectiveOutputs ??= {}),
        (a[s] ??= []),
        a[s].push(r, i),
        r_(n, s);
    }
}
function r_(e, n) {
  n === 'class' ? (e.flags |= 8) : n === 'style' && (e.flags |= 16);
}
function Cm(e, n, t) {
  let { attrs: r, inputs: o, hostDirectiveInputs: i } = e;
  if (r === null || (!t && o === null) || (t && i === null) || $f(e)) {
    (e.initialInputs ??= []), e.initialInputs.push(null);
    return;
  }
  let s = null,
    a = 0;
  for (; a < r.length; ) {
    let c = r[a];
    if (c === 0) {
      a += 4;
      continue;
    } else if (c === 5) {
      a += 2;
      continue;
    } else if (typeof c == 'number') break;
    if (!t && o.hasOwnProperty(c)) {
      let l = o[c];
      for (let u of l)
        if (u === n) {
          (s ??= []), s.push(c, r[a + 1]);
          break;
        }
    } else if (t && i.hasOwnProperty(c)) {
      let l = i[c];
      for (let u = 0; u < l.length; u += 2)
        if (l[u] === n) {
          (s ??= []), s.push(l[u + 1], r[a + 1]);
          break;
        }
    }
    a += 2;
  }
  (e.initialInputs ??= []), e.initialInputs.push(s);
}
function XM(e, n, t, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = Vn(o.type, !0)),
    s = new Ir(i, Wt(o), T, null);
  (e.blueprint[r] = s), (t[r] = s), ex(e, n, r, Ev(e, t, o.hostVars, pt), o);
}
function ex(e, n, t, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~n.index;
    tx(s) != a && s.push(a), s.push(t, r, i);
  }
}
function tx(e) {
  let n = e.length;
  for (; n > 0; ) {
    let t = e[--n];
    if (typeof t == 'number' && t < 0) return t;
  }
  return 0;
}
function nx(e, n, t) {
  if (t) {
    if (n.exportAs) for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
    Wt(n) && (t[''] = e);
  }
}
function rx(e, n, t) {
  (e.flags |= 1), (e.directiveStart = n), (e.directiveEnd = n + t), (e.providerIndexes = n);
}
function o_(e, n, t, r, o, i, s, a) {
  let c = n[I],
    l = c.consts,
    u = qt(l, s),
    d = $i(c, e, t, r, u);
  return (
    i && ZM(c, n, d, qt(l, a), o),
    (d.mergedAttrs = _o(d.mergedAttrs, d.attrs)),
    d.attrs !== null && pc(d, d.attrs, !1),
    d.mergedAttrs !== null && pc(d, d.mergedAttrs, !0),
    c.queries !== null && c.queries.elementStart(c, d),
    d
  );
}
function i_(e, n) {
  VC(e, n), ld(n) && e.queries.elementEnd(n);
}
function ox(e, n, t, r, o, i) {
  let s = n.consts,
    a = qt(s, o),
    c = $i(n, e, t, r, a);
  if (((c.mergedAttrs = _o(c.mergedAttrs, c.attrs)), i != null)) {
    let l = qt(s, i);
    c.localNames = [];
    for (let u = 0; u < l.length; u += 2) c.localNames.push(l[u], -1);
  }
  return (
    c.attrs !== null && pc(c, c.attrs, !1),
    c.mergedAttrs !== null && pc(c, c.mergedAttrs, !0),
    n.queries !== null && n.queries.elementStart(n, c),
    c
  );
}
function rp(e, n, t) {
  return (e[n] = t);
}
function ix(e, n) {
  return e[n];
}
function bt(e, n, t) {
  if (t === pt) return !1;
  let r = e[n];
  return Object.is(r, t) ? !1 : ((e[n] = t), !0);
}
function sx(e, n, t, r) {
  let o = bt(e, n, t);
  return bt(e, n + 1, r) || o;
}
function Vd(e, n, t) {
  return function r(o) {
    let i = Wn(e) ? Ct(e.index, n) : n;
    tp(i, 5);
    let s = n[pe],
      a = bm(n, s, t, o),
      c = r.__ngNextListenerFn__;
    for (; c; ) (a = bm(n, s, c, o) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function bm(e, n, t, r) {
  let o = A(null);
  try {
    return X(6, n, t), t(r) !== !1;
  } catch (i) {
    return bM(e, i), !1;
  } finally {
    X(7, n, t), A(o);
  }
}
function ax(e, n, t, r, o, i, s, a) {
  let c = ja(e),
    l = !1,
    u = null;
  if ((!r && c && (u = lx(n, t, i, e.index)), u !== null)) {
    let d = u.__ngLastListenerFn__ || u;
    (d.__ngNextListenerFn__ = s), (u.__ngLastListenerFn__ = s), (l = !0);
  } else {
    let d = At(e, t),
      h = r ? r(d) : d;
    ub(t, h, i, a);
    let f = o.listen(h, i, a);
    if (!cx(i)) {
      let _ = r ? (O) => r(yt(O[e.index])) : e.index;
      s_(_, n, t, i, a, f, !1);
    }
  }
  return l;
}
function cx(e) {
  return e.startsWith('animation') || e.startsWith('transition');
}
function lx(e, n, t, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === t && o[i + 1] === r) {
        let a = n[uo],
          c = o[i + 2];
        return a && a.length > c ? a[c] : null;
      }
      typeof s == 'string' && (i += 2);
    }
  return null;
}
function s_(e, n, t, r, o, i, s) {
  let a = n.firstCreatePass ? md(n) : null,
    c = gd(t),
    l = c.length;
  c.push(o, i), a && a.push(r, e, l, (l + 1) * (s ? -1 : 1));
}
function Mm(e, n, t, r, o, i) {
  let s = n[t],
    a = n[I],
    l = a.data[t].outputs[r],
    d = s[l].subscribe(i);
  s_(e.index, a, n, o, i, d, !0);
}
var hf = Symbol('BINDING');
var hc = class extends Gi {
  ngModule;
  constructor(n) {
    super(), (this.ngModule = n);
  }
  resolveComponentFactory(n) {
    let t = Hn(n);
    return new bo(t, this.ngModule);
  }
};
function ux(e) {
  return Object.keys(e).map((n) => {
    let [t, r, o] = e[n],
      i = { propName: t, templateName: n, isSignal: (r & Ec.SignalBased) !== 0 };
    return o && (i.transform = o), i;
  });
}
function dx(e) {
  return Object.keys(e).map((n) => ({ propName: e[n], templateName: n }));
}
function fx(e, n, t) {
  let r = n instanceof _e ? n : n?.injector;
  return (
    r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r),
    r ? new pf(t, r) : t
  );
}
function px(e) {
  let n = e.get(Sr, null);
  if (n === null) throw new y(407, !1);
  let t = e.get(n_, null),
    r = e.get(pn, null);
  return { rendererFactory: n, sanitizer: t, changeDetectionScheduler: r, ngReflect: !1 };
}
function hx(e, n) {
  let t = a_(e);
  return bv(n, t, t === 'svg' ? Ag : t === 'math' ? Ng : null);
}
function a_(e) {
  return (e.selectors[0][0] || 'div').toLowerCase();
}
var bo = class extends Sc {
  componentDef;
  ngModule;
  selector;
  componentType;
  ngContentSelectors;
  isBoundToModule;
  cachedInputs = null;
  cachedOutputs = null;
  get inputs() {
    return (this.cachedInputs ??= ux(this.componentDef.inputs)), this.cachedInputs;
  }
  get outputs() {
    return (this.cachedOutputs ??= dx(this.componentDef.outputs)), this.cachedOutputs;
  }
  constructor(n, t) {
    super(),
      (this.componentDef = n),
      (this.ngModule = t),
      (this.componentType = n.type),
      (this.selector = Ub(n.selectors)),
      (this.ngContentSelectors = n.ngContentSelectors ?? []),
      (this.isBoundToModule = !!t);
  }
  create(n, t, r, o, i, s) {
    X(22);
    let a = A(null);
    try {
      let c = this.componentDef,
        l = gx(r, c, s, i),
        u = fx(c, o || this.ngModule, n),
        d = px(u),
        h = d.rendererFactory.createRenderer(null, c),
        f = r ? uM(h, r, c.encapsulation, u) : hx(c, h),
        _ = s?.some(xm) || i?.some((b) => typeof b != 'function' && b.bindings.some(xm)),
        O = Wf(null, l, null, 512 | Pv(c), null, null, d, h, u, null, cv(f, u, !0));
      (O[ue] = f), $a(O);
      let M = null;
      try {
        let b = o_(ue, O, 2, '#host', () => l.directiveRegistry, !0, 0);
        Ov(h, f, b),
          wo(f, O),
          Fv(l, O, b),
          uv(l, b, O),
          i_(l, b),
          t !== void 0 && vx(b, this.ngContentSelectors, t),
          (M = Ct(b.index, O)),
          (O[pe] = M[pe]),
          ep(l, O, null);
      } catch (b) {
        throw (M !== null && Qd(M), Qd(O), b);
      } finally {
        X(23), Ga();
      }
      return new gc(this.componentType, O, !!_);
    } finally {
      A(a);
    }
  }
};
function gx(e, n, t, r) {
  let o = e ? ['ng-version', '20.3.4'] : Hb(n.selectors[0]),
    i = null,
    s = null,
    a = 0;
  if (t)
    for (let u of t)
      (a += u[hf].requiredVars),
        u.create && ((u.targetIdx = 0), (i ??= []).push(u)),
        u.update && ((u.targetIdx = 0), (s ??= []).push(u));
  if (r)
    for (let u = 0; u < r.length; u++) {
      let d = r[u];
      if (typeof d != 'function')
        for (let h of d.bindings) {
          a += h[hf].requiredVars;
          let f = u + 1;
          h.create && ((h.targetIdx = f), (i ??= []).push(h)),
            h.update && ((h.targetIdx = f), (s ??= []).push(h));
        }
    }
  let c = [n];
  if (r)
    for (let u of r) {
      let d = typeof u == 'function' ? u : u.type,
        h = nd(d);
      c.push(h);
    }
  return Gf(0, null, mx(i, s), 1, a, c, null, null, null, [o], null);
}
function mx(e, n) {
  return !e && !n
    ? null
    : (t) => {
        if (t & 1 && e) for (let r of e) r.create();
        if (t & 2 && n) for (let r of n) r.update();
      };
}
function xm(e) {
  let n = e[hf].kind;
  return n === 'input' || n === 'twoWay';
}
var gc = class extends t_ {
  _rootLView;
  _hasInputBindings;
  instance;
  hostView;
  changeDetectorRef;
  componentType;
  location;
  previousInputValues = null;
  _tNode;
  constructor(n, t, r) {
    super(),
      (this._rootLView = t),
      (this._hasInputBindings = r),
      (this._tNode = bi(t[I], ue)),
      (this.location = xo(this._tNode, t)),
      (this.instance = Ct(this._tNode.index, t)[pe]),
      (this.hostView = this.changeDetectorRef = new Yn(t, void 0)),
      (this.componentType = n);
  }
  setInput(n, t) {
    this._hasInputBindings;
    let r = this._tNode;
    if (
      ((this.previousInputValues ??= new Map()),
      this.previousInputValues.has(n) && Object.is(this.previousInputValues.get(n), t))
    )
      return;
    let o = this._rootLView,
      i = Xf(r, o[I], o, n, t);
    this.previousInputValues.set(n, t);
    let s = Ct(r.index, o);
    tp(s, 1);
  }
  get injector() {
    return new Dr(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(n) {
    this.hostView.onDestroy(n);
  }
};
function vx(e, n, t) {
  let r = (e.projection = []);
  for (let o = 0; o < n.length; o++) {
    let i = t[o];
    r.push(i != null && i.length ? Array.from(i) : null);
  }
}
var Nr = (() => {
  class e {
    static __NG_ELEMENT_ID__ = _x;
  }
  return e;
})();
function _x() {
  let e = Re();
  return l_(e, F());
}
var wx = Nr,
  c_ = class extends wx {
    _lContainer;
    _hostTNode;
    _hostLView;
    constructor(n, t, r) {
      super(), (this._lContainer = n), (this._hostTNode = t), (this._hostLView = r);
    }
    get element() {
      return xo(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new Dr(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let n = kf(this._hostTNode, this._hostLView);
      if (zm(n)) {
        let t = ac(n, this._hostLView),
          r = sc(n),
          o = t[I].data[r + 8];
        return new Dr(o, t);
      } else return new Dr(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(n) {
      let t = Om(this._lContainer);
      return (t !== null && t[n]) || null;
    }
    get length() {
      return this._lContainer.length - ye;
    }
    createEmbeddedView(n, t, r) {
      let o, i;
      typeof r == 'number' ? (o = r) : r != null && ((o = r.index), (i = r.injector));
      let s = fc(this._lContainer, n.ssrId),
        a = n.createEmbeddedViewImpl(t || {}, i, s);
      return this.insertImpl(a, o, yo(this._hostTNode, s)), a;
    }
    createComponent(n, t, r, o, i, s, a) {
      let c = n && !kC(n),
        l;
      if (c) l = t;
      else {
        let M = t || {};
        (l = M.index),
          (r = M.injector),
          (o = M.projectableNodes),
          (i = M.environmentInjector || M.ngModuleRef),
          (s = M.directives),
          (a = M.bindings);
      }
      let u = c ? n : new bo(Hn(n)),
        d = r || this.parentInjector;
      if (!i && u.ngModule == null) {
        let b = (c ? d : this.parentInjector).get(_e, null);
        b && (i = b);
      }
      let h = Hn(u.componentType ?? {}),
        f = fc(this._lContainer, h?.id ?? null),
        _ = f?.firstChild ?? null,
        O = u.create(d, o, _, i, s, a);
      return this.insertImpl(O.hostView, l, yo(this._hostTNode, f)), O;
    }
    insert(n, t) {
      return this.insertImpl(n, t, !0);
    }
    insertImpl(n, t, r) {
      let o = n._lView;
      if (Rg(o)) {
        let a = this.indexOf(n);
        if (a !== -1) this.detach(a);
        else {
          let c = o[Oe],
            l = new c_(c, c[qe], c[Oe]);
          l.detach(l.indexOf(n));
        }
      }
      let i = this._adjustIndex(t),
        s = this._lContainer;
      return zi(s, o, i, r), n.attachToViewContainerRef(), Ju(Bd(s), i, n), n;
    }
    move(n, t) {
      return this.insert(n, t);
    }
    indexOf(n) {
      let t = Om(this._lContainer);
      return t !== null ? t.indexOf(n) : -1;
    }
    remove(n) {
      let t = this._adjustIndex(n, -1),
        r = Ai(this._lContainer, t);
      r && (mi(Bd(this._lContainer), t), Dc(r[I], r));
    }
    detach(n) {
      let t = this._adjustIndex(n, -1),
        r = Ai(this._lContainer, t);
      return r && mi(Bd(this._lContainer), t) != null ? new Yn(r) : null;
    }
    _adjustIndex(n, t = 0) {
      return n ?? this.length + t;
    }
  };
function Om(e) {
  return e[Ci];
}
function Bd(e) {
  return e[Ci] || (e[Ci] = []);
}
function l_(e, n) {
  let t,
    r = n[e.index];
  return (
    Tt(r) ? (t = r) : ((t = Kv(r, n, null, e)), (n[e.index] = t), qf(n, t)),
    Cx(t, n, e, r),
    new c_(t, e, n)
  );
}
function yx(e, n) {
  let t = e[ee],
    r = t.createComment(''),
    o = At(n, e),
    i = t.parentNode(o);
  return dc(t, i, r, t.nextSibling(o), !1), r;
}
var Cx = xx,
  bx = () => !1;
function Mx(e, n, t) {
  return bx(e, n, t);
}
function xx(e, n, t, r) {
  if (e[Gn]) return;
  let o;
  t.type & 8 ? (o = yt(r)) : (o = yx(n, t)), (e[Gn] = o);
}
var gf = class e {
    queryList;
    matches = null;
    constructor(n) {
      this.queryList = n;
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  mf = class e {
    queries;
    constructor(n = []) {
      this.queries = n;
    }
    createEmbeddedView(n) {
      let t = n.queries;
      if (t !== null) {
        let r = n.contentQueries !== null ? n.contentQueries[0] : t.length,
          o = [];
        for (let i = 0; i < r; i++) {
          let s = t.getByIndex(i),
            a = this.queries[s.indexInDeclarationView];
          o.push(a.clone());
        }
        return new e(o);
      }
      return null;
    }
    insertView(n) {
      this.dirtyQueriesWithMatches(n);
    }
    detachView(n) {
      this.dirtyQueriesWithMatches(n);
    }
    finishViewCreation(n) {
      this.dirtyQueriesWithMatches(n);
    }
    dirtyQueriesWithMatches(n) {
      for (let t = 0; t < this.queries.length; t++)
        op(n, t).matches !== null && this.queries[t].setDirty();
    }
  },
  vf = class {
    flags;
    read;
    predicate;
    constructor(n, t, r = null) {
      (this.flags = t),
        (this.read = r),
        typeof n == 'string' ? (this.predicate = Ax(n)) : (this.predicate = n);
    }
  },
  _f = class e {
    queries;
    constructor(n = []) {
      this.queries = n;
    }
    elementStart(n, t) {
      for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(n, t);
    }
    elementEnd(n) {
      for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(n);
    }
    embeddedTView(n) {
      let t = null;
      for (let r = 0; r < this.length; r++) {
        let o = t !== null ? t.length : 0,
          i = this.getByIndex(r).embeddedTView(n, o);
        i && ((i.indexInDeclarationView = r), t !== null ? t.push(i) : (t = [i]));
      }
      return t !== null ? new e(t) : null;
    }
    template(n, t) {
      for (let r = 0; r < this.queries.length; r++) this.queries[r].template(n, t);
    }
    getByIndex(n) {
      return this.queries[n];
    }
    get length() {
      return this.queries.length;
    }
    track(n) {
      this.queries.push(n);
    }
  },
  wf = class e {
    metadata;
    matches = null;
    indexInDeclarationView = -1;
    crossesNgTemplate = !1;
    _declarationNodeIndex;
    _appliesToNextNode = !0;
    constructor(n, t = -1) {
      (this.metadata = n), (this._declarationNodeIndex = t);
    }
    elementStart(n, t) {
      this.isApplyingToNode(t) && this.matchTNode(n, t);
    }
    elementEnd(n) {
      this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1);
    }
    template(n, t) {
      this.elementStart(n, t);
    }
    embeddedTView(n, t) {
      return this.isApplyingToNode(n)
        ? ((this.crossesNgTemplate = !0), this.addMatch(-n.index, t), new e(this.metadata))
        : null;
    }
    isApplyingToNode(n) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let t = this._declarationNodeIndex,
          r = n.parent;
        for (; r !== null && r.type & 8 && r.index !== t; ) r = r.parent;
        return t === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(n, t) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let o = 0; o < r.length; o++) {
          let i = r[o];
          this.matchTNodeWithReadOption(n, t, Ox(t, i)),
            this.matchTNodeWithReadOption(n, t, rc(t, n, i, !1, !1));
        }
      else
        r === Co
          ? t.type & 4 && this.matchTNodeWithReadOption(n, t, -1)
          : this.matchTNodeWithReadOption(n, t, rc(t, n, r, !1, !1));
    }
    matchTNodeWithReadOption(n, t, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === Ke || o === Nr || (o === Co && t.type & 4)) this.addMatch(t.index, -2);
          else {
            let i = rc(t, n, o, !1, !1);
            i !== null && this.addMatch(t.index, i);
          }
        else this.addMatch(t.index, r);
      }
    }
    addMatch(n, t) {
      this.matches === null ? (this.matches = [n, t]) : this.matches.push(n, t);
    }
  };
function Ox(e, n) {
  let t = e.localNames;
  if (t !== null) {
    for (let r = 0; r < t.length; r += 2) if (t[r] === n) return t[r + 1];
  }
  return null;
}
function Px(e, n) {
  return e.type & 11 ? xo(e, n) : e.type & 4 ? np(e, n) : null;
}
function Ex(e, n, t, r) {
  return t === -1 ? Px(n, e) : t === -2 ? Dx(e, n, r) : Si(e, e[I], t, n);
}
function Dx(e, n, t) {
  if (t === Ke) return xo(n, e);
  if (t === Co) return np(n, e);
  if (t === Nr) return l_(n, e);
}
function u_(e, n, t, r) {
  let o = n[$t].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = t.matches,
      a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let u = i[l];
        a.push(Ex(n, u, s[c + 1], t.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function yf(e, n, t, r) {
  let o = e.queries.getByIndex(t),
    i = o.matches;
  if (i !== null) {
    let s = u_(e, n, o, t);
    for (let a = 0; a < i.length; a += 2) {
      let c = i[a];
      if (c > 0) r.push(s[a / 2]);
      else {
        let l = i[a + 1],
          u = n[-c];
        for (let d = ye; d < u.length; d++) {
          let h = u[d];
          h[$n] === h[Oe] && yf(h[I], h, l, r);
        }
        if (u[Pr] !== null) {
          let d = u[Pr];
          for (let h = 0; h < d.length; h++) {
            let f = d[h];
            yf(f[I], f, l, r);
          }
        }
      }
    }
  }
  return r;
}
function Ix(e, n) {
  return e[$t].queries[n].queryList;
}
function Sx(e, n, t) {
  let r = new uc((t & 4) === 4);
  return jg(e, n, r, r.destroy), (n[$t] ??= new mf()).queries.push(new gf(r)) - 1;
}
function Tx(e, n, t, r) {
  let o = he();
  if (o.firstCreatePass) {
    let i = Re();
    Nx(o, new vf(n, t, r), i.index), kx(o, e), (t & 2) === 2 && (o.staticContentQueries = !0);
  }
  return Sx(o, F(), t);
}
function Ax(e) {
  return e.split(',').map((n) => n.trim());
}
function Nx(e, n, t) {
  e.queries === null && (e.queries = new _f()), e.queries.track(new wf(n, t));
}
function kx(e, n) {
  let t = e.contentQueries || (e.contentQueries = []),
    r = t.length ? t[t.length - 1] : -1;
  n !== r && t.push(e.queries.length - 1, n);
}
function op(e, n) {
  return e.queries.getByIndex(n);
}
function Rx(e, n) {
  let t = e[I],
    r = op(t, n);
  return r.crossesNgTemplate ? yf(t, e, n, []) : u_(t, e, r, n);
}
var Pm = new Set();
function Jn(e) {
  Pm.has(e) || (Pm.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var Tr = class {},
  Tc = class {};
var mc = class extends Tr {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    componentFactoryResolver = new hc(this);
    constructor(n, t, r, o = !0) {
      super(), (this.ngModuleType = n), (this._parent = t);
      let i = td(n);
      (this._bootstrapComponents = wv(i.bootstrap)),
        (this._r3Injector = Sd(
          n,
          t,
          [
            { provide: Tr, useValue: this },
            { provide: Gi, useValue: this.componentFactoryResolver },
            ...r,
          ],
          fn(n),
          new Set(['environment'])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let n = this._r3Injector;
      !n.destroyed && n.destroy(), this.destroyCbs.forEach((t) => t()), (this.destroyCbs = null);
    }
    onDestroy(n) {
      this.destroyCbs.push(n);
    }
  },
  vc = class extends Tc {
    moduleType;
    constructor(n) {
      super(), (this.moduleType = n);
    }
    create(n) {
      return new mc(this.moduleType, n, []);
    }
  };
var Ni = class extends Tr {
  injector;
  componentFactoryResolver = new hc(this);
  instance = null;
  constructor(n) {
    super();
    let t = new yr(
      [
        ...n.providers,
        { provide: Tr, useValue: this },
        { provide: Gi, useValue: this.componentFactoryResolver },
      ],
      n.parent || _i(),
      n.debugName,
      new Set(['environment'])
    );
    (this.injector = t), n.runEnvironmentInitializers && t.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(n) {
    this.injector.onDestroy(n);
  }
};
function Wi(e, n, t = null) {
  return new Ni({ providers: e, parent: n, debugName: t, runEnvironmentInitializers: !0 }).injector;
}
var Fx = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(t) {
      this._injector = t;
    }
    getOrCreateStandaloneInjector(t) {
      if (!t.standalone) return null;
      if (!this.cachedInjectors.has(t)) {
        let r = rd(!1, t.type),
          o = r.length > 0 ? Wi([r], this._injector, `Standalone[${t.type.name}]`) : null;
        this.cachedInjectors.set(t, o);
      }
      return this.cachedInjectors.get(t);
    }
    ngOnDestroy() {
      try {
        for (let t of this.cachedInjectors.values()) t !== null && t.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = x({ token: e, providedIn: 'environment', factory: () => new e(E(_e)) });
  }
  return e;
})();
function U(e) {
  return Li(() => {
    let n = d_(e),
      t = k(w({}, n), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === Rf.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (n.standalone && e.dependencies) || null,
        getStandaloneInjector: n.standalone
          ? (o) => o.get(Fx).getOrCreateStandaloneInjector(t)
          : null,
        getExternalStyles: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || mn.Emulated,
        styles: e.styles || Ge,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: '',
      });
    n.standalone && Jn('NgStandalone'), f_(t);
    let r = e.dependencies;
    return (t.directiveDefs = Em(r, Lx)), (t.pipeDefs = Em(r, xg)), (t.id = Bx(t)), t;
  });
}
function Lx(e) {
  return Hn(e) || nd(e);
}
function Pe(e) {
  return Li(() => ({
    type: e.type,
    bootstrap: e.bootstrap || Ge,
    declarations: e.declarations || Ge,
    imports: e.imports || Ge,
    exports: e.exports || Ge,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function jx(e, n) {
  if (e == null) return Un;
  let t = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a,
        c;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i), (c = o[3] || null))
        : ((i = o), (s = o), (a = Ec.None), (c = null)),
        (t[i] = [r, a, c]),
        (n[i] = s);
    }
  return t;
}
function Vx(e) {
  if (e == null) return Un;
  let n = {};
  for (let t in e) e.hasOwnProperty(t) && (n[e[t]] = t);
  return n;
}
function K(e) {
  return Li(() => {
    let n = d_(e);
    return f_(n), n;
  });
}
function Cn(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone ?? !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function d_(e) {
  let n = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: n,
    inputConfig: e.inputs || Un,
    exportAs: e.exportAs || null,
    standalone: e.standalone ?? !0,
    signals: e.signals === !0,
    selectors: e.selectors || Ge,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    resolveHostDirectives: null,
    hostDirectives: null,
    inputs: jx(e.inputs, n),
    outputs: Vx(e.outputs),
    debugInfo: null,
  };
}
function f_(e) {
  e.features?.forEach((n) => n(e));
}
function Em(e, n) {
  return e
    ? () => {
        let t = typeof e == 'function' ? e() : e,
          r = [];
        for (let o of t) {
          let i = n(o);
          i !== null && r.push(i);
        }
        return r;
      }
    : null;
}
function Bx(e) {
  let n = 0,
    t = typeof e.consts == 'function' ? '' : e.consts,
    r = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      t,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ];
  for (let i of r.join('|')) n = (Math.imul(31, n) + i.charCodeAt(0)) << 0;
  return (n += 2147483648), 'c' + n;
}
function Ux(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function Qe(e) {
  let n = Ux(e.type),
    t = !0,
    r = [e];
  for (; n; ) {
    let o;
    if (Wt(e)) o = n.ɵcmp || n.ɵdir;
    else {
      if (n.ɵcmp) throw new y(903, !1);
      o = n.ɵdir;
    }
    if (o) {
      if (t) {
        r.push(o);
        let s = e;
        (s.inputs = Ud(e.inputs)),
          (s.declaredInputs = Ud(e.declaredInputs)),
          (s.outputs = Ud(e.outputs));
        let a = o.hostBindings;
        a && Wx(e, a);
        let c = o.viewQuery,
          l = o.contentQueries;
        if (
          (c && $x(e, c),
          l && Gx(e, l),
          Hx(e, o),
          gg(e.outputs, o.outputs),
          Wt(o) && o.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(e), a === Qe && (t = !1);
        }
    }
    n = Object.getPrototypeOf(n);
  }
  zx(r);
}
function Hx(e, n) {
  for (let t in n.inputs) {
    if (!n.inputs.hasOwnProperty(t) || e.inputs.hasOwnProperty(t)) continue;
    let r = n.inputs[t];
    r !== void 0 && ((e.inputs[t] = r), (e.declaredInputs[t] = n.declaredInputs[t]));
  }
}
function zx(e) {
  let n = 0,
    t = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    (o.hostVars = n += o.hostVars), (o.hostAttrs = _o(o.hostAttrs, (t = _o(t, o.hostAttrs))));
  }
}
function Ud(e) {
  return e === Un ? {} : e === Ge ? [] : e;
}
function $x(e, n) {
  let t = e.viewQuery;
  t
    ? (e.viewQuery = (r, o) => {
        n(r, o), t(r, o);
      })
    : (e.viewQuery = n);
}
function Gx(e, n) {
  let t = e.contentQueries;
  t
    ? (e.contentQueries = (r, o, i) => {
        n(r, o, i), t(r, o, i);
      })
    : (e.contentQueries = n);
}
function Wx(e, n) {
  let t = e.hostBindings;
  t
    ? (e.hostBindings = (r, o) => {
        n(r, o), t(r, o);
      })
    : (e.hostBindings = n);
}
function qx(e, n, t, r, o, i, s, a) {
  if (t.firstCreatePass) {
    e.mergedAttrs = _o(e.mergedAttrs, e.attrs);
    let u = (e.tView = Gf(
      2,
      e,
      o,
      i,
      s,
      t.directiveRegistry,
      t.pipeRegistry,
      null,
      t.schemas,
      t.consts,
      null
    ));
    t.queries !== null && (t.queries.template(t, e), (u.queries = t.queries.embeddedTView(e)));
  }
  a && (e.flags |= a), ho(e, !1);
  let c = Zx(t, n, e, r);
  Wa() && Kf(t, n, c, e), wo(c, n);
  let l = Kv(c, n, c, e);
  (n[r + ue] = l), qf(n, l), Mx(l, e, n);
}
function ki(e, n, t, r, o, i, s, a, c, l, u) {
  let d = t + ue,
    h;
  if (n.firstCreatePass) {
    if (((h = $i(n, d, 4, s || null, a || null)), l != null)) {
      let f = qt(n.consts, l);
      h.localNames = [];
      for (let _ = 0; _ < f.length; _ += 2) h.localNames.push(f[_], -1);
    }
  } else h = n.data[d];
  return qx(h, e, n, t, r, o, i, c), l != null && Jf(e, h, u), h;
}
var Zx = Yx;
function Yx(e, n, t, r) {
  return qa(!0), n[ee].createComment('');
}
var ip = (function (e) {
    return (
      (e[(e.CHANGE_DETECTION = 0)] = 'CHANGE_DETECTION'),
      (e[(e.AFTER_NEXT_RENDER = 1)] = 'AFTER_NEXT_RENDER'),
      e
    );
  })(ip || {}),
  qi = new C(''),
  p_ = !1,
  Cf = class extends re {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(n = !1) {
      super(),
        (this.__isAsync = n),
        Sg() &&
          ((this.destroyRef = p(gn, { optional: !0 }) ?? void 0),
          (this.pendingTasks = p(Zt, { optional: !0 }) ?? void 0));
    }
    emit(n) {
      let t = A(null);
      try {
        super.next(n);
      } finally {
        A(t);
      }
    }
    subscribe(n, t, r) {
      let o = n,
        i = t || (() => null),
        s = r;
      if (n && typeof n == 'object') {
        let c = n;
        (o = c.next?.bind(c)), (i = c.error?.bind(c)), (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return n instanceof ie && n.add(a), a;
    }
    wrapInTimeout(n) {
      return (t) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          try {
            n(t);
          } finally {
            r !== void 0 && this.pendingTasks?.remove(r);
          }
        });
      };
    }
  },
  se = Cf;
function h_(e) {
  let n, t;
  function r() {
    e = Ei;
    try {
      t !== void 0 && typeof cancelAnimationFrame == 'function' && cancelAnimationFrame(t),
        n !== void 0 && clearTimeout(n);
    } catch {}
  }
  return (
    (n = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == 'function' &&
      (t = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function Dm(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Ei;
    }
  );
}
var sp = 'isAngularZone',
  _c = sp + '_ID',
  Kx = 0,
  ae = class e {
    hasPendingMacrotasks = !1;
    hasPendingMicrotasks = !1;
    isStable = !0;
    onUnstable = new se(!1);
    onMicrotaskEmpty = new se(!1);
    onStable = new se(!1);
    onError = new se(!1);
    constructor(n) {
      let {
        enableLongStackTrace: t = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = p_,
      } = n;
      if (typeof Zone > 'u') throw new y(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        t && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = i),
        Xx(s);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get(sp) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new y(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new y(909, !1);
    }
    run(n, t, r) {
      return this._inner.run(n, t, r);
    }
    runTask(n, t, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask('NgZoneEvent: ' + o, n, Qx, Ei, Ei);
      try {
        return i.runTask(s, t, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(n, t, r) {
      return this._inner.runGuarded(n, t, r);
    }
    runOutsideAngular(n) {
      return this._outer.run(n);
    }
  },
  Qx = {};
function ap(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function Jx(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function n() {
    h_(() => {
      (e.callbackScheduled = !1),
        bf(e),
        (e.isCheckStableRunning = !0),
        ap(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        n();
      })
    : e._outer.run(() => {
        n();
      }),
    bf(e);
}
function Xx(e) {
  let n = () => {
      Jx(e);
    },
    t = Kx++;
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { [sp]: !0, [_c]: t, [_c + t]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (eO(c)) return r.invokeTask(i, s, a, c);
      try {
        return Im(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          e.shouldCoalesceRunChangeDetection) &&
          n(),
          Sm(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, l) => {
      try {
        return Im(e), r.invoke(i, s, a, c, l);
      } finally {
        e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !tO(c) && n(), Sm(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == 'microTask'
            ? ((e._hasPendingMicrotasks = s.microTask), bf(e), ap(e))
            : s.change == 'macroTask' && (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function bf(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function Im(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Sm(e) {
  e._nesting--, ap(e);
}
var Ri = class {
  hasPendingMicrotasks = !1;
  hasPendingMacrotasks = !1;
  isStable = !0;
  onUnstable = new se();
  onMicrotaskEmpty = new se();
  onStable = new se();
  onError = new se();
  run(n, t, r) {
    return n.apply(t, r);
  }
  runGuarded(n, t, r) {
    return n.apply(t, r);
  }
  runOutsideAngular(n) {
    return n();
  }
  runTask(n, t, r, o) {
    return n.apply(t, r);
  }
};
function eO(e) {
  return g_(e, '__ignore_ng_zone__');
}
function tO(e) {
  return g_(e, '__scheduler_tick__');
}
function g_(e, n) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[n] === !0;
}
var m_ = (() => {
  class e {
    impl = null;
    execute() {
      this.impl?.execute();
    }
    static ɵprov = x({ token: e, providedIn: 'root', factory: () => new e() });
  }
  return e;
})();
var Ac = (() => {
  class e {
    log(t) {
      console.log(t);
    }
    warn(t) {
      console.warn(t);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'platform' });
  }
  return e;
})();
var cp = new C('');
function Xn(e) {
  return !!e && typeof e.then == 'function';
}
function lp(e) {
  return !!e && typeof e.subscribe == 'function';
}
var v_ = new C('');
var up = (() => {
    class e {
      resolve;
      reject;
      initialized = !1;
      done = !1;
      donePromise = new Promise((t, r) => {
        (this.resolve = t), (this.reject = r);
      });
      appInits = p(v_, { optional: !0 }) ?? [];
      injector = p(ct);
      constructor() {}
      runInitializers() {
        if (this.initialized) return;
        let t = [];
        for (let o of this.appInits) {
          let i = ke(this.injector, o);
          if (Xn(i)) t.push(i);
          else if (lp(i)) {
            let s = new Promise((a, c) => {
              i.subscribe({ complete: a, error: c });
            });
            t.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(t)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          t.length === 0 && r(),
          (this.initialized = !0);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Nc = new C('');
function __() {
  fu(() => {
    let e = '';
    throw new y(600, e);
  });
}
function w_(e) {
  return e.isBoundToModule;
}
var nO = 10;
var bn = (() => {
  class e {
    _runningTick = !1;
    _destroyed = !1;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = p(Ye);
    afterRenderManager = p(m_);
    zonelessEnabled = p(go);
    rootEffectScheduler = p(Rd);
    dirtyFlags = 0;
    tracingSnapshot = null;
    allTestViews = new Set();
    autoDetectTestViews = new Set();
    includeAllTestViews = !1;
    afterTick = new re();
    get allViews() {
      return [
        ...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(),
        ...this._views,
      ];
    }
    get destroyed() {
      return this._destroyed;
    }
    componentTypes = [];
    components = [];
    internalPendingTask = p(Zt);
    get isStable() {
      return this.internalPendingTask.hasPendingTasksObservable.pipe(S((t) => !t));
    }
    constructor() {
      p(qi, { optional: !0 });
    }
    whenStable() {
      let t;
      return new Promise((r) => {
        t = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        t.unsubscribe();
      });
    }
    _injector = p(_e);
    _rendererFactory = null;
    get injector() {
      return this._injector;
    }
    bootstrap(t, r) {
      return this.bootstrapImpl(t, r);
    }
    bootstrapImpl(t, r, o = ct.NULL) {
      return this._injector.get(ae).run(() => {
        X(10);
        let s = t instanceof Sc;
        if (!this._injector.get(up).done) {
          let _ = '';
          throw new y(405, _);
        }
        let c;
        s ? (c = t) : (c = this._injector.get(Gi).resolveComponentFactory(t)),
          this.componentTypes.push(c.componentType);
        let l = w_(c) ? void 0 : this._injector.get(Tr),
          u = r || c.selector,
          d = c.create(o, [], u, l),
          h = d.location.nativeElement,
          f = d.injector.get(cp, null);
        return (
          f?.registerApplication(h),
          d.onDestroy(() => {
            this.detachView(d.hostView), Ii(this.components, d), f?.unregisterApplication(h);
          }),
          this._loadComponent(d),
          X(11, d),
          d
        );
      });
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      X(12),
        this.tracingSnapshot !== null
          ? this.tracingSnapshot.run(ip.CHANGE_DETECTION, this.tickImpl)
          : this.tickImpl();
    }
    tickImpl = () => {
      if (this._runningTick) throw new y(101, !1);
      let t = A(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } finally {
        (this._runningTick = !1),
          this.tracingSnapshot?.dispose(),
          (this.tracingSnapshot = null),
          A(t),
          this.afterTick.next(),
          X(13);
      }
    };
    synchronize() {
      this._rendererFactory === null &&
        !this._injector.destroyed &&
        (this._rendererFactory = this._injector.get(Sr, null, { optional: !0 }));
      let t = 0;
      for (; this.dirtyFlags !== 0 && t++ < nO; ) X(14), this.synchronizeOnce(), X(15);
    }
    synchronizeOnce() {
      this.dirtyFlags & 16 && ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
      let t = !1;
      if (this.dirtyFlags & 7) {
        let r = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8), (this.dirtyFlags |= 8);
        for (let { _lView: o } of this.allViews) {
          if (!r && !Mi(o)) continue;
          let i = r && !this.zonelessEnabled ? 0 : 1;
          Wv(o, i), (t = !0);
        }
        if (((this.dirtyFlags &= -5), this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23)) return;
      }
      t || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
        this.dirtyFlags & 8 && ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: t }) => Mi(t))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(t) {
      let r = t;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(t) {
      let r = t;
      Ii(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(t) {
      this.attachView(t.hostView);
      try {
        this.tick();
      } catch (o) {
        this.internalErrorHandler(o);
      }
      this.components.push(t), this._injector.get(Nc, []).forEach((o) => o(t));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((t) => t()),
            this._views.slice().forEach((t) => t.destroy());
        } finally {
          (this._destroyed = !0), (this._views = []), (this._destroyListeners = []);
        }
    }
    onDestroy(t) {
      return this._destroyListeners.push(t), () => Ii(this._destroyListeners, t);
    }
    destroy() {
      if (this._destroyed) throw new y(406, !1);
      let t = this._injector;
      t.destroy && !t.destroyed && t.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function Ii(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function Mn(e, n, t, r) {
  let o = F(),
    i = qn();
  if (bt(o, i, n)) {
    let s = he(),
      a = Pi();
    wM(a, o, e, n, t, r);
  }
  return Mn;
}
var CL = typeof document < 'u' && typeof document?.documentElement?.getAnimations == 'function';
var Mf = class {
  destroy(n) {}
  updateValue(n, t) {}
  swap(n, t) {
    let r = Math.min(n, t),
      o = Math.max(n, t),
      i = this.detach(o);
    if (o - r > 1) {
      let s = this.detach(r);
      this.attach(r, i), this.attach(o, s);
    } else this.attach(r, i);
  }
  move(n, t) {
    this.attach(t, this.detach(n, !0));
  }
};
function Hd(e, n, t, r, o) {
  return e === t && Object.is(n, r) ? 1 : Object.is(o(e, n), o(t, r)) ? -1 : 0;
}
function rO(e, n, t) {
  let r,
    o,
    i = 0,
    s = e.length - 1,
    a = void 0;
  if (Array.isArray(n)) {
    let c = n.length - 1;
    for (; i <= s && i <= c; ) {
      let l = e.at(i),
        u = n[i],
        d = Hd(i, l, i, u, t);
      if (d !== 0) {
        d < 0 && e.updateValue(i, u), i++;
        continue;
      }
      let h = e.at(s),
        f = n[c],
        _ = Hd(s, h, c, f, t);
      if (_ !== 0) {
        _ < 0 && e.updateValue(s, f), s--, c--;
        continue;
      }
      let O = t(i, l),
        M = t(s, h),
        b = t(i, u);
      if (Object.is(b, M)) {
        let ne = t(c, f);
        Object.is(ne, O) ? (e.swap(i, s), e.updateValue(s, f), c--, s--) : e.move(s, i),
          e.updateValue(i, u),
          i++;
        continue;
      }
      if (((r ??= new wc()), (o ??= Am(e, i, s, t)), xf(e, r, i, b))) e.updateValue(i, u), i++, s++;
      else if (o.has(b)) r.set(O, e.detach(i)), s--;
      else {
        let ne = e.create(i, n[i]);
        e.attach(i, ne), i++, s++;
      }
    }
    for (; i <= c; ) Tm(e, r, t, i, n[i]), i++;
  } else if (n != null) {
    let c = n[Symbol.iterator](),
      l = c.next();
    for (; !l.done && i <= s; ) {
      let u = e.at(i),
        d = l.value,
        h = Hd(i, u, i, d, t);
      if (h !== 0) h < 0 && e.updateValue(i, d), i++, (l = c.next());
      else {
        (r ??= new wc()), (o ??= Am(e, i, s, t));
        let f = t(i, d);
        if (xf(e, r, i, f)) e.updateValue(i, d), i++, s++, (l = c.next());
        else if (!o.has(f)) e.attach(i, e.create(i, d)), i++, s++, (l = c.next());
        else {
          let _ = t(i, u);
          r.set(_, e.detach(i)), s--;
        }
      }
    }
    for (; !l.done; ) Tm(e, r, t, e.length, l.value), (l = c.next());
  }
  for (; i <= s; ) e.destroy(e.detach(s--));
  r?.forEach((c) => {
    e.destroy(c);
  });
}
function xf(e, n, t, r) {
  return n !== void 0 && n.has(r) ? (e.attach(t, n.get(r)), n.delete(r), !0) : !1;
}
function Tm(e, n, t, r, o) {
  if (xf(e, n, r, t(r, o))) e.updateValue(r, o);
  else {
    let i = e.create(r, o);
    e.attach(r, i);
  }
}
function Am(e, n, t, r) {
  let o = new Set();
  for (let i = n; i <= t; i++) o.add(r(i, e.at(i)));
  return o;
}
var wc = class {
  kvMap = new Map();
  _vMap = void 0;
  has(n) {
    return this.kvMap.has(n);
  }
  delete(n) {
    if (!this.has(n)) return !1;
    let t = this.kvMap.get(n);
    return (
      this._vMap !== void 0 && this._vMap.has(t)
        ? (this.kvMap.set(n, this._vMap.get(t)), this._vMap.delete(t))
        : this.kvMap.delete(n),
      !0
    );
  }
  get(n) {
    return this.kvMap.get(n);
  }
  set(n, t) {
    if (this.kvMap.has(n)) {
      let r = this.kvMap.get(n);
      this._vMap === void 0 && (this._vMap = new Map());
      let o = this._vMap;
      for (; o.has(r); ) r = o.get(r);
      o.set(r, t);
    } else this.kvMap.set(n, t);
  }
  forEach(n) {
    for (let [t, r] of this.kvMap)
      if ((n(r, t), this._vMap !== void 0)) {
        let o = this._vMap;
        for (; o.has(r); ) (r = o.get(r)), n(r, t);
      }
  }
};
function Ce(e, n, t, r, o, i, s, a) {
  Jn('NgControlFlow');
  let c = F(),
    l = he(),
    u = qt(l.consts, i);
  return ki(c, l, e, n, t, r, o, u, 256, s, a), dp;
}
function dp(e, n, t, r, o, i, s, a) {
  Jn('NgControlFlow');
  let c = F(),
    l = he(),
    u = qt(l.consts, i);
  return ki(c, l, e, n, t, r, o, u, 512, s, a), dp;
}
function be(e, n) {
  Jn('NgControlFlow');
  let t = F(),
    r = qn(),
    o = t[r] !== pt ? t[r] : -1,
    i = o !== -1 ? yc(t, ue + o) : void 0,
    s = 0;
  if (bt(t, r, e)) {
    let a = A(null);
    try {
      if ((i !== void 0 && Jv(i, s), e !== -1)) {
        let c = ue + e,
          l = yc(t, c),
          u = Df(t[I], c),
          d = e_(l, u, t),
          h = Hi(t, u, n, { dehydratedView: d });
        zi(l, h, s, yo(u, d));
      }
    } finally {
      A(a);
    }
  } else if (i !== void 0) {
    let a = Qv(i, s);
    a !== void 0 && (a[pe] = n);
  }
}
var Of = class {
  lContainer;
  $implicit;
  $index;
  constructor(n, t, r) {
    (this.lContainer = n), (this.$implicit = t), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - ye;
  }
};
function Po(e) {
  return e;
}
var Pf = class {
  hasEmptyBlock;
  trackByFn;
  liveCollection;
  constructor(n, t, r) {
    (this.hasEmptyBlock = n), (this.trackByFn = t), (this.liveCollection = r);
  }
};
function Eo(e, n, t, r, o, i, s, a, c, l, u, d, h) {
  Jn('NgControlFlow');
  let f = F(),
    _ = he(),
    O = c !== void 0,
    M = F(),
    b = a ? s.bind(M[Ze][pe]) : s,
    ne = new Pf(O, b);
  (M[ue + e] = ne),
    ki(f, _, e + 1, n, t, r, o, qt(_.consts, i), 256),
    O && ki(f, _, e + 2, c, l, u, d, qt(_.consts, h), 512);
}
var Ef = class extends Mf {
  lContainer;
  hostLView;
  templateTNode;
  operationsCounter = void 0;
  needsIndexUpdate = !1;
  constructor(n, t, r) {
    super(), (this.lContainer = n), (this.hostLView = t), (this.templateTNode = r);
  }
  get length() {
    return this.lContainer.length - ye;
  }
  at(n) {
    return this.getLView(n)[pe].$implicit;
  }
  attach(n, t) {
    let r = t[br];
    (this.needsIndexUpdate ||= n !== this.length),
      zi(this.lContainer, t, n, yo(this.templateTNode, r));
  }
  detach(n, t) {
    return (
      (this.needsIndexUpdate ||= n !== this.length - 1),
      t && oO(this.lContainer, n),
      iO(this.lContainer, n)
    );
  }
  create(n, t) {
    let r = fc(this.lContainer, this.templateTNode.tView.ssrId),
      o = Hi(this.hostLView, this.templateTNode, new Of(this.lContainer, t, n), {
        dehydratedView: r,
      });
    return this.operationsCounter?.recordCreate(), o;
  }
  destroy(n) {
    Dc(n[I], n), this.operationsCounter?.recordDestroy();
  }
  updateValue(n, t) {
    this.getLView(n)[pe].$implicit = t;
  }
  reset() {
    (this.needsIndexUpdate = !1), this.operationsCounter?.reset();
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let n = 0; n < this.length; n++) this.getLView(n)[pe].$index = n;
  }
  getLView(n) {
    return sO(this.lContainer, n);
  }
};
function Do(e) {
  let n = A(null),
    t = hn();
  try {
    let r = F(),
      o = r[I],
      i = r[t],
      s = t + 1,
      a = yc(r, s);
    if (i.liveCollection === void 0) {
      let l = Df(o, s);
      i.liveCollection = new Ef(a, r, l);
    } else i.liveCollection.reset();
    let c = i.liveCollection;
    if ((rO(c, e, i.trackByFn), c.updateIndexes(), i.hasEmptyBlock)) {
      let l = qn(),
        u = c.length === 0;
      if (bt(r, l, u)) {
        let d = t + 2,
          h = yc(r, d);
        if (u) {
          let f = Df(o, d),
            _ = e_(h, f, r),
            O = Hi(r, f, void 0, { dehydratedView: _ });
          zi(h, O, 0, yo(f, _));
        } else o.firstUpdatePass && zM(h), Jv(h, 0);
      }
    }
  } finally {
    A(n);
  }
}
function yc(e, n) {
  return e[n];
}
function oO(e, n) {
  if (e.length <= ye) return;
  let t = ye + n,
    r = e[t];
  r && r[Or] && (r[Or].skipLeaveAnimations = !0);
}
function iO(e, n) {
  return Ai(e, n);
}
function sO(e, n) {
  return Qv(e, n);
}
function Df(e, n) {
  return bi(e, n);
}
function oe(e, n, t) {
  let r = F(),
    o = qn();
  if (bt(r, o, n)) {
    let i = he(),
      s = Pi();
    Lv(s, r, e, n, r[ee], t);
  }
  return oe;
}
function If(e, n, t, r, o) {
  Xf(n, e, t, o ? 'class' : 'style', r);
}
function v(e, n, t, r) {
  let o = F(),
    i = o[I],
    s = e + ue,
    a = i.firstCreatePass ? o_(s, o, 2, n, _M, Ug(), t, r) : i.data[s];
  if ((Vv(a, o, e, n, y_), ja(a))) {
    let c = o[I];
    Fv(c, o, a), uv(c, a, o);
  }
  return r != null && Jf(o, a), v;
}
function g() {
  let e = he(),
    n = Re(),
    t = Bv(n);
  return (
    e.firstCreatePass && i_(e, t),
    wd(t) && yd(),
    vd(),
    t.classesWithoutHost != null && UC(t) && If(e, t, F(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null && HC(t) && If(e, t, F(), t.stylesWithoutHost, !1),
    g
  );
}
function N(e, n, t, r) {
  return v(e, n, t, r), g(), N;
}
function q(e, n, t, r) {
  let o = F(),
    i = o[I],
    s = e + ue,
    a = i.firstCreatePass ? ox(s, i, 2, n, t, r) : i.data[s];
  return Vv(a, o, e, n, y_), r != null && Jf(o, a), q;
}
function Z() {
  let e = Re(),
    n = Bv(e);
  return wd(n) && yd(), vd(), Z;
}
function kc(e, n, t, r) {
  return q(e, n, t, r), Z(), kc;
}
var y_ = (e, n, t, r, o) => (qa(!0), bv(n[ee], r, Xg()));
function Mt() {
  return F();
}
function Rc(e, n, t) {
  let r = F(),
    o = qn();
  if (bt(r, o, n)) {
    let i = he(),
      s = Pi();
    jv(s, r, e, n, r[ee], t);
  }
  return Rc;
}
var Xa = void 0;
function aO(e) {
  let n = Math.floor(Math.abs(e)),
    t = e.toString().replace(/^[^.]*\.?/, '').length;
  return n === 1 && t === 0 ? 1 : 5;
}
var cO = [
    'en',
    [
      ['a', 'p'],
      ['AM', 'PM'],
    ],
    [['AM', 'PM']],
    [
      ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    ],
    Xa,
    [
      ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    ],
    Xa,
    [
      ['B', 'A'],
      ['BC', 'AD'],
      ['Before Christ', 'Anno Domini'],
    ],
    0,
    [6, 0],
    ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
    ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
    ['{1}, {0}', Xa, "{1} 'at' {0}", Xa],
    ['.', ',', ';', '%', '+', '-', 'E', '\xD7', '\u2030', '\u221E', 'NaN', ':'],
    ['#,##0.###', '#,##0%', '\xA4#,##0.00', '#E0'],
    'USD',
    '$',
    'US Dollar',
    {},
    'ltr',
    aO,
  ],
  zd = {};
function ht(e) {
  let n = lO(e),
    t = Nm(n);
  if (t) return t;
  let r = n.split('-')[0];
  if (((t = Nm(r)), t)) return t;
  if (r === 'en') return cO;
  throw new y(701, !1);
}
function Nm(e) {
  return (
    e in zd || (zd[e] = _t.ng && _t.ng.common && _t.ng.common.locales && _t.ng.common.locales[e]),
    zd[e]
  );
}
var ge = (function (e) {
  return (
    (e[(e.LocaleId = 0)] = 'LocaleId'),
    (e[(e.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
    (e[(e.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
    (e[(e.DaysFormat = 3)] = 'DaysFormat'),
    (e[(e.DaysStandalone = 4)] = 'DaysStandalone'),
    (e[(e.MonthsFormat = 5)] = 'MonthsFormat'),
    (e[(e.MonthsStandalone = 6)] = 'MonthsStandalone'),
    (e[(e.Eras = 7)] = 'Eras'),
    (e[(e.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
    (e[(e.WeekendRange = 9)] = 'WeekendRange'),
    (e[(e.DateFormat = 10)] = 'DateFormat'),
    (e[(e.TimeFormat = 11)] = 'TimeFormat'),
    (e[(e.DateTimeFormat = 12)] = 'DateTimeFormat'),
    (e[(e.NumberSymbols = 13)] = 'NumberSymbols'),
    (e[(e.NumberFormats = 14)] = 'NumberFormats'),
    (e[(e.CurrencyCode = 15)] = 'CurrencyCode'),
    (e[(e.CurrencySymbol = 16)] = 'CurrencySymbol'),
    (e[(e.CurrencyName = 17)] = 'CurrencyName'),
    (e[(e.Currencies = 18)] = 'Currencies'),
    (e[(e.Directionality = 19)] = 'Directionality'),
    (e[(e.PluralCase = 20)] = 'PluralCase'),
    (e[(e.ExtraData = 21)] = 'ExtraData'),
    e
  );
})(ge || {});
function lO(e) {
  return e.toLowerCase().replace(/_/g, '-');
}
var Zi = 'en-US';
var uO = Zi;
function C_(e) {
  typeof e == 'string' && (uO = e.toLowerCase().replace(/_/g, '-'));
}
function Y(e, n, t) {
  let r = F(),
    o = he(),
    i = Re();
  return b_(o, r, r[ee], i, e, n, t), Y;
}
function b_(e, n, t, r, o, i, s) {
  let a = !0,
    c = null;
  if (((r.type & 3 || s) && ((c ??= Vd(r, n, i)), ax(r, e, n, s, t, o, i, c) && (a = !1)), a)) {
    let l = r.outputs?.[o],
      u = r.hostDirectiveOutputs?.[o];
    if (u && u.length)
      for (let d = 0; d < u.length; d += 2) {
        let h = u[d],
          f = u[d + 1];
        (c ??= Vd(r, n, i)), Mm(r, n, h, f, o, c);
      }
    if (l && l.length) for (let d of l) (c ??= Vd(r, n, i)), Mm(r, n, d, o, o, c);
  }
}
function Me(e = 1) {
  return Jg(e);
}
function dO(e, n) {
  let t = null,
    r = Fb(e);
  for (let o = 0; o < n.length; o++) {
    let i = n[o];
    if (i === '*') {
      t = o;
      continue;
    }
    if (r === null ? Cv(e, i, !0) : Vb(r, i)) return o;
  }
  return t;
}
function Yi(e) {
  let n = F()[Ze][qe];
  if (!n.projection) {
    let t = e ? e.length : 1,
      r = (n.projection = bg(t, null)),
      o = r.slice(),
      i = n.child;
    for (; i !== null; ) {
      if (i.type !== 128) {
        let s = e ? dO(i, e) : 0;
        s !== null && (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i));
      }
      i = i.next;
    }
  }
}
function Ki(e, n = 0, t, r, o, i) {
  let s = F(),
    a = he(),
    c = r ? e + 1 : null;
  c !== null && ki(s, a, c, r, o, i, null, t);
  let l = $i(a, ue + e, 16, null, t || null);
  l.projection === null && (l.projection = n), Md();
  let d = !s[br] || _d();
  s[Ze][qe].projection[l.projection] === null && c !== null
    ? fO(s, a, c)
    : d && !Oc(l) && aM(a, s, l);
}
function fO(e, n, t) {
  let r = ue + t,
    o = n.data[r],
    i = e[r],
    s = fc(i, o.tView.ssrId),
    a = Hi(e, o, void 0, { dehydratedView: s });
  zi(i, a, 0, yo(o, s));
}
function fp(e, n, t, r) {
  Tx(e, n, t, r);
}
function pp(e) {
  let n = F(),
    t = he(),
    r = Ed();
  za(r + 1);
  let o = op(t, r);
  if (e.dirty && kg(n) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = Rx(n, r);
      e.reset(i, tb), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function hp() {
  return Ix(F(), Ed());
}
function gp(e) {
  let n = zg();
  return Va(n, ue + e);
}
function ec(e, n) {
  return (e << 17) | (n << 2);
}
function Ar(e) {
  return (e >> 17) & 32767;
}
function pO(e) {
  return (e & 2) == 2;
}
function hO(e, n) {
  return (e & 131071) | (n << 17);
}
function Sf(e) {
  return e | 2;
}
function Mo(e) {
  return (e & 131068) >> 2;
}
function $d(e, n) {
  return (e & -131069) | (n << 2);
}
function gO(e) {
  return (e & 1) === 1;
}
function Tf(e) {
  return e | 1;
}
function mO(e, n, t, r, o, i) {
  let s = i ? n.classBindings : n.styleBindings,
    a = Ar(s),
    c = Mo(s);
  e[r] = t;
  let l = !1,
    u;
  if (Array.isArray(t)) {
    let d = t;
    (u = d[1]), (u === null || lo(d, u) > 0) && (l = !0);
  } else u = t;
  if (o)
    if (c !== 0) {
      let h = Ar(e[a + 1]);
      (e[r + 1] = ec(h, a)), h !== 0 && (e[h + 1] = $d(e[h + 1], r)), (e[a + 1] = hO(e[a + 1], r));
    } else (e[r + 1] = ec(a, 0)), a !== 0 && (e[a + 1] = $d(e[a + 1], r)), (a = r);
  else (e[r + 1] = ec(c, 0)), a === 0 ? (a = r) : (e[c + 1] = $d(e[c + 1], r)), (c = r);
  l && (e[r + 1] = Sf(e[r + 1])),
    km(e, u, r, !0),
    km(e, u, r, !1),
    vO(n, u, e, r, i),
    (s = ec(a, c)),
    i ? (n.classBindings = s) : (n.styleBindings = s);
}
function vO(e, n, t, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null && typeof n == 'string' && lo(i, n) >= 0 && (t[r + 1] = Tf(t[r + 1]));
}
function km(e, n, t, r) {
  let o = e[t + 1],
    i = n === null,
    s = r ? Ar(o) : Mo(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      l = e[s + 1];
    _O(c, n) && ((a = !0), (e[s + 1] = r ? Tf(l) : Sf(l))), (s = r ? Ar(l) : Mo(l));
  }
  a && (e[t + 1] = r ? Sf(o) : Tf(o));
}
function _O(e, n) {
  return e === null || n == null || (Array.isArray(e) ? e[1] : e) === n
    ? !0
    : Array.isArray(e) && typeof n == 'string'
    ? lo(e, n) >= 0
    : !1;
}
var kt = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function wO(e) {
  return e.substring(kt.key, kt.keyEnd);
}
function yO(e) {
  return CO(e), M_(e, x_(e, 0, kt.textEnd));
}
function M_(e, n) {
  let t = kt.textEnd;
  return t === n ? -1 : ((n = kt.keyEnd = bO(e, (kt.key = n), t)), x_(e, n, t));
}
function CO(e) {
  (kt.key = 0), (kt.keyEnd = 0), (kt.value = 0), (kt.valueEnd = 0), (kt.textEnd = e.length);
}
function x_(e, n, t) {
  for (; n < t && e.charCodeAt(n) <= 32; ) n++;
  return n;
}
function bO(e, n, t) {
  for (; n < t && e.charCodeAt(n) > 32; ) n++;
  return n;
}
function xn(e, n) {
  return xO(e, n, null, !0), xn;
}
function Qi(e) {
  OO(TO, MO, e, !0);
}
function MO(e, n) {
  for (let t = yO(n); t >= 0; t = M_(n, t)) ka(e, wO(n), !0);
}
function xO(e, n, t, r) {
  let o = F(),
    i = he(),
    s = Pd(2);
  if ((i.firstUpdatePass && P_(i, e, s, r), n !== pt && bt(o, s, n))) {
    let a = i.data[hn()];
    E_(i, a, o, o[ee], e, (o[s + 1] = NO(n, t)), r, s);
  }
}
function OO(e, n, t, r) {
  let o = he(),
    i = Pd(2);
  o.firstUpdatePass && P_(o, null, i, r);
  let s = F();
  if (t !== pt && bt(s, i, t)) {
    let a = o.data[hn()];
    if (D_(a, r) && !O_(o, i)) {
      let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (t = Sa(c, t || '')), If(o, a, s, t, r);
    } else AO(o, a, s, s[ee], s[i + 1], (s[i + 1] = SO(e, n, t)), r, i);
  }
}
function O_(e, n) {
  return n >= e.expandoStartIndex;
}
function P_(e, n, t, r) {
  let o = e.data;
  if (o[t + 1] === null) {
    let i = o[hn()],
      s = O_(e, t);
    D_(i, r) && n === null && !s && (n = !1), (n = PO(o, i, n, r)), mO(o, i, n, t, s, r);
  }
}
function PO(e, n, t, r) {
  let o = Zg(e),
    i = r ? n.residualClasses : n.residualStyles;
  if (o === null)
    (r ? n.classBindings : n.styleBindings) === 0 &&
      ((t = Gd(null, e, n, t, r)), (t = Fi(t, n.attrs, r)), (i = null));
  else {
    let s = n.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((t = Gd(o, e, n, t, r)), i === null)) {
        let c = EO(e, n, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = Gd(null, e, n, c[1], r)), (c = Fi(c, n.attrs, r)), DO(e, n, r, c));
      } else i = IO(e, n, r);
  }
  return i !== void 0 && (r ? (n.residualClasses = i) : (n.residualStyles = i)), t;
}
function EO(e, n, t) {
  let r = t ? n.classBindings : n.styleBindings;
  if (Mo(r) !== 0) return e[Ar(r)];
}
function DO(e, n, t, r) {
  let o = t ? n.classBindings : n.styleBindings;
  e[Ar(o)] = r;
}
function IO(e, n, t) {
  let r,
    o = n.directiveEnd;
  for (let i = 1 + n.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = Fi(r, s, t);
  }
  return Fi(r, n.attrs, t);
}
function Gd(e, n, t, r, o) {
  let i = null,
    s = t.directiveEnd,
    a = t.directiveStylingLast;
  for (
    a === -1 ? (a = t.directiveStart) : a++;
    a < s && ((i = n[a]), (r = Fi(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (t.directiveStylingLast = a), r;
}
function Fi(e, n, t) {
  let r = t ? 1 : 2,
    o = -1;
  if (n !== null)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      typeof s == 'number'
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]), ka(e, s, t ? !0 : n[++i]));
    }
  return e === void 0 ? null : e;
}
function SO(e, n, t) {
  if (t == null || t === '') return Ge;
  let r = [],
    o = Rt(t);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == 'object') for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && n(r, o);
  return r;
}
function TO(e, n, t) {
  let r = String(n);
  r !== '' && !r.includes(' ') && ka(e, r, t);
}
function AO(e, n, t, r, o, i, s, a) {
  o === pt && (o = Ge);
  let c = 0,
    l = 0,
    u = 0 < o.length ? o[0] : null,
    d = 0 < i.length ? i[0] : null;
  for (; u !== null || d !== null; ) {
    let h = c < o.length ? o[c + 1] : void 0,
      f = l < i.length ? i[l + 1] : void 0,
      _ = null,
      O;
    u === d
      ? ((c += 2), (l += 2), h !== f && ((_ = d), (O = f)))
      : d === null || (u !== null && u < d)
      ? ((c += 2), (_ = u))
      : ((l += 2), (_ = d), (O = f)),
      _ !== null && E_(e, n, t, r, _, O, s, a),
      (u = c < o.length ? o[c] : null),
      (d = l < i.length ? i[l] : null);
  }
}
function E_(e, n, t, r, o, i, s, a) {
  if (!(n.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = gO(l) ? Rm(c, n, t, o, Mo(l), s) : void 0;
  if (!Cc(u)) {
    Cc(i) || (pO(l) && (i = Rm(c, null, t, o, a, s)));
    let d = ud(hn(), t);
    lM(r, s, d, o, i);
  }
}
function Rm(e, n, t, r, o, i) {
  let s = n === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      h = t[o + 1];
    h === pt && (h = d ? Ge : void 0);
    let f = d ? Ra(h, r) : u === r ? h : void 0;
    if ((l && !Cc(f) && (f = Ra(c, r)), Cc(f) && ((a = f), s))) return a;
    let _ = e[o + 1];
    o = s ? Ar(_) : Mo(_);
  }
  if (n !== null) {
    let c = i ? n.residualClasses : n.residualStyles;
    c != null && (a = Ra(c, r));
  }
  return a;
}
function Cc(e) {
  return e !== void 0;
}
function NO(e, n) {
  return (
    e == null ||
      e === '' ||
      (typeof n == 'string' ? (e = e + n) : typeof e == 'object' && (e = fn(Rt(e)))),
    e
  );
}
function D_(e, n) {
  return (e.flags & (n ? 8 : 16)) !== 0;
}
function m(e, n = '') {
  let t = F(),
    r = he(),
    o = e + ue,
    i = r.firstCreatePass ? $i(r, o, 1, n, null) : r.data[o],
    s = kO(r, t, i, n, e);
  (t[o] = s), Wa() && Kf(r, t, s, i), ho(i, !1);
}
var kO = (e, n, t, r, o) => (qa(!0), zb(n[ee], r));
function RO(e, n, t, r = '') {
  return bt(e, qn(), t) ? n + gi(t) + r : pt;
}
function Ee(e) {
  return Ji('', e), Ee;
}
function Ji(e, n, t) {
  let r = F(),
    o = RO(r, e, n, t);
  return o !== pt && FO(r, hn(), o), Ji;
}
function FO(e, n, t) {
  let r = ud(n, e);
  $b(e[ee], r, t);
}
function On(e, n, t) {
  Nd(n) && (n = n());
  let r = F(),
    o = qn();
  if (bt(r, o, n)) {
    let i = he(),
      s = Pi();
    Lv(s, r, e, n, r[ee], t);
  }
  return On;
}
function er(e, n) {
  let t = Nd(e);
  return t && e.set(n), t;
}
function Pn(e, n) {
  let t = F(),
    r = he(),
    o = Re();
  return b_(r, t, t[ee], o, e, n), Pn;
}
function LO(e, n, t) {
  let r = he();
  if (r.firstCreatePass) {
    let o = Wt(e);
    Af(t, r.data, r.blueprint, o, !0), Af(n, r.data, r.blueprint, o, !1);
  }
}
function Af(e, n, t, r, o) {
  if (((e = Ne(e)), Array.isArray(e))) for (let i = 0; i < e.length; i++) Af(e[i], n, t, r, o);
  else {
    let i = he(),
      s = F(),
      a = Re(),
      c = wr(e) ? e : Ne(e.provide),
      l = id(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      h = a.providerIndexes >> 20;
    if (wr(e) || !e.multi) {
      let f = new Ir(l, o, T, null),
        _ = qd(c, n, o ? u : u + h, d);
      _ === -1
        ? (Yd(lc(a, s), i, c),
          Wd(i, e, n.length),
          n.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          t.push(f),
          s.push(f))
        : ((t[_] = f), (s[_] = f));
    } else {
      let f = qd(c, n, u + h, d),
        _ = qd(c, n, u, u + h),
        O = f >= 0 && t[f],
        M = _ >= 0 && t[_];
      if ((o && !M) || (!o && !O)) {
        Yd(lc(a, s), i, c);
        let b = BO(o ? VO : jO, t.length, o, r, l, e);
        !o && M && (t[_].providerFactory = b),
          Wd(i, e, n.length, 0),
          n.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          t.push(b),
          s.push(b);
      } else {
        let b = I_(t[o ? _ : f], l, !o && r);
        Wd(i, e, f > -1 ? f : _, b);
      }
      !o && r && M && t[_].componentProviders++;
    }
  }
}
function Wd(e, n, t, r) {
  let o = wr(n),
    i = Ig(n);
  if (o || i) {
    let c = (i ? Ne(n.useClass) : n).prototype.ngOnDestroy;
    if (c) {
      let l = e.destroyHooks || (e.destroyHooks = []);
      if (!o && n.multi) {
        let u = l.indexOf(t);
        u === -1 ? l.push(t, [r, c]) : l[u + 1].push(r, c);
      } else l.push(t, c);
    }
  }
}
function I_(e, n, t) {
  return t && e.componentProviders++, e.multi.push(n) - 1;
}
function qd(e, n, t, r) {
  for (let o = t; o < r; o++) if (n[o] === e) return o;
  return -1;
}
function jO(e, n, t, r, o) {
  return Nf(this.multi, []);
}
function VO(e, n, t, r, o) {
  let i = this.multi,
    s;
  if (this.providerFactory) {
    let a = this.providerFactory.componentProviders,
      c = Si(r, r[I], this.providerFactory.index, o);
    (s = c.slice(0, a)), Nf(i, s);
    for (let l = a; l < c.length; l++) s.push(c[l]);
  } else (s = []), Nf(i, s);
  return s;
}
function Nf(e, n) {
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    n.push(r());
  }
  return n;
}
function BO(e, n, t, r, o, i) {
  let s = new Ir(e, t, T, null);
  return (s.multi = []), (s.index = n), (s.componentProviders = 0), I_(s, o, r && !t), s;
}
function Ft(e, n = []) {
  return (t) => {
    t.providersResolver = (r, o) => LO(r, o ? o(e) : e, n);
  };
}
function mp(e, n, t) {
  let r = Oi() + e,
    o = F();
  return o[r] === pt ? rp(o, r, t ? n.call(t) : n()) : ix(o, r);
}
function Xi(e, n, t, r) {
  return T_(F(), Oi(), e, n, t, r);
}
function S_(e, n) {
  let t = e[n];
  return t === pt ? void 0 : t;
}
function T_(e, n, t, r, o, i) {
  let s = n + t;
  return bt(e, s, o) ? rp(e, s + 1, i ? r.call(i, o) : r(o)) : S_(e, s + 1);
}
function UO(e, n, t, r, o, i, s) {
  let a = n + t;
  return sx(e, a, o, i) ? rp(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : S_(e, a + 2);
}
function En(e, n) {
  let t = he(),
    r,
    o = e + ue;
  t.firstCreatePass
    ? ((r = HO(n, t.pipeRegistry)),
      (t.data[o] = r),
      r.onDestroy && (t.destroyHooks ??= []).push(o, r.onDestroy))
    : (r = t.data[o]);
  let i = r.factory || (r.factory = Vn(r.type, !0)),
    s,
    a = $e(T);
  try {
    let c = cc(!1),
      l = i();
    return cc(c), dd(t, F(), o, l), l;
  } finally {
    $e(a);
  }
}
function HO(e, n) {
  if (n)
    for (let t = n.length - 1; t >= 0; t--) {
      let r = n[t];
      if (e === r.name) return r;
    }
}
function tr(e, n, t) {
  let r = e + ue,
    o = F(),
    i = Va(o, r);
  return A_(o, r) ? T_(o, Oi(), n, i.transform, t, i) : i.transform(t);
}
function vp(e, n, t, r) {
  let o = e + ue,
    i = F(),
    s = Va(i, o);
  return A_(i, o) ? UO(i, Oi(), n, s.transform, t, r, s) : s.transform(t, r);
}
function A_(e, n) {
  return e[I].data[n].pure;
}
var bc = class {
    ngModuleFactory;
    componentFactories;
    constructor(n, t) {
      (this.ngModuleFactory = n), (this.componentFactories = t);
    }
  },
  _p = (() => {
    class e {
      compileModuleSync(t) {
        return new vc(t);
      }
      compileModuleAsync(t) {
        return Promise.resolve(this.compileModuleSync(t));
      }
      compileModuleAndAllComponentsSync(t) {
        let r = this.compileModuleSync(t),
          o = td(t),
          i = wv(o.declarations).reduce((s, a) => {
            let c = Hn(a);
            return c && s.push(new bo(c)), s;
          }, []);
        return new bc(r, i);
      }
      compileModuleAndAllComponentsAsync(t) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
      }
      clearCache() {}
      clearCacheFor(t) {}
      getModuleId(t) {}
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
var zO = (() => {
  class e {
    zone = p(ae);
    changeDetectionScheduler = p(pn);
    applicationRef = p(bn);
    applicationErrorHandler = p(Ye);
    _onMicrotaskEmptySubscription;
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
          next: () => {
            this.changeDetectionScheduler.runningTick ||
              this.zone.run(() => {
                try {
                  (this.applicationRef.dirtyFlags |= 1), this.applicationRef._tick();
                } catch (t) {
                  this.applicationErrorHandler(t);
                }
              });
          },
        }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function N_({ ngZoneFactory: e, ignoreChangesOutsideZone: n, scheduleInRootZone: t }) {
  return (
    (e ??= () => new ae(k(w({}, k_()), { scheduleInRootZone: t }))),
    [
      { provide: ae, useFactory: e },
      {
        provide: Ut,
        multi: !0,
        useFactory: () => {
          let r = p(zO, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: Ut,
        multi: !0,
        useFactory: () => {
          let r = p($O);
          return () => {
            r.initialize();
          };
        },
      },
      n === !0 ? { provide: kd, useValue: !0 } : [],
      { provide: Za, useValue: t ?? p_ },
      {
        provide: Ye,
        useFactory: () => {
          let r = p(ae),
            o = p(_e),
            i;
          return (s) => {
            r.runOutsideAngular(() => {
              o.destroyed && !i
                ? setTimeout(() => {
                    throw s;
                  })
                : ((i ??= o.get(We)), i.handleError(s));
            });
          };
        },
      },
    ]
  );
}
function k_(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var $O = (() => {
  class e {
    subscription = new ie();
    initialized = !1;
    zone = p(ae);
    pendingTasks = p(Zt);
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let t = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (t = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              ae.assertNotInAngularZone(),
                queueMicrotask(() => {
                  t !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(t), (t = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            ae.assertInAngularZone(), (t ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
var wp = (() => {
  class e {
    applicationErrorHandler = p(Ye);
    appRef = p(bn);
    taskService = p(Zt);
    ngZone = p(ae);
    zonelessEnabled = p(go);
    tracing = p(qi, { optional: !0 });
    disableScheduling = p(kd, { optional: !0 }) ?? !1;
    zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
    subscriptions = new ie();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(_c) : null;
    scheduleInRootZone =
      !this.zonelessEnabled && this.zoneIsDefined && (p(Za, { optional: !0 }) ?? !1);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = !1;
    runningTick = !1;
    pendingRenderTaskId = null;
    constructor() {
      this.subscriptions.add(
        this.appRef.afterTick.subscribe(() => {
          this.runningTick || this.cleanup();
        })
      ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled && (this.ngZone instanceof Ri || !this.zoneIsDefined));
    }
    notify(t) {
      if (!this.zonelessEnabled && t === 5) return;
      let r = !1;
      switch (t) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 6: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 12: {
          (this.appRef.dirtyFlags |= 16), (r = !0);
          break;
        }
        case 13: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 11: {
          r = !0;
          break;
        }
        case 9:
        case 8:
        case 7:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (
        ((this.appRef.tracingSnapshot =
          this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
        !this.shouldScheduleTick(r))
      )
        return;
      let o = this.useMicrotaskScheduler ? Dm : h_;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() => o(() => this.tick())))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              o(() => this.tick())
            ));
    }
    shouldScheduleTick(t) {
      return !(
        (this.disableScheduling && !t) ||
        this.appRef.destroyed ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(_c + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
      }
      !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
      let t = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        this.taskService.remove(t), this.applicationErrorHandler(r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        Dm(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(t);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let t = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(t);
      }
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function yp() {
  return (
    Jn('NgZoneless'),
    Ht([
      { provide: pn, useExisting: wp },
      { provide: ae, useClass: Ri },
      { provide: go, useValue: !0 },
      { provide: Za, useValue: !1 },
      [],
    ])
  );
}
function GO() {
  return (typeof $localize < 'u' && $localize.locale) || Zi;
}
var es = new C('', {
  providedIn: 'root',
  factory: () => p(es, { optional: !0, skipSelf: !0 }) || GO(),
});
function De(e) {
  return fg(e);
}
function Io(e, n) {
  return Xs(e, n?.equal);
}
var R_ = class {
  [Ve];
  constructor(n) {
    this[Ve] = n;
  }
  destroy() {
    this[Ve].destroy();
  }
};
var B_ = Symbol('InputSignalNode#UNSET'),
  iP = k(w({}, ea), {
    transformFn: void 0,
    applyValueToInputSignal(e, n) {
      Yr(e, n);
    },
  });
function U_(e, n) {
  let t = Object.create(iP);
  (t.value = e), (t.transformFn = n?.transform);
  function r() {
    if ((Wr(t), t.value === B_)) {
      let o = null;
      throw new y(-950, o);
    }
    return t.value;
  }
  return (r[Ve] = t), r;
}
var So = class {
    attributeName;
    constructor(n) {
      this.attributeName = n;
    }
    __NG_ELEMENT_ID__ = () => ji(this.attributeName);
    toString() {
      return `HostAttributeToken ${this.attributeName}`;
    }
  },
  sP = new C('');
sP.__NG_ELEMENT_ID__ = (e) => {
  let n = Re();
  if (n === null) throw new y(204, !1);
  if (n.type & 2) return n.value;
  if (e & 8) return null;
  throw new y(204, !1);
};
function F_(e, n) {
  return U_(e, n);
}
function aP(e) {
  return U_(B_, e);
}
var H_ = ((F_.required = aP), F_);
var Cp = new C(''),
  cP = new C('');
function ts(e) {
  return !e.moduleRef;
}
function lP(e) {
  let n = ts(e) ? e.r3Injector : e.moduleRef.injector,
    t = n.get(ae);
  return t.run(() => {
    ts(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
    let r = n.get(Ye),
      o;
    if (
      (t.runOutsideAngular(() => {
        o = t.onError.subscribe({ next: r });
      }),
      ts(e))
    ) {
      let i = () => n.destroy(),
        s = e.platformInjector.get(Cp);
      s.add(i),
        n.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Cp);
      s.add(i),
        e.moduleRef.onDestroy(() => {
          Ii(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i);
        });
    }
    return dP(r, t, () => {
      let i = n.get(Zt),
        s = i.add(),
        a = n.get(up);
      return (
        a.runInitializers(),
        a.donePromise
          .then(() => {
            let c = n.get(es, Zi);
            if ((C_(c || Zi), !n.get(cP, !0)))
              return ts(e) ? n.get(bn) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
            if (ts(e)) {
              let u = n.get(bn);
              return e.rootComponent !== void 0 && u.bootstrap(e.rootComponent), u;
            } else return uP?.(e.moduleRef, e.allPlatformModules), e.moduleRef;
          })
          .finally(() => void i.remove(s))
      );
    });
  });
}
var uP;
function dP(e, n, t) {
  try {
    let r = t();
    return Xn(r)
      ? r.catch((o) => {
          throw (n.runOutsideAngular(() => e(o)), o);
        })
      : r;
  } catch (r) {
    throw (n.runOutsideAngular(() => e(r)), r);
  }
}
var Fc = null;
function fP(e = [], n) {
  return ct.create({
    name: n,
    providers: [
      { provide: vi, useValue: 'platform' },
      { provide: Cp, useValue: new Set([() => (Fc = null)]) },
      ...e,
    ],
  });
}
function pP(e = []) {
  if (Fc) return Fc;
  let n = fP(e);
  return (Fc = n), __(), hP(n), n;
}
function hP(e) {
  let n = e.get(xc, null);
  ke(e, () => {
    n?.forEach((t) => t());
  });
}
var me = (() => {
  class e {
    static __NG_ELEMENT_ID__ = gP;
  }
  return e;
})();
function gP(e) {
  return mP(Re(), F(), (e & 16) === 16);
}
function mP(e, n, t) {
  if (Wn(e) && !t) {
    let r = Ct(e.index, n);
    return new Yn(r, r);
  } else if (e.type & 175) {
    let r = n[Ze];
    return new Yn(r, n);
  }
  return null;
}
function z_(e) {
  let { rootComponent: n, appProviders: t, platformProviders: r, platformRef: o } = e;
  X(8);
  try {
    let i = o?.injector ?? pP(r),
      s = [N_({}), { provide: pn, useExisting: wp }, tm, ...(t || [])],
      a = new Ni({ providers: s, parent: i, debugName: '', runEnvironmentInitializers: !1 });
    return lP({ r3Injector: a.injector, platformInjector: i, rootComponent: n });
  } catch (i) {
    return Promise.reject(i);
  } finally {
    X(9);
  }
}
function Jt(e) {
  return typeof e == 'boolean' ? e : e != null && e !== 'false';
}
var W_ = null;
function xt() {
  return W_;
}
function Mp(e) {
  W_ ??= e;
}
var ns = class {},
  xp = (() => {
    class e {
      historyGo(t) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => p(q_), providedIn: 'platform' });
    }
    return e;
  })();
var q_ = (() => {
  class e extends xp {
    _location;
    _history;
    _doc = p(J);
    constructor() {
      super(), (this._location = window.location), (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return xt().getBaseHref(this._doc);
    }
    onPopState(t) {
      let r = xt().getGlobalEventTarget(this._doc, 'window');
      return r.addEventListener('popstate', t, !1), () => r.removeEventListener('popstate', t);
    }
    onHashChange(t) {
      let r = xt().getGlobalEventTarget(this._doc, 'window');
      return r.addEventListener('hashchange', t, !1), () => r.removeEventListener('hashchange', t);
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(t) {
      this._location.pathname = t;
    }
    pushState(t, r, o) {
      this._history.pushState(t, r, o);
    }
    replaceState(t, r, o) {
      this._history.replaceState(t, r, o);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(t = 0) {
      this._history.go(t);
    }
    getState() {
      return this._history.state;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: () => new e(), providedIn: 'platform' });
  }
  return e;
})();
function Z_(e, n) {
  return e
    ? n
      ? e.endsWith('/')
        ? n.startsWith('/')
          ? e + n.slice(1)
          : e + n
        : n.startsWith('/')
        ? e + n
        : `${e}/${n}`
      : e
    : n;
}
function $_(e) {
  let n = e.search(/#|\?|$/);
  return e[n - 1] === '/' ? e.slice(0, n - 1) + e.slice(n) : e;
}
function nr(e) {
  return e && e[0] !== '?' ? `?${e}` : e;
}
var To = (() => {
    class e {
      historyGo(t) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => p(K_), providedIn: 'root' });
    }
    return e;
  })(),
  Y_ = new C(''),
  K_ = (() => {
    class e extends To {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(t, r) {
        super(),
          (this._platformLocation = t),
          (this._baseHref =
            r ?? this._platformLocation.getBaseHrefFromDOM() ?? p(J).location?.origin ?? '');
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
      }
      onPopState(t) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(t),
          this._platformLocation.onHashChange(t)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(t) {
        return Z_(this._baseHref, t);
      }
      path(t = !1) {
        let r = this._platformLocation.pathname + nr(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && t ? `${r}${o}` : r;
      }
      pushState(t, r, o, i) {
        let s = this.prepareExternalUrl(o + nr(i));
        this._platformLocation.pushState(t, r, s);
      }
      replaceState(t, r, o, i) {
        let s = this.prepareExternalUrl(o + nr(i));
        this._platformLocation.replaceState(t, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(t = 0) {
        this._platformLocation.historyGo?.(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(E(xp), E(Y_, 8));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Ao = (() => {
    class e {
      _subject = new re();
      _basePath;
      _locationStrategy;
      _urlChangeListeners = [];
      _urlChangeSubscription = null;
      constructor(t) {
        this._locationStrategy = t;
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = wP($_(G_(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.next({ url: this.path(!0), pop: !0, state: o.state, type: o.type });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
      }
      path(t = !1) {
        return this.normalize(this._locationStrategy.path(t));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(t, r = '') {
        return this.path() == this.normalize(t + nr(r));
      }
      normalize(t) {
        return e.stripTrailingSlash(_P(this._basePath, G_(t)));
      }
      prepareExternalUrl(t) {
        return t && t[0] !== '/' && (t = '/' + t), this._locationStrategy.prepareExternalUrl(t);
      }
      go(t, r = '', o = null) {
        this._locationStrategy.pushState(o, '', t, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(t + nr(r)), o);
      }
      replaceState(t, r = '', o = null) {
        this._locationStrategy.replaceState(o, '', t, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(t + nr(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(t = 0) {
        this._locationStrategy.historyGo?.(t);
      }
      onUrlChange(t) {
        return (
          this._urlChangeListeners.push(t),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(t);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(t = '', r) {
        this._urlChangeListeners.forEach((o) => o(t, r));
      }
      subscribe(t, r, o) {
        return this._subject.subscribe({ next: t, error: r ?? void 0, complete: o ?? void 0 });
      }
      static normalizeQueryParams = nr;
      static joinWithSlash = Z_;
      static stripTrailingSlash = $_;
      static ɵfac = function (r) {
        return new (r || e)(E(To));
      };
      static ɵprov = x({ token: e, factory: () => vP(), providedIn: 'root' });
    }
    return e;
  })();
function vP() {
  return new Ao(E(To));
}
function _P(e, n) {
  if (!e || !n.startsWith(e)) return n;
  let t = n.substring(e.length);
  return t === '' || ['/', ';', '?', '#'].includes(t[0]) ? t : n;
}
function G_(e) {
  return e.replace(/\/index.html$/, '');
}
function wP(e) {
  if (new RegExp('^(https?:)?//').test(e)) {
    let [, t] = e.split(/\/\/[^\/]+/);
    return t;
  }
  return e;
}
var He = (function (e) {
    return (e[(e.Format = 0)] = 'Format'), (e[(e.Standalone = 1)] = 'Standalone'), e;
  })(He || {}),
  Q = (function (e) {
    return (
      (e[(e.Narrow = 0)] = 'Narrow'),
      (e[(e.Abbreviated = 1)] = 'Abbreviated'),
      (e[(e.Wide = 2)] = 'Wide'),
      (e[(e.Short = 3)] = 'Short'),
      e
    );
  })(Q || {}),
  ot = (function (e) {
    return (
      (e[(e.Short = 0)] = 'Short'),
      (e[(e.Medium = 1)] = 'Medium'),
      (e[(e.Long = 2)] = 'Long'),
      (e[(e.Full = 3)] = 'Full'),
      e
    );
  })(ot || {}),
  In = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13,
  };
function J_(e) {
  return ht(e)[ge.LocaleId];
}
function X_(e, n, t) {
  let r = ht(e),
    o = [r[ge.DayPeriodsFormat], r[ge.DayPeriodsStandalone]],
    i = Ot(o, n);
  return Ot(i, t);
}
function ew(e, n, t) {
  let r = ht(e),
    o = [r[ge.DaysFormat], r[ge.DaysStandalone]],
    i = Ot(o, n);
  return Ot(i, t);
}
function tw(e, n, t) {
  let r = ht(e),
    o = [r[ge.MonthsFormat], r[ge.MonthsStandalone]],
    i = Ot(o, n);
  return Ot(i, t);
}
function nw(e, n) {
  let r = ht(e)[ge.Eras];
  return Ot(r, n);
}
function rs(e, n) {
  let t = ht(e);
  return Ot(t[ge.DateFormat], n);
}
function os(e, n) {
  let t = ht(e);
  return Ot(t[ge.TimeFormat], n);
}
function is(e, n) {
  let r = ht(e)[ge.DateTimeFormat];
  return Ot(r, n);
}
function ss(e, n) {
  let t = ht(e),
    r = t[ge.NumberSymbols][n];
  if (typeof r > 'u') {
    if (n === In.CurrencyDecimal) return t[ge.NumberSymbols][In.Decimal];
    if (n === In.CurrencyGroup) return t[ge.NumberSymbols][In.Group];
  }
  return r;
}
function rw(e) {
  if (!e[ge.ExtraData]) throw new y(2303, !1);
}
function ow(e) {
  let n = ht(e);
  return (
    rw(n),
    (n[ge.ExtraData][2] || []).map((r) => (typeof r == 'string' ? Op(r) : [Op(r[0]), Op(r[1])]))
  );
}
function iw(e, n, t) {
  let r = ht(e);
  rw(r);
  let o = [r[ge.ExtraData][0], r[ge.ExtraData][1]],
    i = Ot(o, n) || [];
  return Ot(i, t) || [];
}
function Ot(e, n) {
  for (let t = n; t > -1; t--) if (typeof e[t] < 'u') return e[t];
  throw new y(2304, !1);
}
function Op(e) {
  let [n, t] = e.split(':');
  return { hours: +n, minutes: +t };
}
var yP =
    /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
  Lc = {},
  CP =
    /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
function sw(e, n, t, r) {
  let o = SP(e);
  n = Dn(t, n) || n;
  let s = [],
    a;
  for (; n; )
    if (((a = CP.exec(n)), a)) {
      s = s.concat(a.slice(1));
      let u = s.pop();
      if (!u) break;
      n = u;
    } else {
      s.push(n);
      break;
    }
  let c = o.getTimezoneOffset();
  r && ((c = cw(r, c)), (o = IP(o, r)));
  let l = '';
  return (
    s.forEach((u) => {
      let d = EP(u);
      l += d ? d(o, t, c) : u === "''" ? "'" : u.replace(/(^'|'$)/g, '').replace(/''/g, "'");
    }),
    l
  );
}
function Hc(e, n, t) {
  let r = new Date(0);
  return r.setFullYear(e, n, t), r.setHours(0, 0, 0), r;
}
function Dn(e, n) {
  let t = J_(e);
  if (((Lc[t] ??= {}), Lc[t][n])) return Lc[t][n];
  let r = '';
  switch (n) {
    case 'shortDate':
      r = rs(e, ot.Short);
      break;
    case 'mediumDate':
      r = rs(e, ot.Medium);
      break;
    case 'longDate':
      r = rs(e, ot.Long);
      break;
    case 'fullDate':
      r = rs(e, ot.Full);
      break;
    case 'shortTime':
      r = os(e, ot.Short);
      break;
    case 'mediumTime':
      r = os(e, ot.Medium);
      break;
    case 'longTime':
      r = os(e, ot.Long);
      break;
    case 'fullTime':
      r = os(e, ot.Full);
      break;
    case 'short':
      let o = Dn(e, 'shortTime'),
        i = Dn(e, 'shortDate');
      r = jc(is(e, ot.Short), [o, i]);
      break;
    case 'medium':
      let s = Dn(e, 'mediumTime'),
        a = Dn(e, 'mediumDate');
      r = jc(is(e, ot.Medium), [s, a]);
      break;
    case 'long':
      let c = Dn(e, 'longTime'),
        l = Dn(e, 'longDate');
      r = jc(is(e, ot.Long), [c, l]);
      break;
    case 'full':
      let u = Dn(e, 'fullTime'),
        d = Dn(e, 'fullDate');
      r = jc(is(e, ot.Full), [u, d]);
      break;
  }
  return r && (Lc[t][n] = r), r;
}
function jc(e, n) {
  return (
    n &&
      (e = e.replace(/\{([^}]+)}/g, function (t, r) {
        return n != null && r in n ? n[r] : t;
      })),
    e
  );
}
function Lt(e, n, t = '-', r, o) {
  let i = '';
  (e < 0 || (o && e <= 0)) && (o ? (e = -e + 1) : ((e = -e), (i = t)));
  let s = String(e);
  for (; s.length < n; ) s = '0' + s;
  return r && (s = s.slice(s.length - n)), i + s;
}
function bP(e, n) {
  return Lt(e, 3).substring(0, n);
}
function xe(e, n, t = 0, r = !1, o = !1) {
  return function (i, s) {
    let a = MP(e, i);
    if (((t > 0 || a > -t) && (a += t), e === 3)) a === 0 && t === -12 && (a = 12);
    else if (e === 6) return bP(a, n);
    let c = ss(s, In.MinusSign);
    return Lt(a, n, c, r, o);
  };
}
function MP(e, n) {
  switch (e) {
    case 0:
      return n.getFullYear();
    case 1:
      return n.getMonth();
    case 2:
      return n.getDate();
    case 3:
      return n.getHours();
    case 4:
      return n.getMinutes();
    case 5:
      return n.getSeconds();
    case 6:
      return n.getMilliseconds();
    case 7:
      return n.getDay();
    default:
      throw new y(2301, !1);
  }
}
function te(e, n, t = He.Format, r = !1) {
  return function (o, i) {
    return xP(o, i, e, n, t, r);
  };
}
function xP(e, n, t, r, o, i) {
  switch (t) {
    case 2:
      return tw(n, o, r)[e.getMonth()];
    case 1:
      return ew(n, o, r)[e.getDay()];
    case 0:
      let s = e.getHours(),
        a = e.getMinutes();
      if (i) {
        let l = ow(n),
          u = iw(n, o, r),
          d = l.findIndex((h) => {
            if (Array.isArray(h)) {
              let [f, _] = h,
                O = s >= f.hours && a >= f.minutes,
                M = s < _.hours || (s === _.hours && a < _.minutes);
              if (f.hours < _.hours) {
                if (O && M) return !0;
              } else if (O || M) return !0;
            } else if (h.hours === s && h.minutes === a) return !0;
            return !1;
          });
        if (d !== -1) return u[d];
      }
      return X_(n, o, r)[s < 12 ? 0 : 1];
    case 3:
      return nw(n, r)[e.getFullYear() <= 0 ? 0 : 1];
    default:
      let c = t;
      throw new y(2302, !1);
  }
}
function Vc(e) {
  return function (n, t, r) {
    let o = -1 * r,
      i = ss(t, In.MinusSign),
      s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
    switch (e) {
      case 0:
        return (o >= 0 ? '+' : '') + Lt(s, 2, i) + Lt(Math.abs(o % 60), 2, i);
      case 1:
        return 'GMT' + (o >= 0 ? '+' : '') + Lt(s, 1, i);
      case 2:
        return 'GMT' + (o >= 0 ? '+' : '') + Lt(s, 2, i) + ':' + Lt(Math.abs(o % 60), 2, i);
      case 3:
        return r === 0 ? 'Z' : (o >= 0 ? '+' : '') + Lt(s, 2, i) + ':' + Lt(Math.abs(o % 60), 2, i);
      default:
        throw new y(2310, !1);
    }
  };
}
var OP = 0,
  Uc = 4;
function PP(e) {
  let n = Hc(e, OP, 1).getDay();
  return Hc(e, 0, 1 + (n <= Uc ? Uc : Uc + 7) - n);
}
function aw(e) {
  let n = e.getDay(),
    t = n === 0 ? -3 : Uc - n;
  return Hc(e.getFullYear(), e.getMonth(), e.getDate() + t);
}
function Pp(e, n = !1) {
  return function (t, r) {
    let o;
    if (n) {
      let i = new Date(t.getFullYear(), t.getMonth(), 1).getDay() - 1,
        s = t.getDate();
      o = 1 + Math.floor((s + i) / 7);
    } else {
      let i = aw(t),
        s = PP(i.getFullYear()),
        a = i.getTime() - s.getTime();
      o = 1 + Math.round(a / 6048e5);
    }
    return Lt(o, e, ss(r, In.MinusSign));
  };
}
function Bc(e, n = !1) {
  return function (t, r) {
    let i = aw(t).getFullYear();
    return Lt(i, e, ss(r, In.MinusSign), n);
  };
}
var Ep = {};
function EP(e) {
  if (Ep[e]) return Ep[e];
  let n;
  switch (e) {
    case 'G':
    case 'GG':
    case 'GGG':
      n = te(3, Q.Abbreviated);
      break;
    case 'GGGG':
      n = te(3, Q.Wide);
      break;
    case 'GGGGG':
      n = te(3, Q.Narrow);
      break;
    case 'y':
      n = xe(0, 1, 0, !1, !0);
      break;
    case 'yy':
      n = xe(0, 2, 0, !0, !0);
      break;
    case 'yyy':
      n = xe(0, 3, 0, !1, !0);
      break;
    case 'yyyy':
      n = xe(0, 4, 0, !1, !0);
      break;
    case 'Y':
      n = Bc(1);
      break;
    case 'YY':
      n = Bc(2, !0);
      break;
    case 'YYY':
      n = Bc(3);
      break;
    case 'YYYY':
      n = Bc(4);
      break;
    case 'M':
    case 'L':
      n = xe(1, 1, 1);
      break;
    case 'MM':
    case 'LL':
      n = xe(1, 2, 1);
      break;
    case 'MMM':
      n = te(2, Q.Abbreviated);
      break;
    case 'MMMM':
      n = te(2, Q.Wide);
      break;
    case 'MMMMM':
      n = te(2, Q.Narrow);
      break;
    case 'LLL':
      n = te(2, Q.Abbreviated, He.Standalone);
      break;
    case 'LLLL':
      n = te(2, Q.Wide, He.Standalone);
      break;
    case 'LLLLL':
      n = te(2, Q.Narrow, He.Standalone);
      break;
    case 'w':
      n = Pp(1);
      break;
    case 'ww':
      n = Pp(2);
      break;
    case 'W':
      n = Pp(1, !0);
      break;
    case 'd':
      n = xe(2, 1);
      break;
    case 'dd':
      n = xe(2, 2);
      break;
    case 'c':
    case 'cc':
      n = xe(7, 1);
      break;
    case 'ccc':
      n = te(1, Q.Abbreviated, He.Standalone);
      break;
    case 'cccc':
      n = te(1, Q.Wide, He.Standalone);
      break;
    case 'ccccc':
      n = te(1, Q.Narrow, He.Standalone);
      break;
    case 'cccccc':
      n = te(1, Q.Short, He.Standalone);
      break;
    case 'E':
    case 'EE':
    case 'EEE':
      n = te(1, Q.Abbreviated);
      break;
    case 'EEEE':
      n = te(1, Q.Wide);
      break;
    case 'EEEEE':
      n = te(1, Q.Narrow);
      break;
    case 'EEEEEE':
      n = te(1, Q.Short);
      break;
    case 'a':
    case 'aa':
    case 'aaa':
      n = te(0, Q.Abbreviated);
      break;
    case 'aaaa':
      n = te(0, Q.Wide);
      break;
    case 'aaaaa':
      n = te(0, Q.Narrow);
      break;
    case 'b':
    case 'bb':
    case 'bbb':
      n = te(0, Q.Abbreviated, He.Standalone, !0);
      break;
    case 'bbbb':
      n = te(0, Q.Wide, He.Standalone, !0);
      break;
    case 'bbbbb':
      n = te(0, Q.Narrow, He.Standalone, !0);
      break;
    case 'B':
    case 'BB':
    case 'BBB':
      n = te(0, Q.Abbreviated, He.Format, !0);
      break;
    case 'BBBB':
      n = te(0, Q.Wide, He.Format, !0);
      break;
    case 'BBBBB':
      n = te(0, Q.Narrow, He.Format, !0);
      break;
    case 'h':
      n = xe(3, 1, -12);
      break;
    case 'hh':
      n = xe(3, 2, -12);
      break;
    case 'H':
      n = xe(3, 1);
      break;
    case 'HH':
      n = xe(3, 2);
      break;
    case 'm':
      n = xe(4, 1);
      break;
    case 'mm':
      n = xe(4, 2);
      break;
    case 's':
      n = xe(5, 1);
      break;
    case 'ss':
      n = xe(5, 2);
      break;
    case 'S':
      n = xe(6, 1);
      break;
    case 'SS':
      n = xe(6, 2);
      break;
    case 'SSS':
      n = xe(6, 3);
      break;
    case 'Z':
    case 'ZZ':
    case 'ZZZ':
      n = Vc(0);
      break;
    case 'ZZZZZ':
      n = Vc(3);
      break;
    case 'O':
    case 'OO':
    case 'OOO':
    case 'z':
    case 'zz':
    case 'zzz':
      n = Vc(1);
      break;
    case 'OOOO':
    case 'ZZZZ':
    case 'zzzz':
      n = Vc(2);
      break;
    default:
      return null;
  }
  return (Ep[e] = n), n;
}
function cw(e, n) {
  e = e.replace(/:/g, '');
  let t = Date.parse('Jan 01, 1970 00:00:00 ' + e) / 6e4;
  return isNaN(t) ? n : t;
}
function DP(e, n) {
  return (e = new Date(e.getTime())), e.setMinutes(e.getMinutes() + n), e;
}
function IP(e, n, t) {
  let o = e.getTimezoneOffset(),
    i = cw(n, o);
  return DP(e, -1 * (i - o));
}
function SP(e) {
  if (Q_(e)) return e;
  if (typeof e == 'number' && !isNaN(e)) return new Date(e);
  if (typeof e == 'string') {
    if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
      let [o, i = 1, s = 1] = e.split('-').map((a) => +a);
      return Hc(o, i - 1, s);
    }
    let t = parseFloat(e);
    if (!isNaN(e - t)) return new Date(t);
    let r;
    if ((r = e.match(yP))) return TP(r);
  }
  let n = new Date(e);
  if (!Q_(n)) throw new y(2311, !1);
  return n;
}
function TP(e) {
  let n = new Date(0),
    t = 0,
    r = 0,
    o = e[8] ? n.setUTCFullYear : n.setFullYear,
    i = e[8] ? n.setUTCHours : n.setHours;
  e[9] && ((t = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
    o.call(n, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
  let s = Number(e[4] || 0) - t,
    a = Number(e[5] || 0) - r,
    c = Number(e[6] || 0),
    l = Math.floor(parseFloat('0.' + (e[7] || 0)) * 1e3);
  return i.call(n, s, a, c, l), n;
}
function Q_(e) {
  return e instanceof Date && !isNaN(e.valueOf());
}
function AP(e, n) {
  return new y(2100, !1);
}
var NP = 'mediumDate',
  lw = new C(''),
  uw = new C(''),
  Dp = (() => {
    class e {
      locale;
      defaultTimezone;
      defaultOptions;
      constructor(t, r, o) {
        (this.locale = t), (this.defaultTimezone = r), (this.defaultOptions = o);
      }
      transform(t, r, o, i) {
        if (t == null || t === '' || t !== t) return null;
        try {
          let s = r ?? this.defaultOptions?.dateFormat ?? NP,
            a = o ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0;
          return sw(t, s, i || this.locale, a);
        } catch (s) {
          throw AP(e, s.message);
        }
      }
      static ɵfac = function (r) {
        return new (r || e)(T(es, 16), T(lw, 24), T(uw, 24));
      };
      static ɵpipe = Cn({ name: 'date', type: e, pure: !0 });
    }
    return e;
  })();
function as(e, n) {
  n = encodeURIComponent(n);
  for (let t of e.split(';')) {
    let r = t.indexOf('='),
      [o, i] = r == -1 ? [t, ''] : [t.slice(0, r), t.slice(r + 1)];
    if (o.trim() === n) return decodeURIComponent(i);
  }
  return null;
}
var kr = class {};
var Ip = 'browser';
function dw(e) {
  return e === Ip;
}
var $c = new C(''),
  kp = (() => {
    class e {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(t, r) {
        (this._zone = r),
          t.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = t.slice().reverse());
      }
      addEventListener(t, r, o, i) {
        return this._findPluginFor(r).addEventListener(t, r, o, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(t) {
        let r = this._eventNameToPlugin.get(t);
        if (r) return r;
        if (((r = this._plugins.find((i) => i.supports(t))), !r)) throw new y(5101, !1);
        return this._eventNameToPlugin.set(t, r), r;
      }
      static ɵfac = function (r) {
        return new (r || e)(E($c), E(ae));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  cs = class {
    _doc;
    constructor(n) {
      this._doc = n;
    }
    manager;
  },
  Sp = 'ng-app-id';
function fw(e) {
  for (let n of e) n.remove();
}
function pw(e, n) {
  let t = n.createElement('style');
  return (t.textContent = e), t;
}
function LP(e, n, t, r) {
  let o = e.head?.querySelectorAll(`style[${Sp}="${n}"],link[${Sp}="${n}"]`);
  if (o)
    for (let i of o)
      i.removeAttribute(Sp),
        i instanceof HTMLLinkElement
          ? r.set(i.href.slice(i.href.lastIndexOf('/') + 1), { usage: 0, elements: [i] })
          : i.textContent && t.set(i.textContent, { usage: 0, elements: [i] });
}
function Ap(e, n) {
  let t = n.createElement('link');
  return t.setAttribute('rel', 'stylesheet'), t.setAttribute('href', e), t;
}
var Rp = (() => {
    class e {
      doc;
      appId;
      nonce;
      inline = new Map();
      external = new Map();
      hosts = new Set();
      constructor(t, r, o, i = {}) {
        (this.doc = t),
          (this.appId = r),
          (this.nonce = o),
          LP(t, r, this.inline, this.external),
          this.hosts.add(t.head);
      }
      addStyles(t, r) {
        for (let o of t) this.addUsage(o, this.inline, pw);
        r?.forEach((o) => this.addUsage(o, this.external, Ap));
      }
      removeStyles(t, r) {
        for (let o of t) this.removeUsage(o, this.inline);
        r?.forEach((o) => this.removeUsage(o, this.external));
      }
      addUsage(t, r, o) {
        let i = r.get(t);
        i
          ? i.usage++
          : r.set(t, {
              usage: 1,
              elements: [...this.hosts].map((s) => this.addElement(s, o(t, this.doc))),
            });
      }
      removeUsage(t, r) {
        let o = r.get(t);
        o && (o.usage--, o.usage <= 0 && (fw(o.elements), r.delete(t)));
      }
      ngOnDestroy() {
        for (let [, { elements: t }] of [...this.inline, ...this.external]) fw(t);
        this.hosts.clear();
      }
      addHost(t) {
        this.hosts.add(t);
        for (let [r, { elements: o }] of this.inline) o.push(this.addElement(t, pw(r, this.doc)));
        for (let [r, { elements: o }] of this.external) o.push(this.addElement(t, Ap(r, this.doc)));
      }
      removeHost(t) {
        this.hosts.delete(t);
      }
      addElement(t, r) {
        return this.nonce && r.setAttribute('nonce', this.nonce), t.appendChild(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(E(J), E(Mc), E(Oo, 8), E(Kn));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Tp = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/Math/MathML',
  },
  Fp = /%COMP%/g;
var gw = '%COMP%',
  jP = `_nghost-${gw}`,
  VP = `_ngcontent-${gw}`,
  BP = !0,
  UP = new C('', { providedIn: 'root', factory: () => BP });
function HP(e) {
  return VP.replace(Fp, e);
}
function zP(e) {
  return jP.replace(Fp, e);
}
function mw(e, n) {
  return n.map((t) => t.replace(Fp, e));
}
var Lp = (() => {
    class e {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      platformId;
      ngZone;
      nonce;
      tracingService;
      rendererByCompId = new Map();
      defaultRenderer;
      platformIsServer;
      constructor(t, r, o, i, s, a, c, l = null, u = null) {
        (this.eventManager = t),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = i),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = c),
          (this.nonce = l),
          (this.tracingService = u),
          (this.platformIsServer = !1),
          (this.defaultRenderer = new ls(t, s, c, this.platformIsServer, this.tracingService));
      }
      createRenderer(t, r) {
        if (!t || !r) return this.defaultRenderer;
        let o = this.getOrCreateRenderer(t, r);
        return o instanceof zc ? o.applyToHost(t) : o instanceof us && o.applyStyles(), o;
      }
      getOrCreateRenderer(t, r) {
        let o = this.rendererByCompId,
          i = o.get(r.id);
        if (!i) {
          let s = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            l = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer,
            h = this.tracingService;
          switch (r.encapsulation) {
            case mn.Emulated:
              i = new zc(c, l, r, this.appId, u, s, a, d, h);
              break;
            case mn.ShadowDom:
              return new Np(c, l, t, r, s, a, this.nonce, d, h);
            default:
              i = new us(c, l, r, u, s, a, d, h);
              break;
          }
          o.set(r.id, i);
        }
        return i;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      componentReplaced(t) {
        this.rendererByCompId.delete(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(E(kp), E(Rp), E(Mc), E(UP), E(J), E(Kn), E(ae), E(Oo), E(qi, 8));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  ls = class {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(n, t, r, o, i) {
      (this.eventManager = n),
        (this.doc = t),
        (this.ngZone = r),
        (this.platformIsServer = o),
        (this.tracingService = i);
    }
    destroy() {}
    destroyNode = null;
    createElement(n, t) {
      return t ? this.doc.createElementNS(Tp[t] || t, n) : this.doc.createElement(n);
    }
    createComment(n) {
      return this.doc.createComment(n);
    }
    createText(n) {
      return this.doc.createTextNode(n);
    }
    appendChild(n, t) {
      (hw(n) ? n.content : n).appendChild(t);
    }
    insertBefore(n, t, r) {
      n && (hw(n) ? n.content : n).insertBefore(t, r);
    }
    removeChild(n, t) {
      t.remove();
    }
    selectRootElement(n, t) {
      let r = typeof n == 'string' ? this.doc.querySelector(n) : n;
      if (!r) throw new y(-5104, !1);
      return t || (r.textContent = ''), r;
    }
    parentNode(n) {
      return n.parentNode;
    }
    nextSibling(n) {
      return n.nextSibling;
    }
    setAttribute(n, t, r, o) {
      if (o) {
        t = o + ':' + t;
        let i = Tp[o];
        i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r);
      } else n.setAttribute(t, r);
    }
    removeAttribute(n, t, r) {
      if (r) {
        let o = Tp[r];
        o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`);
      } else n.removeAttribute(t);
    }
    addClass(n, t) {
      n.classList.add(t);
    }
    removeClass(n, t) {
      n.classList.remove(t);
    }
    setStyle(n, t, r, o) {
      o & (Kt.DashCase | Kt.Important)
        ? n.style.setProperty(t, r, o & Kt.Important ? 'important' : '')
        : (n.style[t] = r);
    }
    removeStyle(n, t, r) {
      r & Kt.DashCase ? n.style.removeProperty(t) : (n.style[t] = '');
    }
    setProperty(n, t, r) {
      n != null && (n[t] = r);
    }
    setValue(n, t) {
      n.nodeValue = t;
    }
    listen(n, t, r, o) {
      if (typeof n == 'string' && ((n = xt().getGlobalEventTarget(this.doc, n)), !n))
        throw new y(5102, !1);
      let i = this.decoratePreventDefault(r);
      return (
        this.tracingService?.wrapEventListener &&
          (i = this.tracingService.wrapEventListener(n, t, i)),
        this.eventManager.addEventListener(n, t, i, o)
      );
    }
    decoratePreventDefault(n) {
      return (t) => {
        if (t === '__ngUnwrap__') return n;
        n(t) === !1 && t.preventDefault();
      };
    }
  };
function hw(e) {
  return e.tagName === 'TEMPLATE' && e.content !== void 0;
}
var Np = class extends ls {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(n, t, r, o, i, s, a, c, l) {
      super(n, i, s, c, l),
        (this.sharedStylesHost = t),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: 'open' })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let u = o.styles;
      u = mw(o.id, u);
      for (let h of u) {
        let f = document.createElement('style');
        a && f.setAttribute('nonce', a), (f.textContent = h), this.shadowRoot.appendChild(f);
      }
      let d = o.getExternalStyles?.();
      if (d)
        for (let h of d) {
          let f = Ap(h, i);
          a && f.setAttribute('nonce', a), this.shadowRoot.appendChild(f);
        }
    }
    nodeOrShadowRoot(n) {
      return n === this.hostEl ? this.shadowRoot : n;
    }
    appendChild(n, t) {
      return super.appendChild(this.nodeOrShadowRoot(n), t);
    }
    insertBefore(n, t, r) {
      return super.insertBefore(this.nodeOrShadowRoot(n), t, r);
    }
    removeChild(n, t) {
      return super.removeChild(null, t);
    }
    parentNode(n) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  us = class extends ls {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(n, t, r, o, i, s, a, c, l) {
      super(n, i, s, a, c), (this.sharedStylesHost = t), (this.removeStylesOnCompDestroy = o);
      let u = r.styles;
      (this.styles = l ? mw(l, u) : u), (this.styleUrls = r.getExternalStyles?.(l));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        Ui.size === 0 &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  zc = class extends us {
    contentAttr;
    hostAttr;
    constructor(n, t, r, o, i, s, a, c, l) {
      let u = o + '-' + r.id;
      super(n, t, r, i, s, a, c, l, u), (this.contentAttr = HP(u)), (this.hostAttr = zP(u));
    }
    applyToHost(n) {
      this.applyStyles(), this.setAttribute(n, this.hostAttr, '');
    }
    createElement(n, t) {
      let r = super.createElement(n, t);
      return super.setAttribute(r, this.contentAttr, ''), r;
    }
  };
var Gc = class e extends ns {
    supportsDOMEvents = !0;
    static makeCurrent() {
      Mp(new e());
    }
    onAndCancel(n, t, r, o) {
      return (
        n.addEventListener(t, r, o),
        () => {
          n.removeEventListener(t, r, o);
        }
      );
    }
    dispatchEvent(n, t) {
      n.dispatchEvent(t);
    }
    remove(n) {
      n.remove();
    }
    createElement(n, t) {
      return (t = t || this.getDefaultDocument()), t.createElement(n);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(n) {
      return n instanceof DocumentFragment;
    }
    getGlobalEventTarget(n, t) {
      return t === 'window' ? window : t === 'document' ? n : t === 'body' ? n.body : null;
    }
    getBaseHref(n) {
      let t = $P();
      return t == null ? null : GP(t);
    }
    resetBaseElement() {
      ds = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(n) {
      return as(document.cookie, n);
    }
  },
  ds = null;
function $P() {
  return (ds = ds || document.head.querySelector('base')), ds ? ds.getAttribute('href') : null;
}
function GP(e) {
  return new URL(e, document.baseURI).pathname;
}
var WP = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  _w = (() => {
    class e extends cs {
      constructor(t) {
        super(t);
      }
      supports(t) {
        return !0;
      }
      addEventListener(t, r, o, i) {
        return t.addEventListener(r, o, i), () => this.removeEventListener(t, r, o, i);
      }
      removeEventListener(t, r, o, i) {
        return t.removeEventListener(r, o, i);
      }
      static ɵfac = function (r) {
        return new (r || e)(E(J));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  vw = ['alt', 'control', 'meta', 'shift'],
  qP = {
    '\b': 'Backspace',
    '	': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
  },
  ZP = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  ww = (() => {
    class e extends cs {
      constructor(t) {
        super(t);
      }
      supports(t) {
        return e.parseEventName(t) != null;
      }
      addEventListener(t, r, o, i) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => xt().onAndCancel(t, s.domEventName, a, i));
      }
      static parseEventName(t) {
        let r = t.toLowerCase().split('.'),
          o = r.shift();
        if (r.length === 0 || !(o === 'keydown' || o === 'keyup')) return null;
        let i = e._normalizeKey(r.pop()),
          s = '',
          a = r.indexOf('code');
        if (
          (a > -1 && (r.splice(a, 1), (s = 'code.')),
          vw.forEach((l) => {
            let u = r.indexOf(l);
            u > -1 && (r.splice(u, 1), (s += l + '.'));
          }),
          (s += i),
          r.length != 0 || i.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = s), c;
      }
      static matchEventFullKeyCode(t, r) {
        let o = qP[t.key] || t.key,
          i = '';
        return (
          r.indexOf('code.') > -1 && ((o = t.code), (i = 'code.')),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === ' ' ? (o = 'space') : o === '.' && (o = 'dot'),
              vw.forEach((s) => {
                if (s !== o) {
                  let a = ZP[s];
                  a(t) && (i += s + '.');
                }
              }),
              (i += o),
              i === r)
        );
      }
      static eventCallback(t, r, o) {
        return (i) => {
          e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i));
        };
      }
      static _normalizeKey(t) {
        return t === 'esc' ? 'escape' : t;
      }
      static ɵfac = function (r) {
        return new (r || e)(E(J));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function jp(e, n, t) {
  let r = w({ rootComponent: e, platformRef: t?.platformRef }, YP(n));
  return z_(r);
}
function YP(e) {
  return { appProviders: [...eE, ...(e?.providers ?? [])], platformProviders: XP };
}
function KP() {
  Gc.makeCurrent();
}
function QP() {
  return new We();
}
function JP() {
  return Ff(document), document;
}
var XP = [
  { provide: Kn, useValue: Ip },
  { provide: xc, useValue: KP, multi: !0 },
  { provide: J, useFactory: JP },
];
var eE = [
  { provide: vi, useValue: 'root' },
  { provide: We, useFactory: QP },
  { provide: $c, useClass: _w, multi: !0, deps: [J] },
  { provide: $c, useClass: ww, multi: !0, deps: [J] },
  Lp,
  Rp,
  kp,
  { provide: Sr, useExisting: Lp },
  { provide: kr, useClass: WP },
  [],
];
var Ro = class {},
  fs = class {},
  rr = class e {
    headers;
    normalizedNames = new Map();
    lazyInit;
    lazyUpdate = null;
    constructor(n) {
      n
        ? typeof n == 'string'
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                n
                  .split(
                    `
`
                  )
                  .forEach((t) => {
                    let r = t.indexOf(':');
                    if (r > 0) {
                      let o = t.slice(0, r),
                        i = t.slice(r + 1).trim();
                      this.addHeaderEntry(o, i);
                    }
                  });
            })
          : typeof Headers < 'u' && n instanceof Headers
          ? ((this.headers = new Map()),
            n.forEach((t, r) => {
              this.addHeaderEntry(r, t);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(n).forEach(([t, r]) => {
                  this.setHeaderEntries(t, r);
                });
            })
        : (this.headers = new Map());
    }
    has(n) {
      return this.init(), this.headers.has(n.toLowerCase());
    }
    get(n) {
      this.init();
      let t = this.headers.get(n.toLowerCase());
      return t && t.length > 0 ? t[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(n) {
      return this.init(), this.headers.get(n.toLowerCase()) || null;
    }
    append(n, t) {
      return this.clone({ name: n, value: t, op: 'a' });
    }
    set(n, t) {
      return this.clone({ name: n, value: t, op: 's' });
    }
    delete(n, t) {
      return this.clone({ name: n, value: t, op: 'd' });
    }
    maybeSetNormalizedName(n, t) {
      this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e ? this.copyFrom(this.lazyInit) : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((n) => this.applyUpdate(n)), (this.lazyUpdate = null)));
    }
    copyFrom(n) {
      n.init(),
        Array.from(n.headers.keys()).forEach((t) => {
          this.headers.set(t, n.headers.get(t)),
            this.normalizedNames.set(t, n.normalizedNames.get(t));
        });
    }
    clone(n) {
      let t = new e();
      return (
        (t.lazyInit = this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
        t
      );
    }
    applyUpdate(n) {
      let t = n.name.toLowerCase();
      switch (n.op) {
        case 'a':
        case 's':
          let r = n.value;
          if ((typeof r == 'string' && (r = [r]), r.length === 0)) return;
          this.maybeSetNormalizedName(n.name, t);
          let o = (n.op === 'a' ? this.headers.get(t) : void 0) || [];
          o.push(...r), this.headers.set(t, o);
          break;
        case 'd':
          let i = n.value;
          if (!i) this.headers.delete(t), this.normalizedNames.delete(t);
          else {
            let s = this.headers.get(t);
            if (!s) return;
            (s = s.filter((a) => i.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(t), this.normalizedNames.delete(t))
                : this.headers.set(t, s);
          }
          break;
      }
    }
    addHeaderEntry(n, t) {
      let r = n.toLowerCase();
      this.maybeSetNormalizedName(n, r),
        this.headers.has(r) ? this.headers.get(r).push(t) : this.headers.set(r, [t]);
    }
    setHeaderEntries(n, t) {
      let r = (Array.isArray(t) ? t : [t]).map((i) => i.toString()),
        o = n.toLowerCase();
      this.headers.set(o, r), this.maybeSetNormalizedName(n, o);
    }
    forEach(n) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((t) =>
          n(this.normalizedNames.get(t), this.headers.get(t))
        );
    }
  };
var qc = class {
  encodeKey(n) {
    return yw(n);
  }
  encodeValue(n) {
    return yw(n);
  }
  decodeKey(n) {
    return decodeURIComponent(n);
  }
  decodeValue(n) {
    return decodeURIComponent(n);
  }
};
function tE(e, n) {
  let t = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, '')
        .split('&')
        .forEach((o) => {
          let i = o.indexOf('='),
            [s, a] =
              i == -1
                ? [n.decodeKey(o), '']
                : [n.decodeKey(o.slice(0, i)), n.decodeValue(o.slice(i + 1))],
            c = t.get(s) || [];
          c.push(a), t.set(s, c);
        }),
    t
  );
}
var nE = /%(\d[a-f0-9])/gi,
  rE = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
function yw(e) {
  return encodeURIComponent(e).replace(nE, (n, t) => rE[t] ?? n);
}
function Wc(e) {
  return `${e}`;
}
var Sn = class e {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(n = {}) {
    if (((this.encoder = n.encoder || new qc()), n.fromString)) {
      if (n.fromObject) throw new y(2805, !1);
      this.map = tE(n.fromString, this.encoder);
    } else
      n.fromObject
        ? ((this.map = new Map()),
          Object.keys(n.fromObject).forEach((t) => {
            let r = n.fromObject[t],
              o = Array.isArray(r) ? r.map(Wc) : [Wc(r)];
            this.map.set(t, o);
          }))
        : (this.map = null);
  }
  has(n) {
    return this.init(), this.map.has(n);
  }
  get(n) {
    this.init();
    let t = this.map.get(n);
    return t ? t[0] : null;
  }
  getAll(n) {
    return this.init(), this.map.get(n) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(n, t) {
    return this.clone({ param: n, value: t, op: 'a' });
  }
  appendAll(n) {
    let t = [];
    return (
      Object.keys(n).forEach((r) => {
        let o = n[r];
        Array.isArray(o)
          ? o.forEach((i) => {
              t.push({ param: r, value: i, op: 'a' });
            })
          : t.push({ param: r, value: o, op: 'a' });
      }),
      this.clone(t)
    );
  }
  set(n, t) {
    return this.clone({ param: n, value: t, op: 's' });
  }
  delete(n, t) {
    return this.clone({ param: n, value: t, op: 'd' });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((n) => {
          let t = this.encoder.encodeKey(n);
          return this.map
            .get(n)
            .map((r) => t + '=' + this.encoder.encodeValue(r))
            .join('&');
        })
        .filter((n) => n !== '')
        .join('&')
    );
  }
  clone(n) {
    let t = new e({ encoder: this.encoder });
    return (t.cloneFrom = this.cloneFrom || this), (t.updates = (this.updates || []).concat(n)), t;
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom.keys().forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
        this.updates.forEach((n) => {
          switch (n.op) {
            case 'a':
            case 's':
              let t = (n.op === 'a' ? this.map.get(n.param) : void 0) || [];
              t.push(Wc(n.value)), this.map.set(n.param, t);
              break;
            case 'd':
              if (n.value !== void 0) {
                let r = this.map.get(n.param) || [],
                  o = r.indexOf(Wc(n.value));
                o !== -1 && r.splice(o, 1),
                  r.length > 0 ? this.map.set(n.param, r) : this.map.delete(n.param);
              } else {
                this.map.delete(n.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Zc = class {
  map = new Map();
  set(n, t) {
    return this.map.set(n, t), this;
  }
  get(n) {
    return this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n);
  }
  delete(n) {
    return this.map.delete(n), this;
  }
  has(n) {
    return this.map.has(n);
  }
  keys() {
    return this.map.keys();
  }
};
function oE(e) {
  switch (e) {
    case 'DELETE':
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'JSONP':
      return !1;
    default:
      return !0;
  }
}
function Cw(e) {
  return typeof ArrayBuffer < 'u' && e instanceof ArrayBuffer;
}
function bw(e) {
  return typeof Blob < 'u' && e instanceof Blob;
}
function Mw(e) {
  return typeof FormData < 'u' && e instanceof FormData;
}
function iE(e) {
  return typeof URLSearchParams < 'u' && e instanceof URLSearchParams;
}
var xw = 'Content-Type',
  Ow = 'Accept',
  Pw = 'X-Request-URL',
  Ew = 'text/plain',
  Dw = 'application/json',
  sE = `${Dw}, ${Ew}, */*`,
  No = class e {
    url;
    body = null;
    headers;
    context;
    reportProgress = !1;
    withCredentials = !1;
    credentials;
    keepalive = !1;
    cache;
    priority;
    mode;
    redirect;
    referrer;
    integrity;
    responseType = 'json';
    method;
    params;
    urlWithParams;
    transferCache;
    timeout;
    constructor(n, t, r, o) {
      (this.url = t), (this.method = n.toUpperCase());
      let i;
      if ((oE(this.method) || o ? ((this.body = r !== void 0 ? r : null), (i = o)) : (i = r), i)) {
        if (
          ((this.reportProgress = !!i.reportProgress),
          (this.withCredentials = !!i.withCredentials),
          (this.keepalive = !!i.keepalive),
          i.responseType && (this.responseType = i.responseType),
          i.headers && (this.headers = i.headers),
          i.context && (this.context = i.context),
          i.params && (this.params = i.params),
          i.priority && (this.priority = i.priority),
          i.cache && (this.cache = i.cache),
          i.credentials && (this.credentials = i.credentials),
          typeof i.timeout == 'number')
        ) {
          if (i.timeout < 1 || !Number.isInteger(i.timeout)) throw new y(2822, '');
          this.timeout = i.timeout;
        }
        i.mode && (this.mode = i.mode),
          i.redirect && (this.redirect = i.redirect),
          i.integrity && (this.integrity = i.integrity),
          i.referrer && (this.referrer = i.referrer),
          (this.transferCache = i.transferCache);
      }
      if (((this.headers ??= new rr()), (this.context ??= new Zc()), !this.params))
        (this.params = new Sn()), (this.urlWithParams = t);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = t;
        else {
          let a = t.indexOf('?'),
            c = a === -1 ? '?' : a < t.length - 1 ? '&' : '';
          this.urlWithParams = t + c + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == 'string' ||
          Cw(this.body) ||
          bw(this.body) ||
          Mw(this.body) ||
          iE(this.body)
        ? this.body
        : this.body instanceof Sn
        ? this.body.toString()
        : typeof this.body == 'object' || typeof this.body == 'boolean' || Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || Mw(this.body)
        ? null
        : bw(this.body)
        ? this.body.type || null
        : Cw(this.body)
        ? null
        : typeof this.body == 'string'
        ? Ew
        : this.body instanceof Sn
        ? 'application/x-www-form-urlencoded;charset=UTF-8'
        : typeof this.body == 'object' ||
          typeof this.body == 'number' ||
          typeof this.body == 'boolean'
        ? Dw
        : null;
    }
    clone(n = {}) {
      let t = n.method || this.method,
        r = n.url || this.url,
        o = n.responseType || this.responseType,
        i = n.keepalive ?? this.keepalive,
        s = n.priority || this.priority,
        a = n.cache || this.cache,
        c = n.mode || this.mode,
        l = n.redirect || this.redirect,
        u = n.credentials || this.credentials,
        d = n.referrer || this.referrer,
        h = n.integrity || this.integrity,
        f = n.transferCache ?? this.transferCache,
        _ = n.timeout ?? this.timeout,
        O = n.body !== void 0 ? n.body : this.body,
        M = n.withCredentials ?? this.withCredentials,
        b = n.reportProgress ?? this.reportProgress,
        ne = n.headers || this.headers,
        Et = n.params || this.params,
        Le = n.context ?? this.context;
      return (
        n.setHeaders !== void 0 &&
          (ne = Object.keys(n.setHeaders).reduce((dr, fr) => dr.set(fr, n.setHeaders[fr]), ne)),
        n.setParams &&
          (Et = Object.keys(n.setParams).reduce((dr, fr) => dr.set(fr, n.setParams[fr]), Et)),
        new e(t, r, O, {
          params: Et,
          headers: ne,
          context: Le,
          reportProgress: b,
          responseType: o,
          withCredentials: M,
          transferCache: f,
          keepalive: i,
          cache: a,
          priority: s,
          timeout: _,
          mode: c,
          redirect: l,
          credentials: u,
          referrer: d,
          integrity: h,
        })
      );
    }
  },
  Rr = (function (e) {
    return (
      (e[(e.Sent = 0)] = 'Sent'),
      (e[(e.UploadProgress = 1)] = 'UploadProgress'),
      (e[(e.ResponseHeader = 2)] = 'ResponseHeader'),
      (e[(e.DownloadProgress = 3)] = 'DownloadProgress'),
      (e[(e.Response = 4)] = 'Response'),
      (e[(e.User = 5)] = 'User'),
      e
    );
  })(Rr || {}),
  Fo = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    redirected;
    constructor(n, t = 200, r = 'OK') {
      (this.headers = n.headers || new rr()),
        (this.status = n.status !== void 0 ? n.status : t),
        (this.statusText = n.statusText || r),
        (this.url = n.url || null),
        (this.redirected = n.redirected),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  Yc = class e extends Fo {
    constructor(n = {}) {
      super(n);
    }
    type = Rr.ResponseHeader;
    clone(n = {}) {
      return new e({
        headers: n.headers || this.headers,
        status: n.status !== void 0 ? n.status : this.status,
        statusText: n.statusText || this.statusText,
        url: n.url || this.url || void 0,
      });
    }
  },
  ps = class e extends Fo {
    body;
    constructor(n = {}) {
      super(n), (this.body = n.body !== void 0 ? n.body : null);
    }
    type = Rr.Response;
    clone(n = {}) {
      return new e({
        body: n.body !== void 0 ? n.body : this.body,
        headers: n.headers || this.headers,
        status: n.status !== void 0 ? n.status : this.status,
        statusText: n.statusText || this.statusText,
        url: n.url || this.url || void 0,
        redirected: n.redirected ?? this.redirected,
      });
    }
  },
  ko = class extends Fo {
    name = 'HttpErrorResponse';
    message;
    error;
    ok = !1;
    constructor(n) {
      super(n, 0, 'Unknown Error'),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${n.url || '(unknown url)'}`)
          : (this.message = `Http failure response for ${n.url || '(unknown url)'}: ${n.status} ${
              n.statusText
            }`),
        (this.error = n.error || null);
    }
  },
  aE = 200,
  cE = 204;
function Vp(e, n) {
  return {
    body: n,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    credentials: e.credentials,
    transferCache: e.transferCache,
    timeout: e.timeout,
    keepalive: e.keepalive,
    priority: e.priority,
    cache: e.cache,
    mode: e.mode,
    redirect: e.redirect,
    integrity: e.integrity,
    referrer: e.referrer,
  };
}
var Lo = (() => {
  class e {
    handler;
    constructor(t) {
      this.handler = t;
    }
    request(t, r, o = {}) {
      let i;
      if (t instanceof No) i = t;
      else {
        let c;
        o.headers instanceof rr ? (c = o.headers) : (c = new rr(o.headers));
        let l;
        o.params &&
          (o.params instanceof Sn ? (l = o.params) : (l = new Sn({ fromObject: o.params }))),
          (i = new No(t, r, o.body !== void 0 ? o.body : null, {
            headers: c,
            context: o.context,
            params: l,
            reportProgress: o.reportProgress,
            responseType: o.responseType || 'json',
            withCredentials: o.withCredentials,
            transferCache: o.transferCache,
            keepalive: o.keepalive,
            priority: o.priority,
            cache: o.cache,
            mode: o.mode,
            redirect: o.redirect,
            credentials: o.credentials,
            referrer: o.referrer,
            integrity: o.integrity,
            timeout: o.timeout,
          }));
      }
      let s = P(i).pipe(cn((c) => this.handler.handle(c)));
      if (t instanceof No || o.observe === 'events') return s;
      let a = s.pipe(Ae((c) => c instanceof ps));
      switch (o.observe || 'body') {
        case 'body':
          switch (i.responseType) {
            case 'arraybuffer':
              return a.pipe(
                S((c) => {
                  if (c.body !== null && !(c.body instanceof ArrayBuffer)) throw new y(2806, !1);
                  return c.body;
                })
              );
            case 'blob':
              return a.pipe(
                S((c) => {
                  if (c.body !== null && !(c.body instanceof Blob)) throw new y(2807, !1);
                  return c.body;
                })
              );
            case 'text':
              return a.pipe(
                S((c) => {
                  if (c.body !== null && typeof c.body != 'string') throw new y(2808, !1);
                  return c.body;
                })
              );
            case 'json':
            default:
              return a.pipe(S((c) => c.body));
          }
        case 'response':
          return a;
        default:
          throw new y(2809, !1);
      }
    }
    delete(t, r = {}) {
      return this.request('DELETE', t, r);
    }
    get(t, r = {}) {
      return this.request('GET', t, r);
    }
    head(t, r = {}) {
      return this.request('HEAD', t, r);
    }
    jsonp(t, r) {
      return this.request('JSONP', t, {
        params: new Sn().append(r, 'JSONP_CALLBACK'),
        observe: 'body',
        responseType: 'json',
      });
    }
    options(t, r = {}) {
      return this.request('OPTIONS', t, r);
    }
    patch(t, r, o = {}) {
      return this.request('PATCH', t, Vp(o, r));
    }
    post(t, r, o = {}) {
      return this.request('POST', t, Vp(o, r));
    }
    put(t, r, o = {}) {
      return this.request('PUT', t, Vp(o, r));
    }
    static ɵfac = function (r) {
      return new (r || e)(E(Ro));
    };
    static ɵprov = x({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var lE = new C('');
function uE(e, n) {
  return n(e);
}
function dE(e, n, t) {
  return (r, o) => ke(t, () => n(r, (i) => e(i, o)));
}
var Iw = new C(''),
  Sw = new C(''),
  Tw = new C('', { providedIn: 'root', factory: () => !0 });
var Kc = (() => {
  class e extends Ro {
    backend;
    injector;
    chain = null;
    pendingTasks = p(Ya);
    contributeToStability = p(Tw);
    constructor(t, r) {
      super(), (this.backend = t), (this.injector = r);
    }
    handle(t) {
      if (this.chain === null) {
        let r = Array.from(new Set([...this.injector.get(Iw), ...this.injector.get(Sw, [])]));
        this.chain = r.reduceRight((o, i) => dE(o, i, this.injector), uE);
      }
      if (this.contributeToStability) {
        let r = this.pendingTasks.add();
        return this.chain(t, (o) => this.backend.handle(o)).pipe(ln(r));
      } else return this.chain(t, (r) => this.backend.handle(r));
    }
    static ɵfac = function (r) {
      return new (r || e)(E(fs), E(_e));
    };
    static ɵprov = x({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var fE = /^\)\]\}',?\n/,
  pE = RegExp(`^${Pw}:`, 'm');
function hE(e) {
  return 'responseURL' in e && e.responseURL
    ? e.responseURL
    : pE.test(e.getAllResponseHeaders())
    ? e.getResponseHeader(Pw)
    : null;
}
var Bp = (() => {
    class e {
      xhrFactory;
      constructor(t) {
        this.xhrFactory = t;
      }
      handle(t) {
        if (t.method === 'JSONP') throw new y(-2800, !1);
        let r = this.xhrFactory;
        return P(null).pipe(
          Be(
            () =>
              new V((i) => {
                let s = r.build();
                if (
                  (s.open(t.method, t.urlWithParams),
                  t.withCredentials && (s.withCredentials = !0),
                  t.headers.forEach((M, b) => s.setRequestHeader(M, b.join(','))),
                  t.headers.has(Ow) || s.setRequestHeader(Ow, sE),
                  !t.headers.has(xw))
                ) {
                  let M = t.detectContentTypeHeader();
                  M !== null && s.setRequestHeader(xw, M);
                }
                if ((t.timeout && (s.timeout = t.timeout), t.responseType)) {
                  let M = t.responseType.toLowerCase();
                  s.responseType = M !== 'json' ? M : 'text';
                }
                let a = t.serializeBody(),
                  c = null,
                  l = () => {
                    if (c !== null) return c;
                    let M = s.statusText || 'OK',
                      b = new rr(s.getAllResponseHeaders()),
                      ne = hE(s) || t.url;
                    return (
                      (c = new Yc({ headers: b, status: s.status, statusText: M, url: ne })), c
                    );
                  },
                  u = () => {
                    let { headers: M, status: b, statusText: ne, url: Et } = l(),
                      Le = null;
                    b !== cE && (Le = typeof s.response > 'u' ? s.responseText : s.response),
                      b === 0 && (b = Le ? aE : 0);
                    let dr = b >= 200 && b < 300;
                    if (t.responseType === 'json' && typeof Le == 'string') {
                      let fr = Le;
                      Le = Le.replace(fE, '');
                      try {
                        Le = Le !== '' ? JSON.parse(Le) : null;
                      } catch (b0) {
                        (Le = fr), dr && ((dr = !1), (Le = { error: b0, text: Le }));
                      }
                    }
                    dr
                      ? (i.next(
                          new ps({
                            body: Le,
                            headers: M,
                            status: b,
                            statusText: ne,
                            url: Et || void 0,
                          })
                        ),
                        i.complete())
                      : i.error(
                          new ko({
                            error: Le,
                            headers: M,
                            status: b,
                            statusText: ne,
                            url: Et || void 0,
                          })
                        );
                  },
                  d = (M) => {
                    let { url: b } = l(),
                      ne = new ko({
                        error: M,
                        status: s.status || 0,
                        statusText: s.statusText || 'Unknown Error',
                        url: b || void 0,
                      });
                    i.error(ne);
                  },
                  h = d;
                t.timeout &&
                  (h = (M) => {
                    let { url: b } = l(),
                      ne = new ko({
                        error: new DOMException('Request timed out', 'TimeoutError'),
                        status: s.status || 0,
                        statusText: s.statusText || 'Request timeout',
                        url: b || void 0,
                      });
                    i.error(ne);
                  });
                let f = !1,
                  _ = (M) => {
                    f || (i.next(l()), (f = !0));
                    let b = { type: Rr.DownloadProgress, loaded: M.loaded };
                    M.lengthComputable && (b.total = M.total),
                      t.responseType === 'text' &&
                        s.responseText &&
                        (b.partialText = s.responseText),
                      i.next(b);
                  },
                  O = (M) => {
                    let b = { type: Rr.UploadProgress, loaded: M.loaded };
                    M.lengthComputable && (b.total = M.total), i.next(b);
                  };
                return (
                  s.addEventListener('load', u),
                  s.addEventListener('error', d),
                  s.addEventListener('timeout', h),
                  s.addEventListener('abort', d),
                  t.reportProgress &&
                    (s.addEventListener('progress', _),
                    a !== null && s.upload && s.upload.addEventListener('progress', O)),
                  s.send(a),
                  i.next({ type: Rr.Sent }),
                  () => {
                    s.removeEventListener('error', d),
                      s.removeEventListener('abort', d),
                      s.removeEventListener('load', u),
                      s.removeEventListener('timeout', h),
                      t.reportProgress &&
                        (s.removeEventListener('progress', _),
                        a !== null && s.upload && s.upload.removeEventListener('progress', O)),
                      s.readyState !== s.DONE && s.abort();
                  }
                );
              })
          )
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(E(kr));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Aw = new C(''),
  gE = 'XSRF-TOKEN',
  mE = new C('', { providedIn: 'root', factory: () => gE }),
  vE = 'X-XSRF-TOKEN',
  _E = new C('', { providedIn: 'root', factory: () => vE }),
  hs = class {},
  wE = (() => {
    class e {
      doc;
      cookieName;
      lastCookieString = '';
      lastToken = null;
      parseCount = 0;
      constructor(t, r) {
        (this.doc = t), (this.cookieName = r);
      }
      getToken() {
        let t = this.doc.cookie || '';
        return (
          t !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = as(t, this.cookieName)),
            (this.lastCookieString = t)),
          this.lastToken
        );
      }
      static ɵfac = function (r) {
        return new (r || e)(E(J), E(mE));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function yE(e, n) {
  let t = e.url.toLowerCase();
  if (
    !p(Aw) ||
    e.method === 'GET' ||
    e.method === 'HEAD' ||
    t.startsWith('http://') ||
    t.startsWith('https://')
  )
    return n(e);
  let r = p(hs).getToken(),
    o = p(_E);
  return r != null && !e.headers.has(o) && (e = e.clone({ headers: e.headers.set(o, r) })), n(e);
}
function Up(...e) {
  let n = [
    Lo,
    Bp,
    Kc,
    { provide: Ro, useExisting: Kc },
    { provide: fs, useFactory: () => p(lE, { optional: !0 }) ?? p(Bp) },
    { provide: Iw, useValue: yE, multi: !0 },
    { provide: Aw, useValue: !0 },
    { provide: hs, useClass: wE },
  ];
  for (let t of e) n.push(...t.ɵproviders);
  return Ht(n);
}
var Nw = (() => {
  class e {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(t) {
      this._doc.title = t || '';
    }
    static ɵfac = function (r) {
      return new (r || e)(E(J));
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
var Hp = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({
        token: e,
        factory: function (r) {
          let o = null;
          return r ? (o = new (r || e)()) : (o = E(bE)), o;
        },
        providedIn: 'root',
      });
    }
    return e;
  })(),
  bE = (() => {
    class e extends Hp {
      _doc;
      constructor(t) {
        super(), (this._doc = t);
      }
      sanitize(t, r) {
        if (r == null) return null;
        switch (t) {
          case Fe.NONE:
            return r;
          case Fe.HTML:
            return wn(r, 'HTML') ? Rt(r) : Hf(this._doc, String(r)).toString();
          case Fe.STYLE:
            return wn(r, 'Style') ? Rt(r) : r;
          case Fe.SCRIPT:
            if (wn(r, 'Script')) return Rt(r);
            throw new y(5200, !1);
          case Fe.URL:
            return wn(r, 'URL') ? Rt(r) : Vi(String(r));
          case Fe.RESOURCE_URL:
            if (wn(r, 'ResourceURL')) return Rt(r);
            throw new y(5201, !1);
          default:
            throw new y(5202, !1);
        }
      }
      bypassSecurityTrustHtml(t) {
        return Lf(t);
      }
      bypassSecurityTrustStyle(t) {
        return jf(t);
      }
      bypassSecurityTrustScript(t) {
        return Vf(t);
      }
      bypassSecurityTrustUrl(t) {
        return Bf(t);
      }
      bypassSecurityTrustResourceUrl(t) {
        return Uf(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(E(J));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
var j = 'primary',
  Is = Symbol('RouteTitle'),
  qp = class {
    params;
    constructor(n) {
      this.params = n || {};
    }
    has(n) {
      return Object.prototype.hasOwnProperty.call(this.params, n);
    }
    get(n) {
      if (this.has(n)) {
        let t = this.params[n];
        return Array.isArray(t) ? t[0] : t;
      }
      return null;
    }
    getAll(n) {
      if (this.has(n)) {
        let t = this.params[n];
        return Array.isArray(t) ? t : [t];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function jr(e) {
  return new qp(e);
}
function Hw(e, n, t) {
  let r = t.path.split('/');
  if (r.length > e.length || (t.pathMatch === 'full' && (n.hasChildren() || r.length < e.length)))
    return null;
  let o = {};
  for (let i = 0; i < r.length; i++) {
    let s = r[i],
      a = e[i];
    if (s[0] === ':') o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: o };
}
function ME(e, n) {
  if (e.length !== n.length) return !1;
  for (let t = 0; t < e.length; ++t) if (!Xt(e[t], n[t])) return !1;
  return !0;
}
function Xt(e, n) {
  let t = e ? Zp(e) : void 0,
    r = n ? Zp(n) : void 0;
  if (!t || !r || t.length != r.length) return !1;
  let o;
  for (let i = 0; i < t.length; i++) if (((o = t[i]), !zw(e[o], n[o]))) return !1;
  return !0;
}
function Zp(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function zw(e, n) {
  if (Array.isArray(e) && Array.isArray(n)) {
    if (e.length !== n.length) return !1;
    let t = [...e].sort(),
      r = [...n].sort();
    return t.every((o, i) => r[i] === o);
  } else return e === n;
}
function $w(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function An(e) {
  return Ou(e) ? e : Xn(e) ? le(Promise.resolve(e)) : P(e);
}
var xE = { exact: Ww, subset: qw },
  Gw = { exact: OE, subset: PE, ignored: () => !0 };
function Rw(e, n, t) {
  return (
    xE[t.paths](e.root, n.root, t.matrixParams) &&
    Gw[t.queryParams](e.queryParams, n.queryParams) &&
    !(t.fragment === 'exact' && e.fragment !== n.fragment)
  );
}
function OE(e, n) {
  return Xt(e, n);
}
function Ww(e, n, t) {
  if (
    !Fr(e.segments, n.segments) ||
    !Xc(e.segments, n.segments, t) ||
    e.numberOfChildren !== n.numberOfChildren
  )
    return !1;
  for (let r in n.children) if (!e.children[r] || !Ww(e.children[r], n.children[r], t)) return !1;
  return !0;
}
function PE(e, n) {
  return (
    Object.keys(n).length <= Object.keys(e).length && Object.keys(n).every((t) => zw(e[t], n[t]))
  );
}
function qw(e, n, t) {
  return Zw(e, n, n.segments, t);
}
function Zw(e, n, t, r) {
  if (e.segments.length > t.length) {
    let o = e.segments.slice(0, t.length);
    return !(!Fr(o, t) || n.hasChildren() || !Xc(o, t, r));
  } else if (e.segments.length === t.length) {
    if (!Fr(e.segments, t) || !Xc(e.segments, t, r)) return !1;
    for (let o in n.children) if (!e.children[o] || !qw(e.children[o], n.children[o], r)) return !1;
    return !0;
  } else {
    let o = t.slice(0, e.segments.length),
      i = t.slice(e.segments.length);
    return !Fr(e.segments, o) || !Xc(e.segments, o, r) || !e.children[j]
      ? !1
      : Zw(e.children[j], n, i, r);
  }
}
function Xc(e, n, t) {
  return n.every((r, o) => Gw[t](e[o].parameters, r.parameters));
}
var tn = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(n = new G([], {}), t = {}, r = null) {
      (this.root = n), (this.queryParams = t), (this.fragment = r);
    }
    get queryParamMap() {
      return (this._queryParamMap ??= jr(this.queryParams)), this._queryParamMap;
    }
    toString() {
      return IE.serialize(this);
    }
  },
  G = class {
    segments;
    children;
    parent = null;
    constructor(n, t) {
      (this.segments = n), (this.children = t), Object.values(t).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return el(this);
    }
  },
  or = class {
    path;
    parameters;
    _parameterMap;
    constructor(n, t) {
      (this.path = n), (this.parameters = t);
    }
    get parameterMap() {
      return (this._parameterMap ??= jr(this.parameters)), this._parameterMap;
    }
    toString() {
      return Kw(this);
    }
  };
function EE(e, n) {
  return Fr(e, n) && e.every((t, r) => Xt(t.parameters, n[r].parameters));
}
function Fr(e, n) {
  return e.length !== n.length ? !1 : e.every((t, r) => t.path === n[r].path);
}
function DE(e, n) {
  let t = [];
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      r === j && (t = t.concat(n(o, r)));
    }),
    Object.entries(e.children).forEach(([r, o]) => {
      r !== j && (t = t.concat(n(o, r)));
    }),
    t
  );
}
var Ss = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => new Vr(), providedIn: 'root' });
    }
    return e;
  })(),
  Vr = class {
    parse(n) {
      let t = new Kp(n);
      return new tn(t.parseRootSegment(), t.parseQueryParams(), t.parseFragment());
    }
    serialize(n) {
      let t = `/${gs(n.root, !0)}`,
        r = AE(n.queryParams),
        o = typeof n.fragment == 'string' ? `#${SE(n.fragment)}` : '';
      return `${t}${r}${o}`;
    }
  },
  IE = new Vr();
function el(e) {
  return e.segments.map((n) => Kw(n)).join('/');
}
function gs(e, n) {
  if (!e.hasChildren()) return el(e);
  if (n) {
    let t = e.children[j] ? gs(e.children[j], !1) : '',
      r = [];
    return (
      Object.entries(e.children).forEach(([o, i]) => {
        o !== j && r.push(`${o}:${gs(i, !1)}`);
      }),
      r.length > 0 ? `${t}(${r.join('//')})` : t
    );
  } else {
    let t = DE(e, (r, o) => (o === j ? [gs(e.children[j], !1)] : [`${o}:${gs(r, !1)}`]));
    return Object.keys(e.children).length === 1 && e.children[j] != null
      ? `${el(e)}/${t[0]}`
      : `${el(e)}/(${t.join('//')})`;
  }
}
function Yw(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',');
}
function Qc(e) {
  return Yw(e).replace(/%3B/gi, ';');
}
function SE(e) {
  return encodeURI(e);
}
function Yp(e) {
  return Yw(e).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function tl(e) {
  return decodeURIComponent(e);
}
function Fw(e) {
  return tl(e.replace(/\+/g, '%20'));
}
function Kw(e) {
  return `${Yp(e.path)}${TE(e.parameters)}`;
}
function TE(e) {
  return Object.entries(e)
    .map(([n, t]) => `;${Yp(n)}=${Yp(t)}`)
    .join('');
}
function AE(e) {
  let n = Object.entries(e)
    .map(([t, r]) =>
      Array.isArray(r) ? r.map((o) => `${Qc(t)}=${Qc(o)}`).join('&') : `${Qc(t)}=${Qc(r)}`
    )
    .filter((t) => t);
  return n.length ? `?${n.join('&')}` : '';
}
var NE = /^[^\/()?;#]+/;
function zp(e) {
  let n = e.match(NE);
  return n ? n[0] : '';
}
var kE = /^[^\/()?;=#]+/;
function RE(e) {
  let n = e.match(kE);
  return n ? n[0] : '';
}
var FE = /^[^=?&#]+/;
function LE(e) {
  let n = e.match(FE);
  return n ? n[0] : '';
}
var jE = /^[^&#]+/;
function VE(e) {
  let n = e.match(jE);
  return n ? n[0] : '';
}
var Kp = class {
  url;
  remaining;
  constructor(n) {
    (this.url = n), (this.remaining = n);
  }
  parseRootSegment() {
    return (
      this.consumeOptional('/'),
      this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')
        ? new G([], {})
        : new G([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let n = {};
    if (this.consumeOptional('?'))
      do this.parseQueryParam(n);
      while (this.consumeOptional('&'));
    return n;
  }
  parseFragment() {
    return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
  }
  parseChildren() {
    if (this.remaining === '') return {};
    this.consumeOptional('/');
    let n = [];
    for (
      this.peekStartsWith('(') || n.push(this.parseSegment());
      this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

    )
      this.capture('/'), n.push(this.parseSegment());
    let t = {};
    this.peekStartsWith('/(') && (this.capture('/'), (t = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith('(') && (r = this.parseParens(!1)),
      (n.length > 0 || Object.keys(t).length > 0) && (r[j] = new G(n, t)),
      r
    );
  }
  parseSegment() {
    let n = zp(this.remaining);
    if (n === '' && this.peekStartsWith(';')) throw new y(4009, !1);
    return this.capture(n), new or(tl(n), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let n = {};
    for (; this.consumeOptional(';'); ) this.parseParam(n);
    return n;
  }
  parseParam(n) {
    let t = RE(this.remaining);
    if (!t) return;
    this.capture(t);
    let r = '';
    if (this.consumeOptional('=')) {
      let o = zp(this.remaining);
      o && ((r = o), this.capture(r));
    }
    n[tl(t)] = tl(r);
  }
  parseQueryParam(n) {
    let t = LE(this.remaining);
    if (!t) return;
    this.capture(t);
    let r = '';
    if (this.consumeOptional('=')) {
      let s = VE(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let o = Fw(t),
      i = Fw(r);
    if (n.hasOwnProperty(o)) {
      let s = n[o];
      Array.isArray(s) || ((s = [s]), (n[o] = s)), s.push(i);
    } else n[o] = i;
  }
  parseParens(n) {
    let t = {};
    for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
      let r = zp(this.remaining),
        o = this.remaining[r.length];
      if (o !== '/' && o !== ')' && o !== ';') throw new y(4010, !1);
      let i;
      r.indexOf(':') > -1
        ? ((i = r.slice(0, r.indexOf(':'))), this.capture(i), this.capture(':'))
        : n && (i = j);
      let s = this.parseChildren();
      (t[i] = Object.keys(s).length === 1 ? s[j] : new G([], s)), this.consumeOptional('//');
    }
    return t;
  }
  peekStartsWith(n) {
    return this.remaining.startsWith(n);
  }
  consumeOptional(n) {
    return this.peekStartsWith(n)
      ? ((this.remaining = this.remaining.substring(n.length)), !0)
      : !1;
  }
  capture(n) {
    if (!this.consumeOptional(n)) throw new y(4011, !1);
  }
};
function Qw(e) {
  return e.segments.length > 0 ? new G([], { [j]: e }) : e;
}
function Jw(e) {
  let n = {};
  for (let [r, o] of Object.entries(e.children)) {
    let i = Jw(o);
    if (r === j && i.segments.length === 0 && i.hasChildren())
      for (let [s, a] of Object.entries(i.children)) n[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (n[r] = i);
  }
  let t = new G(e.segments, n);
  return BE(t);
}
function BE(e) {
  if (e.numberOfChildren === 1 && e.children[j]) {
    let n = e.children[j];
    return new G(e.segments.concat(n.segments), n.children);
  }
  return e;
}
function ir(e) {
  return e instanceof tn;
}
function Xw(e, n, t = null, r = null) {
  let o = ey(e);
  return ty(o, n, t, r);
}
function ey(e) {
  let n;
  function t(i) {
    let s = {};
    for (let c of i.children) {
      let l = t(c);
      s[c.outlet] = l;
    }
    let a = new G(i.url, s);
    return i === e && (n = a), a;
  }
  let r = t(e.root),
    o = Qw(r);
  return n ?? o;
}
function ty(e, n, t, r) {
  let o = e;
  for (; o.parent; ) o = o.parent;
  if (n.length === 0) return $p(o, o, o, t, r);
  let i = UE(n);
  if (i.toRoot()) return $p(o, o, new G([], {}), t, r);
  let s = HE(i, o, e),
    a = s.processChildren
      ? vs(s.segmentGroup, s.index, i.commands)
      : ry(s.segmentGroup, s.index, i.commands);
  return $p(o, s.segmentGroup, a, t, r);
}
function nl(e) {
  return typeof e == 'object' && e != null && !e.outlets && !e.segmentPath;
}
function ys(e) {
  return typeof e == 'object' && e != null && e.outlets;
}
function $p(e, n, t, r, o) {
  let i = {};
  r &&
    Object.entries(r).forEach(([c, l]) => {
      i[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
    });
  let s;
  e === n ? (s = t) : (s = ny(e, n, t));
  let a = Qw(Jw(s));
  return new tn(a, i, o);
}
function ny(e, n, t) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([o, i]) => {
      i === n ? (r[o] = t) : (r[o] = ny(i, n, t));
    }),
    new G(e.segments, r)
  );
}
var rl = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(n, t, r) {
    if (
      ((this.isAbsolute = n),
      (this.numberOfDoubleDots = t),
      (this.commands = r),
      n && r.length > 0 && nl(r[0]))
    )
      throw new y(4003, !1);
    let o = r.find(ys);
    if (o && o !== $w(r)) throw new y(4004, !1);
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
  }
};
function UE(e) {
  if (typeof e[0] == 'string' && e.length === 1 && e[0] === '/') return new rl(!0, 0, e);
  let n = 0,
    t = !1,
    r = e.reduce((o, i, s) => {
      if (typeof i == 'object' && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([c, l]) => {
              a[c] = typeof l == 'string' ? l.split('/') : l;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != 'string'
        ? [...o, i]
        : s === 0
        ? (i.split('/').forEach((a, c) => {
            (c == 0 && a === '.') ||
              (c == 0 && a === '' ? (t = !0) : a === '..' ? n++ : a != '' && o.push(a));
          }),
          o)
        : [...o, i];
    }, []);
  return new rl(t, n, r);
}
var Bo = class {
  segmentGroup;
  processChildren;
  index;
  constructor(n, t, r) {
    (this.segmentGroup = n), (this.processChildren = t), (this.index = r);
  }
};
function HE(e, n, t) {
  if (e.isAbsolute) return new Bo(n, !0, 0);
  if (!t) return new Bo(n, !1, NaN);
  if (t.parent === null) return new Bo(t, !0, 0);
  let r = nl(e.commands[0]) ? 0 : 1,
    o = t.segments.length - 1 + r;
  return zE(t, o, e.numberOfDoubleDots);
}
function zE(e, n, t) {
  let r = e,
    o = n,
    i = t;
  for (; i > o; ) {
    if (((i -= o), (r = r.parent), !r)) throw new y(4005, !1);
    o = r.segments.length;
  }
  return new Bo(r, !1, o - i);
}
function $E(e) {
  return ys(e[0]) ? e[0].outlets : { [j]: e };
}
function ry(e, n, t) {
  if (((e ??= new G([], {})), e.segments.length === 0 && e.hasChildren())) return vs(e, n, t);
  let r = GE(e, n, t),
    o = t.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let i = new G(e.segments.slice(0, r.pathIndex), {});
    return (i.children[j] = new G(e.segments.slice(r.pathIndex), e.children)), vs(i, 0, o);
  } else
    return r.match && o.length === 0
      ? new G(e.segments, {})
      : r.match && !e.hasChildren()
      ? Qp(e, n, t)
      : r.match
      ? vs(e, 0, o)
      : Qp(e, n, t);
}
function vs(e, n, t) {
  if (t.length === 0) return new G(e.segments, {});
  {
    let r = $E(t),
      o = {};
    if (
      Object.keys(r).some((i) => i !== j) &&
      e.children[j] &&
      e.numberOfChildren === 1 &&
      e.children[j].segments.length === 0
    ) {
      let i = vs(e.children[j], n, t);
      return new G(e.segments, i.children);
    }
    return (
      Object.entries(r).forEach(([i, s]) => {
        typeof s == 'string' && (s = [s]), s !== null && (o[i] = ry(e.children[i], n, s));
      }),
      Object.entries(e.children).forEach(([i, s]) => {
        r[i] === void 0 && (o[i] = s);
      }),
      new G(e.segments, o)
    );
  }
}
function GE(e, n, t) {
  let r = 0,
    o = n,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < e.segments.length; ) {
    if (r >= t.length) return i;
    let s = e.segments[o],
      a = t[r];
    if (ys(a)) break;
    let c = `${a}`,
      l = r < t.length - 1 ? t[r + 1] : null;
    if (o > 0 && c === void 0) break;
    if (c && l && typeof l == 'object' && l.outlets === void 0) {
      if (!jw(c, l, s)) return i;
      r += 2;
    } else {
      if (!jw(c, {}, s)) return i;
      r++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: r };
}
function Qp(e, n, t) {
  let r = e.segments.slice(0, n),
    o = 0;
  for (; o < t.length; ) {
    let i = t[o];
    if (ys(i)) {
      let c = WE(i.outlets);
      return new G(r, c);
    }
    if (o === 0 && nl(t[0])) {
      let c = e.segments[n];
      r.push(new or(c.path, Lw(t[0]))), o++;
      continue;
    }
    let s = ys(i) ? i.outlets[j] : `${i}`,
      a = o < t.length - 1 ? t[o + 1] : null;
    s && a && nl(a) ? (r.push(new or(s, Lw(a))), (o += 2)) : (r.push(new or(s, {})), o++);
  }
  return new G(r, {});
}
function WE(e) {
  let n = {};
  return (
    Object.entries(e).forEach(([t, r]) => {
      typeof r == 'string' && (r = [r]), r !== null && (n[t] = Qp(new G([], {}), 0, r));
    }),
    n
  );
}
function Lw(e) {
  let n = {};
  return Object.entries(e).forEach(([t, r]) => (n[t] = `${r}`)), n;
}
function jw(e, n, t) {
  return e == t.path && Xt(n, t.parameters);
}
var _s = 'imperative',
  Ie = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = 'NavigationStart'),
      (e[(e.NavigationEnd = 1)] = 'NavigationEnd'),
      (e[(e.NavigationCancel = 2)] = 'NavigationCancel'),
      (e[(e.NavigationError = 3)] = 'NavigationError'),
      (e[(e.RoutesRecognized = 4)] = 'RoutesRecognized'),
      (e[(e.ResolveStart = 5)] = 'ResolveStart'),
      (e[(e.ResolveEnd = 6)] = 'ResolveEnd'),
      (e[(e.GuardsCheckStart = 7)] = 'GuardsCheckStart'),
      (e[(e.GuardsCheckEnd = 8)] = 'GuardsCheckEnd'),
      (e[(e.RouteConfigLoadStart = 9)] = 'RouteConfigLoadStart'),
      (e[(e.RouteConfigLoadEnd = 10)] = 'RouteConfigLoadEnd'),
      (e[(e.ChildActivationStart = 11)] = 'ChildActivationStart'),
      (e[(e.ChildActivationEnd = 12)] = 'ChildActivationEnd'),
      (e[(e.ActivationStart = 13)] = 'ActivationStart'),
      (e[(e.ActivationEnd = 14)] = 'ActivationEnd'),
      (e[(e.Scroll = 15)] = 'Scroll'),
      (e[(e.NavigationSkipped = 16)] = 'NavigationSkipped'),
      e
    );
  })(Ie || {}),
  mt = class {
    id;
    url;
    constructor(n, t) {
      (this.id = n), (this.url = t);
    }
  },
  Br = class extends mt {
    type = Ie.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(n, t, r = 'imperative', o = null) {
      super(n, t), (this.navigationTrigger = r), (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Vt = class extends mt {
    urlAfterRedirects;
    type = Ie.NavigationEnd;
    constructor(n, t, r) {
      super(n, t), (this.urlAfterRedirects = r);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Je = (function (e) {
    return (
      (e[(e.Redirect = 0)] = 'Redirect'),
      (e[(e.SupersededByNewNavigation = 1)] = 'SupersededByNewNavigation'),
      (e[(e.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
      (e[(e.GuardRejected = 3)] = 'GuardRejected'),
      (e[(e.Aborted = 4)] = 'Aborted'),
      e
    );
  })(Je || {}),
  Cs = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = 'IgnoredSameUrlNavigation'),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] = 'IgnoredByUrlHandlingStrategy'),
      e
    );
  })(Cs || {}),
  en = class extends mt {
    reason;
    code;
    type = Ie.NavigationCancel;
    constructor(n, t, r, o) {
      super(n, t), (this.reason = r), (this.code = o);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Tn = class extends mt {
    reason;
    code;
    type = Ie.NavigationSkipped;
    constructor(n, t, r, o) {
      super(n, t), (this.reason = r), (this.code = o);
    }
  },
  Ho = class extends mt {
    error;
    target;
    type = Ie.NavigationError;
    constructor(n, t, r, o) {
      super(n, t), (this.error = r), (this.target = o);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  bs = class extends mt {
    urlAfterRedirects;
    state;
    type = Ie.RoutesRecognized;
    constructor(n, t, r, o) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ol = class extends mt {
    urlAfterRedirects;
    state;
    type = Ie.GuardsCheckStart;
    constructor(n, t, r, o) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  il = class extends mt {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = Ie.GuardsCheckEnd;
    constructor(n, t, r, o, i) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = o), (this.shouldActivate = i);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  sl = class extends mt {
    urlAfterRedirects;
    state;
    type = Ie.ResolveStart;
    constructor(n, t, r, o) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  al = class extends mt {
    urlAfterRedirects;
    state;
    type = Ie.ResolveEnd;
    constructor(n, t, r, o) {
      super(n, t), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  cl = class {
    route;
    type = Ie.RouteConfigLoadStart;
    constructor(n) {
      this.route = n;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  ll = class {
    route;
    type = Ie.RouteConfigLoadEnd;
    constructor(n) {
      this.route = n;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  ul = class {
    snapshot;
    type = Ie.ChildActivationStart;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  dl = class {
    snapshot;
    type = Ie.ChildActivationEnd;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  fl = class {
    snapshot;
    type = Ie.ActivationStart;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  pl = class {
    snapshot;
    type = Ie.ActivationEnd;
    constructor(n) {
      this.snapshot = n;
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  };
var Ms = class {},
  zo = class {
    url;
    navigationBehaviorOptions;
    constructor(n, t) {
      (this.url = n), (this.navigationBehaviorOptions = t);
    }
  };
function qE(e) {
  return !(e instanceof Ms) && !(e instanceof zo);
}
function ZE(e, n) {
  return (
    e.providers && !e._injector && (e._injector = Wi(e.providers, n, `Route: ${e.path}`)),
    e._injector ?? n
  );
}
function jt(e) {
  return e.outlet || j;
}
function YE(e, n) {
  let t = e.filter((r) => jt(r) === n);
  return t.push(...e.filter((r) => jt(r) !== n)), t;
}
function Wo(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let n = e.parent; n; n = n.parent) {
    let t = n.routeConfig;
    if (t?._loadedInjector) return t._loadedInjector;
    if (t?._injector) return t._injector;
  }
  return null;
}
var hl = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return Wo(this.route?.snapshot) ?? this.rootInjector;
    }
    constructor(n) {
      (this.rootInjector = n), (this.children = new qo(this.rootInjector));
    }
  },
  qo = (() => {
    class e {
      rootInjector;
      contexts = new Map();
      constructor(t) {
        this.rootInjector = t;
      }
      onChildOutletCreated(t, r) {
        let o = this.getOrCreateContext(t);
        (o.outlet = r), this.contexts.set(t, o);
      }
      onChildOutletDestroyed(t) {
        let r = this.getContext(t);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let t = this.contexts;
        return (this.contexts = new Map()), t;
      }
      onOutletReAttached(t) {
        this.contexts = t;
      }
      getOrCreateContext(t) {
        let r = this.getContext(t);
        return r || ((r = new hl(this.rootInjector)), this.contexts.set(t, r)), r;
      }
      getContext(t) {
        return this.contexts.get(t) || null;
      }
      static ɵfac = function (r) {
        return new (r || e)(E(_e));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  gl = class {
    _root;
    constructor(n) {
      this._root = n;
    }
    get root() {
      return this._root.value;
    }
    parent(n) {
      let t = this.pathFromRoot(n);
      return t.length > 1 ? t[t.length - 2] : null;
    }
    children(n) {
      let t = Jp(n, this._root);
      return t ? t.children.map((r) => r.value) : [];
    }
    firstChild(n) {
      let t = Jp(n, this._root);
      return t && t.children.length > 0 ? t.children[0].value : null;
    }
    siblings(n) {
      let t = Xp(n, this._root);
      return t.length < 2
        ? []
        : t[t.length - 2].children.map((o) => o.value).filter((o) => o !== n);
    }
    pathFromRoot(n) {
      return Xp(n, this._root).map((t) => t.value);
    }
  };
function Jp(e, n) {
  if (e === n.value) return n;
  for (let t of n.children) {
    let r = Jp(e, t);
    if (r) return r;
  }
  return null;
}
function Xp(e, n) {
  if (e === n.value) return [n];
  for (let t of n.children) {
    let r = Xp(e, t);
    if (r.length) return r.unshift(n), r;
  }
  return [];
}
var gt = class {
  value;
  children;
  constructor(n, t) {
    (this.value = n), (this.children = t);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function Vo(e) {
  let n = {};
  return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
}
var xs = class extends gl {
  snapshot;
  constructor(n, t) {
    super(n), (this.snapshot = t), ah(this, n);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function oy(e) {
  let n = KE(e),
    t = new Te([new or('', {})]),
    r = new Te({}),
    o = new Te({}),
    i = new Te({}),
    s = new Te(''),
    a = new Xe(t, r, i, s, o, j, e, n.root);
  return (a.snapshot = n.root), new xs(new gt(a, []), n);
}
function KE(e) {
  let n = {},
    t = {},
    r = {},
    i = new Lr([], n, r, '', t, j, e, null, {});
  return new Os('', new gt(i, []));
}
var Xe = class {
  urlSubject;
  paramsSubject;
  queryParamsSubject;
  fragmentSubject;
  dataSubject;
  outlet;
  component;
  snapshot;
  _futureSnapshot;
  _routerState;
  _paramMap;
  _queryParamMap;
  title;
  url;
  params;
  queryParams;
  fragment;
  data;
  constructor(n, t, r, o, i, s, a, c) {
    (this.urlSubject = n),
      (this.paramsSubject = t),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(S((l) => l[Is])) ?? P(void 0)),
      (this.url = n),
      (this.params = t),
      (this.queryParams = r),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (this._paramMap ??= this.params.pipe(S((n) => jr(n)))), this._paramMap;
  }
  get queryParamMap() {
    return (this._queryParamMap ??= this.queryParams.pipe(S((n) => jr(n)))), this._queryParamMap;
  }
  toString() {
    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
  }
};
function ml(e, n, t = 'emptyOnly') {
  let r,
    { routeConfig: o } = e;
  return (
    n !== null &&
    (t === 'always' || o?.path === '' || (!n.component && !n.routeConfig?.loadComponent))
      ? (r = {
          params: w(w({}, n.params), e.params),
          data: w(w({}, n.data), e.data),
          resolve: w(w(w(w({}, e.data), n.data), o?.data), e._resolvedData),
        })
      : (r = {
          params: w({}, e.params),
          data: w({}, e.data),
          resolve: w(w({}, e.data), e._resolvedData ?? {}),
        }),
    o && sy(o) && (r.resolve[Is] = o.title),
    r
  );
}
var Lr = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    get title() {
      return this.data?.[Is];
    }
    constructor(n, t, r, o, i, s, a, c, l) {
      (this.url = n),
        (this.params = t),
        (this.queryParams = r),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = l);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= jr(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (this._queryParamMap ??= jr(this.queryParams)), this._queryParamMap;
    }
    toString() {
      let n = this.url.map((r) => r.toString()).join('/'),
        t = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${n}', path:'${t}')`;
    }
  },
  Os = class extends gl {
    url;
    constructor(n, t) {
      super(t), (this.url = n), ah(this, t);
    }
    toString() {
      return iy(this._root);
    }
  };
function ah(e, n) {
  (n.value._routerState = e), n.children.forEach((t) => ah(e, t));
}
function iy(e) {
  let n = e.children.length > 0 ? ` { ${e.children.map(iy).join(', ')} } ` : '';
  return `${e.value}${n}`;
}
function Gp(e) {
  if (e.snapshot) {
    let n = e.snapshot,
      t = e._futureSnapshot;
    (e.snapshot = t),
      Xt(n.queryParams, t.queryParams) || e.queryParamsSubject.next(t.queryParams),
      n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment),
      Xt(n.params, t.params) || e.paramsSubject.next(t.params),
      ME(n.url, t.url) || e.urlSubject.next(t.url),
      Xt(n.data, t.data) || e.dataSubject.next(t.data);
  } else (e.snapshot = e._futureSnapshot), e.dataSubject.next(e._futureSnapshot.data);
}
function eh(e, n) {
  let t = Xt(e.params, n.params) && EE(e.url, n.url),
    r = !e.parent != !n.parent;
  return t && !r && (!e.parent || eh(e.parent, n.parent));
}
function sy(e) {
  return typeof e.title == 'string' || e.title === null;
}
var ay = new C(''),
  Ur = (() => {
    class e {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = j;
      activateEvents = new se();
      deactivateEvents = new se();
      attachEvents = new se();
      detachEvents = new se();
      routerOutletData = H_(void 0);
      parentContexts = p(qo);
      location = p(Nr);
      changeDetector = p(me);
      inputBinder = p(yl, { optional: !0 });
      supportsBindingToComponentInputs = !0;
      ngOnChanges(t) {
        if (t.name) {
          let { firstChange: r, previousValue: o } = t.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(t) {
        return this.parentContexts.getContext(t)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
        let t = this.parentContexts.getContext(this.name);
        t?.route &&
          (t.attachRef
            ? this.attach(t.attachRef, t.route)
            : this.activateWith(t.route, t.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new y(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new y(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new y(4012, !1);
        this.location.detach();
        let t = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(t.instance),
          t
        );
      }
      attach(t, r) {
        (this.activated = t),
          (this._activatedRoute = r),
          this.location.insert(t.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(t.instance);
      }
      deactivate() {
        if (this.activated) {
          let t = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(t);
        }
      }
      activateWith(t, r) {
        if (this.isActivated) throw new y(4013, !1);
        this._activatedRoute = t;
        let o = this.location,
          s = t.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new th(t, a, o.injector, this.routerOutletData);
        (this.activated = o.createComponent(s, {
          index: o.length,
          injector: c,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = K({
        type: e,
        selectors: [['router-outlet']],
        inputs: { name: 'name', routerOutletData: [1, 'routerOutletData'] },
        outputs: {
          activateEvents: 'activate',
          deactivateEvents: 'deactivate',
          attachEvents: 'attach',
          detachEvents: 'detach',
        },
        exportAs: ['outlet'],
        features: [ft],
      });
    }
    return e;
  })(),
  th = class {
    route;
    childContexts;
    parent;
    outletData;
    constructor(n, t, r, o) {
      (this.route = n), (this.childContexts = t), (this.parent = r), (this.outletData = o);
    }
    get(n, t) {
      return n === Xe
        ? this.route
        : n === qo
        ? this.childContexts
        : n === ay
        ? this.outletData
        : this.parent.get(n, t);
    }
  },
  yl = new C('');
var ch = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵcmp = U({
      type: e,
      selectors: [['ng-component']],
      exportAs: ['emptyRouterOutlet'],
      decls: 1,
      vars: 0,
      template: function (r, o) {
        r & 1 && N(0, 'router-outlet');
      },
      dependencies: [Ur],
      encapsulation: 2,
    });
  }
  return e;
})();
function lh(e) {
  let n = e.children && e.children.map(lh),
    t = n ? k(w({}, e), { children: n }) : w({}, e);
  return (
    !t.component &&
      !t.loadComponent &&
      (n || t.loadChildren) &&
      t.outlet &&
      t.outlet !== j &&
      (t.component = ch),
    t
  );
}
function QE(e, n, t) {
  let r = Ps(e, n._root, t ? t._root : void 0);
  return new xs(r, n);
}
function Ps(e, n, t) {
  if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
    let r = t.value;
    r._futureSnapshot = n.value;
    let o = JE(e, n, t);
    return new gt(r, o);
  } else {
    if (e.shouldAttach(n.value)) {
      let i = e.retrieve(n.value);
      if (i !== null) {
        let s = i.route;
        return (
          (s.value._futureSnapshot = n.value), (s.children = n.children.map((a) => Ps(e, a))), s
        );
      }
    }
    let r = XE(n.value),
      o = n.children.map((i) => Ps(e, i));
    return new gt(r, o);
  }
}
function JE(e, n, t) {
  return n.children.map((r) => {
    for (let o of t.children) if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Ps(e, r, o);
    return Ps(e, r);
  });
}
function XE(e) {
  return new Xe(
    new Te(e.url),
    new Te(e.params),
    new Te(e.queryParams),
    new Te(e.fragment),
    new Te(e.data),
    e.outlet,
    e.component,
    e
  );
}
var $o = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(n, t) {
      (this.redirectTo = n), (this.navigationBehaviorOptions = t);
    }
  },
  cy = 'ngNavigationCancelingError';
function vl(e, n) {
  let { redirectTo: t, navigationBehaviorOptions: r } = ir(n)
      ? { redirectTo: n, navigationBehaviorOptions: void 0 }
      : n,
    o = ly(!1, Je.Redirect);
  return (o.url = t), (o.navigationBehaviorOptions = r), o;
}
function ly(e, n) {
  let t = new Error(`NavigationCancelingError: ${e || ''}`);
  return (t[cy] = !0), (t.cancellationCode = n), t;
}
function eD(e) {
  return uy(e) && ir(e.url);
}
function uy(e) {
  return !!e && e[cy];
}
var tD = (e, n, t, r) =>
    S((o) => (new nh(n, o.targetRouterState, o.currentRouterState, t, r).activate(e), o)),
  nh = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(n, t, r, o, i) {
      (this.routeReuseStrategy = n),
        (this.futureState = t),
        (this.currState = r),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(n) {
      let t = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(t, r, n),
        Gp(this.futureState.root),
        this.activateChildRoutes(t, r, n);
    }
    deactivateChildRoutes(n, t, r) {
      let o = Vo(t);
      n.children.forEach((i) => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], r), delete o[s];
      }),
        Object.values(o).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, r);
        });
    }
    deactivateRoutes(n, t, r) {
      let o = n.value,
        i = t ? t.value : null;
      if (o === i)
        if (o.component) {
          let s = r.getContext(o.outlet);
          s && this.deactivateChildRoutes(n, t, s.children);
        } else this.deactivateChildRoutes(n, t, r);
      else i && this.deactivateRouteAndItsChildren(t, r);
    }
    deactivateRouteAndItsChildren(n, t) {
      n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot)
        ? this.detachAndStoreRouteSubtree(n, t)
        : this.deactivateRouteAndOutlet(n, t);
    }
    detachAndStoreRouteSubtree(n, t) {
      let r = t.getContext(n.value.outlet),
        o = r && n.value.component ? r.children : t,
        i = Vo(n);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(n.value.snapshot, { componentRef: s, route: n, contexts: a });
      }
    }
    deactivateRouteAndOutlet(n, t) {
      let r = t.getContext(n.value.outlet),
        o = r && n.value.component ? r.children : t,
        i = Vo(n);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(n, t, r) {
      let o = Vo(t);
      n.children.forEach((i) => {
        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new pl(i.value.snapshot));
      }),
        n.children.length && this.forwardEvent(new dl(n.value.snapshot));
    }
    activateRoutes(n, t, r) {
      let o = n.value,
        i = t ? t.value : null;
      if ((Gp(o), o === i))
        if (o.component) {
          let s = r.getOrCreateContext(o.outlet);
          this.activateChildRoutes(n, t, s.children);
        } else this.activateChildRoutes(n, t, r);
      else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Gp(a.route.value),
            this.activateChildRoutes(n, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = o),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(n, null, s.children);
      } else this.activateChildRoutes(n, null, r);
    }
  },
  _l = class {
    path;
    route;
    constructor(n) {
      (this.path = n), (this.route = this.path[this.path.length - 1]);
    }
  },
  Uo = class {
    component;
    route;
    constructor(n, t) {
      (this.component = n), (this.route = t);
    }
  };
function nD(e, n, t) {
  let r = e._root,
    o = n ? n._root : null;
  return ms(r, o, t, [r.value]);
}
function rD(e) {
  let n = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !n || n.length === 0 ? null : { node: e, guards: n };
}
function Zo(e, n) {
  let t = Symbol(),
    r = n.get(e, t);
  return r === t ? (typeof e == 'function' && !$u(e) ? e : n.get(e)) : r;
}
function ms(e, n, t, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let i = Vo(n);
  return (
    e.children.forEach((s) => {
      oD(s, i[s.value.outlet], t, r.concat([s.value]), o), delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => ws(a, t.getContext(s), o)),
    o
  );
}
function oD(e, n, t, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let i = e.value,
    s = n ? n.value : null,
    a = t ? t.getContext(e.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let c = iD(s, i, i.routeConfig.runGuardsAndResolvers);
    c
      ? o.canActivateChecks.push(new _l(r))
      : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? ms(e, n, a ? a.children : null, r, o) : ms(e, n, t, r, o),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        o.canDeactivateChecks.push(new Uo(a.outlet.component, s));
  } else
    s && ws(n, a, o),
      o.canActivateChecks.push(new _l(r)),
      i.component ? ms(e, null, a ? a.children : null, r, o) : ms(e, null, t, r, o);
  return o;
}
function iD(e, n, t) {
  if (typeof t == 'function') return t(e, n);
  switch (t) {
    case 'pathParamsChange':
      return !Fr(e.url, n.url);
    case 'pathParamsOrQueryParamsChange':
      return !Fr(e.url, n.url) || !Xt(e.queryParams, n.queryParams);
    case 'always':
      return !0;
    case 'paramsOrQueryParamsChange':
      return !eh(e, n) || !Xt(e.queryParams, n.queryParams);
    case 'paramsChange':
    default:
      return !eh(e, n);
  }
}
function ws(e, n, t) {
  let r = Vo(e),
    o = e.value;
  Object.entries(r).forEach(([i, s]) => {
    o.component ? (n ? ws(s, n.children.getContext(i), t) : ws(s, null, t)) : ws(s, n, t);
  }),
    o.component
      ? n && n.outlet && n.outlet.isActivated
        ? t.canDeactivateChecks.push(new Uo(n.outlet.component, o))
        : t.canDeactivateChecks.push(new Uo(null, o))
      : t.canDeactivateChecks.push(new Uo(null, o));
}
function Ts(e) {
  return typeof e == 'function';
}
function sD(e) {
  return typeof e == 'boolean';
}
function aD(e) {
  return e && Ts(e.canLoad);
}
function cD(e) {
  return e && Ts(e.canActivate);
}
function lD(e) {
  return e && Ts(e.canActivateChild);
}
function uD(e) {
  return e && Ts(e.canDeactivate);
}
function dD(e) {
  return e && Ts(e.canMatch);
}
function dy(e) {
  return e instanceof an || e?.name === 'EmptyError';
}
var Jc = Symbol('INITIAL_VALUE');
function Go() {
  return Be((e) =>
    ro(e.map((n) => n.pipe(at(1), ui(Jc)))).pipe(
      S((n) => {
        for (let t of n)
          if (t !== !0) {
            if (t === Jc) return Jc;
            if (t === !1 || fD(t)) return t;
          }
        return !0;
      }),
      Ae((n) => n !== Jc),
      at(1)
    )
  );
}
function fD(e) {
  return ir(e) || e instanceof $o;
}
function pD(e, n) {
  return ve((t) => {
    let {
      targetSnapshot: r,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = t;
    return s.length === 0 && i.length === 0
      ? P(k(w({}, t), { guardsResult: !0 }))
      : hD(s, r, o, e).pipe(
          ve((a) => (a && sD(a) ? gD(r, i, e, n) : P(a))),
          S((a) => k(w({}, t), { guardsResult: a }))
        );
  });
}
function hD(e, n, t, r) {
  return le(e).pipe(
    ve((o) => yD(o.component, o.route, t, n, r)),
    un((o) => o !== !0, !0)
  );
}
function gD(e, n, t, r) {
  return le(n).pipe(
    cn((o) => Ln(vD(o.route.parent, r), mD(o.route, r), wD(e, o.path, t), _D(e, o.route, t))),
    un((o) => o !== !0, !0)
  );
}
function mD(e, n) {
  return e !== null && n && n(new fl(e)), P(!0);
}
function vD(e, n) {
  return e !== null && n && n(new ul(e)), P(!0);
}
function _D(e, n, t) {
  let r = n.routeConfig ? n.routeConfig.canActivate : null;
  if (!r || r.length === 0) return P(!0);
  let o = r.map((i) =>
    ci(() => {
      let s = Wo(n) ?? t,
        a = Zo(i, s),
        c = cD(a) ? a.canActivate(n, e) : ke(s, () => a(n, e));
      return An(c).pipe(un());
    })
  );
  return P(o).pipe(Go());
}
function wD(e, n, t) {
  let r = n[n.length - 1],
    i = n
      .slice(0, n.length - 1)
      .reverse()
      .map((s) => rD(s))
      .filter((s) => s !== null)
      .map((s) =>
        ci(() => {
          let a = s.guards.map((c) => {
            let l = Wo(s.node) ?? t,
              u = Zo(c, l),
              d = lD(u) ? u.canActivateChild(r, e) : ke(l, () => u(r, e));
            return An(d).pipe(un());
          });
          return P(a).pipe(Go());
        })
      );
  return P(i).pipe(Go());
}
function yD(e, n, t, r, o) {
  let i = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return P(!0);
  let s = i.map((a) => {
    let c = Wo(n) ?? o,
      l = Zo(a, c),
      u = uD(l) ? l.canDeactivate(e, n, t, r) : ke(c, () => l(e, n, t, r));
    return An(u).pipe(un());
  });
  return P(s).pipe(Go());
}
function CD(e, n, t, r) {
  let o = n.canLoad;
  if (o === void 0 || o.length === 0) return P(!0);
  let i = o.map((s) => {
    let a = Zo(s, e),
      c = aD(a) ? a.canLoad(n, t) : ke(e, () => a(n, t));
    return An(c);
  });
  return P(i).pipe(Go(), fy(r));
}
function fy(e) {
  return yu(
    fe((n) => {
      if (typeof n != 'boolean') throw vl(e, n);
    }),
    S((n) => n === !0)
  );
}
function bD(e, n, t, r) {
  let o = n.canMatch;
  if (!o || o.length === 0) return P(!0);
  let i = o.map((s) => {
    let a = Zo(s, e),
      c = dD(a) ? a.canMatch(n, t) : ke(e, () => a(n, t));
    return An(c);
  });
  return P(i).pipe(Go(), fy(r));
}
var Es = class {
    segmentGroup;
    constructor(n) {
      this.segmentGroup = n || null;
    }
  },
  Ds = class extends Error {
    urlTree;
    constructor(n) {
      super(), (this.urlTree = n);
    }
  };
function jo(e) {
  return Fn(new Es(e));
}
function MD(e) {
  return Fn(new y(4e3, !1));
}
function xD(e) {
  return Fn(ly(!1, Je.GuardRejected));
}
var rh = class {
  urlSerializer;
  urlTree;
  constructor(n, t) {
    (this.urlSerializer = n), (this.urlTree = t);
  }
  lineralizeSegments(n, t) {
    let r = [],
      o = t.root;
    for (;;) {
      if (((r = r.concat(o.segments)), o.numberOfChildren === 0)) return P(r);
      if (o.numberOfChildren > 1 || !o.children[j]) return MD(`${n.redirectTo}`);
      o = o.children[j];
    }
  }
  applyRedirectCommands(n, t, r, o, i) {
    return OD(t, o, i).pipe(
      S((s) => {
        if (s instanceof tn) throw new Ds(s);
        let a = this.applyRedirectCreateUrlTree(s, this.urlSerializer.parse(s), n, r);
        if (s[0] === '/') throw new Ds(a);
        return a;
      })
    );
  }
  applyRedirectCreateUrlTree(n, t, r, o) {
    let i = this.createSegmentGroup(n, t.root, r, o);
    return new tn(i, this.createQueryParams(t.queryParams, this.urlTree.queryParams), t.fragment);
  }
  createQueryParams(n, t) {
    let r = {};
    return (
      Object.entries(n).forEach(([o, i]) => {
        if (typeof i == 'string' && i[0] === ':') {
          let a = i.substring(1);
          r[o] = t[a];
        } else r[o] = i;
      }),
      r
    );
  }
  createSegmentGroup(n, t, r, o) {
    let i = this.createSegments(n, t.segments, r, o),
      s = {};
    return (
      Object.entries(t.children).forEach(([a, c]) => {
        s[a] = this.createSegmentGroup(n, c, r, o);
      }),
      new G(i, s)
    );
  }
  createSegments(n, t, r, o) {
    return t.map((i) => (i.path[0] === ':' ? this.findPosParam(n, i, o) : this.findOrReturn(i, r)));
  }
  findPosParam(n, t, r) {
    let o = r[t.path.substring(1)];
    if (!o) throw new y(4001, !1);
    return o;
  }
  findOrReturn(n, t) {
    let r = 0;
    for (let o of t) {
      if (o.path === n.path) return t.splice(r), o;
      r++;
    }
    return n;
  }
};
function OD(e, n, t) {
  if (typeof e == 'string') return P(e);
  let r = e,
    {
      queryParams: o,
      fragment: i,
      routeConfig: s,
      url: a,
      outlet: c,
      params: l,
      data: u,
      title: d,
    } = n;
  return An(
    ke(t, () =>
      r({
        params: l,
        data: u,
        queryParams: o,
        fragment: i,
        routeConfig: s,
        url: a,
        outlet: c,
        title: d,
      })
    )
  );
}
var oh = {
  matched: !1,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {},
};
function PD(e, n, t, r, o) {
  let i = py(e, n, t);
  return i.matched
    ? ((r = ZE(n, r)), bD(r, n, t, o).pipe(S((s) => (s === !0 ? i : w({}, oh)))))
    : P(i);
}
function py(e, n, t) {
  if (n.path === '**') return ED(t);
  if (n.path === '')
    return n.pathMatch === 'full' && (e.hasChildren() || t.length > 0)
      ? w({}, oh)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: t,
          parameters: {},
          positionalParamSegments: {},
        };
  let o = (n.matcher || Hw)(t, e, n);
  if (!o) return w({}, oh);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
    i[a] = c.path;
  });
  let s = o.consumed.length > 0 ? w(w({}, i), o.consumed[o.consumed.length - 1].parameters) : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: t.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function ED(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? $w(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Vw(e, n, t, r) {
  return t.length > 0 && SD(e, t, r)
    ? { segmentGroup: new G(n, ID(r, new G(t, e.children))), slicedSegments: [] }
    : t.length === 0 && TD(e, t, r)
    ? { segmentGroup: new G(e.segments, DD(e, t, r, e.children)), slicedSegments: t }
    : { segmentGroup: new G(e.segments, e.children), slicedSegments: t };
}
function DD(e, n, t, r) {
  let o = {};
  for (let i of t)
    if (Cl(e, n, i) && !r[jt(i)]) {
      let s = new G([], {});
      o[jt(i)] = s;
    }
  return w(w({}, r), o);
}
function ID(e, n) {
  let t = {};
  t[j] = n;
  for (let r of e)
    if (r.path === '' && jt(r) !== j) {
      let o = new G([], {});
      t[jt(r)] = o;
    }
  return t;
}
function SD(e, n, t) {
  return t.some((r) => Cl(e, n, r) && jt(r) !== j);
}
function TD(e, n, t) {
  return t.some((r) => Cl(e, n, r));
}
function Cl(e, n, t) {
  return (e.hasChildren() || n.length > 0) && t.pathMatch === 'full' ? !1 : t.path === '';
}
function AD(e, n, t) {
  return n.length === 0 && !e.children[t];
}
var ih = class {};
function ND(e, n, t, r, o, i, s = 'emptyOnly') {
  return new sh(e, n, t, r, o, s, i).recognize();
}
var kD = 31,
  sh = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = !0;
    constructor(n, t, r, o, i, s, a) {
      (this.injector = n),
        (this.configLoader = t),
        (this.rootComponentType = r),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new rh(this.urlSerializer, this.urlTree));
    }
    noMatchError(n) {
      return new y(4002, `'${n.segmentGroup}'`);
    }
    recognize() {
      let n = Vw(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(n).pipe(
        S(({ children: t, rootSnapshot: r }) => {
          let o = new gt(r, t),
            i = new Os('', o),
            s = Xw(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            { state: i, tree: s }
          );
        })
      );
    }
    match(n) {
      let t = new Lr(
        [],
        Object.freeze({}),
        Object.freeze(w({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        j,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, n, j, t).pipe(
        S((r) => ({ children: r, rootSnapshot: t })),
        It((r) => {
          if (r instanceof Ds) return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof Es ? this.noMatchError(r) : r;
        })
      );
    }
    processSegmentGroup(n, t, r, o, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(n, t, r, i)
        : this.processSegment(n, t, r, r.segments, o, !0, i).pipe(
            S((s) => (s instanceof gt ? [s] : []))
          );
    }
    processChildren(n, t, r, o) {
      let i = [];
      for (let s of Object.keys(r.children)) s === 'primary' ? i.unshift(s) : i.push(s);
      return le(i).pipe(
        cn((s) => {
          let a = r.children[s],
            c = YE(t, s);
          return this.processSegmentGroup(n, c, a, s, o);
        }),
        Du((s, a) => (s.push(...a), s)),
        jn(null),
        Eu(),
        ve((s) => {
          if (s === null) return jo(r);
          let a = hy(s);
          return RD(a), P(a);
        })
      );
    }
    processSegment(n, t, r, o, i, s, a) {
      return le(t).pipe(
        cn((c) =>
          this.processSegmentAgainstRoute(c._injector ?? n, t, c, r, o, i, s, a).pipe(
            It((l) => {
              if (l instanceof Es) return P(null);
              throw l;
            })
          )
        ),
        un((c) => !!c),
        It((c) => {
          if (dy(c)) return AD(r, o, i) ? P(new ih()) : jo(r);
          throw c;
        })
      );
    }
    processSegmentAgainstRoute(n, t, r, o, i, s, a, c) {
      return jt(r) !== s && (s === j || !Cl(o, i, r))
        ? jo(o)
        : r.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(n, o, r, i, s, c)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(n, o, t, r, i, s, c)
        : jo(o);
    }
    expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s, a) {
      let {
        matched: c,
        parameters: l,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: h,
      } = py(t, o, i);
      if (!c) return jo(t);
      typeof o.redirectTo == 'string' &&
        o.redirectTo[0] === '/' &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > kD && (this.allowRedirects = !1));
      let f = new Lr(
          i,
          l,
          Object.freeze(w({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          Bw(o),
          jt(o),
          o.component ?? o._loadedComponent ?? null,
          o,
          Uw(o)
        ),
        _ = ml(f, a, this.paramsInheritanceStrategy);
      return (
        (f.params = Object.freeze(_.params)),
        (f.data = Object.freeze(_.data)),
        this.applyRedirects.applyRedirectCommands(u, o.redirectTo, d, f, n).pipe(
          Be((M) => this.applyRedirects.lineralizeSegments(o, M)),
          ve((M) => this.processSegment(n, r, t, M.concat(h), s, !1, a))
        )
      );
    }
    matchSegmentAgainstRoute(n, t, r, o, i, s) {
      let a = PD(t, r, o, n, this.urlSerializer);
      return (
        r.path === '**' && (t.children = {}),
        a.pipe(
          Be((c) =>
            c.matched
              ? ((n = r._injector ?? n),
                this.getChildConfig(n, r, o).pipe(
                  Be(({ routes: l }) => {
                    let u = r._loadedInjector ?? n,
                      { parameters: d, consumedSegments: h, remainingSegments: f } = c,
                      _ = new Lr(
                        h,
                        d,
                        Object.freeze(w({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        Bw(r),
                        jt(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        Uw(r)
                      ),
                      O = ml(_, s, this.paramsInheritanceStrategy);
                    (_.params = Object.freeze(O.params)), (_.data = Object.freeze(O.data));
                    let { segmentGroup: M, slicedSegments: b } = Vw(t, h, f, l);
                    if (b.length === 0 && M.hasChildren())
                      return this.processChildren(u, l, M, _).pipe(S((Et) => new gt(_, Et)));
                    if (l.length === 0 && b.length === 0) return P(new gt(_, []));
                    let ne = jt(r) === i;
                    return this.processSegment(u, l, M, b, ne ? j : i, !0, _).pipe(
                      S((Et) => new gt(_, Et instanceof gt ? [Et] : []))
                    );
                  })
                ))
              : jo(t)
          )
        )
      );
    }
    getChildConfig(n, t, r) {
      return t.children
        ? P({ routes: t.children, injector: n })
        : t.loadChildren
        ? t._loadedRoutes !== void 0
          ? P({ routes: t._loadedRoutes, injector: t._loadedInjector })
          : CD(n, t, r, this.urlSerializer).pipe(
              ve((o) =>
                o
                  ? this.configLoader.loadChildren(n, t).pipe(
                      fe((i) => {
                        (t._loadedRoutes = i.routes), (t._loadedInjector = i.injector);
                      })
                    )
                  : xD(t)
              )
            )
        : P({ routes: [], injector: n });
    }
  };
function RD(e) {
  e.sort((n, t) =>
    n.value.outlet === j
      ? -1
      : t.value.outlet === j
      ? 1
      : n.value.outlet.localeCompare(t.value.outlet)
  );
}
function FD(e) {
  let n = e.value.routeConfig;
  return n && n.path === '';
}
function hy(e) {
  let n = [],
    t = new Set();
  for (let r of e) {
    if (!FD(r)) {
      n.push(r);
      continue;
    }
    let o = n.find((i) => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), t.add(o)) : n.push(r);
  }
  for (let r of t) {
    let o = hy(r.children);
    n.push(new gt(r.value, o));
  }
  return n.filter((r) => !t.has(r));
}
function Bw(e) {
  return e.data || {};
}
function Uw(e) {
  return e.resolve || {};
}
function LD(e, n, t, r, o, i) {
  return ve((s) =>
    ND(e, n, t, r, s.extractedUrl, o, i).pipe(
      S(({ state: a, tree: c }) => k(w({}, s), { targetSnapshot: a, urlAfterRedirects: c }))
    )
  );
}
function jD(e, n) {
  return ve((t) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: o },
    } = t;
    if (!o.length) return P(t);
    let i = new Set(o.map((c) => c.route)),
      s = new Set();
    for (let c of i) if (!s.has(c)) for (let l of gy(c)) s.add(l);
    let a = 0;
    return le(s).pipe(
      cn((c) => (i.has(c) ? VD(c, r, e, n) : ((c.data = ml(c, c.parent, e).resolve), P(void 0)))),
      fe(() => a++),
      io(1),
      ve((c) => (a === s.size ? P(t) : et))
    );
  });
}
function gy(e) {
  let n = e.children.map((t) => gy(t)).flat();
  return [e, ...n];
}
function VD(e, n, t, r) {
  let o = e.routeConfig,
    i = e._resolve;
  return (
    o?.title !== void 0 && !sy(o) && (i[Is] = o.title),
    ci(
      () => (
        (e.data = ml(e, e.parent, t).resolve),
        BD(i, e, n, r).pipe(S((s) => ((e._resolvedData = s), (e.data = w(w({}, e.data), s)), null)))
      )
    )
  );
}
function BD(e, n, t, r) {
  let o = Zp(e);
  if (o.length === 0) return P({});
  let i = {};
  return le(o).pipe(
    ve((s) =>
      UD(e[s], n, t, r).pipe(
        un(),
        fe((a) => {
          if (a instanceof $o) throw vl(new Vr(), a);
          i[s] = a;
        })
      )
    ),
    io(1),
    S(() => i),
    It((s) => (dy(s) ? et : Fn(s)))
  );
}
function UD(e, n, t, r) {
  let o = Wo(n) ?? r,
    i = Zo(e, o),
    s = i.resolve ? i.resolve(n, t) : ke(o, () => i(n, t));
  return An(s);
}
function Wp(e) {
  return Be((n) => {
    let t = e(n);
    return t ? le(t).pipe(S(() => n)) : P(n);
  });
}
var uh = (() => {
    class e {
      buildTitle(t) {
        let r,
          o = t.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r), (o = o.children.find((i) => i.outlet === j));
        return r;
      }
      getResolvedTitleForRoute(t) {
        return t.data[Is];
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => p(my), providedIn: 'root' });
    }
    return e;
  })(),
  my = (() => {
    class e extends uh {
      title;
      constructor(t) {
        super(), (this.title = t);
      }
      updateTitle(t) {
        let r = this.buildTitle(t);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(E(Nw));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Yo = new C('', { providedIn: 'root', factory: () => ({}) }),
  As = new C(''),
  vy = (() => {
    class e {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = p(_p);
      loadComponent(t, r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return P(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let o = An(ke(t, () => r.loadComponent())).pipe(
            S(wy),
            Be(yy),
            fe((s) => {
              this.onLoadEndListener && this.onLoadEndListener(r), (r._loadedComponent = s);
            }),
            ln(() => {
              this.componentLoaders.delete(r);
            })
          ),
          i = new to(o, () => new re()).pipe(eo());
        return this.componentLoaders.set(r, i), i;
      }
      loadChildren(t, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes) return P({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = _y(r, this.compiler, t, this.onLoadEndListener).pipe(
            ln(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new to(i, () => new re()).pipe(eo());
        return this.childrenLoaders.set(r, s), s;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function _y(e, n, t, r) {
  return An(ke(t, () => e.loadChildren())).pipe(
    S(wy),
    Be(yy),
    ve((o) => (o instanceof Tc || Array.isArray(o) ? P(o) : le(n.compileModuleAsync(o)))),
    S((o) => {
      r && r(e);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(t).injector), (s = i.get(As, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(lh), injector: i }
      );
    })
  );
}
function HD(e) {
  return e && typeof e == 'object' && 'default' in e;
}
function wy(e) {
  return HD(e) ? e.default : e;
}
function yy(e) {
  return P(e);
}
var bl = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => p(zD), providedIn: 'root' });
    }
    return e;
  })(),
  zD = (() => {
    class e {
      shouldProcessUrl(t) {
        return !0;
      }
      extract(t) {
        return t;
      }
      merge(t, r) {
        return t;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Cy = new C('');
var by = new C(''),
  My = (() => {
    class e {
      currentNavigation = dt(null, { equal: () => !1 });
      currentTransition = null;
      lastSuccessfulNavigation = null;
      events = new re();
      transitionAbortWithErrorSubject = new re();
      configLoader = p(vy);
      environmentInjector = p(_e);
      destroyRef = p(gn);
      urlSerializer = p(Ss);
      rootContexts = p(qo);
      location = p(Ao);
      inputBindingEnabled = p(yl, { optional: !0 }) !== null;
      titleStrategy = p(uh);
      options = p(Yo, { optional: !0 }) || {};
      paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly';
      urlHandlingStrategy = p(bl);
      createViewTransition = p(Cy, { optional: !0 });
      navigationErrorHandler = p(by, { optional: !0 });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => P(void 0);
      rootComponentType = null;
      destroyed = !1;
      constructor() {
        let t = (o) => this.events.next(new cl(o)),
          r = (o) => this.events.next(new ll(o));
        (this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = t),
          this.destroyRef.onDestroy(() => {
            this.destroyed = !0;
          });
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(t) {
        let r = ++this.navigationId;
        De(() => {
          this.transitions?.next(
            k(w({}, t), {
              extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
              targetSnapshot: null,
              targetRouterState: null,
              guards: { canActivateChecks: [], canDeactivateChecks: [] },
              guardsResult: null,
              abortController: new AbortController(),
              id: r,
            })
          );
        });
      }
      setupNavigations(t) {
        return (
          (this.transitions = new Te(null)),
          this.transitions.pipe(
            Ae((r) => r !== null),
            Be((r) => {
              let o = !1;
              return P(r).pipe(
                Be((i) => {
                  if (this.navigationId > r.id)
                    return this.cancelNavigationTransition(r, '', Je.SupersededByNewNavigation), et;
                  (this.currentTransition = r),
                    this.currentNavigation.set({
                      id: i.id,
                      initialUrl: i.rawUrl,
                      extractedUrl: i.extractedUrl,
                      targetBrowserUrl:
                        typeof i.extras.browserUrl == 'string'
                          ? this.urlSerializer.parse(i.extras.browserUrl)
                          : i.extras.browserUrl,
                      trigger: i.source,
                      extras: i.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? k(w({}, this.lastSuccessfulNavigation), { previousNavigation: null })
                        : null,
                      abort: () => i.abortController.abort(),
                    });
                  let s =
                      !t.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
                    a = i.extras.onSameUrlNavigation ?? t.onSameUrlNavigation;
                  if (!s && a !== 'reload')
                    return (
                      this.events.next(
                        new Tn(
                          i.id,
                          this.urlSerializer.serialize(i.rawUrl),
                          '',
                          Cs.IgnoredSameUrlNavigation
                        )
                      ),
                      i.resolve(!1),
                      et
                    );
                  if (this.urlHandlingStrategy.shouldProcessUrl(i.rawUrl))
                    return P(i).pipe(
                      Be(
                        (c) => (
                          this.events.next(
                            new Br(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              c.source,
                              c.restoredState
                            )
                          ),
                          c.id !== this.navigationId ? et : Promise.resolve(c)
                        )
                      ),
                      LD(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        t.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      fe((c) => {
                        (r.targetSnapshot = c.targetSnapshot),
                          (r.urlAfterRedirects = c.urlAfterRedirects),
                          this.currentNavigation.update(
                            (u) => ((u.finalUrl = c.urlAfterRedirects), u)
                          );
                        let l = new bs(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(l);
                      })
                    );
                  if (s && this.urlHandlingStrategy.shouldProcessUrl(i.currentRawUrl)) {
                    let { id: c, extractedUrl: l, source: u, restoredState: d, extras: h } = i,
                      f = new Br(c, this.urlSerializer.serialize(l), u, d);
                    this.events.next(f);
                    let _ = oy(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = r =
                        k(w({}, i), {
                          targetSnapshot: _,
                          urlAfterRedirects: l,
                          extras: k(w({}, h), { skipLocationChange: !1, replaceUrl: !1 }),
                        })),
                      this.currentNavigation.update((O) => ((O.finalUrl = l), O)),
                      P(r)
                    );
                  } else
                    return (
                      this.events.next(
                        new Tn(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          '',
                          Cs.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      i.resolve(!1),
                      et
                    );
                }),
                fe((i) => {
                  let s = new ol(
                    i.id,
                    this.urlSerializer.serialize(i.extractedUrl),
                    this.urlSerializer.serialize(i.urlAfterRedirects),
                    i.targetSnapshot
                  );
                  this.events.next(s);
                }),
                S(
                  (i) => (
                    (this.currentTransition = r =
                      k(w({}, i), {
                        guards: nD(i.targetSnapshot, i.currentSnapshot, this.rootContexts),
                      })),
                    r
                  )
                ),
                pD(this.environmentInjector, (i) => this.events.next(i)),
                fe((i) => {
                  if (
                    ((r.guardsResult = i.guardsResult),
                    i.guardsResult && typeof i.guardsResult != 'boolean')
                  )
                    throw vl(this.urlSerializer, i.guardsResult);
                  let s = new il(
                    i.id,
                    this.urlSerializer.serialize(i.extractedUrl),
                    this.urlSerializer.serialize(i.urlAfterRedirects),
                    i.targetSnapshot,
                    !!i.guardsResult
                  );
                  this.events.next(s);
                }),
                Ae((i) =>
                  i.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(i, '', Je.GuardRejected), !1)
                ),
                Wp((i) => {
                  if (i.guards.canActivateChecks.length !== 0)
                    return P(i).pipe(
                      fe((s) => {
                        let a = new sl(
                          s.id,
                          this.urlSerializer.serialize(s.extractedUrl),
                          this.urlSerializer.serialize(s.urlAfterRedirects),
                          s.targetSnapshot
                        );
                        this.events.next(a);
                      }),
                      Be((s) => {
                        let a = !1;
                        return P(s).pipe(
                          jD(this.paramsInheritanceStrategy, this.environmentInjector),
                          fe({
                            next: () => (a = !0),
                            complete: () => {
                              a || this.cancelNavigationTransition(s, '', Je.NoDataFromResolver);
                            },
                          })
                        );
                      }),
                      fe((s) => {
                        let a = new al(
                          s.id,
                          this.urlSerializer.serialize(s.extractedUrl),
                          this.urlSerializer.serialize(s.urlAfterRedirects),
                          s.targetSnapshot
                        );
                        this.events.next(a);
                      })
                    );
                }),
                Wp((i) => {
                  let s = (a) => {
                    let c = [];
                    if (a.routeConfig?.loadComponent) {
                      let l = Wo(a) ?? this.environmentInjector;
                      c.push(
                        this.configLoader.loadComponent(l, a.routeConfig).pipe(
                          fe((u) => {
                            a.component = u;
                          }),
                          S(() => {})
                        )
                      );
                    }
                    for (let l of a.children) c.push(...s(l));
                    return c;
                  };
                  return ro(s(i.targetSnapshot.root)).pipe(jn(null), at(1));
                }),
                Wp(() => this.afterPreactivation()),
                Be(() => {
                  let { currentSnapshot: i, targetSnapshot: s } = r,
                    a = this.createViewTransition?.(this.environmentInjector, i.root, s.root);
                  return a ? le(a).pipe(S(() => r)) : P(r);
                }),
                S((i) => {
                  let s = QE(t.routeReuseStrategy, i.targetSnapshot, i.currentRouterState);
                  return (
                    (this.currentTransition = r = k(w({}, i), { targetRouterState: s })),
                    this.currentNavigation.update((a) => ((a.targetRouterState = s), a)),
                    r
                  );
                }),
                fe(() => {
                  this.events.next(new Ms());
                }),
                tD(
                  this.rootContexts,
                  t.routeReuseStrategy,
                  (i) => this.events.next(i),
                  this.inputBindingEnabled
                ),
                at(1),
                so(
                  new V((i) => {
                    let s = r.abortController.signal,
                      a = () => i.next();
                    return s.addEventListener('abort', a), () => s.removeEventListener('abort', a);
                  }).pipe(
                    Ae(() => !o && !r.targetRouterState),
                    fe(() => {
                      this.cancelNavigationTransition(
                        r,
                        r.abortController.signal.reason + '',
                        Je.Aborted
                      );
                    })
                  )
                ),
                fe({
                  next: (i) => {
                    (o = !0),
                      (this.lastSuccessfulNavigation = De(this.currentNavigation)),
                      this.events.next(
                        new Vt(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          this.urlSerializer.serialize(i.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(i.targetRouterState.snapshot),
                      i.resolve(!0);
                  },
                  complete: () => {
                    o = !0;
                  },
                }),
                so(
                  this.transitionAbortWithErrorSubject.pipe(
                    fe((i) => {
                      throw i;
                    })
                  )
                ),
                ln(() => {
                  o || this.cancelNavigationTransition(r, '', Je.SupersededByNewNavigation),
                    this.currentTransition?.id === r.id &&
                      (this.currentNavigation.set(null), (this.currentTransition = null));
                }),
                It((i) => {
                  if (this.destroyed) return r.resolve(!1), et;
                  if (((o = !0), uy(i)))
                    this.events.next(
                      new en(
                        r.id,
                        this.urlSerializer.serialize(r.extractedUrl),
                        i.message,
                        i.cancellationCode
                      )
                    ),
                      eD(i)
                        ? this.events.next(new zo(i.url, i.navigationBehaviorOptions))
                        : r.resolve(!1);
                  else {
                    let s = new Ho(
                      r.id,
                      this.urlSerializer.serialize(r.extractedUrl),
                      i,
                      r.targetSnapshot ?? void 0
                    );
                    try {
                      let a = ke(this.environmentInjector, () => this.navigationErrorHandler?.(s));
                      if (a instanceof $o) {
                        let { message: c, cancellationCode: l } = vl(this.urlSerializer, a);
                        this.events.next(
                          new en(r.id, this.urlSerializer.serialize(r.extractedUrl), c, l)
                        ),
                          this.events.next(new zo(a.redirectTo, a.navigationBehaviorOptions));
                      } else throw (this.events.next(s), i);
                    } catch (a) {
                      this.options.resolveNavigationPromiseOnError ? r.resolve(!1) : r.reject(a);
                    }
                  }
                  return et;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(t, r, o) {
        let i = new en(t.id, this.urlSerializer.serialize(t.extractedUrl), r, o);
        this.events.next(i), t.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let t = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),
          r = De(this.currentNavigation),
          o = r?.targetBrowserUrl ?? r?.extractedUrl;
        return t.toString() !== o?.toString() && !r?.extras.skipLocationChange;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function $D(e) {
  return e !== _s;
}
var xy = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => p(GD), providedIn: 'root' });
    }
    return e;
  })(),
  wl = class {
    shouldDetach(n) {
      return !1;
    }
    store(n, t) {}
    shouldAttach(n) {
      return !1;
    }
    retrieve(n) {
      return null;
    }
    shouldReuseRoute(n, t) {
      return n.routeConfig === t.routeConfig;
    }
  },
  GD = (() => {
    class e extends wl {
      static ɵfac = (() => {
        let t;
        return function (o) {
          return (t || (t = _n(e)))(o || e);
        };
      })();
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Oy = (() => {
    class e {
      urlSerializer = p(Ss);
      options = p(Yo, { optional: !0 }) || {};
      canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace';
      location = p(Ao);
      urlHandlingStrategy = p(bl);
      urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
      currentUrlTree = new tn();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      createBrowserPath({ finalUrl: t, initialUrl: r, targetBrowserUrl: o }) {
        let i = t !== void 0 ? this.urlHandlingStrategy.merge(t, r) : r,
          s = o ?? i;
        return s instanceof tn ? this.urlSerializer.serialize(s) : s;
      }
      commitTransition({ targetRouterState: t, finalUrl: r, initialUrl: o }) {
        r && t
          ? ((this.currentUrlTree = r),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(r, o)),
            (this.routerState = t))
          : (this.rawUrlTree = o);
      }
      routerState = oy(null);
      getRouterState() {
        return this.routerState;
      }
      stateMemento = this.createStateMemento();
      updateStateMemento() {
        this.stateMemento = this.createStateMemento();
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      resetInternalState({ finalUrl: t }) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            t ?? this.rawUrlTree
          ));
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: () => p(WD), providedIn: 'root' });
    }
    return e;
  })(),
  WD = (() => {
    class e extends Oy {
      currentPageId = 0;
      lastSuccessfulId = -1;
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== 'computed'
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      registerNonRouterCurrentEntryChangeListener(t) {
        return this.location.subscribe((r) => {
          r.type === 'popstate' &&
            setTimeout(() => {
              t(r.url, r.state, 'popstate');
            });
        });
      }
      handleRouterEvent(t, r) {
        t instanceof Br
          ? this.updateStateMemento()
          : t instanceof Tn
          ? this.commitTransition(r)
          : t instanceof bs
          ? this.urlUpdateStrategy === 'eager' &&
            (r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r))
          : t instanceof Ms
          ? (this.commitTransition(r),
            this.urlUpdateStrategy === 'deferred' &&
              !r.extras.skipLocationChange &&
              this.setBrowserUrl(this.createBrowserPath(r), r))
          : t instanceof en && t.code !== Je.SupersededByNewNavigation && t.code !== Je.Redirect
          ? this.restoreHistory(r)
          : t instanceof Ho
          ? this.restoreHistory(r, !0)
          : t instanceof Vt &&
            ((this.lastSuccessfulId = t.id), (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(t, { extras: r, id: o }) {
        let { replaceUrl: i, state: s } = r;
        if (this.location.isCurrentPathEqualTo(t) || i) {
          let a = this.browserPageId,
            c = w(w({}, s), this.generateNgRouterState(o, a));
          this.location.replaceState(t, '', c);
        } else {
          let a = w(w({}, s), this.generateNgRouterState(o, this.browserPageId + 1));
          this.location.go(t, '', a);
        }
      }
      restoreHistory(t, r = !1) {
        if (this.canceledNavigationResolution === 'computed') {
          let o = this.browserPageId,
            i = this.currentPageId - o;
          i !== 0
            ? this.location.historyGo(i)
            : this.getCurrentUrlTree() === t.finalUrl &&
              i === 0 &&
              (this.resetInternalState(t), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === 'replace' &&
            (r && this.resetInternalState(t), this.resetUrlToCurrentUrlTree());
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.getRawUrlTree()),
          '',
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(t, r) {
        return this.canceledNavigationResolution === 'computed'
          ? { navigationId: t, ɵrouterPageId: r }
          : { navigationId: t };
      }
      static ɵfac = (() => {
        let t;
        return function (o) {
          return (t || (t = _n(e)))(o || e);
        };
      })();
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function dh(e, n) {
  e.events
    .pipe(
      Ae((t) => t instanceof Vt || t instanceof en || t instanceof Ho || t instanceof Tn),
      S((t) =>
        t instanceof Vt || t instanceof Tn
          ? 0
          : (
              t instanceof en
                ? t.code === Je.Redirect || t.code === Je.SupersededByNewNavigation
                : !1
            )
          ? 2
          : 1
      ),
      Ae((t) => t !== 2),
      at(1)
    )
    .subscribe(() => {
      n();
    });
}
var qD = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
  ZD = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' },
  Se = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = !1;
      nonRouterCurrentEntryChangeSubscription;
      console = p(Ac);
      stateManager = p(Oy);
      options = p(Yo, { optional: !0 }) || {};
      pendingTasks = p(Zt);
      urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
      navigationTransitions = p(My);
      urlSerializer = p(Ss);
      location = p(Ao);
      urlHandlingStrategy = p(bl);
      injector = p(_e);
      _events = new re();
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      navigated = !1;
      routeReuseStrategy = p(xy);
      onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore';
      config = p(As, { optional: !0 })?.flat() ?? [];
      componentInputBindingEnabled = !!p(yl, { optional: !0 });
      currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
      constructor() {
        this.resetConfig(this.config),
          this.navigationTransitions.setupNavigations(this).subscribe({
            error: (t) => {
              this.console.warn(t);
            },
          }),
          this.subscribeToNavigationEvents();
      }
      eventsSubscription = new ie();
      subscribeToNavigationEvents() {
        let t = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              i = De(this.navigationTransitions.currentNavigation);
            if (o !== null && i !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, i),
                r instanceof en &&
                  r.code !== Je.Redirect &&
                  r.code !== Je.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof Vt) this.navigated = !0;
              else if (r instanceof zo) {
                let s = r.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = w(
                    {
                      browserUrl: o.extras.browserUrl,
                      info: o.extras.info,
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        o.extras.replaceUrl || this.urlUpdateStrategy === 'eager' || $D(o.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, _s, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            qE(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortWithErrorSubject.next(o);
          }
        });
        this.eventsSubscription.add(t);
      }
      resetRootComponentType(t) {
        (this.routerState.root.component = t), (this.navigationTransitions.rootComponentType = t);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              _s,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener((t, r, o) => {
            this.navigateToSyncWithBrowser(t, o, r);
          });
      }
      navigateToSyncWithBrowser(t, r, o) {
        let i = { replaceUrl: !0 },
          s = o?.navigationId ? o : null;
        if (o) {
          let c = w({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (i.state = c);
        }
        let a = this.parseUrl(t);
        this.scheduleNavigation(a, r, s, i).catch((c) => {
          this.disposed || this.injector.get(Ye)(c);
        });
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return De(this.navigationTransitions.currentNavigation);
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(t) {
        (this.config = t.map(lh)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this._events.unsubscribe(),
          this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(t, r = {}) {
        let {
            relativeTo: o,
            queryParams: i,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: c,
          } = r,
          l = c ? this.currentUrlTree.fragment : s,
          u = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case 'merge':
            u = w(w({}, this.currentUrlTree.queryParams), i);
            break;
          case 'preserve':
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = i || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let d;
        try {
          let h = o ? o.snapshot : this.routerState.snapshot.root;
          d = ey(h);
        } catch {
          (typeof t[0] != 'string' || t[0][0] !== '/') && (t = []), (d = this.currentUrlTree.root);
        }
        return ty(d, t, u, l ?? null);
      }
      navigateByUrl(t, r = { skipLocationChange: !1 }) {
        let o = ir(t) ? t : this.parseUrl(t),
          i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(i, _s, null, r);
      }
      navigate(t, r = { skipLocationChange: !1 }) {
        return YD(t), this.navigateByUrl(this.createUrlTree(t, r), r);
      }
      serializeUrl(t) {
        return this.urlSerializer.serialize(t);
      }
      parseUrl(t) {
        try {
          return this.urlSerializer.parse(t);
        } catch {
          return this.urlSerializer.parse('/');
        }
      }
      isActive(t, r) {
        let o;
        if ((r === !0 ? (o = w({}, qD)) : r === !1 ? (o = w({}, ZD)) : (o = r), ir(t)))
          return Rw(this.currentUrlTree, t, o);
        let i = this.parseUrl(t);
        return Rw(this.currentUrlTree, i, o);
      }
      removeEmptyProps(t) {
        return Object.entries(t).reduce((r, [o, i]) => (i != null && (r[o] = i), r), {});
      }
      scheduleNavigation(t, r, o, i, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, c, l;
        s
          ? ((a = s.resolve), (c = s.reject), (l = s.promise))
          : (l = new Promise((d, h) => {
              (a = d), (c = h);
            }));
        let u = this.pendingTasks.add();
        return (
          dh(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: t,
            extras: i,
            resolve: a,
            reject: c,
            promise: l,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          l.catch((d) => Promise.reject(d))
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function YD(e) {
  for (let n = 0; n < e.length; n++) if (e[n] == null) throw new y(4008, !1);
}
var it = (() => {
    class e {
      router;
      route;
      tabIndexAttribute;
      renderer;
      el;
      locationStrategy;
      reactiveHref = dt(null);
      get href() {
        return De(this.reactiveHref);
      }
      set href(t) {
        this.reactiveHref.set(t);
      }
      target;
      queryParams;
      fragment;
      queryParamsHandling;
      state;
      info;
      relativeTo;
      isAnchorElement;
      subscription;
      onChanges = new re();
      applicationErrorHandler = p(Ye);
      options = p(Yo, { optional: !0 });
      constructor(t, r, o, i, s, a) {
        (this.router = t),
          (this.route = r),
          (this.tabIndexAttribute = o),
          (this.renderer = i),
          (this.el = s),
          (this.locationStrategy = a),
          this.reactiveHref.set(p(new So('href'), { optional: !0 }));
        let c = s.nativeElement.tagName?.toLowerCase();
        (this.isAnchorElement =
          c === 'a' ||
          c === 'area' ||
          !!(
            typeof customElements == 'object' &&
            customElements.get(c)?.observedAttributes?.includes?.('href')
          )),
          this.isAnchorElement
            ? this.setTabIndexIfNotOnNativeEl('0')
            : this.subscribeToNavigationEventsIfNecessary();
      }
      subscribeToNavigationEventsIfNecessary() {
        if (this.subscription !== void 0 || !this.isAnchorElement) return;
        let t = this.preserveFragment,
          r = (o) => o === 'merge' || o === 'preserve';
        (t ||= r(this.queryParamsHandling)),
          (t ||= !this.queryParamsHandling && !r(this.options?.defaultQueryParamsHandling)),
          t &&
            (this.subscription = this.router.events.subscribe((o) => {
              o instanceof Vt && this.updateHref();
            }));
      }
      preserveFragment = !1;
      skipLocationChange = !1;
      replaceUrl = !1;
      setTabIndexIfNotOnNativeEl(t) {
        this.tabIndexAttribute != null ||
          this.isAnchorElement ||
          this.applyAttributeValue('tabindex', t);
      }
      ngOnChanges(t) {
        this.isAnchorElement && (this.updateHref(), this.subscribeToNavigationEventsIfNecessary()),
          this.onChanges.next(this);
      }
      routerLinkInput = null;
      set routerLink(t) {
        t == null
          ? ((this.routerLinkInput = null), this.setTabIndexIfNotOnNativeEl(null))
          : (ir(t)
              ? (this.routerLinkInput = t)
              : (this.routerLinkInput = Array.isArray(t) ? t : [t]),
            this.setTabIndexIfNotOnNativeEl('0'));
      }
      onClick(t, r, o, i, s) {
        let a = this.urlTree;
        if (
          a === null ||
          (this.isAnchorElement &&
            (t !== 0 ||
              r ||
              o ||
              i ||
              s ||
              (typeof this.target == 'string' && this.target != '_self')))
        )
          return !0;
        let c = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
          info: this.info,
        };
        return (
          this.router.navigateByUrl(a, c)?.catch((l) => {
            this.applicationErrorHandler(l);
          }),
          !this.isAnchorElement
        );
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      updateHref() {
        let t = this.urlTree;
        this.reactiveHref.set(
          t !== null && this.locationStrategy
            ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(t)) ?? ''
            : null
        );
      }
      applyAttributeValue(t, r) {
        let o = this.renderer,
          i = this.el.nativeElement;
        r !== null ? o.setAttribute(i, t, r) : o.removeAttribute(i, t);
      }
      get urlTree() {
        return this.routerLinkInput === null
          ? null
          : ir(this.routerLinkInput)
          ? this.routerLinkInput
          : this.router.createUrlTree(this.routerLinkInput, {
              relativeTo: this.relativeTo !== void 0 ? this.relativeTo : this.route,
              queryParams: this.queryParams,
              fragment: this.fragment,
              queryParamsHandling: this.queryParamsHandling,
              preserveFragment: this.preserveFragment,
            });
      }
      static ɵfac = function (r) {
        return new (r || e)(T(Se), T(Xe), ji('tabindex'), T(Qn), T(Ke), T(To));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'routerLink', '']],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 1 &&
            Y('click', function (s) {
              return o.onClick(s.button, s.ctrlKey, s.shiftKey, s.altKey, s.metaKey);
            }),
            r & 2 && Mn('href', o.reactiveHref(), zf)('target', o.target);
        },
        inputs: {
          target: 'target',
          queryParams: 'queryParams',
          fragment: 'fragment',
          queryParamsHandling: 'queryParamsHandling',
          state: 'state',
          info: 'info',
          relativeTo: 'relativeTo',
          preserveFragment: [2, 'preserveFragment', 'preserveFragment', Jt],
          skipLocationChange: [2, 'skipLocationChange', 'skipLocationChange', Jt],
          replaceUrl: [2, 'replaceUrl', 'replaceUrl', Jt],
          routerLink: 'routerLink',
        },
        features: [ft],
      });
    }
    return e;
  })(),
  fh = (() => {
    class e {
      router;
      element;
      renderer;
      cdr;
      link;
      links;
      classes = [];
      routerEventsSubscription;
      linkInputChangesSubscription;
      _isActive = !1;
      get isActive() {
        return this._isActive;
      }
      routerLinkActiveOptions = { exact: !1 };
      ariaCurrentWhenActive;
      isActiveChange = new se();
      constructor(t, r, o, i, s) {
        (this.router = t),
          (this.element = r),
          (this.renderer = o),
          (this.cdr = i),
          (this.link = s),
          (this.routerEventsSubscription = t.events.subscribe((a) => {
            a instanceof Vt && this.update();
          }));
      }
      ngAfterContentInit() {
        P(this.links.changes, P(null))
          .pipe(oo())
          .subscribe((t) => {
            this.update(), this.subscribeToEachLinkOnChanges();
          });
      }
      subscribeToEachLinkOnChanges() {
        this.linkInputChangesSubscription?.unsubscribe();
        let t = [...this.links.toArray(), this.link].filter((r) => !!r).map((r) => r.onChanges);
        this.linkInputChangesSubscription = le(t)
          .pipe(oo())
          .subscribe((r) => {
            this._isActive !== this.isLinkActive(this.router)(r) && this.update();
          });
      }
      set routerLinkActive(t) {
        let r = Array.isArray(t) ? t : t.split(' ');
        this.classes = r.filter((o) => !!o);
      }
      ngOnChanges(t) {
        this.update();
      }
      ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe(),
          this.linkInputChangesSubscription?.unsubscribe();
      }
      update() {
        !this.links ||
          !this.router.navigated ||
          queueMicrotask(() => {
            let t = this.hasActiveLinks();
            this.classes.forEach((r) => {
              t
                ? this.renderer.addClass(this.element.nativeElement, r)
                : this.renderer.removeClass(this.element.nativeElement, r);
            }),
              t && this.ariaCurrentWhenActive !== void 0
                ? this.renderer.setAttribute(
                    this.element.nativeElement,
                    'aria-current',
                    this.ariaCurrentWhenActive.toString()
                  )
                : this.renderer.removeAttribute(this.element.nativeElement, 'aria-current'),
              this._isActive !== t &&
                ((this._isActive = t), this.cdr.markForCheck(), this.isActiveChange.emit(t));
          });
      }
      isLinkActive(t) {
        let r = QD(this.routerLinkActiveOptions)
          ? this.routerLinkActiveOptions
          : this.routerLinkActiveOptions.exact || !1;
        return (o) => {
          let i = o.urlTree;
          return i ? t.isActive(i, r) : !1;
        };
      }
      hasActiveLinks() {
        let t = this.isLinkActive(this.router);
        return (this.link && t(this.link)) || this.links.some(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(Se), T(Ke), T(Qn), T(me), T(it, 8));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'routerLinkActive', '']],
        contentQueries: function (r, o, i) {
          if ((r & 1 && fp(i, it, 5), r & 2)) {
            let s;
            pp((s = hp())) && (o.links = s);
          }
        },
        inputs: {
          routerLinkActiveOptions: 'routerLinkActiveOptions',
          ariaCurrentWhenActive: 'ariaCurrentWhenActive',
          routerLinkActive: 'routerLinkActive',
        },
        outputs: { isActiveChange: 'isActiveChange' },
        exportAs: ['routerLinkActive'],
        features: [ft],
      });
    }
    return e;
  })();
function QD(e) {
  return !!e.paths;
}
var JD = new C('');
function ph(e, ...n) {
  return Ht([
    { provide: As, multi: !0, useValue: e },
    [],
    { provide: Xe, useFactory: XD, deps: [Se] },
    { provide: Nc, multi: !0, useFactory: eI },
    n.map((t) => t.ɵproviders),
  ]);
}
function XD(e) {
  return e.routerState.root;
}
function eI() {
  let e = p(ct);
  return (n) => {
    let t = e.get(bn);
    if (n !== t.components[0]) return;
    let r = e.get(Se),
      o = e.get(tI);
    e.get(nI) === 1 && r.initialNavigation(),
      e.get(rI, null, { optional: !0 })?.setUpPreloading(),
      e.get(JD, null, { optional: !0 })?.init(),
      r.resetRootComponentType(t.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var tI = new C('', { factory: () => new re() }),
  nI = new C('', { providedIn: 'root', factory: () => 1 });
var rI = new C('');
var Ml = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-section']],
    decls: 20,
    vars: 0,
    consts: [
      [1, 'flex', 'flex-col', 'items-center', 'p-3', 'gap-4'],
      [1, 'tracking-wide', 'leading-9'],
      [1, ''],
      [1, 'text-[#447794]'],
      ['span', '', 1, 'text-[#447794]'],
      [1, 'tracking-wide'],
      [1, 'text-[10px]'],
      ['routerLink', '/destination', 1, 'text-white', 'bg-[#15445f]'],
      [1, 'w-[80%]', 'h-[40%]'],
      ['src', '/P4.jpg', 'alt', '', 1, 'w-full', 'h-[300px]', 'rounded-2xl'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'section', 0)(1, 'div', 1)(2, 'p', 2),
        m(3, 'Planifiez vos '),
        v(4, 'span', 3),
        m(5, 'aventure'),
        g(),
        m(6, ' et'),
        g(),
        v(7, 'p', 2)(8, 'span', 4),
        m(9, 'D\xE9couvrez'),
        g(),
        m(10, ' la monde de Tunisie'),
        g()(),
        v(11, 'div', 5)(12, 'p', 6),
        m(
          13,
          'nous vous aiderons \xE0 trouver la destination de vos r\xEAves, nous vous recommanderons'
        ),
        g(),
        v(14, 'p', 6),
        m(15, 'de beaux endroits et un voyage abordable pour vous'),
        g()(),
        v(16, 'button', 7),
        m(17, ' commence votre journer '),
        g(),
        v(18, 'div', 8),
        N(19, 'img', 9),
        g()());
    },
    dependencies: [it],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer base{button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:#2a6584;--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}p[_ngcontent-%COMP%]{text-align:center;font-size:30px;--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold);color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){p[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}}img[_ngcontent-%COMP%]{object-fit:cover}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
var xl = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-section-part2']],
    decls: 35,
    vars: 0,
    consts: [
      [1, 'p-5', 'grid', 'grid-cols-2', 'gap-6'],
      [1, 'relative', 'w-[250px]', 'h-[250px]', 'left-48', 'translate-x-15'],
      [
        'src',
        '/JAMA31.jpg',
        'alt',
        '',
        1,
        'absolute',
        'top-0',
        'left-0',
        'w-full',
        'h-full',
        'object-cover',
        'rounded-lg',
        'shadow-md',
      ],
      [
        'src',
        '/jama32.jpg',
        'alt',
        '',
        1,
        'absolute',
        'top-[80px]',
        'left-[120px]',
        'w-full',
        'h-full',
        'object-cover',
        'rounded-lg',
        'shadow-lg',
      ],
      [
        1,
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'relative',
        'right-2',
        '-translate-x-3',
        'gap-3',
      ],
      [1, 'text-xl', 'font-semibold', 'text-[#447794]'],
      [1, 'text-[13px]', 'font-bold', 'text-[#e6e6e6]/85'],
      ['routerLink', '/destination'],
      [
        1,
        'p-3',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'translate-x-50',
        'translate-y-16',
        'gap-3',
        'w-fit',
      ],
      [1, 'text-xl', 'font-bold', 'text-[#447794]'],
      [1, 'text-[13px]', 'font-semibold', 'text-[#e6e6e6]/85'],
      [1, 'relative', 'w-[250px]', 'h-[250px]', 'top-9', 'left-32', '-translate-x-28'],
      [
        'src',
        '/sectionP1.jpg',
        'alt',
        '',
        1,
        'absolute',
        'top-[33px]',
        'left-[33px]',
        'w-full',
        'h-full',
        'object-cover',
        'rounded-lg',
        'shadow-md',
      ],
      [
        'src',
        '/sectionP2.jpg',
        'alt',
        '',
        1,
        'absolute',
        'top-[90px]',
        'left-[143px]',
        'w-full',
        'h-full',
        'object-cover',
        'rounded-lg',
        'shadow-lg',
      ],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'section', 0)(1, 'div', 1),
        N(2, 'img', 2)(3, 'img', 3),
        g(),
        v(4, 'div', 4)(5, 'p', 5),
        m(6, "D'ecouvre la Tunisie"),
        g(),
        v(7, 'p', 6),
        m(
          8,
          ' D\xE9couvrez la Tunisie avec s\xE9curit\xE9 et s\xE9r\xE9nit\xE9. Que vous soyez passionn\xE9 '
        ),
        N(9, 'br'),
        m(
          10,
          ' par les plages dor\xE9es, l\u2019histoire mill\xE9naire ou la gastronomie m\xE9diterran\xE9enne '
        ),
        N(11, 'br'),
        m(12, ' , notre pays vous ouvre ses portes avec chaleur et hospitalit\xE9. Nous mettons '),
        N(13, 'br'),
        m(14, ' tout en \u0153uvre pour vous garantir un voyage agr\xE9able, s\xE9curis\xE9 '),
        g(),
        v(15, 'button', 7),
        m(16, 'explorer !'),
        g()(),
        v(17, 'div', 8)(18, 'p', 9),
        m(19, "D'ecouvre la Tunisie"),
        g(),
        v(20, 'p', 10),
        m(21, ' De moments relaxants avec les gens que vous rencontrez en route . '),
        N(22, 'br'),
        m(23, ' En Tunisie, chaque sourire, chaque conversation et chaque partage '),
        N(24, 'br'),
        m(25, ' deviennent une partie de votre voyage. Prenez le temps '),
        N(26, 'br'),
        m(27, ' de discuter avec les habitants, de d\xE9couvrir leurs traditions, '),
        N(28, 'br'),
        m(29, ' de go\xFBter \xE0 leur cuisine et de profiter de cette hospitalit\xE9 unique '),
        g(),
        v(30, 'button', 7),
        m(31, 'explorer !'),
        g()(),
        v(32, 'div', 11),
        N(33, 'img', 12)(34, 'img', 13),
        g()());
    },
    dependencies: [it],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer base{img[_ngcontent-%COMP%]{width:240px;border-radius:var(--radius-2xl)}button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;--tw-gradient-from: #123249;--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
var hh;
try {
  hh = typeof Intl < 'u' && Intl.v8BreakIterator;
} catch {
  hh = !1;
}
var Ol = (() => {
  class e {
    _platformId = p(Kn);
    isBrowser = this._platformId ? dw(this._platformId) : typeof document == 'object' && !!document;
    EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
    TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
    BLINK =
      this.isBrowser && !!(window.chrome || hh) && typeof CSS < 'u' && !this.EDGE && !this.TRIDENT;
    WEBKIT =
      this.isBrowser &&
      /AppleWebKit/i.test(navigator.userAgent) &&
      !this.BLINK &&
      !this.EDGE &&
      !this.TRIDENT;
    IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
    ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    constructor() {}
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function gh(e) {
  return Array.isArray(e) ? e : [e];
}
var Py = new Set(),
  Hr,
  oI = (() => {
    class e {
      _platform = p(Ol);
      _nonce = p(Oo, { optional: !0 });
      _matchMedia;
      constructor() {
        this._matchMedia =
          this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : sI;
      }
      matchMedia(t) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && iI(t, this._nonce), this._matchMedia(t)
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function iI(e, n) {
  if (!Py.has(e))
    try {
      Hr ||
        ((Hr = document.createElement('style')),
        n && Hr.setAttribute('nonce', n),
        Hr.setAttribute('type', 'text/css'),
        document.head.appendChild(Hr)),
        Hr.sheet && (Hr.sheet.insertRule(`@media ${e} {body{ }}`, 0), Py.add(e));
    } catch (t) {
      console.error(t);
    }
}
function sI(e) {
  return {
    matches: e === 'all' || e === '',
    media: e,
    addListener: () => {},
    removeListener: () => {},
  };
}
var Dy = (() => {
  class e {
    _mediaMatcher = p(oI);
    _zone = p(ae);
    _queries = new Map();
    _destroySubject = new re();
    constructor() {}
    ngOnDestroy() {
      this._destroySubject.next(), this._destroySubject.complete();
    }
    isMatched(t) {
      return Ey(gh(t)).some((o) => this._registerQuery(o).mql.matches);
    }
    observe(t) {
      let o = Ey(gh(t)).map((s) => this._registerQuery(s).observable),
        i = ro(o);
      return (
        (i = Ln(i.pipe(at(1)), i.pipe(Tu(1), Pu(0)))),
        i.pipe(
          S((s) => {
            let a = { matches: !1, breakpoints: {} };
            return (
              s.forEach(({ matches: c, query: l }) => {
                (a.matches = a.matches || c), (a.breakpoints[l] = c);
              }),
              a
            );
          })
        )
      );
    }
    _registerQuery(t) {
      if (this._queries.has(t)) return this._queries.get(t);
      let r = this._mediaMatcher.matchMedia(t),
        i = {
          observable: new V((s) => {
            let a = (c) => this._zone.run(() => s.next(c));
            return (
              r.addListener(a),
              () => {
                r.removeListener(a);
              }
            );
          }).pipe(
            ui(r),
            S(({ matches: s }) => ({ query: t, matches: s })),
            so(this._destroySubject)
          ),
          mql: r,
        };
      return this._queries.set(t, i), i;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function Ey(e) {
  return e
    .map((n) => n.split(','))
    .reduce((n, t) => n.concat(t))
    .map((n) => n.trim());
}
var sr = (function (e) {
    return (
      (e[(e.NONE = 0)] = 'NONE'),
      (e[(e.BLACK_ON_WHITE = 1)] = 'BLACK_ON_WHITE'),
      (e[(e.WHITE_ON_BLACK = 2)] = 'WHITE_ON_BLACK'),
      e
    );
  })(sr || {}),
  Iy = 'cdk-high-contrast-black-on-white',
  Sy = 'cdk-high-contrast-white-on-black',
  mh = 'cdk-high-contrast-active',
  vh = (() => {
    class e {
      _platform = p(Ol);
      _hasCheckedHighContrastMode;
      _document = p(J);
      _breakpointSubscription;
      constructor() {
        this._breakpointSubscription = p(Dy)
          .observe('(forced-colors: active)')
          .subscribe(() => {
            this._hasCheckedHighContrastMode &&
              ((this._hasCheckedHighContrastMode = !1),
              this._applyBodyHighContrastModeCssClasses());
          });
      }
      getHighContrastMode() {
        if (!this._platform.isBrowser) return sr.NONE;
        let t = this._document.createElement('div');
        (t.style.backgroundColor = 'rgb(1,2,3)'),
          (t.style.position = 'absolute'),
          this._document.body.appendChild(t);
        let r = this._document.defaultView || window,
          o = r && r.getComputedStyle ? r.getComputedStyle(t) : null,
          i = ((o && o.backgroundColor) || '').replace(/ /g, '');
        switch ((t.remove(), i)) {
          case 'rgb(0,0,0)':
          case 'rgb(45,50,54)':
          case 'rgb(32,32,32)':
            return sr.WHITE_ON_BLACK;
          case 'rgb(255,255,255)':
          case 'rgb(255,250,239)':
            return sr.BLACK_ON_WHITE;
        }
        return sr.NONE;
      }
      ngOnDestroy() {
        this._breakpointSubscription.unsubscribe();
      }
      _applyBodyHighContrastModeCssClasses() {
        if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
          let t = this._document.body.classList;
          t.remove(mh, Iy, Sy), (this._hasCheckedHighContrastMode = !0);
          let r = this.getHighContrastMode();
          r === sr.BLACK_ON_WHITE ? t.add(mh, Iy) : r === sr.WHITE_ON_BLACK && t.add(mh, Sy);
        }
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
var _h = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = Pe({ type: e });
    static ɵinj = we({});
  }
  return e;
})();
var Ko = (() => {
  class e {
    constructor() {
      p(vh)._applyBodyHighContrastModeCssClasses();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = Pe({ type: e });
    static ɵinj = we({ imports: [_h, _h] });
  }
  return e;
})();
var aI = ['*'];
var cI = new C('MAT_CARD_CONFIG'),
  Ty = (() => {
    class e {
      appearance;
      constructor() {
        let t = p(cI, { optional: !0 });
        this.appearance = t?.appearance || 'raised';
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵcmp = U({
        type: e,
        selectors: [['mat-card']],
        hostAttrs: [1, 'mat-mdc-card', 'mdc-card'],
        hostVars: 8,
        hostBindings: function (r, o) {
          r & 2 &&
            xn('mat-mdc-card-outlined', o.appearance === 'outlined')(
              'mdc-card--outlined',
              o.appearance === 'outlined'
            )('mat-mdc-card-filled', o.appearance === 'filled')(
              'mdc-card--filled',
              o.appearance === 'filled'
            );
        },
        inputs: { appearance: 'appearance' },
        exportAs: ['matCard'],
        ngContentSelectors: aI,
        decls: 1,
        vars: 0,
        template: function (r, o) {
          r & 1 && (Yi(), Ki(0));
        },
        styles: [
          `.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-elevated-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mat-card-outlined-container-color, var(--mat-sys-surface));border-radius:var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));border-width:var(--mat-card-outlined-outline-width, 1px);border-color:var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mat-card-outlined-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mat-mdc-card-filled{background-color:var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));border-radius:var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-filled-container-elevation, var(--mat-sys-level0))}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return e;
  })(),
  Ay = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = K({
        type: e,
        selectors: [['mat-card-title'], ['', 'mat-card-title', ''], ['', 'matCardTitle', '']],
        hostAttrs: [1, 'mat-mdc-card-title'],
      });
    }
    return e;
  })();
var Ny = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵdir = K({
      type: e,
      selectors: [['mat-card-content']],
      hostAttrs: [1, 'mat-mdc-card-content'],
    });
  }
  return e;
})();
var ky = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵmod = Pe({ type: e });
    static ɵinj = we({ imports: [Ko, Ko] });
  }
  return e;
})();
var Pl;
function uI() {
  if (Pl === void 0 && ((Pl = null), typeof window < 'u')) {
    let e = window;
    e.trustedTypes !== void 0 &&
      (Pl = e.trustedTypes.createPolicy('angular#components', { createHTML: (n) => n }));
  }
  return Pl;
}
function Ns(e) {
  return uI()?.createHTML(e) || e;
}
function Ry(e) {
  return Error(`Unable to find icon with the name "${e}"`);
}
function dI() {
  return Error(
    'Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.'
  );
}
function Fy(e) {
  return Error(
    `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`
  );
}
function Ly(e) {
  return Error(
    `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`
  );
}
var Nn = class {
    url;
    svgText;
    options;
    svgElement;
    constructor(n, t, r) {
      (this.url = n), (this.svgText = t), (this.options = r);
    }
  },
  Vy = (() => {
    class e {
      _httpClient;
      _sanitizer;
      _errorHandler;
      _document;
      _svgIconConfigs = new Map();
      _iconSetConfigs = new Map();
      _cachedIconsByUrl = new Map();
      _inProgressUrlFetches = new Map();
      _fontCssClassesByAlias = new Map();
      _resolvers = [];
      _defaultFontSetClass = ['material-icons', 'mat-ligature-font'];
      constructor(t, r, o, i) {
        (this._httpClient = t),
          (this._sanitizer = r),
          (this._errorHandler = i),
          (this._document = o);
      }
      addSvgIcon(t, r, o) {
        return this.addSvgIconInNamespace('', t, r, o);
      }
      addSvgIconLiteral(t, r, o) {
        return this.addSvgIconLiteralInNamespace('', t, r, o);
      }
      addSvgIconInNamespace(t, r, o, i) {
        return this._addSvgIconConfig(t, r, new Nn(o, null, i));
      }
      addSvgIconResolver(t) {
        return this._resolvers.push(t), this;
      }
      addSvgIconLiteralInNamespace(t, r, o, i) {
        let s = this._sanitizer.sanitize(Fe.HTML, o);
        if (!s) throw Ly(o);
        let a = Ns(s);
        return this._addSvgIconConfig(t, r, new Nn('', a, i));
      }
      addSvgIconSet(t, r) {
        return this.addSvgIconSetInNamespace('', t, r);
      }
      addSvgIconSetLiteral(t, r) {
        return this.addSvgIconSetLiteralInNamespace('', t, r);
      }
      addSvgIconSetInNamespace(t, r, o) {
        return this._addSvgIconSetConfig(t, new Nn(r, null, o));
      }
      addSvgIconSetLiteralInNamespace(t, r, o) {
        let i = this._sanitizer.sanitize(Fe.HTML, r);
        if (!i) throw Ly(r);
        let s = Ns(i);
        return this._addSvgIconSetConfig(t, new Nn('', s, o));
      }
      registerFontClassAlias(t, r = t) {
        return this._fontCssClassesByAlias.set(t, r), this;
      }
      classNameForFontAlias(t) {
        return this._fontCssClassesByAlias.get(t) || t;
      }
      setDefaultFontSetClass(...t) {
        return (this._defaultFontSetClass = t), this;
      }
      getDefaultFontSetClass() {
        return this._defaultFontSetClass;
      }
      getSvgIconFromUrl(t) {
        let r = this._sanitizer.sanitize(Fe.RESOURCE_URL, t);
        if (!r) throw Fy(t);
        let o = this._cachedIconsByUrl.get(r);
        return o
          ? P(El(o))
          : this._loadSvgIconFromConfig(new Nn(t, null)).pipe(
              fe((i) => this._cachedIconsByUrl.set(r, i)),
              S((i) => El(i))
            );
      }
      getNamedSvgIcon(t, r = '') {
        let o = jy(r, t),
          i = this._svgIconConfigs.get(o);
        if (i) return this._getSvgFromConfig(i);
        if (((i = this._getIconConfigFromResolvers(r, t)), i))
          return this._svgIconConfigs.set(o, i), this._getSvgFromConfig(i);
        let s = this._iconSetConfigs.get(r);
        return s ? this._getSvgFromIconSetConfigs(t, s) : Fn(Ry(o));
      }
      ngOnDestroy() {
        (this._resolvers = []),
          this._svgIconConfigs.clear(),
          this._iconSetConfigs.clear(),
          this._cachedIconsByUrl.clear();
      }
      _getSvgFromConfig(t) {
        return t.svgText
          ? P(El(this._svgElementFromConfig(t)))
          : this._loadSvgIconFromConfig(t).pipe(S((r) => El(r)));
      }
      _getSvgFromIconSetConfigs(t, r) {
        let o = this._extractIconWithNameFromAnySet(t, r);
        if (o) return P(o);
        let i = r
          .filter((s) => !s.svgText)
          .map((s) =>
            this._loadSvgIconSetFromConfig(s).pipe(
              It((a) => {
                let l = `Loading icon set URL: ${this._sanitizer.sanitize(
                  Fe.RESOURCE_URL,
                  s.url
                )} failed: ${a.message}`;
                return this._errorHandler.handleError(new Error(l)), P(null);
              })
            )
          );
        return li(i).pipe(
          S(() => {
            let s = this._extractIconWithNameFromAnySet(t, r);
            if (!s) throw Ry(t);
            return s;
          })
        );
      }
      _extractIconWithNameFromAnySet(t, r) {
        for (let o = r.length - 1; o >= 0; o--) {
          let i = r[o];
          if (i.svgText && i.svgText.toString().indexOf(t) > -1) {
            let s = this._svgElementFromConfig(i),
              a = this._extractSvgIconFromSet(s, t, i.options);
            if (a) return a;
          }
        }
        return null;
      }
      _loadSvgIconFromConfig(t) {
        return this._fetchIcon(t).pipe(
          fe((r) => (t.svgText = r)),
          S(() => this._svgElementFromConfig(t))
        );
      }
      _loadSvgIconSetFromConfig(t) {
        return t.svgText ? P(null) : this._fetchIcon(t).pipe(fe((r) => (t.svgText = r)));
      }
      _extractSvgIconFromSet(t, r, o) {
        let i = t.querySelector(`[id="${r}"]`);
        if (!i) return null;
        let s = i.cloneNode(!0);
        if ((s.removeAttribute('id'), s.nodeName.toLowerCase() === 'svg'))
          return this._setSvgAttributes(s, o);
        if (s.nodeName.toLowerCase() === 'symbol')
          return this._setSvgAttributes(this._toSvgElement(s), o);
        let a = this._svgElementFromString(Ns('<svg></svg>'));
        return a.appendChild(s), this._setSvgAttributes(a, o);
      }
      _svgElementFromString(t) {
        let r = this._document.createElement('DIV');
        r.innerHTML = t;
        let o = r.querySelector('svg');
        if (!o) throw Error('<svg> tag not found');
        return o;
      }
      _toSvgElement(t) {
        let r = this._svgElementFromString(Ns('<svg></svg>')),
          o = t.attributes;
        for (let i = 0; i < o.length; i++) {
          let { name: s, value: a } = o[i];
          s !== 'id' && r.setAttribute(s, a);
        }
        for (let i = 0; i < t.childNodes.length; i++)
          t.childNodes[i].nodeType === this._document.ELEMENT_NODE &&
            r.appendChild(t.childNodes[i].cloneNode(!0));
        return r;
      }
      _setSvgAttributes(t, r) {
        return (
          t.setAttribute('fit', ''),
          t.setAttribute('height', '100%'),
          t.setAttribute('width', '100%'),
          t.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
          t.setAttribute('focusable', 'false'),
          r && r.viewBox && t.setAttribute('viewBox', r.viewBox),
          t
        );
      }
      _fetchIcon(t) {
        let { url: r, options: o } = t,
          i = o?.withCredentials ?? !1;
        if (!this._httpClient) throw dI();
        if (r == null) throw Error(`Cannot fetch icon from URL "${r}".`);
        let s = this._sanitizer.sanitize(Fe.RESOURCE_URL, r);
        if (!s) throw Fy(r);
        let a = this._inProgressUrlFetches.get(s);
        if (a) return a;
        let c = this._httpClient.get(s, { responseType: 'text', withCredentials: i }).pipe(
          S((l) => Ns(l)),
          ln(() => this._inProgressUrlFetches.delete(s)),
          Su()
        );
        return this._inProgressUrlFetches.set(s, c), c;
      }
      _addSvgIconConfig(t, r, o) {
        return this._svgIconConfigs.set(jy(t, r), o), this;
      }
      _addSvgIconSetConfig(t, r) {
        let o = this._iconSetConfigs.get(t);
        return o ? o.push(r) : this._iconSetConfigs.set(t, [r]), this;
      }
      _svgElementFromConfig(t) {
        if (!t.svgElement) {
          let r = this._svgElementFromString(t.svgText);
          this._setSvgAttributes(r, t.options), (t.svgElement = r);
        }
        return t.svgElement;
      }
      _getIconConfigFromResolvers(t, r) {
        for (let o = 0; o < this._resolvers.length; o++) {
          let i = this._resolvers[o](r, t);
          if (i) return fI(i) ? new Nn(i.url, null, i.options) : new Nn(i, null);
        }
      }
      static ɵfac = function (r) {
        return new (r || e)(E(Lo, 8), E(Hp), E(J, 8), E(We));
      };
      static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function El(e) {
  return e.cloneNode(!0);
}
function jy(e, n) {
  return e + ':' + n;
}
function fI(e) {
  return !!(e.url && e.options);
}
var pI = ['*'],
  hI = new C('MAT_ICON_DEFAULT_OPTIONS'),
  gI = new C('mat-icon-location', { providedIn: 'root', factory: mI });
function mI() {
  let e = p(J),
    n = e ? e.location : null;
  return { getPathname: () => (n ? n.pathname + n.search : '') };
}
var By = [
    'clip-path',
    'color-profile',
    'src',
    'cursor',
    'fill',
    'filter',
    'marker',
    'marker-start',
    'marker-mid',
    'marker-end',
    'mask',
    'stroke',
  ],
  vI = By.map((e) => `[${e}]`).join(', '),
  _I = /^url\(['"]?#(.*?)['"]?\)$/,
  Uy = (() => {
    class e {
      _elementRef = p(Ke);
      _iconRegistry = p(Vy);
      _location = p(gI);
      _errorHandler = p(We);
      _defaultColor;
      get color() {
        return this._color || this._defaultColor;
      }
      set color(t) {
        this._color = t;
      }
      _color;
      inline = !1;
      get svgIcon() {
        return this._svgIcon;
      }
      set svgIcon(t) {
        t !== this._svgIcon &&
          (t ? this._updateSvgIcon(t) : this._svgIcon && this._clearSvgElement(),
          (this._svgIcon = t));
      }
      _svgIcon;
      get fontSet() {
        return this._fontSet;
      }
      set fontSet(t) {
        let r = this._cleanupFontValue(t);
        r !== this._fontSet && ((this._fontSet = r), this._updateFontIconClasses());
      }
      _fontSet;
      get fontIcon() {
        return this._fontIcon;
      }
      set fontIcon(t) {
        let r = this._cleanupFontValue(t);
        r !== this._fontIcon && ((this._fontIcon = r), this._updateFontIconClasses());
      }
      _fontIcon;
      _previousFontSetClass = [];
      _previousFontIconClass;
      _svgName;
      _svgNamespace;
      _previousPath;
      _elementsWithExternalReferences;
      _currentIconFetch = ie.EMPTY;
      constructor() {
        let t = p(new So('aria-hidden'), { optional: !0 }),
          r = p(hI, { optional: !0 });
        r &&
          (r.color && (this.color = this._defaultColor = r.color),
          r.fontSet && (this.fontSet = r.fontSet)),
          t || this._elementRef.nativeElement.setAttribute('aria-hidden', 'true');
      }
      _splitIconName(t) {
        if (!t) return ['', ''];
        let r = t.split(':');
        switch (r.length) {
          case 1:
            return ['', r[0]];
          case 2:
            return r;
          default:
            throw Error(`Invalid icon name: "${t}"`);
        }
      }
      ngOnInit() {
        this._updateFontIconClasses();
      }
      ngAfterViewChecked() {
        let t = this._elementsWithExternalReferences;
        if (t && t.size) {
          let r = this._location.getPathname();
          r !== this._previousPath && ((this._previousPath = r), this._prependPathToReferences(r));
        }
      }
      ngOnDestroy() {
        this._currentIconFetch.unsubscribe(),
          this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
      }
      _usingFontIcon() {
        return !this.svgIcon;
      }
      _setSvgElement(t) {
        this._clearSvgElement();
        let r = this._location.getPathname();
        (this._previousPath = r),
          this._cacheChildrenWithExternalReferences(t),
          this._prependPathToReferences(r),
          this._elementRef.nativeElement.appendChild(t);
      }
      _clearSvgElement() {
        let t = this._elementRef.nativeElement,
          r = t.childNodes.length;
        for (
          this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
          r--;

        ) {
          let o = t.childNodes[r];
          (o.nodeType !== 1 || o.nodeName.toLowerCase() === 'svg') && o.remove();
        }
      }
      _updateFontIconClasses() {
        if (!this._usingFontIcon()) return;
        let t = this._elementRef.nativeElement,
          r = (
            this.fontSet
              ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/)
              : this._iconRegistry.getDefaultFontSetClass()
          ).filter((o) => o.length > 0);
        this._previousFontSetClass.forEach((o) => t.classList.remove(o)),
          r.forEach((o) => t.classList.add(o)),
          (this._previousFontSetClass = r),
          this.fontIcon !== this._previousFontIconClass &&
            !r.includes('mat-ligature-font') &&
            (this._previousFontIconClass && t.classList.remove(this._previousFontIconClass),
            this.fontIcon && t.classList.add(this.fontIcon),
            (this._previousFontIconClass = this.fontIcon));
      }
      _cleanupFontValue(t) {
        return typeof t == 'string' ? t.trim().split(' ')[0] : t;
      }
      _prependPathToReferences(t) {
        let r = this._elementsWithExternalReferences;
        r &&
          r.forEach((o, i) => {
            o.forEach((s) => {
              i.setAttribute(s.name, `url('${t}#${s.value}')`);
            });
          });
      }
      _cacheChildrenWithExternalReferences(t) {
        let r = t.querySelectorAll(vI),
          o = (this._elementsWithExternalReferences =
            this._elementsWithExternalReferences || new Map());
        for (let i = 0; i < r.length; i++)
          By.forEach((s) => {
            let a = r[i],
              c = a.getAttribute(s),
              l = c ? c.match(_I) : null;
            if (l) {
              let u = o.get(a);
              u || ((u = []), o.set(a, u)), u.push({ name: s, value: l[1] });
            }
          });
      }
      _updateSvgIcon(t) {
        if (
          ((this._svgNamespace = null),
          (this._svgName = null),
          this._currentIconFetch.unsubscribe(),
          t)
        ) {
          let [r, o] = this._splitIconName(t);
          r && (this._svgNamespace = r),
            o && (this._svgName = o),
            (this._currentIconFetch = this._iconRegistry
              .getNamedSvgIcon(o, r)
              .pipe(at(1))
              .subscribe(
                (i) => this._setSvgElement(i),
                (i) => {
                  let s = `Error retrieving icon ${r}:${o}! ${i.message}`;
                  this._errorHandler.handleError(new Error(s));
                }
              ));
        }
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵcmp = U({
        type: e,
        selectors: [['mat-icon']],
        hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
        hostVars: 10,
        hostBindings: function (r, o) {
          r & 2 &&
            (Mn('data-mat-icon-type', o._usingFontIcon() ? 'font' : 'svg')(
              'data-mat-icon-name',
              o._svgName || o.fontIcon
            )('data-mat-icon-namespace', o._svgNamespace || o.fontSet)(
              'fontIcon',
              o._usingFontIcon() ? o.fontIcon : null
            ),
            Qi(o.color ? 'mat-' + o.color : ''),
            xn('mat-icon-inline', o.inline)(
              'mat-icon-no-color',
              o.color !== 'primary' && o.color !== 'accent' && o.color !== 'warn'
            ));
        },
        inputs: {
          color: 'color',
          inline: [2, 'inline', 'inline', Jt],
          svgIcon: 'svgIcon',
          fontSet: 'fontSet',
          fontIcon: 'fontIcon',
        },
        exportAs: ['matIcon'],
        ngContentSelectors: pI,
        decls: 1,
        vars: 0,
        template: function (r, o) {
          r & 1 && (Yi(), Ki(0));
        },
        styles: [
          `mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color, inherit)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return e;
  })(),
  Hy = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = Pe({ type: e });
      static ɵinj = we({ imports: [Ko, Ko] });
    }
    return e;
  })();
var Dl = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-middle']],
    decls: 25,
    vars: 0,
    consts: [
      [
        1,
        'bg-[#123249]',
        'w-full',
        'my-10',
        'p-3',
        'h-[300px]',
        'flex',
        'gap-10',
        'justify-center',
        'items-center',
      ],
      [1, 'mini-card'],
      [1, 'content'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'div', 0)(1, 'mat-card', 1)(2, 'mat-icon'),
        m(3, 'apartment'),
        g(),
        v(4, 'mat-card-title')(5, 'p'),
        m(6, ' Architecture Tunisienne '),
        g()(),
        v(7, 'mat-card-content', 2),
        m(8, ' Des m\xE9dinas traditionnelles aux b\xE2timents modernes '),
        g()(),
        v(9, 'mat-card', 1)(10, 'mat-icon'),
        m(11, 'place'),
        g(),
        v(12, 'mat-card-title')(13, 'p'),
        m(14, ' Points forts de la Tunisie '),
        g()(),
        v(15, 'mat-card-content', 2),
        m(
          16,
          ' Explorez les sites les plus c\xE9l\xE8bres et les merveilles naturelles de la Tunisie '
        ),
        g()(),
        v(17, 'mat-card', 1)(18, 'mat-icon'),
        m(19, 'history'),
        g(),
        v(20, 'mat-card-title')(21, 'p'),
        m(22, ' Histoire de la Tunisie '),
        g()(),
        v(23, 'mat-card-content', 2),
        m(
          24,
          ' D\xE9couvrez le riche pass\xE9 de la Tunisie, de l\u2019ancienne Carthage \xE0 l\u2019\xE9poque moderne '
        ),
        g()()());
    },
    dependencies: [ky, Ty, Ny, Ay, Hy, Uy],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer components{.mini-card[_ngcontent-%COMP%]{display:flex;height:200px;width:250px;flex-direction:column;align-items:center;background-color:#061222!important;padding:calc(var(--spacing) * 2);text-align:center;color:#447794}.mini-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 3);font-size:40px;color:#123249}.content[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)!important}@supports (color: color-mix(in lab,red,red)){.content[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)!important}}}@layer base{p[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial}}}

`,
    ],
  });
};
var Il = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-accueil']],
    decls: 3,
    vars: 0,
    template: function (t, r) {
      t & 1 && N(0, 'app-section')(1, 'app-middle')(2, 'app-section-part2');
    },
    dependencies: [Ml, xl, Dl],
    encapsulation: 2,
  });
};
var ks = 'http://localhost:3001/architectural',
  zy = 'http://localhost:3000/admin',
  yI = '50ffc0621c5d4aefb408d97ccc2d5705',
  CI = 'http://api.weatherbit.io/v2.0/current',
  ze = class e {
    httpC = p(Lo);
    getarchitectural() {
      return this.httpC.get(ks);
    }
    getWeather(n, t) {
      return this.httpC.get(`${CI}?lat=${n}&lon=${t}&key=${yI}`);
    }
    getarchitecturalByID(n) {
      return this.httpC.get(`${ks}/${n}`);
    }
    Addarchitectural(n) {
      return this.httpC.post(ks, n);
    }
    Deletearchitectural(n) {
      return this.httpC.delete(ks + '/' + n);
    }
    Updatearchitectural(n, t) {
      return this.httpC.patch(`${ks}/${n}`, t);
    }
    Updateadmin(n) {
      return this.httpC.patch(`${zy}/1`, { password: n.password });
    }
    getAdmins() {
      return this.httpC.get(zy);
    }
    static ɵfac = function (t) {
      return new (t || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  };
var Qo = class e {
  transform(n) {
    if (n) return n + 'dt';
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵpipe = Cn({ name: 'mypipe', type: e, pure: !0 });
};
var bI = (e) => ['/commentaire', e],
  MI = (e) => ['/place-weather', e],
  xI = (e) => ['/place', e];
function OI(e, n) {
  if ((e & 1 && (v(0, 'button', 7), m(1, '+ details'), g()), e & 2)) {
    let t = Me().$implicit;
    oe('routerLink', Xi(1, xI, t.id));
  }
}
function PI(e, n) {
  if (e & 1) {
    let t = Mt();
    v(0, 'button', 9),
      Y('click', function () {
        nt(t);
        let o = Me().$implicit,
          i = Me();
        return rt(i.onDelete(o.id));
      }),
      m(1, ' supprimer '),
      g();
  }
}
function EI(e, n) {
  if (
    (e & 1 &&
      (v(0, 'div')(1, 'div', 2),
      N(2, 'img', 3),
      g(),
      v(3, 'div', 4)(4, 'div', 5)(5, 'p'),
      m(6),
      g(),
      v(7, 'p'),
      m(8),
      En(9, 'mypipe'),
      g()(),
      v(10, 'div', 6),
      Ce(11, OI, 2, 3, 'button', 7),
      v(12, 'button', 7),
      m(13, ' Visiter les commentaires '),
      g(),
      v(14, 'button', 7),
      m(15, ' Voir le place '),
      g(),
      Ce(16, PI, 2, 0, 'button', 8),
      g()()()),
    e & 2)
  ) {
    let t = n.$implicit,
      r = Me();
    Qi(r.name ? 'styleavecadmin' : 'stylesansadmin'),
      D(2),
      oe('src', t.photo, Qt),
      D(4),
      Ee(t.nom),
      D(2),
      Ji('prix: ', tr(9, 9, t.prixEntree + '')),
      D(3),
      be(r.name ? 11 : -1),
      D(),
      oe('routerLink', Xi(11, bI, t.id)),
      D(2),
      oe('routerLink', Xi(13, MI, t.id)),
      D(2),
      be(r.name ? 16 : -1);
  }
}
var Sl = class e {
  name = localStorage.getItem('name');
  c;
  delete = new se();
  onDelete(n) {
    this.delete.emit(n);
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-undestination']],
    inputs: { c: 'c' },
    outputs: { delete: 'delete' },
    decls: 3,
    vars: 0,
    consts: [
      [1, 'flex', 'gap-4', 'justify-around', 'flex-wrap'],
      [3, 'class'],
      [1, 'w-[100%]', 'h-[60%]', 'justify-self-start'],
      ['alt', '', 3, 'src'],
      [
        1,
        'flex',
        'flex-col',
        'h-[30%]',
        'w-[100%]',
        'justify-center',
        'relative',
        'top-[30px]',
        'items-center',
        'gap-2',
      ],
      [1, 'pos', 'gap-3', 'justify-center', 'items-center'],
      [1, 'pos', 'flex-col', 'gap-4', 'items-center'],
      [1, 'change', 'hover:bg-[#061222]', 3, 'routerLink'],
      [1, 'change', 'hover:bg-red-600', 'hover:text-white/90'],
      [1, 'change', 'hover:bg-red-600', 'hover:text-white/90', 3, 'click'],
    ],
    template: function (t, r) {
      t & 1 && (v(0, 'div', 0), Eo(1, EI, 17, 15, 'div', 1, Po), g()), t & 2 && (D(), Do(r.c));
    },
    dependencies: [it, Qo],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer base{button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}input[_ngcontent-%COMP%]{width:30%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:14px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:14px;opacity:55%}img[_ngcontent-%COMP%]{margin-inline:auto;margin-block:calc(var(--spacing) * 0);height:100%;width:100%;border-radius:var(--radius-2xl);object-fit:cover}p[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height));--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold);color:color-mix(in srgb,#fff 85%,transparent)}@supports (color: color-mix(in lab,red,red)){p[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 85%,transparent)}}}@layer components{.pos[_ngcontent-%COMP%]{display:flex;width:100%;align-items:center}.change[_ngcontent-%COMP%]{width:90%;cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#061222;background-color:color-mix(in srgb,#fff 90%,transparent);padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold);color:#2d5b75;--tw-duration: .2s;transition-duration:.2s}@supports (color: color-mix(in lab,red,red)){.change[_ngcontent-%COMP%]{background-color:color-mix(in oklab,var(--color-white) 90%,transparent)}}@media (hover: hover){.change[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){.change[_ngcontent-%COMP%]:hover{background-color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.change[_ngcontent-%COMP%]:hover{background-color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-border-style: solid;--tw-duration: initial;--tw-outline-style: solid}}}.styleavecadmin[_ngcontent-%COMP%]{background-color:#123249;display:flex;flex-direction:column;width:25rem;height:45rem;align-items:center;padding:.5rem;border-radius:1rem;box-shadow:0 1px 3px #0000001a,0 1px 2px #0000000f}.stylesansadmin[_ngcontent-%COMP%]{background-color:#123249;display:flex;flex-direction:column;width:25rem;height:34rem;align-items:center;padding:.5rem;border-radius:1rem;box-shadow:0 1px 3px #0000001a,0 1px 2px #0000000f}

`,
    ],
  });
};
function DI(e, n) {
  e & 1 && (v(0, 'button', 3)(1, 'span', 6), m(2, '+'), g(), m(3, ' Ajouter '), g());
}
function II(e, n) {
  if (e & 1) {
    let t = Mt();
    v(0, 'app-undestination', 7),
      Y('delete', function (o) {
        nt(t);
        let i = Me();
        return rt(i.Supp(o));
      }),
      g();
  }
  if (e & 2) {
    let t = Me();
    oe('c', t.arr);
  }
}
function SI(e, n) {
  if (e & 1) {
    let t = Mt();
    v(0, 'app-undestination', 7),
      Y('delete', function (o) {
        nt(t);
        let i = Me();
        return rt(i.Supp(o));
      }),
      g();
  }
  if (e & 2) {
    let t = Me();
    oe('c', t.list);
  }
}
var Tl = class e {
  cdr = p(me);
  ARC = p(ze);
  router = p(Se);
  list = [];
  name = localStorage.getItem('name');
  ngOnInit() {
    this.loadArchitecturalList();
  }
  loadArchitecturalList() {
    this.ARC.getarchitectural().subscribe({
      next: (n) => {
        (this.list = n), this.cdr.detectChanges();
      },
      error: (n) => console.error('Error fetching data:', n),
    });
  }
  Supp(n) {
    this.name
      ? confirm('\xCAtes-vous s\xFBr de vouloir supprimer cette place ?') &&
        this.ARC.Deletearchitectural(n).subscribe({
          next: () => {
            (this.list = this.list.filter((t) => t.id !== n)),
              this.cdr.detectChanges(),
              console.log(`Deleted item with id ${n}`);
          },
          error: (t) => console.error('Error deleting:', t),
        })
      : this.router.navigate(['/form']).then(() => {
          window.location.reload(), this.cdr.detectChanges();
        });
  }
  arr = [];
  Cherche(n) {
    return (
      (this.arr = this.list.filter((t) => t.nom.toLowerCase().includes(n.toLowerCase()))),
      console.log('enter'),
      this.arr
    );
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-destinations']],
    decls: 7,
    vars: 2,
    consts: [
      ['text', ''],
      [1, 'flex', 'flex-col', 'p-3', 'gap-3'],
      [1, 'flex', 'justify-around'],
      [
        'routerLink',
        '/nouveauPlace',
        1,
        'hover:bg-linear-to-r',
        'from-[#123249]',
        'to-[#2D5B75]',
        ';',
      ],
      ['type', 'text', 'placeholder', 'chercher avec le nom', 3, 'input'],
      [3, 'c'],
      [1, 'font-bold', 'text-xl'],
      [3, 'delete', 'c'],
    ],
    template: function (t, r) {
      if (t & 1) {
        let o = Mt();
        v(0, 'div', 1)(1, 'div', 2),
          Ce(2, DI, 4, 0, 'button', 3),
          v(3, 'input', 4, 0),
          Y('input', function () {
            nt(o);
            let s = gp(4);
            return rt(r.Cherche(s.value));
          }),
          g()(),
          Ce(5, II, 1, 1, 'app-undestination', 5)(6, SI, 1, 1, 'app-undestination', 5),
          g();
      }
      t & 2 && (D(2), be(r.name ? 2 : -1), D(3), be(r.arr.length > 0 ? 5 : 6));
    },
    dependencies: [it, Sl],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer base{button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}input[_ngcontent-%COMP%]{width:30%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:14px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:14px;opacity:55%}img[_ngcontent-%COMP%]{margin-inline:auto;margin-block:calc(var(--spacing) * 0);height:100%;width:100%;border-radius:var(--radius-2xl);object-fit:cover}p[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height));--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold);color:color-mix(in srgb,#fff 85%,transparent)}@supports (color: color-mix(in lab,red,red)){p[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 85%,transparent)}}}@layer components{.pos[_ngcontent-%COMP%]{display:flex;width:100%;align-items:center}.change[_ngcontent-%COMP%]{width:90%;cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#061222;background-color:color-mix(in srgb,#fff 90%,transparent);padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold);color:#2d5b75;--tw-duration: .2s;transition-duration:.2s}@supports (color: color-mix(in lab,red,red)){.change[_ngcontent-%COMP%]{background-color:color-mix(in oklab,var(--color-white) 90%,transparent)}}@media (hover: hover){.change[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){.change[_ngcontent-%COMP%]:hover{background-color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.change[_ngcontent-%COMP%]:hover{background-color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-border-style: solid;--tw-duration: initial;--tw-outline-style: solid}}}

`,
    ],
  });
};
var Al = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-propos']],
    decls: 11,
    vars: 0,
    consts: [
      [
        1,
        'relative',
        'text-white/80',
        'text-2xl',
        'font-bold',
        'top-[100px]',
        'w-full',
        'h-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-4',
        'px-6',
        'text-center',
      ],
    ],
    template: function (t, r) {
      t & 1 &&
        (q(0, 'div', 0)(1, 'div'),
        m(
          2,
          ' Bienvenue sur notre site web ! D\xE9couvrez les plus beaux lieux et les vues magnifiques de la Tunisie. '
        ),
        Z(),
        q(3, 'div'),
        m(
          4,
          ' Parcourez des sites historiques, des paysages naturels impressionnants et des architectures uniques. '
        ),
        Z(),
        q(5, 'div'),
        m(
          6,
          ' Choisissez vos endroits pr\xE9f\xE9r\xE9s selon vos envies et planifiez vos visites facilement. '
        ),
        Z(),
        q(7, 'div'),
        m(
          8,
          ' Notre objectif est de vous offrir une exp\xE9rience immersive et informative pour chaque lieu. '
        ),
        Z(),
        q(9, 'div'),
        m(
          10,
          ' Explorez, admirez et laissez-vous inspirer par la richesse culturelle et naturelle de la Tunisie ! \u{1F305}\u{1F3DB}\uFE0F\u{1F3D6}\uFE0F '
        ),
        Z()());
    },
    encapsulation: 2,
  });
};
var Nl = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-erreur']],
    decls: 3,
    vars: 0,
    consts: [
      [1, 'flex', 'justify-center', 'items-center', 'h-[90vh]', 'w-full'],
      [1, 'h-full', 'w-full', 'flex', 'justify-center', 'items-center', 'text-3xl'],
    ],
    template: function (t, r) {
      t & 1 &&
        (q(0, 'div', 0)(1, 'h1', 1), m(2, "\u274C ERREUR 404 route n'est pas trouver"), Z()());
    },
    encapsulation: 2,
  });
};
var Jy = (() => {
    class e {
      _renderer;
      _elementRef;
      onChange = (t) => {};
      onTouched = () => {};
      constructor(t, r) {
        (this._renderer = t), (this._elementRef = r);
      }
      setProperty(t, r) {
        this._renderer.setProperty(this._elementRef.nativeElement, t, r);
      }
      registerOnTouched(t) {
        this.onTouched = t;
      }
      registerOnChange(t) {
        this.onChange = t;
      }
      setDisabledState(t) {
        this.setProperty('disabled', t);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(Qn), T(Ke));
      };
      static ɵdir = K({ type: e });
    }
    return e;
  })(),
  Xy = (() => {
    class e extends Jy {
      static ɵfac = (() => {
        let t;
        return function (o) {
          return (t || (t = _n(e)))(o || e);
        };
      })();
      static ɵdir = K({ type: e, features: [Qe] });
    }
    return e;
  })(),
  zl = new C('');
var TI = { provide: zl, useExisting: lt(() => Pt), multi: !0 };
function AI() {
  let e = xt() ? xt().getUserAgent() : '';
  return /android (\d+)/.test(e.toLowerCase());
}
var NI = new C(''),
  Pt = (() => {
    class e extends Jy {
      _compositionMode;
      _composing = !1;
      constructor(t, r, o) {
        super(t, r),
          (this._compositionMode = o),
          this._compositionMode == null && (this._compositionMode = !AI());
      }
      writeValue(t) {
        let r = t ?? '';
        this.setProperty('value', r);
      }
      _handleInput(t) {
        (!this._compositionMode || (this._compositionMode && !this._composing)) && this.onChange(t);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(t) {
        (this._composing = !1), this._compositionMode && this.onChange(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(Qn), T(Ke), T(NI, 8));
      };
      static ɵdir = K({
        type: e,
        selectors: [
          ['input', 'formControlName', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControlName', ''],
          ['input', 'formControl', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControl', ''],
          ['input', 'ngModel', '', 3, 'type', 'checkbox'],
          ['textarea', 'ngModel', ''],
          ['', 'ngDefaultControl', ''],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            Y('input', function (s) {
              return o._handleInput(s.target.value);
            })('blur', function () {
              return o.onTouched();
            })('compositionstart', function () {
              return o._compositionStart();
            })('compositionend', function (s) {
              return o._compositionEnd(s.target.value);
            });
        },
        standalone: !1,
        features: [Ft([TI]), Qe],
      });
    }
    return e;
  })();
function xh(e) {
  return e == null || Oh(e) === 0;
}
function Oh(e) {
  return e == null
    ? null
    : Array.isArray(e) || typeof e == 'string'
    ? e.length
    : e instanceof Set
    ? e.size
    : null;
}
var ti = new C(''),
  Us = new C(''),
  kI =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  de = class {
    static min(n) {
      return RI(n);
    }
    static max(n) {
      return FI(n);
    }
    static required(n) {
      return e0(n);
    }
    static requiredTrue(n) {
      return LI(n);
    }
    static email(n) {
      return jI(n);
    }
    static minLength(n) {
      return VI(n);
    }
    static maxLength(n) {
      return BI(n);
    }
    static pattern(n) {
      return UI(n);
    }
    static nullValidator(n) {
      return Rl();
    }
    static compose(n) {
      return s0(n);
    }
    static composeAsync(n) {
      return c0(n);
    }
  };
function RI(e) {
  return (n) => {
    if (n.value == null || e == null) return null;
    let t = parseFloat(n.value);
    return !isNaN(t) && t < e ? { min: { min: e, actual: n.value } } : null;
  };
}
function FI(e) {
  return (n) => {
    if (n.value == null || e == null) return null;
    let t = parseFloat(n.value);
    return !isNaN(t) && t > e ? { max: { max: e, actual: n.value } } : null;
  };
}
function e0(e) {
  return xh(e.value) ? { required: !0 } : null;
}
function LI(e) {
  return e.value === !0 ? null : { required: !0 };
}
function jI(e) {
  return xh(e.value) || kI.test(e.value) ? null : { email: !0 };
}
function VI(e) {
  return (n) => {
    let t = n.value?.length ?? Oh(n.value);
    return t === null || t === 0
      ? null
      : t < e
      ? { minlength: { requiredLength: e, actualLength: t } }
      : null;
  };
}
function BI(e) {
  return (n) => {
    let t = n.value?.length ?? Oh(n.value);
    return t !== null && t > e ? { maxlength: { requiredLength: e, actualLength: t } } : null;
  };
}
function UI(e) {
  if (!e) return Rl;
  let n, t;
  return (
    typeof e == 'string'
      ? ((t = ''),
        e.charAt(0) !== '^' && (t += '^'),
        (t += e),
        e.charAt(e.length - 1) !== '$' && (t += '$'),
        (n = new RegExp(t)))
      : ((t = e.toString()), (n = e)),
    (r) => {
      if (xh(r.value)) return null;
      let o = r.value;
      return n.test(o) ? null : { pattern: { requiredPattern: t, actualValue: o } };
    }
  );
}
function Rl(e) {
  return null;
}
function t0(e) {
  return e != null;
}
function n0(e) {
  return Xn(e) ? le(e) : e;
}
function r0(e) {
  let n = {};
  return (
    e.forEach((t) => {
      n = t != null ? w(w({}, n), t) : n;
    }),
    Object.keys(n).length === 0 ? null : n
  );
}
function o0(e, n) {
  return n.map((t) => t(e));
}
function HI(e) {
  return !e.validate;
}
function i0(e) {
  return e.map((n) => (HI(n) ? n : (t) => n.validate(t)));
}
function s0(e) {
  if (!e) return null;
  let n = e.filter(t0);
  return n.length == 0
    ? null
    : function (t) {
        return r0(o0(t, n));
      };
}
function a0(e) {
  return e != null ? s0(i0(e)) : null;
}
function c0(e) {
  if (!e) return null;
  let n = e.filter(t0);
  return n.length == 0
    ? null
    : function (t) {
        let r = o0(t, n).map(n0);
        return li(r).pipe(S(r0));
      };
}
function l0(e) {
  return e != null ? c0(i0(e)) : null;
}
function $y(e, n) {
  return e === null ? [n] : Array.isArray(e) ? [...e, n] : [e, n];
}
function u0(e) {
  return e._rawValidators;
}
function d0(e) {
  return e._rawAsyncValidators;
}
function wh(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
function Fl(e, n) {
  return Array.isArray(e) ? e.includes(n) : e === n;
}
function Gy(e, n) {
  let t = wh(n);
  return (
    wh(e).forEach((o) => {
      Fl(t, o) || t.push(o);
    }),
    t
  );
}
function Wy(e, n) {
  return wh(n).filter((t) => !Fl(e, t));
}
var Ll = class {
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators = [];
    _rawAsyncValidators = [];
    _setValidators(n) {
      (this._rawValidators = n || []), (this._composedValidatorFn = a0(this._rawValidators));
    }
    _setAsyncValidators(n) {
      (this._rawAsyncValidators = n || []),
        (this._composedAsyncValidatorFn = l0(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _onDestroyCallbacks = [];
    _registerOnDestroy(n) {
      this._onDestroyCallbacks.push(n);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((n) => n()), (this._onDestroyCallbacks = []);
    }
    reset(n = void 0) {
      this.control && this.control.reset(n);
    }
    hasError(n, t) {
      return this.control ? this.control.hasError(n, t) : !1;
    }
    getError(n, t) {
      return this.control ? this.control.getError(n, t) : null;
    }
  },
  vt = class extends Ll {
    name;
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  zr = class extends Ll {
    _parent = null;
    name = null;
    valueAccessor = null;
  },
  jl = class {
    _cd;
    constructor(n) {
      this._cd = n;
    }
    get isTouched() {
      return this._cd?.control?._touched?.(), !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return this._cd?.control?._status?.(), !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return this._cd?._submitted?.(), !!this._cd?.submitted;
    }
  },
  zI = {
    '[class.ng-untouched]': 'isUntouched',
    '[class.ng-touched]': 'isTouched',
    '[class.ng-pristine]': 'isPristine',
    '[class.ng-dirty]': 'isDirty',
    '[class.ng-valid]': 'isValid',
    '[class.ng-invalid]': 'isInvalid',
    '[class.ng-pending]': 'isPending',
  },
  f8 = k(w({}, zI), { '[class.ng-submitted]': 'isSubmitted' }),
  nn = (() => {
    class e extends jl {
      constructor(t) {
        super(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(zr, 2));
      };
      static ɵdir = K({
        type: e,
        selectors: [
          ['', 'formControlName', ''],
          ['', 'ngModel', ''],
          ['', 'formControl', ''],
        ],
        hostVars: 14,
        hostBindings: function (r, o) {
          r & 2 &&
            xn('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
              'ng-pristine',
              o.isPristine
            )('ng-dirty', o.isDirty)('ng-valid', o.isValid)('ng-invalid', o.isInvalid)(
              'ng-pending',
              o.isPending
            );
        },
        standalone: !1,
        features: [Qe],
      });
    }
    return e;
  })(),
  cr = (() => {
    class e extends jl {
      constructor(t) {
        super(t);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(vt, 10));
      };
      static ɵdir = K({
        type: e,
        selectors: [
          ['', 'formGroupName', ''],
          ['', 'formArrayName', ''],
          ['', 'ngModelGroup', ''],
          ['', 'formGroup', ''],
          ['form', 3, 'ngNoForm', ''],
          ['', 'ngForm', ''],
        ],
        hostVars: 16,
        hostBindings: function (r, o) {
          r & 2 &&
            xn('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
              'ng-pristine',
              o.isPristine
            )('ng-dirty', o.isDirty)('ng-valid', o.isValid)('ng-invalid', o.isInvalid)(
              'ng-pending',
              o.isPending
            )('ng-submitted', o.isSubmitted);
        },
        standalone: !1,
        features: [Qe],
      });
    }
    return e;
  })();
var Rs = 'VALID',
  kl = 'INVALID',
  Jo = 'PENDING',
  Fs = 'DISABLED',
  ar = class {},
  Vl = class extends ar {
    value;
    source;
    constructor(n, t) {
      super(), (this.value = n), (this.source = t);
    }
  },
  Ls = class extends ar {
    pristine;
    source;
    constructor(n, t) {
      super(), (this.pristine = n), (this.source = t);
    }
  },
  js = class extends ar {
    touched;
    source;
    constructor(n, t) {
      super(), (this.touched = n), (this.source = t);
    }
  },
  Xo = class extends ar {
    status;
    source;
    constructor(n, t) {
      super(), (this.status = n), (this.source = t);
    }
  },
  yh = class extends ar {
    source;
    constructor(n) {
      super(), (this.source = n);
    }
  },
  Bs = class extends ar {
    source;
    constructor(n) {
      super(), (this.source = n);
    }
  };
function Ph(e) {
  return ($l(e) ? e.validators : e) || null;
}
function $I(e) {
  return Array.isArray(e) ? a0(e) : e || null;
}
function Eh(e, n) {
  return ($l(n) ? n.asyncValidators : e) || null;
}
function GI(e) {
  return Array.isArray(e) ? l0(e) : e || null;
}
function $l(e) {
  return e != null && !Array.isArray(e) && typeof e == 'object';
}
function f0(e, n, t) {
  let r = e.controls;
  if (!(n ? Object.keys(r) : r).length) throw new y(1e3, '');
  if (!r[t]) throw new y(1001, '');
}
function p0(e, n, t) {
  e._forEachChild((r, o) => {
    if (t[o] === void 0) throw new y(1002, '');
  });
}
var ei = class {
    _pendingDirty = !1;
    _hasOwnPendingAsyncValidator = null;
    _pendingTouched = !1;
    _onCollectionChange = () => {};
    _updateOn;
    _parent = null;
    _asyncValidationSubscription;
    _composedValidatorFn;
    _composedAsyncValidatorFn;
    _rawValidators;
    _rawAsyncValidators;
    value;
    constructor(n, t) {
      this._assignValidators(n), this._assignAsyncValidators(t);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(n) {
      this._rawValidators = this._composedValidatorFn = n;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(n) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = n;
    }
    get parent() {
      return this._parent;
    }
    get status() {
      return De(this.statusReactive);
    }
    set status(n) {
      De(() => this.statusReactive.set(n));
    }
    _status = Io(() => this.statusReactive());
    statusReactive = dt(void 0);
    get valid() {
      return this.status === Rs;
    }
    get invalid() {
      return this.status === kl;
    }
    get pending() {
      return this.status == Jo;
    }
    get disabled() {
      return this.status === Fs;
    }
    get enabled() {
      return this.status !== Fs;
    }
    errors;
    get pristine() {
      return De(this.pristineReactive);
    }
    set pristine(n) {
      De(() => this.pristineReactive.set(n));
    }
    _pristine = Io(() => this.pristineReactive());
    pristineReactive = dt(!0);
    get dirty() {
      return !this.pristine;
    }
    get touched() {
      return De(this.touchedReactive);
    }
    set touched(n) {
      De(() => this.touchedReactive.set(n));
    }
    _touched = Io(() => this.touchedReactive());
    touchedReactive = dt(!1);
    get untouched() {
      return !this.touched;
    }
    _events = new re();
    events = this._events.asObservable();
    valueChanges;
    statusChanges;
    get updateOn() {
      return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
    }
    setValidators(n) {
      this._assignValidators(n);
    }
    setAsyncValidators(n) {
      this._assignAsyncValidators(n);
    }
    addValidators(n) {
      this.setValidators(Gy(n, this._rawValidators));
    }
    addAsyncValidators(n) {
      this.setAsyncValidators(Gy(n, this._rawAsyncValidators));
    }
    removeValidators(n) {
      this.setValidators(Wy(n, this._rawValidators));
    }
    removeAsyncValidators(n) {
      this.setAsyncValidators(Wy(n, this._rawAsyncValidators));
    }
    hasValidator(n) {
      return Fl(this._rawValidators, n);
    }
    hasAsyncValidator(n) {
      return Fl(this._rawAsyncValidators, n);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(n = {}) {
      let t = this.touched === !1;
      this.touched = !0;
      let r = n.sourceControl ?? this;
      this._parent && !n.onlySelf && this._parent.markAsTouched(k(w({}, n), { sourceControl: r })),
        t && n.emitEvent !== !1 && this._events.next(new js(!0, r));
    }
    markAllAsDirty(n = {}) {
      this.markAsDirty({ onlySelf: !0, emitEvent: n.emitEvent, sourceControl: this }),
        this._forEachChild((t) => t.markAllAsDirty(n));
    }
    markAllAsTouched(n = {}) {
      this.markAsTouched({ onlySelf: !0, emitEvent: n.emitEvent, sourceControl: this }),
        this._forEachChild((t) => t.markAllAsTouched(n));
    }
    markAsUntouched(n = {}) {
      let t = this.touched === !0;
      (this.touched = !1), (this._pendingTouched = !1);
      let r = n.sourceControl ?? this;
      this._forEachChild((o) => {
        o.markAsUntouched({ onlySelf: !0, emitEvent: n.emitEvent, sourceControl: r });
      }),
        this._parent && !n.onlySelf && this._parent._updateTouched(n, r),
        t && n.emitEvent !== !1 && this._events.next(new js(!1, r));
    }
    markAsDirty(n = {}) {
      let t = this.pristine === !0;
      this.pristine = !1;
      let r = n.sourceControl ?? this;
      this._parent && !n.onlySelf && this._parent.markAsDirty(k(w({}, n), { sourceControl: r })),
        t && n.emitEvent !== !1 && this._events.next(new Ls(!1, r));
    }
    markAsPristine(n = {}) {
      let t = this.pristine === !1;
      (this.pristine = !0), (this._pendingDirty = !1);
      let r = n.sourceControl ?? this;
      this._forEachChild((o) => {
        o.markAsPristine({ onlySelf: !0, emitEvent: n.emitEvent });
      }),
        this._parent && !n.onlySelf && this._parent._updatePristine(n, r),
        t && n.emitEvent !== !1 && this._events.next(new Ls(!0, r));
    }
    markAsPending(n = {}) {
      this.status = Jo;
      let t = n.sourceControl ?? this;
      n.emitEvent !== !1 &&
        (this._events.next(new Xo(this.status, t)), this.statusChanges.emit(this.status)),
        this._parent &&
          !n.onlySelf &&
          this._parent.markAsPending(k(w({}, n), { sourceControl: t }));
    }
    disable(n = {}) {
      let t = this._parentMarkedDirty(n.onlySelf);
      (this.status = Fs),
        (this.errors = null),
        this._forEachChild((o) => {
          o.disable(k(w({}, n), { onlySelf: !0 }));
        }),
        this._updateValue();
      let r = n.sourceControl ?? this;
      n.emitEvent !== !1 &&
        (this._events.next(new Vl(this.value, r)),
        this._events.next(new Xo(this.status, r)),
        this.valueChanges.emit(this.value),
        this.statusChanges.emit(this.status)),
        this._updateAncestors(k(w({}, n), { skipPristineCheck: t }), this),
        this._onDisabledChange.forEach((o) => o(!0));
    }
    enable(n = {}) {
      let t = this._parentMarkedDirty(n.onlySelf);
      (this.status = Rs),
        this._forEachChild((r) => {
          r.enable(k(w({}, n), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: n.emitEvent }),
        this._updateAncestors(k(w({}, n), { skipPristineCheck: t }), this),
        this._onDisabledChange.forEach((r) => r(!1));
    }
    _updateAncestors(n, t) {
      this._parent &&
        !n.onlySelf &&
        (this._parent.updateValueAndValidity(n),
        n.skipPristineCheck || this._parent._updatePristine({}, t),
        this._parent._updateTouched({}, t));
    }
    setParent(n) {
      this._parent = n;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(n = {}) {
      if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
        let r = this._cancelExistingSubscription();
        (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Rs || this.status === Jo) && this._runAsyncValidator(r, n.emitEvent);
      }
      let t = n.sourceControl ?? this;
      n.emitEvent !== !1 &&
        (this._events.next(new Vl(this.value, t)),
        this._events.next(new Xo(this.status, t)),
        this.valueChanges.emit(this.value),
        this.statusChanges.emit(this.status)),
        this._parent &&
          !n.onlySelf &&
          this._parent.updateValueAndValidity(k(w({}, n), { sourceControl: t }));
    }
    _updateTreeValidity(n = { emitEvent: !0 }) {
      this._forEachChild((t) => t._updateTreeValidity(n)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: n.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? Fs : Rs;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(n, t) {
      if (this.asyncValidator) {
        (this.status = Jo),
          (this._hasOwnPendingAsyncValidator = {
            emitEvent: t !== !1,
            shouldHaveEmitted: n !== !1,
          });
        let r = n0(this.asyncValidator(this));
        this._asyncValidationSubscription = r.subscribe((o) => {
          (this._hasOwnPendingAsyncValidator = null),
            this.setErrors(o, { emitEvent: t, shouldHaveEmitted: n });
        });
      }
    }
    _cancelExistingSubscription() {
      if (this._asyncValidationSubscription) {
        this._asyncValidationSubscription.unsubscribe();
        let n =
          (this._hasOwnPendingAsyncValidator?.emitEvent ||
            this._hasOwnPendingAsyncValidator?.shouldHaveEmitted) ??
          !1;
        return (this._hasOwnPendingAsyncValidator = null), n;
      }
      return !1;
    }
    setErrors(n, t = {}) {
      (this.errors = n), this._updateControlsErrors(t.emitEvent !== !1, this, t.shouldHaveEmitted);
    }
    get(n) {
      let t = n;
      return t == null || (Array.isArray(t) || (t = t.split('.')), t.length === 0)
        ? null
        : t.reduce((r, o) => r && r._find(o), this);
    }
    getError(n, t) {
      let r = t ? this.get(t) : this;
      return r && r.errors ? r.errors[n] : null;
    }
    hasError(n, t) {
      return !!this.getError(n, t);
    }
    get root() {
      let n = this;
      for (; n._parent; ) n = n._parent;
      return n;
    }
    _updateControlsErrors(n, t, r) {
      (this.status = this._calculateStatus()),
        n && this.statusChanges.emit(this.status),
        (n || r) && this._events.next(new Xo(this.status, t)),
        this._parent && this._parent._updateControlsErrors(n, t, r);
    }
    _initObservables() {
      (this.valueChanges = new se()), (this.statusChanges = new se());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? Fs
        : this.errors
        ? kl
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Jo)
        ? Jo
        : this._anyControlsHaveStatus(kl)
        ? kl
        : Rs;
    }
    _anyControlsHaveStatus(n) {
      return this._anyControls((t) => t.status === n);
    }
    _anyControlsDirty() {
      return this._anyControls((n) => n.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((n) => n.touched);
    }
    _updatePristine(n, t) {
      let r = !this._anyControlsDirty(),
        o = this.pristine !== r;
      (this.pristine = r),
        this._parent && !n.onlySelf && this._parent._updatePristine(n, t),
        o && this._events.next(new Ls(this.pristine, t));
    }
    _updateTouched(n = {}, t) {
      (this.touched = this._anyControlsTouched()),
        this._events.next(new js(this.touched, t)),
        this._parent && !n.onlySelf && this._parent._updateTouched(n, t);
    }
    _onDisabledChange = [];
    _registerOnCollectionChange(n) {
      this._onCollectionChange = n;
    }
    _setUpdateStrategy(n) {
      $l(n) && n.updateOn != null && (this._updateOn = n.updateOn);
    }
    _parentMarkedDirty(n) {
      let t = this._parent && this._parent.dirty;
      return !n && !!t && !this._parent._anyControlsDirty();
    }
    _find(n) {
      return null;
    }
    _assignValidators(n) {
      (this._rawValidators = Array.isArray(n) ? n.slice() : n),
        (this._composedValidatorFn = $I(this._rawValidators));
    }
    _assignAsyncValidators(n) {
      (this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
        (this._composedAsyncValidatorFn = GI(this._rawAsyncValidators));
    }
  },
  Bl = class extends ei {
    constructor(n, t, r) {
      super(Ph(t), Eh(r, t)),
        (this.controls = n),
        this._initObservables(),
        this._setUpdateStrategy(t),
        this._setUpControls(),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
    }
    controls;
    registerControl(n, t) {
      return this.controls[n]
        ? this.controls[n]
        : ((this.controls[n] = t),
          t.setParent(this),
          t._registerOnCollectionChange(this._onCollectionChange),
          t);
    }
    addControl(n, t, r = {}) {
      this.registerControl(n, t),
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(n, t = {}) {
      this.controls[n] && this.controls[n]._registerOnCollectionChange(() => {}),
        delete this.controls[n],
        this.updateValueAndValidity({ emitEvent: t.emitEvent }),
        this._onCollectionChange();
    }
    setControl(n, t, r = {}) {
      this.controls[n] && this.controls[n]._registerOnCollectionChange(() => {}),
        delete this.controls[n],
        t && this.registerControl(n, t),
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    contains(n) {
      return this.controls.hasOwnProperty(n) && this.controls[n].enabled;
    }
    setValue(n, t = {}) {
      p0(this, !0, n),
        Object.keys(n).forEach((r) => {
          f0(this, !0, r),
            this.controls[r].setValue(n[r], { onlySelf: !0, emitEvent: t.emitEvent });
        }),
        this.updateValueAndValidity(t);
    }
    patchValue(n, t = {}) {
      n != null &&
        (Object.keys(n).forEach((r) => {
          let o = this.controls[r];
          o && o.patchValue(n[r], { onlySelf: !0, emitEvent: t.emitEvent });
        }),
        this.updateValueAndValidity(t));
    }
    reset(n = {}, t = {}) {
      this._forEachChild((r, o) => {
        r.reset(n ? n[o] : null, { onlySelf: !0, emitEvent: t.emitEvent });
      }),
        this._updatePristine(t, this),
        this._updateTouched(t, this),
        this.updateValueAndValidity(t),
        t?.emitEvent !== !1 && this._events.next(new Bs(this));
    }
    getRawValue() {
      return this._reduceChildren({}, (n, t, r) => ((n[r] = t.getRawValue()), n));
    }
    _syncPendingControls() {
      let n = this._reduceChildren(!1, (t, r) => (r._syncPendingControls() ? !0 : t));
      return n && this.updateValueAndValidity({ onlySelf: !0 }), n;
    }
    _forEachChild(n) {
      Object.keys(this.controls).forEach((t) => {
        let r = this.controls[t];
        r && n(r, t);
      });
    }
    _setUpControls() {
      this._forEachChild((n) => {
        n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(n) {
      for (let [t, r] of Object.entries(this.controls)) if (this.contains(t) && n(r)) return !0;
      return !1;
    }
    _reduceValue() {
      let n = {};
      return this._reduceChildren(
        n,
        (t, r, o) => ((r.enabled || this.disabled) && (t[o] = r.value), t)
      );
    }
    _reduceChildren(n, t) {
      let r = n;
      return (
        this._forEachChild((o, i) => {
          r = t(r, o, i);
        }),
        r
      );
    }
    _allControlsDisabled() {
      for (let n of Object.keys(this.controls)) if (this.controls[n].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(n) {
      return this.controls.hasOwnProperty(n) ? this.controls[n] : null;
    }
  };
var Ch = class extends Bl {};
var Gl = new C('', { providedIn: 'root', factory: () => Wl }),
  Wl = 'always';
function ql(e, n) {
  return [...n.path, e];
}
function bh(e, n, t = Wl) {
  Dh(e, n),
    n.valueAccessor.writeValue(e.value),
    (e.disabled || t === 'always') && n.valueAccessor.setDisabledState?.(e.disabled),
    qI(e, n),
    YI(e, n),
    ZI(e, n),
    WI(e, n);
}
function qy(e, n, t = !0) {
  let r = () => {};
  n.valueAccessor && (n.valueAccessor.registerOnChange(r), n.valueAccessor.registerOnTouched(r)),
    Hl(e, n),
    e && (n._invokeOnDestroyCallbacks(), e._registerOnCollectionChange(() => {}));
}
function Ul(e, n) {
  e.forEach((t) => {
    t.registerOnValidatorChange && t.registerOnValidatorChange(n);
  });
}
function WI(e, n) {
  if (n.valueAccessor.setDisabledState) {
    let t = (r) => {
      n.valueAccessor.setDisabledState(r);
    };
    e.registerOnDisabledChange(t),
      n._registerOnDestroy(() => {
        e._unregisterOnDisabledChange(t);
      });
  }
}
function Dh(e, n) {
  let t = u0(e);
  n.validator !== null
    ? e.setValidators($y(t, n.validator))
    : typeof t == 'function' && e.setValidators([t]);
  let r = d0(e);
  n.asyncValidator !== null
    ? e.setAsyncValidators($y(r, n.asyncValidator))
    : typeof r == 'function' && e.setAsyncValidators([r]);
  let o = () => e.updateValueAndValidity();
  Ul(n._rawValidators, o), Ul(n._rawAsyncValidators, o);
}
function Hl(e, n) {
  let t = !1;
  if (e !== null) {
    if (n.validator !== null) {
      let o = u0(e);
      if (Array.isArray(o) && o.length > 0) {
        let i = o.filter((s) => s !== n.validator);
        i.length !== o.length && ((t = !0), e.setValidators(i));
      }
    }
    if (n.asyncValidator !== null) {
      let o = d0(e);
      if (Array.isArray(o) && o.length > 0) {
        let i = o.filter((s) => s !== n.asyncValidator);
        i.length !== o.length && ((t = !0), e.setAsyncValidators(i));
      }
    }
  }
  let r = () => {};
  return Ul(n._rawValidators, r), Ul(n._rawAsyncValidators, r), t;
}
function qI(e, n) {
  n.valueAccessor.registerOnChange((t) => {
    (e._pendingValue = t),
      (e._pendingChange = !0),
      (e._pendingDirty = !0),
      e.updateOn === 'change' && h0(e, n);
  });
}
function ZI(e, n) {
  n.valueAccessor.registerOnTouched(() => {
    (e._pendingTouched = !0),
      e.updateOn === 'blur' && e._pendingChange && h0(e, n),
      e.updateOn !== 'submit' && e.markAsTouched();
  });
}
function h0(e, n) {
  e._pendingDirty && e.markAsDirty(),
    e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
    n.viewToModelUpdate(e._pendingValue),
    (e._pendingChange = !1);
}
function YI(e, n) {
  let t = (r, o) => {
    n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r);
  };
  e.registerOnChange(t),
    n._registerOnDestroy(() => {
      e._unregisterOnChange(t);
    });
}
function KI(e, n) {
  e == null, Dh(e, n);
}
function QI(e, n) {
  return Hl(e, n);
}
function g0(e, n) {
  if (!e.hasOwnProperty('model')) return !1;
  let t = e.model;
  return t.isFirstChange() ? !0 : !Object.is(n, t.currentValue);
}
function JI(e) {
  return Object.getPrototypeOf(e.constructor) === Xy;
}
function XI(e, n) {
  e._syncPendingControls(),
    n.forEach((t) => {
      let r = t.control;
      r.updateOn === 'submit' &&
        r._pendingChange &&
        (t.viewToModelUpdate(r._pendingValue), (r._pendingChange = !1));
    });
}
function m0(e, n) {
  if (!n) return null;
  Array.isArray(n);
  let t, r, o;
  return (
    n.forEach((i) => {
      i.constructor === Pt ? (t = i) : JI(i) ? (r = i) : (o = i);
    }),
    o || r || t || null
  );
}
function eS(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function Zy(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function Yy(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    Object.keys(e).length === 2 &&
    'value' in e &&
    'disabled' in e
  );
}
var Vs = class extends ei {
  defaultValue = null;
  _onChange = [];
  _pendingValue;
  _pendingChange = !1;
  constructor(n = null, t, r) {
    super(Ph(t), Eh(r, t)),
      this._applyFormState(n),
      this._setUpdateStrategy(t),
      this._initObservables(),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }),
      $l(t) &&
        (t.nonNullable || t.initialValueIsDefault) &&
        (Yy(n) ? (this.defaultValue = n.value) : (this.defaultValue = n));
  }
  setValue(n, t = {}) {
    (this.value = this._pendingValue = n),
      this._onChange.length &&
        t.emitModelToViewChange !== !1 &&
        this._onChange.forEach((r) => r(this.value, t.emitViewToModelChange !== !1)),
      this.updateValueAndValidity(t);
  }
  patchValue(n, t = {}) {
    this.setValue(n, t);
  }
  reset(n = this.defaultValue, t = {}) {
    this._applyFormState(n),
      this.markAsPristine(t),
      this.markAsUntouched(t),
      this.setValue(this.value, t),
      (this._pendingChange = !1),
      t?.emitEvent !== !1 && this._events.next(new Bs(this));
  }
  _updateValue() {}
  _anyControls(n) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(n) {
    this._onChange.push(n);
  }
  _unregisterOnChange(n) {
    Zy(this._onChange, n);
  }
  registerOnDisabledChange(n) {
    this._onDisabledChange.push(n);
  }
  _unregisterOnDisabledChange(n) {
    Zy(this._onDisabledChange, n);
  }
  _forEachChild(n) {}
  _syncPendingControls() {
    return this.updateOn === 'submit' &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, { onlySelf: !0, emitModelToViewChange: !1 }), !0)
      : !1;
  }
  _applyFormState(n) {
    Yy(n)
      ? ((this.value = this._pendingValue = n.value),
        n.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = n);
  }
};
var tS = (e) => e instanceof Vs,
  nS = (() => {
    class e extends vt {
      _parent;
      ngOnInit() {
        this._checkParentType(), this.formDirective.addFormGroup(this);
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeFormGroup(this);
      }
      get control() {
        return this.formDirective.getFormGroup(this);
      }
      get path() {
        return ql(this.name == null ? this.name : this.name.toString(), this._parent);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      _checkParentType() {}
      static ɵfac = (() => {
        let t;
        return function (o) {
          return (t || (t = _n(e)))(o || e);
        };
      })();
      static ɵdir = K({ type: e, standalone: !1, features: [Qe] });
    }
    return e;
  })();
var rS = { provide: zr, useExisting: lt(() => Ih) },
  Ky = Promise.resolve(),
  Ih = (() => {
    class e extends zr {
      _changeDetectorRef;
      callSetDisabledState;
      control = new Vs();
      static ngAcceptInputType_isDisabled;
      _registered = !1;
      viewModel;
      name = '';
      isDisabled;
      model;
      options;
      update = new se();
      constructor(t, r, o, i, s, a) {
        super(),
          (this._changeDetectorRef = s),
          (this.callSetDisabledState = a),
          (this._parent = t),
          this._setValidators(r),
          this._setAsyncValidators(o),
          (this.valueAccessor = m0(this, i));
      }
      ngOnChanges(t) {
        if ((this._checkForErrors(), !this._registered || 'name' in t)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let r = t.name.previousValue;
            this.formDirective.removeControl({ name: r, path: this._getPath(r) });
          }
          this._setUpControl();
        }
        'isDisabled' in t && this._updateDisabled(t),
          g0(t, this.viewModel) && (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(t) {
        (this.viewModel = t), this.update.emit(t);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        bh(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._checkName();
      }
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(t) {
        Ky.then(() => {
          this.control.setValue(t, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(t) {
        let r = t.isDisabled.currentValue,
          o = r !== 0 && Jt(r);
        Ky.then(() => {
          o && !this.control.disabled
            ? this.control.disable()
            : !o && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(t) {
        return this._parent ? ql(t, this._parent) : [t];
      }
      static ɵfac = function (r) {
        return new (r || e)(T(vt, 9), T(ti, 10), T(Us, 10), T(zl, 10), T(me, 8), T(Gl, 8));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'ngModel', '', 3, 'formControlName', '', 3, 'formControl', '']],
        inputs: {
          name: 'name',
          isDisabled: [0, 'disabled', 'isDisabled'],
          model: [0, 'ngModel', 'model'],
          options: [0, 'ngModelOptions', 'options'],
        },
        outputs: { update: 'ngModelChange' },
        exportAs: ['ngModel'],
        standalone: !1,
        features: [Ft([rS]), Qe, ft],
      });
    }
    return e;
  })();
var lr = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = K({
        type: e,
        selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
        hostAttrs: ['novalidate', ''],
        standalone: !1,
      });
    }
    return e;
  })(),
  oS = { provide: zl, useExisting: lt(() => Hs), multi: !0 },
  Hs = (() => {
    class e extends Xy {
      writeValue(t) {
        let r = t ?? '';
        this.setProperty('value', r);
      }
      registerOnChange(t) {
        this.onChange = (r) => {
          t(r == '' ? null : parseFloat(r));
        };
      }
      static ɵfac = (() => {
        let t;
        return function (o) {
          return (t || (t = _n(e)))(o || e);
        };
      })();
      static ɵdir = K({
        type: e,
        selectors: [
          ['input', 'type', 'number', 'formControlName', ''],
          ['input', 'type', 'number', 'formControl', ''],
          ['input', 'type', 'number', 'ngModel', ''],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            Y('input', function (s) {
              return o.onChange(s.target.value);
            })('blur', function () {
              return o.onTouched();
            });
        },
        standalone: !1,
        features: [Ft([oS]), Qe],
      });
    }
    return e;
  })();
var v0 = new C('');
var iS = { provide: vt, useExisting: lt(() => rn) },
  rn = (() => {
    class e extends vt {
      callSetDisabledState;
      get submitted() {
        return De(this._submittedReactive);
      }
      set submitted(t) {
        this._submittedReactive.set(t);
      }
      _submitted = Io(() => this._submittedReactive());
      _submittedReactive = dt(!1);
      _oldForm;
      _onCollectionChange = () => this._updateDomValue();
      directives = [];
      form = null;
      ngSubmit = new se();
      constructor(t, r, o) {
        super(),
          (this.callSetDisabledState = o),
          this._setValidators(t),
          this._setAsyncValidators(r);
      }
      ngOnChanges(t) {
        t.hasOwnProperty('form') &&
          (this._updateValidators(),
          this._updateDomValue(),
          this._updateRegistrations(),
          (this._oldForm = this.form));
      }
      ngOnDestroy() {
        this.form &&
          (Hl(this.form, this),
          this.form._onCollectionChange === this._onCollectionChange &&
            this.form._registerOnCollectionChange(() => {}));
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      addControl(t) {
        let r = this.form.get(t.path);
        return (
          bh(r, t, this.callSetDisabledState),
          r.updateValueAndValidity({ emitEvent: !1 }),
          this.directives.push(t),
          r
        );
      }
      getControl(t) {
        return this.form.get(t.path);
      }
      removeControl(t) {
        qy(t.control || null, t, !1), eS(this.directives, t);
      }
      addFormGroup(t) {
        this._setUpFormContainer(t);
      }
      removeFormGroup(t) {
        this._cleanUpFormContainer(t);
      }
      getFormGroup(t) {
        return this.form.get(t.path);
      }
      addFormArray(t) {
        this._setUpFormContainer(t);
      }
      removeFormArray(t) {
        this._cleanUpFormContainer(t);
      }
      getFormArray(t) {
        return this.form.get(t.path);
      }
      updateModel(t, r) {
        this.form.get(t.path).setValue(r);
      }
      onSubmit(t) {
        return (
          this._submittedReactive.set(!0),
          XI(this.form, this.directives),
          this.ngSubmit.emit(t),
          this.form._events.next(new yh(this.control)),
          t?.target?.method === 'dialog'
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(t = void 0, r = {}) {
        this.form.reset(t, r), this._submittedReactive.set(!1);
      }
      _updateDomValue() {
        this.directives.forEach((t) => {
          let r = t.control,
            o = this.form.get(t.path);
          r !== o &&
            (qy(r || null, t), tS(o) && (bh(o, t, this.callSetDisabledState), (t.control = o)));
        }),
          this.form._updateTreeValidity({ emitEvent: !1 });
      }
      _setUpFormContainer(t) {
        let r = this.form.get(t.path);
        KI(r, t), r.updateValueAndValidity({ emitEvent: !1 });
      }
      _cleanUpFormContainer(t) {
        if (this.form) {
          let r = this.form.get(t.path);
          r && QI(r, t) && r.updateValueAndValidity({ emitEvent: !1 });
        }
      }
      _updateRegistrations() {
        this.form._registerOnCollectionChange(this._onCollectionChange),
          this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
      }
      _updateValidators() {
        Dh(this.form, this), this._oldForm && Hl(this._oldForm, this);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(ti, 10), T(Us, 10), T(Gl, 8));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'formGroup', '']],
        hostBindings: function (r, o) {
          r & 1 &&
            Y('submit', function (s) {
              return o.onSubmit(s);
            })('reset', function () {
              return o.onReset();
            });
        },
        inputs: { form: [0, 'formGroup', 'form'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        standalone: !1,
        features: [Ft([iS]), Qe, ft],
      });
    }
    return e;
  })(),
  sS = { provide: vt, useExisting: lt(() => Zl) },
  Zl = (() => {
    class e extends nS {
      name = null;
      constructor(t, r, o) {
        super(), (this._parent = t), this._setValidators(r), this._setAsyncValidators(o);
      }
      _checkParentType() {
        _0(this._parent);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(vt, 13), T(ti, 10), T(Us, 10));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'formGroupName', '']],
        inputs: { name: [0, 'formGroupName', 'name'] },
        standalone: !1,
        features: [Ft([sS]), Qe],
      });
    }
    return e;
  })(),
  aS = { provide: vt, useExisting: lt(() => Yl) },
  Yl = (() => {
    class e extends vt {
      _parent;
      name = null;
      constructor(t, r, o) {
        super(), (this._parent = t), this._setValidators(r), this._setAsyncValidators(o);
      }
      ngOnInit() {
        _0(this._parent), this.formDirective.addFormArray(this);
      }
      ngOnDestroy() {
        this.formDirective?.removeFormArray(this);
      }
      get control() {
        return this.formDirective.getFormArray(this);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      get path() {
        return ql(this.name == null ? this.name : this.name.toString(), this._parent);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(vt, 13), T(ti, 10), T(Us, 10));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'formArrayName', '']],
        inputs: { name: [0, 'formArrayName', 'name'] },
        standalone: !1,
        features: [Ft([aS]), Qe],
      });
    }
    return e;
  })();
function _0(e) {
  return !(e instanceof Zl) && !(e instanceof rn) && !(e instanceof Yl);
}
var cS = { provide: zr, useExisting: lt(() => kn) },
  kn = (() => {
    class e extends zr {
      _ngModelWarningConfig;
      _added = !1;
      viewModel;
      control;
      name = null;
      set isDisabled(t) {}
      model;
      update = new se();
      static _ngModelWarningSentOnce = !1;
      _ngModelWarningSent = !1;
      constructor(t, r, o, i, s) {
        super(),
          (this._ngModelWarningConfig = s),
          (this._parent = t),
          this._setValidators(r),
          this._setAsyncValidators(o),
          (this.valueAccessor = m0(this, i));
      }
      ngOnChanges(t) {
        this._added || this._setUpControl(),
          g0(t, this.viewModel) &&
            ((this.viewModel = this.model), this.formDirective.updateModel(this, this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      viewToModelUpdate(t) {
        (this.viewModel = t), this.update.emit(t);
      }
      get path() {
        return ql(this.name == null ? this.name : this.name.toString(), this._parent);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      _setUpControl() {
        (this.control = this.formDirective.addControl(this)), (this._added = !0);
      }
      static ɵfac = function (r) {
        return new (r || e)(T(vt, 13), T(ti, 10), T(Us, 10), T(zl, 10), T(v0, 8));
      };
      static ɵdir = K({
        type: e,
        selectors: [['', 'formControlName', '']],
        inputs: {
          name: [0, 'formControlName', 'name'],
          isDisabled: [0, 'disabled', 'isDisabled'],
          model: [0, 'ngModel', 'model'],
        },
        outputs: { update: 'ngModelChange' },
        standalone: !1,
        features: [Ft([cS]), Qe, ft],
      });
    }
    return e;
  })();
var lS = (() => {
  class e {
    _validator = Rl;
    _onChange;
    _enabled;
    ngOnChanges(t) {
      if (this.inputName in t) {
        let r = this.normalizeInput(t[this.inputName].currentValue);
        (this._enabled = this.enabled(r)),
          (this._validator = this._enabled ? this.createValidator(r) : Rl),
          this._onChange && this._onChange();
      }
    }
    validate(t) {
      return this._validator(t);
    }
    registerOnValidatorChange(t) {
      this._onChange = t;
    }
    enabled(t) {
      return t != null;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵdir = K({ type: e, features: [ft] });
  }
  return e;
})();
var uS = { provide: ti, useExisting: lt(() => Sh), multi: !0 };
var Sh = (() => {
  class e extends lS {
    required;
    inputName = 'required';
    normalizeInput = Jt;
    createValidator = (t) => e0;
    enabled(t) {
      return t;
    }
    static ɵfac = (() => {
      let t;
      return function (o) {
        return (t || (t = _n(e)))(o || e);
      };
    })();
    static ɵdir = K({
      type: e,
      selectors: [
        ['', 'required', '', 'formControlName', '', 3, 'type', 'checkbox'],
        ['', 'required', '', 'formControl', '', 3, 'type', 'checkbox'],
        ['', 'required', '', 'ngModel', '', 3, 'type', 'checkbox'],
      ],
      hostVars: 1,
      hostBindings: function (r, o) {
        r & 2 && Mn('required', o._enabled ? '' : null);
      },
      inputs: { required: 'required' },
      standalone: !1,
      features: [Ft([uS]), Qe],
    });
  }
  return e;
})();
var w0 = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = Pe({ type: e });
      static ɵinj = we({});
    }
    return e;
  })(),
  Mh = class extends ei {
    constructor(n, t, r) {
      super(Ph(t), Eh(r, t)),
        (this.controls = n),
        this._initObservables(),
        this._setUpdateStrategy(t),
        this._setUpControls(),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
    }
    controls;
    at(n) {
      return this.controls[this._adjustIndex(n)];
    }
    push(n, t = {}) {
      Array.isArray(n)
        ? n.forEach((r) => {
            this.controls.push(r), this._registerControl(r);
          })
        : (this.controls.push(n), this._registerControl(n)),
        this.updateValueAndValidity({ emitEvent: t.emitEvent }),
        this._onCollectionChange();
    }
    insert(n, t, r = {}) {
      this.controls.splice(n, 0, t),
        this._registerControl(t),
        this.updateValueAndValidity({ emitEvent: r.emitEvent });
    }
    removeAt(n, t = {}) {
      let r = this._adjustIndex(n);
      r < 0 && (r = 0),
        this.controls[r] && this.controls[r]._registerOnCollectionChange(() => {}),
        this.controls.splice(r, 1),
        this.updateValueAndValidity({ emitEvent: t.emitEvent });
    }
    setControl(n, t, r = {}) {
      let o = this._adjustIndex(n);
      o < 0 && (o = 0),
        this.controls[o] && this.controls[o]._registerOnCollectionChange(() => {}),
        this.controls.splice(o, 1),
        t && (this.controls.splice(o, 0, t), this._registerControl(t)),
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    get length() {
      return this.controls.length;
    }
    setValue(n, t = {}) {
      p0(this, !1, n),
        n.forEach((r, o) => {
          f0(this, !1, o), this.at(o).setValue(r, { onlySelf: !0, emitEvent: t.emitEvent });
        }),
        this.updateValueAndValidity(t);
    }
    patchValue(n, t = {}) {
      n != null &&
        (n.forEach((r, o) => {
          this.at(o) && this.at(o).patchValue(r, { onlySelf: !0, emitEvent: t.emitEvent });
        }),
        this.updateValueAndValidity(t));
    }
    reset(n = [], t = {}) {
      this._forEachChild((r, o) => {
        r.reset(n[o], { onlySelf: !0, emitEvent: t.emitEvent });
      }),
        this._updatePristine(t, this),
        this._updateTouched(t, this),
        this.updateValueAndValidity(t),
        t?.emitEvent !== !1 && this._events.next(new Bs(this));
    }
    getRawValue() {
      return this.controls.map((n) => n.getRawValue());
    }
    clear(n = {}) {
      this.controls.length < 1 ||
        (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
        this.controls.splice(0),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }));
    }
    _adjustIndex(n) {
      return n < 0 ? n + this.length : n;
    }
    _syncPendingControls() {
      let n = this.controls.reduce((t, r) => (r._syncPendingControls() ? !0 : t), !1);
      return n && this.updateValueAndValidity({ onlySelf: !0 }), n;
    }
    _forEachChild(n) {
      this.controls.forEach((t, r) => {
        n(t, r);
      });
    }
    _updateValue() {
      this.value = this.controls.filter((n) => n.enabled || this.disabled).map((n) => n.value);
    }
    _anyControls(n) {
      return this.controls.some((t) => t.enabled && n(t));
    }
    _setUpControls() {
      this._forEachChild((n) => this._registerControl(n));
    }
    _allControlsDisabled() {
      for (let n of this.controls) if (n.enabled) return !1;
      return this.controls.length > 0 || this.disabled;
    }
    _registerControl(n) {
      n.setParent(this), n._registerOnCollectionChange(this._onCollectionChange);
    }
    _find(n) {
      return this.at(n) ?? null;
    }
  };
function Qy(e) {
  return !!e && (e.asyncValidators !== void 0 || e.validators !== void 0 || e.updateOn !== void 0);
}
var ur = (() => {
  class e {
    useNonNullable = !1;
    get nonNullable() {
      let t = new e();
      return (t.useNonNullable = !0), t;
    }
    group(t, r = null) {
      let o = this._reduceControls(t),
        i = {};
      return (
        Qy(r)
          ? (i = r)
          : r !== null && ((i.validators = r.validator), (i.asyncValidators = r.asyncValidator)),
        new Bl(o, i)
      );
    }
    record(t, r = null) {
      let o = this._reduceControls(t);
      return new Ch(o, r);
    }
    control(t, r, o) {
      let i = {};
      return this.useNonNullable
        ? (Qy(r) ? (i = r) : ((i.validators = r), (i.asyncValidators = o)),
          new Vs(t, k(w({}, i), { nonNullable: !0 })))
        : new Vs(t, r, o);
    }
    array(t, r, o) {
      let i = t.map((s) => this._createControl(s));
      return new Mh(i, r, o);
    }
    _reduceControls(t) {
      let r = {};
      return (
        Object.keys(t).forEach((o) => {
          r[o] = this._createControl(t[o]);
        }),
        r
      );
    }
    _createControl(t) {
      if (t instanceof Vs) return t;
      if (t instanceof ei) return t;
      if (Array.isArray(t)) {
        let r = t[0],
          o = t.length > 1 ? t[1] : null,
          i = t.length > 2 ? t[2] : null;
        return this.control(r, o, i);
      } else return this.control(t);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = x({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
var Kl = (() => {
    class e {
      static withConfig(t) {
        return {
          ngModule: e,
          providers: [{ provide: Gl, useValue: t.callSetDisabledState ?? Wl }],
        };
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = Pe({ type: e });
      static ɵinj = we({ imports: [w0] });
    }
    return e;
  })(),
  on = (() => {
    class e {
      static withConfig(t) {
        return {
          ngModule: e,
          providers: [
            { provide: v0, useValue: t.warnOnNgModelWithFormControl ?? 'always' },
            { provide: Gl, useValue: t.callSetDisabledState ?? Wl },
          ],
        };
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵmod = Pe({ type: e });
      static ɵinj = we({ imports: [w0] });
    }
    return e;
  })();
function dS(e, n) {
  e & 1 && (v(0, 'div', 11), m(1, '\u26A0\uFE0F Nom ou mot de passe incorrect !'), g());
}
var Ql = class e {
  authAdmin = [];
  cdr = p(me);
  fb = p(ur);
  Form;
  ARC = p(ze);
  router = p(Se);
  ngOnInit() {
    this.ARC.getAdmins().subscribe((n) => {
      (this.authAdmin = n), this.cdr.detectChanges();
    }),
      (this.Form = this.fb.group({
        name: ['', [de.required, de.minLength(3)]],
        password: ['', [de.required, de.minLength(3)]],
      }));
  }
  onSumbit() {
    if (this.Form.invalid) return;
    let n = this.Form.value.name,
      t = this.Form.value.password;
    localStorage.setItem('name', n),
      localStorage.setItem('password', t),
      this.authAdmin.find((o) => o.name === n && o.password == t)
        ? this.router.navigate(['/']).then(() => window.location.reload())
        : alert('Admin does not exist');
  }
  onRset() {
    this.Form.reset();
  }
  get passwordA() {
    return this.Form.get('password');
  }
  get nameAdmin() {
    return this.Form.get('name');
  }
  verifname() {
    return this.nameAdmin?.invalid && this.nameAdmin.touched;
  }
  verifpassword() {
    return this.passwordA?.invalid && this.passwordA.touched;
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-form']],
    decls: 24,
    vars: 3,
    consts: [
      [1, 'flex', 'justify-center', 'items-center', 'w-full', 'h-[110vh]'],
      [
        1,
        'w-[70%]',
        'h-[65vh]',
        'flex',
        'justify-between',
        'items-center',
        'bg-[#123249]',
        'rounded-2xl',
        'px-5',
        'gap-2',
        3,
        'ngSubmit',
        'formGroup',
      ],
      [1, 'unique', 'p-5'],
      [1, 'self-center', 'flex', 'flex-col', 'gap-1.5'],
      [1, 'text-[33px]', 'font-semibold', 'text-center', 'text-[#447794]'],
      [1, 'text-xs', 'text-white/80'],
      [1, 'style'],
      ['for', ''],
      [
        'type',
        'text',
        'required',
        '',
        'placeholder',
        'votre nom et prenom',
        'formControlName',
        'name',
      ],
      [
        'type',
        'password',
        'required',
        '',
        'placeholder',
        'votre mod de passe',
        'formControlName',
        'password',
      ],
      [1, 'flex', 'self-start', 'gap-3'],
      [1, 'danger'],
      ['type', 'submit', 3, 'disabled'],
      ['type', 'button'],
      [1, 'flex', 'flex-col', 'rounded-xs'],
      ['src', '/tn-06sanss.jpg', 'alt', '', 1, 'w-[350px]', 'self-end', 'h-[400px]'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'div', 0)(1, 'form', 1),
        Y('ngSubmit', function () {
          return r.onSumbit();
        }),
        v(2, 'div', 2)(3, 'div', 3)(4, 'h1', 4),
        m(5, 'Bienvenue'),
        g(),
        v(6, 'p', 5),
        m(7, ' entrer votre email et mot de passe pour accedes votre compte '),
        g()(),
        v(8, 'div', 6)(9, 'label', 7),
        m(10, ' nom et prenom '),
        g(),
        N(11, 'input', 8),
        g(),
        v(12, 'div', 6)(13, 'label', 7),
        m(14, ' password'),
        g(),
        N(15, 'input', 9),
        g(),
        v(16, 'div', 10),
        Ce(17, dS, 2, 0, 'div', 11),
        v(18, 'button', 12),
        m(19, "s'inscrire"),
        g(),
        v(20, 'button', 13),
        m(21, 'annuler'),
        g()()(),
        v(22, 'div', 14),
        N(23, 'img', 15),
        g()()()),
        t & 2 &&
          (D(),
          oe('formGroup', r.Form),
          D(16),
          be(r.verifname() || r.verifpassword() ? 17 : -1),
          D(),
          oe('disabled', r.Form.invalid));
    },
    dependencies: [on, lr, Pt, nn, cr, Sh, rn, kn],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer components{.style[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;gap:calc(var(--spacing) * 2);align-self:flex-start}.mini-card[_ngcontent-%COMP%]{display:flex;height:200px;width:250px;flex-direction:column;align-items:center;background-color:#061222!important;background-color:#123249;padding:calc(var(--spacing) * 2);text-align:center;color:#447794}.unique[_ngcontent-%COMP%]{display:flex;height:90%;width:55%;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--spacing) * 4);border-radius:var(--radius-2xl);background-color:#061222!important;padding:calc(var(--spacing) * 4)}.danger[_ngcontent-%COMP%]{display:flex;width:80%;align-items:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-lg);background-color:color-mix(in srgb,oklch(63.7% .237 25.331) 90%,transparent);padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);font-size:var(--text-sm);line-height:var(--tw-leading, var(--text-sm--line-height));color:var(--color-white);--tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}@supports (color: color-mix(in lab,red,red)){.danger[_ngcontent-%COMP%]{background-color:color-mix(in oklab,var(--color-red-500) 90%,transparent)}}}@layer base{input[_ngcontent-%COMP%]{width:100%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:17px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:14px;opacity:55%}label[_ngcontent-%COMP%]{font-size:17px;color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){label[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}h1[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{color:#447794}button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;--tw-gradient-from: #123249;--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-outline-style: solid;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
function fS(e, n) {
  if (e & 1) {
    let t = Mt();
    v(0, 'button', 14),
      Y('click', function () {
        nt(t);
        let o = Me();
        return rt(o.updatePlace());
      }),
      m(1, 'Confirmer'),
      g(),
      v(2, 'button', 15),
      Y('click', function () {
        nt(t);
        let o = Me();
        return rt(o.onCancel());
      }),
      m(3, 'annuler'),
      g();
  }
}
function pS(e, n) {
  if (e & 1) {
    let t = Mt();
    v(0, 'button', 15),
      Y('click', function () {
        nt(t);
        let o = Me();
        return rt(o.onCancel());
      }),
      m(1, 'retourner'),
      g();
  }
}
var Jl = class e {
  route = p(Xe);
  router = p(Se);
  ARC = p(ze);
  cdr = p(me);
  name = localStorage.getItem('name');
  place = {
    id: '',
    nom: '',
    prixEntree: 0,
    photo: '',
    localisation: '',
    dateConstruction: new Date(),
    description: '',
    commentaires: [],
  };
  ngOnInit() {
    let n = this.route.snapshot.paramMap.get('id');
    n &&
      this.ARC.getarchitecturalByID(n).subscribe((t) => {
        (this.place = k(w({}, t), {
          dateConstruction: new Date(t.dateConstruction),
          prixEntree: Number(t.prixEntree) || 0,
          description: t.description || '',
        })),
          this.cdr.detectChanges();
      }),
      console.log(this.place);
  }
  get dateString() {
    if (!this.place.dateConstruction) return '';
    let n = this.place.dateConstruction,
      t = (n.getMonth() + 1).toString().padStart(2, '0'),
      r = n.getDate().toString().padStart(2, '0');
    return `${n.getFullYear()}-${t}-${r}`;
  }
  set dateString(n) {
    this.place.dateConstruction = n ? new Date(n) : new Date();
  }
  updatePlace() {
    this.name
      ? this.place.id &&
        this.ARC.Updatearchitectural(this.place.id, this.place).subscribe({
          next: () => {
            alert('\u2705 Place mise \xE0 jour avec succ\xE8s !'),
              this.router.navigate(['/destination']);
          },
          error: (n) => console.error('Erreur de mise \xE0 jour:', n),
        })
      : this.router.navigate(['/form']).then(() => {
          window.location.reload(), this.cdr.detectChanges();
        });
  }
  onCancel() {
    this.router.navigate(['/destination']);
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-place']],
    decls: 32,
    vars: 8,
    consts: [
      [1, 'w-full', 'h-full', 'flex', 'flex-col'],
      [1, 'w-full', 'h-full', 'flex'],
      [1, 'w-[50%]', 'h-[100vh]'],
      ['alt', '', 1, 'w-full', 'h-full', 'rounded-r-lg', 3, 'src'],
      [
        1,
        'w-[50%]',
        'h-[100vh]',
        'p-4',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-[20px]',
      ],
      [1, 'style'],
      ['type', 'text', 'placeholder', 'Nom', 'name', 'nom', 3, 'ngModelChange', 'ngModel'],
      ['type', 'text', 'placeholder', 'Photo URL', 'name', 'photo', 3, 'ngModelChange', 'ngModel'],
      [
        'type',
        'text',
        'placeholder',
        'Localisation',
        'name',
        'localisation',
        3,
        'ngModelChange',
        'ngModel',
      ],
      ['type', 'text', 'name', 'dateConstruction', 3, 'ngModelChange', 'ngModel'],
      [
        'type',
        'number',
        'placeholder',
        "Prix d'entr\xE9e",
        'name',
        'prixEntree',
        3,
        'ngModelChange',
        'ngModel',
      ],
      [
        'type',
        'text',
        'placeholder',
        'Description',
        'name',
        'description',
        3,
        'ngModelChange',
        'ngModel',
      ],
      [1, 'flex', 'self-start', 'gap-4', 'font-semibold', 'font-sans'],
      ['type', 'button'],
      ['type', 'submit', 3, 'click'],
      ['type', 'button', 3, 'click'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'div', 0)(1, 'div', 1)(2, 'div', 2),
        N(3, 'img', 3),
        g(),
        v(4, 'div', 4)(5, 'div', 5)(6, 'label'),
        m(7, 'Nom'),
        g(),
        v(8, 'input', 6),
        Pn('ngModelChange', function (i) {
          return er(r.place.nom, i) || (r.place.nom = i), i;
        }),
        g()(),
        v(9, 'div', 5)(10, 'label'),
        m(11, 'Photo'),
        g(),
        v(12, 'input', 7),
        Pn('ngModelChange', function (i) {
          return er(r.place.photo, i) || (r.place.photo = i), i;
        }),
        g()(),
        v(13, 'div', 5)(14, 'label'),
        m(15, 'Localisation'),
        g(),
        v(16, 'input', 8),
        Pn('ngModelChange', function (i) {
          return er(r.place.localisation, i) || (r.place.localisation = i), i;
        }),
        g()(),
        v(17, 'div', 5)(18, 'label'),
        m(19, 'Date de construction'),
        g(),
        v(20, 'input', 9),
        Pn('ngModelChange', function (i) {
          return er(r.dateString, i) || (r.dateString = i), i;
        }),
        g()(),
        v(21, 'div', 5)(22, 'label'),
        m(23, "Prix d'entr\xE9e"),
        g(),
        v(24, 'input', 10),
        Pn('ngModelChange', function (i) {
          return er(r.place.prixEntree, i) || (r.place.prixEntree = i), i;
        }),
        g()(),
        v(25, 'div', 5)(26, 'label'),
        m(27, 'Description'),
        g(),
        v(28, 'input', 11),
        Pn('ngModelChange', function (i) {
          return er(r.place.description, i) || (r.place.description = i), i;
        }),
        g()(),
        v(29, 'div', 12),
        Ce(30, fS, 4, 0)(31, pS, 2, 0, 'button', 13),
        g()()()()),
        t & 2 &&
          (D(3),
          oe(
            'src',
            r.place.photo ||
              'https://upload.wikimedia.org/wikipedia/commons/9/9a/Giza_Plateau_-_Great_Sphinx_and_Pyramids.jpg',
            Qt
          ),
          D(5),
          On('ngModel', r.place.nom),
          D(4),
          On('ngModel', r.place.photo),
          D(4),
          On('ngModel', r.place.localisation),
          D(4),
          On('ngModel', r.dateString),
          D(4),
          On('ngModel', r.place.prixEntree),
          D(4),
          On('ngModel', r.place.description),
          D(2),
          be(r.name ? 30 : 31));
    },
    dependencies: [on, Pt, Hs, nn, Kl, Ih],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer components{.style[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;gap:calc(var(--spacing) * 2)}}@layer base{input[_ngcontent-%COMP%]{width:100%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:20px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height));opacity:55%}label[_ngcontent-%COMP%]{font-size:20px;color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){label[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;--tw-gradient-from: #123249;--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-outline-style: solid;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
function hS(e, n) {
  e & 1 && (v(0, 'div', 24), m(1, "il y'a un erreur"), g());
}
var Xl = class e {
  ARC = p(ze);
  list = [];
  router = p(Se);
  fb = p(ur);
  FormARC;
  cdr = p(me);
  name = localStorage.getItem('name');
  ngOnInit() {
    this.ARC.getarchitectural().subscribe((n) => {
      this.list = n;
    }),
      (this.FormARC = this.fb.nonNullable.group({
        nom: ['', [de.required, de.minLength(3)]],
        photo: ['', [de.required]],
        localisation: ['', [de.required]],
        dateConstruction: ['', de.required],
        prixEntree: ['', [de.required]],
        description: ['', [de.required]],
      }));
  }
  submitted = !1;
  Onajout() {
    if (((this.submitted = !0), !this.name))
      this.router.navigate(['/form']).then(() => {
        window.location.reload(), this.cdr.detectChanges();
      });
    else if (this.FormARC.valid) {
      let n = {
        id: (this.list.length + 1).toString(),
        nom: this.FormARC.value.nom,
        photo: this.FormARC.value.photo,
        localisation: this.FormARC.value.localisation,
        dateConstruction: new Date(this.FormARC.value.dateConstruction),
        prixEntree: this.FormARC.value.prixEntree,
        description: this.FormARC.value.description,
      };
      this.ARC.Addarchitectural(n).subscribe((t) => {
        this.list.push(t), this.router.navigate(['/destination']);
      });
    }
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-new-arc']],
    decls: 44,
    vars: 2,
    consts: [
      [1, 'w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'p-4'],
      [1, 'w-[50%]', 'h-[100vh]', 'grid', 'grid-cols-3', 'grid-rows-3', 'gap-0'],
      ['src', '/p2.jpg', 'alt', '', 1, 'w-full', 'h-full', 'rounded-tl-lg', 'object-cover'],
      ['src', '/JAMA31.jpg', 'alt', '', 1, 'w-full', 'h-full', 'object-cover'],
      ['src', '/p3.jpg', 'alt', '', 1, 'w-full', 'h-full', 'rounded-tr-lg', 'object-cover'],
      ['src', '/jama32.jpg', 'alt', '', 1, 'w-full', 'h-full', 'object-cover'],
      ['src', '/P4.jpg', 'alt', '', 1, 'w-full', 'h-full', 'object-cover'],
      ['src', '/sectionP1.jpg', 'alt', '', 1, 'w-full', 'h-full', 'object-cover'],
      ['src', '/sectionP2.jpg', 'alt', '', 1, 'w-full', 'h-full', 'rounded-bl-lg', 'object-cover'],
      ['src', '/tun.jpg', 'alt', '', 1, 'w-full', 'h-full', 'object-cover'],
      ['src', '/rock.jpg', 'alt', '', 1, 'w-full', 'h-full', 'rounded-br-lg', 'object-cover'],
      [
        1,
        'w-[50%]',
        'h-[100vh]',
        'p-4',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-[20px]',
        3,
        'ngSubmit',
        'formGroup',
      ],
      [1, 'font-bold', 'relative', 'top-4', 'text-2xl'],
      [1, 'style'],
      ['for', ''],
      ['type', 'text', 'placeholder', 'donner le nom', 'formControlName', 'nom'],
      ['type', 'text', 'placeholder', 'donner le photo', 'formControlName', 'photo'],
      ['type', 'text', 'placeholder', 'donner le Loacalisation', 'formControlName', 'localisation'],
      [
        'type',
        'date',
        'placeholder',
        'donner le date de construction',
        'formControlName',
        'dateConstruction',
      ],
      ['type', 'number', 'placeholder', "donner le prix d'entree", 'formControlName', 'prixEntree'],
      ['type', 'text', 'placeholder', 'donner le descrition ', 'formControlName', 'description'],
      [1, 'flex', 'self-start', 'gap-4', 'font-semibold', 'font-sans'],
      ['type', 'submit'],
      ['type', 'button'],
      [1, 'danger'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'div', 0)(1, 'div', 1),
        N(2, 'img', 2)(3, 'img', 3)(4, 'img', 4)(5, 'img', 5)(6, 'img', 6)(7, 'img', 7)(
          8,
          'img',
          8
        )(9, 'img', 9)(10, 'img', 10),
        g(),
        v(11, 'form', 11),
        Y('ngSubmit', function () {
          return r.Onajout();
        }),
        v(12, 'h1', 12),
        m(13, 'Nouvelle Architectural'),
        g(),
        v(14, 'div', 13)(15, 'label', 14),
        m(16, 'nom'),
        g(),
        N(17, 'input', 15),
        g(),
        v(18, 'div', 13)(19, 'label', 14),
        m(20, 'photo'),
        g(),
        N(21, 'input', 16),
        g(),
        v(22, 'div', 13)(23, 'label', 14),
        m(24, 'Loacalisation'),
        g(),
        N(25, 'input', 17),
        g(),
        v(26, 'div', 13)(27, 'label', 14),
        m(28, 'date de construction'),
        g(),
        N(29, 'input', 18),
        g(),
        v(30, 'div', 13)(31, 'label', 14),
        m(32, "prix d'entree"),
        g(),
        N(33, 'input', 19),
        g(),
        v(34, 'div', 13)(35, 'label', 14),
        m(36, 'descrition'),
        g(),
        N(37, 'input', 20),
        g(),
        v(38, 'div', 21)(39, 'button', 22),
        m(40, 'confimer'),
        g(),
        v(41, 'button', 23),
        m(42, 'annuler'),
        g()(),
        Ce(43, hS, 2, 0, 'div', 24),
        g()()),
        t & 2 &&
          (D(11),
          oe('formGroup', r.FormARC),
          D(32),
          be(r.FormARC.invalid && r.submitted ? 43 : -1));
    },
    dependencies: [on, lr, Pt, Hs, nn, cr, rn, kn],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer components{.style[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;gap:calc(var(--spacing) * 2)}}@layer base{input[_ngcontent-%COMP%]{width:100%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:20px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height));opacity:55%}label[_ngcontent-%COMP%]{font-size:20px;color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){label[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;--tw-gradient-from: #123249;--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}}.danger[_ngcontent-%COMP%]{display:flex;width:100%;align-items:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-lg);background-color:color-mix(in srgb,oklch(63.7% .237 25.331) 90%,transparent);padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);text-align:center;font-size:var(--text-sm);line-height:var(--tw-leading, var(--text-sm--line-height));color:var(--color-white);--tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}@supports (color: color-mix(in lab,red,red)){.danger[_ngcontent-%COMP%]{background-color:color-mix(in oklab,var(--color-red-500) 90%,transparent)}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-outline-style: solid;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
function gS(e, n) {
  if ((e & 1 && (v(0, 'div', 12)(1, 'p', 13), m(2), g(), v(3, 'p', 14), m(4), g()()), e & 2)) {
    let t = n.$implicit;
    D(2), Ee(t == null ? null : t.nom), D(2), Ee(t == null ? null : t.message);
  }
}
function mS(e, n) {
  if ((e & 1 && Eo(0, gS, 5, 2, 'div', 12, Po), e & 2)) {
    let t = Me();
    Do(t.place.commentaires);
  }
}
function vS(e, n) {
  if (
    (e & 1 &&
      (v(0, 'div', 8)(1, 'div', 15)(2, 'label', 16),
      m(3, 'Nom'),
      g(),
      N(4, 'input', 17),
      g(),
      v(5, 'div', 15)(6, 'label', 16),
      m(7, 'Message'),
      g(),
      N(8, 'textarea', 18),
      g()()),
    e & 2)
  ) {
    let t = n.$index;
    oe('formGroupName', t);
  }
}
function _S(e, n) {
  e & 1 &&
    (v(0, 'div', 10), m(1, ' le nom et message doivent contient au moins 4 caracters '), g());
}
var eu = class e {
  route = p(Xe);
  Form;
  FB = p(ur);
  ARC = p(ze);
  cdr = p(me);
  place = {
    id: '',
    nom: '',
    prixEntree: 0,
    photo: '',
    localisation: '',
    dateConstruction: new Date(),
    description: '',
    commentaires: [],
  };
  ngOnInit() {
    this.Form = this.FB.nonNullable.group({ commentaires: this.FB.array([]) });
    let n = this.route.snapshot.paramMap.get('id');
    n &&
      this.ARC.getarchitecturalByID(n).subscribe((t) => {
        (this.place = k(w({}, t), { commentaires: t.commentaires || [] })),
          this.cdr.detectChanges();
      });
  }
  get getcommentaires() {
    return this.Form.get('commentaires');
  }
  addComent() {
    let n = this.FB.group({
      nom: ['', [de.required, de.minLength(4)]],
      message: ['', [de.required, de.minLength(4)]],
    });
    this.getcommentaires.push(n);
  }
  submitted = !1;
  AddCOM() {
    if (((this.submitted = !0), !this.Form.valid)) return;
    let n = [...(this.place.commentaires || []), ...this.getcommentaires.value];
    this.place.id &&
      ((this.place = k(w({}, this.place), { commentaires: n })),
      this.ARC.Updatearchitectural(this.place.id, this.place).subscribe({
        next: () => {
          this.cdr.detectChanges(), alert('\u2705 Place mise \xE0 jour avec succ\xE8s !');
        },
        error: (t) => console.error('Erreur de mise \xE0 jour:', t),
      }));
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-commentair']],
    decls: 17,
    vars: 5,
    consts: [
      [1, 'w-full', 'h-full', 'flex', 'flex-col', 'p-3', 'justify-center', 'items-center', 'gap-3'],
      [1, 'text-3xl'],
      [1, 'flex', 'justify-center'],
      ['alt', '', 1, 'w-[80%]', 'h-[80]', 'rounded-lg', 3, 'src'],
      [1, 'text-center', 'mb-4', 'w-[80%]', 'flex', 'flex-col', 'gap-3'],
      [1, 'w-[80%]'],
      [1, 'flex', 'flex-col', 'gap-5', 3, 'ngSubmit', 'formGroup'],
      ['formArrayName', 'commentaires'],
      [3, 'formGroupName'],
      ['type', 'button', 3, 'click'],
      [1, 'danger'],
      ['type', 'submit'],
      [1, 'con'],
      [1, 'p1'],
      [1, 'p2'],
      [1, 'style'],
      ['for', ''],
      ['type', 'text', 'placeholder', 'votre nom', 'formControlName', 'nom'],
      ['name', '', 'id', '', 'formControlName', 'message'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'div', 0)(1, 'h1', 1),
        m(2),
        g(),
        v(3, 'div', 2),
        N(4, 'img', 3),
        g(),
        v(5, 'div', 4),
        Ce(6, mS, 2, 0),
        g(),
        v(7, 'div', 5)(8, 'form', 6),
        Y('ngSubmit', function () {
          return r.AddCOM();
        }),
        v(9, 'div', 7),
        Eo(10, vS, 9, 1, 'div', 8, Po),
        v(12, 'button', 9),
        Y('click', function () {
          return r.addComent();
        }),
        m(13, 'addcoment'),
        g()(),
        Ce(14, _S, 2, 0, 'div', 10),
        v(15, 'button', 11),
        m(16, 'Ajouter'),
        g()()()()),
        t & 2 &&
          (D(2),
          Ee(r.place.nom),
          D(2),
          oe('src', r.place.photo, Qt),
          D(2),
          be(r.place.commentaires ? 6 : -1),
          D(2),
          oe('formGroup', r.Form),
          D(2),
          Do(r.getcommentaires.controls),
          D(4),
          be(r.Form.invalid && r.Form.touched && r.submitted ? 14 : -1));
    },
    dependencies: [on, lr, Pt, nn, cr, rn, kn, Zl, Yl],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@layer components{.style[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;gap:calc(var(--spacing) * 2)}.con[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;align-self:flex-start;border-radius:var(--radius-xl);background-color:#123249;padding:calc(var(--spacing) * 2)}.p1[_ngcontent-%COMP%]{align-self:flex-start;font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height));--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold);color:color-mix(in srgb,oklch(92.8% .006 264.531) 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.p1[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-gray-200) 80%,transparent)}}.p2[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height));color:var(--color-gray-200)}.danger[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-lg);background-color:color-mix(in srgb,oklch(63.7% .237 25.331) 60%,transparent);padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);text-align:center;font-size:var(--text-sm);line-height:var(--tw-leading, var(--text-sm--line-height));color:var(--color-white);--tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}@supports (color: color-mix(in lab,red,red)){.danger[_ngcontent-%COMP%]{background-color:color-mix(in oklab,var(--color-red-500) 60%,transparent)}}}@layer base{input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{width:100%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:20px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height));opacity:55%}label[_ngcontent-%COMP%]{font-size:20px;color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){label[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;--tw-gradient-from: #123249;--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-outline-style: solid;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
var tu = class e {
  transform(n) {
    if (!n) return '';
    let t = n.toString();
    return (parseInt(t.split(':')[0]) >= 12 ? '\u{1F31C}' : '\u{1F31E}') + ' ' + t;
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵpipe = Cn({ name: 'sun', type: e, pure: !0 });
};
var nu = class e {
  transform(n) {
    return n ? (n < 16 ? '\u2744\uFE0F ' + n + 'C\xB0' : '\u{1F525}' + n + 'C\xB0') : '';
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵpipe = Cn({ name: 'temp', type: e, pure: !0 });
};
var ru = class e {
  place;
  route = p(Xe);
  ARC = p(ze);
  cdr = p(me);
  weather;
  dataplace = { cityname: '', sunrise: '', sunset: '', temp: '' };
  lat;
  lng;
  ngOnInit() {
    let n = this.route.snapshot.paramMap.get('id');
    n &&
      this.ARC.getarchitecturalByID(n).subscribe((t) => {
        (this.place = t), this.cdr.detectChanges();
        let r = this.extractLatLng(t.localisation);
        r &&
          ((this.lat = r[0]),
          (this.lng = r[1]),
          this.ARC.getWeather(this.lat, this.lng).subscribe((o) => {
            (this.weather = o), this.cdr.detectChanges();
            let i = this.weather.data[0];
            (this.dataplace = {
              cityname: i.city_name,
              sunrise: i.sunrise,
              sunset: i.sunset,
              temp: i.temp,
            }),
              this.cdr.detectChanges();
          }));
      });
  }
  extractLatLng(n) {
    let t = /@(-?\d+\.\d+),(-?\d+\.\d+),/,
      r = n.match(t);
    return r
      ? [parseFloat(r[1]), parseFloat(r[2])]
      : (console.log('Coordinates not found in URL'), null);
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-place-map']],
    decls: 50,
    vars: 20,
    consts: [
      [1, 'w-full', 'h-full', 'flex', 'flex-col', 'p-3', 'justify-center', 'items-center', 'gap-3'],
      [1, 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4', 'w-[50%]'],
      [1, 'flex', 'justify-center', 'w-fit', 'h-fit'],
      ['alt', 'Place photo', 1, 'w-full', 'h-full', 'rounded-lg', 3, 'src'],
      [
        1,
        'flex',
        'flex-col',
        'self-start',
        'gap-7',
        'w-full',
        'bg-[#123249]',
        'rounded-lg',
        'p-2',
        'h-[80px]',
      ],
      [1, 'text-white/80', 'text-lg'],
      [1, 'text-white/90', 'text-[20px]', 'text-center', '-translate-y-8'],
      [1, 'rounded-lg', 'p-2', 'flex', 'flex-col', 'self-start', 'gap-7', 'h-[60px]', 'w-full'],
      [1, 'text-white/90', 'text-[20px]', 'text-center', '-translate-y-10'],
      [
        1,
        'rounded-lg',
        'p-2',
        'flex',
        'flex-col',
        'self-start',
        'gap-7',
        'bg-[#123249]',
        'w-full',
        'h-[80px]',
      ],
      [1, 'rounded-lg', 'p-2', 'flex', 'flex-col', 'self-start', 'gap-7', 'w-full'],
      [1, 'text-white/90', 'text-[20px]', 'text-center'],
      [1, 'flex', 'flex-col', 'self-start', 'gap-7', 'w-full'],
      [1, 'rounded-lg', 'p-2', 'flex', 'flex-col', 'bg-[#123249]', 'w-full'],
      [1, 'text-white/90', 'text-[20px]', 'text-center', '-translate-y-2.5'],
      [1, 'rounded-lg', 'p-2', 'flex', 'flex-col', 'w-full'],
    ],
    template: function (t, r) {
      t & 1 &&
        (q(0, 'div', 0)(1, 'div', 1)(2, 'div', 2),
        kc(3, 'img', 3),
        Z(),
        q(4, 'div', 4)(5, 'p', 5),
        m(6, 'Nom:'),
        Z(),
        q(7, 'p', 6),
        m(8),
        Z()(),
        q(9, 'div', 7)(10, 'p', 5),
        m(11, 'Prix:'),
        Z(),
        q(12, 'p', 8),
        m(13),
        En(14, 'mypipe'),
        Z()(),
        q(15, 'div', 9)(16, 'p', 5),
        m(17, 'date de construction:'),
        Z(),
        q(18, 'p', 6),
        m(19),
        En(20, 'date'),
        Z()(),
        q(21, 'div', 10)(22, 'p', 5),
        m(23, 'Description:'),
        Z(),
        q(24, 'p', 11),
        m(25),
        Z()(),
        q(26, 'div', 12)(27, 'div', 13)(28, 'p', 5),
        m(29, 'Place '),
        Z(),
        q(30, 'p', 14),
        m(31),
        Z()(),
        q(32, 'div', 15)(33, 'p', 5),
        m(34, 'Lever du soleil:'),
        Z(),
        q(35, 'p', 11),
        m(36),
        En(37, 'sun'),
        Z()(),
        q(38, 'div', 13)(39, 'p', 5),
        m(40, 'Coucher du soleil:'),
        Z(),
        q(41, 'p', 11),
        m(42),
        En(43, 'sun'),
        Z()(),
        q(44, 'div', 15)(45, 'p', 5),
        m(46, 'Temperature:'),
        Z(),
        q(47, 'p', 11),
        m(48),
        En(49, 'temp'),
        Z()()()()()),
        t & 2 &&
          (D(3),
          Rc('src', r.place.photo, Qt),
          D(5),
          Ee(r.place.nom),
          D(5),
          Ee(tr(14, 9, r.place.prixEntree + '')),
          D(6),
          Ee(vp(20, 11, r.place.dateConstruction, 'dd MMMM yyyy')),
          D(6),
          Ee(r.place.description),
          D(6),
          Ee(r.dataplace == null ? null : r.dataplace.cityname),
          D(5),
          Ee(tr(37, 14, r.dataplace.sunrise)),
          D(6),
          Ee(tr(43, 16, r.dataplace == null ? null : r.dataplace.sunset)),
          D(6),
          Ee(tr(49, 18, r.dataplace == null ? null : r.dataplace.temp)));
    },
    dependencies: [tu, nu, Dp, Qo],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial}}}

`,
    ],
  });
};
function wS(e, n) {
  e & 1 && (v(0, 'div', 6), m(1, 'au moins 4 caracters '), g());
}
var ou = class e {
  password = localStorage.getItem('password');
  name = localStorage.getItem('name');
  ARC = p(ze);
  fb = p(ur);
  route = p(Se);
  Form;
  authAdmin = [];
  ngOnInit() {
    this.ARC.getAdmins().subscribe((n) => {
      this.authAdmin = n;
    }),
      (this.Form = this.fb.nonNullable.group({ Nouvpass: ['', [de.required, de.minLength(4)]] }));
  }
  ChangePass() {
    if (this.Form.invalid) return;
    let n = k(w({}, this.authAdmin[0]), { password: this.Form.value.Nouvpass });
    this.ARC.Updateadmin(n).subscribe({
      next: (t) => {
        console.log('Password updated on server:', t),
          localStorage.setItem('password', this.Form.value.Nouvpass),
          this.route.navigate(['/']);
      },
      error: (t) => console.error('Error updating password:', t),
    });
  }
  get passwordA() {
    return this.Form.get('Nouvpass');
  }
  Verif() {
    return this.passwordA?.touched && this.passwordA.invalid;
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-new-pass']],
    decls: 12,
    vars: 2,
    consts: [
      [1, 'w-full', 'h-full', 'flex', 'flex-col', 'justify-center', 'items-center'],
      [
        1,
        'w-[40%]',
        'h-[40vh]',
        'flex',
        'justify-between',
        'items-center',
        'bg-[#123249]',
        'rounded-2xl',
        'px-5',
        'gap-2',
      ],
      [1, 'unique', 3, 'ngSubmit', 'formGroup'],
      [1, 'style'],
      ['for', ''],
      ['type', 'text', 'formControlName', 'Nouvpass'],
      [1, 'danger'],
      ['type', 'submit'],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'div', 0)(1, 'h1'),
        m(2, 'Changer le Mot de Passe'),
        g(),
        v(3, 'div', 1)(4, 'form', 2),
        Y('ngSubmit', function () {
          return r.ChangePass();
        }),
        v(5, 'div', 3)(6, 'label', 4),
        m(7, 'Nouveau mot de passe'),
        g(),
        N(8, 'input', 5),
        Ce(9, wS, 2, 0, 'div', 6),
        v(10, 'button', 7),
        m(11, 'confirme'),
        g()()()()()),
        t & 2 && (D(4), oe('formGroup', r.Form), D(5), be(r.Verif() ? 9 : -1));
    },
    dependencies: [Kl, lr, Pt, nn, cr, on, rn, kn],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}.danger[_ngcontent-%COMP%]{display:flex;width:100%;align-items:center;gap:calc(var(--spacing) * 2);border-radius:var(--radius-lg);background-color:color-mix(in srgb,oklch(63.7% .237 25.331) 90%,transparent);padding-inline:calc(var(--spacing) * 3);padding-block:calc(var(--spacing) * 2);text-align:center;font-size:var(--text-sm);line-height:var(--tw-leading, var(--text-sm--line-height));color:var(--color-white);--tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}@supports (color: color-mix(in lab,red,red)){.danger[_ngcontent-%COMP%]{background-color:color-mix(in oklab,var(--color-red-500) 90%,transparent)}}.style[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:calc(var(--spacing) * 4)}.unique[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--spacing) * 4);align-self:center;border-radius:var(--radius-2xl);background-color:#061222!important;padding:calc(var(--spacing) * 4)}input[_ngcontent-%COMP%]{width:100%;border-radius:5px;border-color:#447794;padding:calc(var(--spacing) * 1.5);font-size:17px;outline-style:var(--tw-outline-style);outline-width:1px;outline-color:color-mix(in oklab,#447794 80%,transparent)}input[_ngcontent-%COMP%]::placeholder{padding:calc(var(--spacing) * 1.5);font-size:14px;opacity:55%}label[_ngcontent-%COMP%]{font-size:17px;color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){label[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#2a6584;background-color:#123249;--tw-gradient-from: #123249;--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:var(--color-white);--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){button[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-outline-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-outline-style: solid;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
var y0 = [
  { path: 'acceuil', title: 'acceuil', component: Il },
  { path: 'destination', title: 'destination', component: Tl },
  { path: 'place/:id', title: 'place', component: Jl },
  { path: 'commentaire/:id', title: 'commetaire', component: eu },
  { path: 'place-weather/:id', title: 'place-map', component: ru },
  { path: 'admins/:id', title: 'admin', component: ou },
  { path: 'nouveauPlace', title: 'nouveauPlace', component: Xl },
  { path: 'propos', title: 'propos', component: Al },
  { path: 'form', title: 'form', component: Ql },
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: '**', title: 'erreur', component: Nl },
];
var C0 = { providers: [Td(), yp(), ph(y0), Up()] };
var yS = () => ['/admins', '1'];
function CS(e, n) {
  if (e & 1) {
    let t = Mt();
    v(0, 'button', 9),
      Y('click', function () {
        nt(t);
        let o = Me();
        return rt(o.del());
      }),
      m(1, ' deconnexion '),
      g(),
      v(2, 'h3', 10),
      m(3),
      g();
  }
  if (e & 2) {
    let t = Me();
    D(2), oe('routerLink', mp(2, yS)), D(), Ee(t.name);
  }
}
function bS(e, n) {
  e & 1 && (v(0, 'button', 8), m(1, 'connexion'), g());
}
var iu = class e {
  name = null;
  router = p(Se);
  cdr = p(me);
  ngOnInit() {
    this.getName();
  }
  getName() {
    this.name = localStorage.getItem('name');
  }
  del() {
    localStorage.clear(),
      this.router.navigate(['/']).then(() => {
        window.location.reload(), this.cdr.detectChanges();
      });
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-header']],
    decls: 14,
    vars: 1,
    consts: [
      [1, 'flex', 'justify-between', 'p-3', 'items-center', 'app'],
      [1, 'flex', 'items-center', 'gap-3', 'appear'],
      ['src', '/p1.jpg', 'alt', 'logo', 'width', '60', 1, 'rounded-md'],
      [1, 'flex', 'gap-[5vw]', 'appear', 'translate-x-16'],
      [
        'routerLink',
        '/acceuil',
        'routerLinkActive',
        'active',
        1,
        'appear',
        '[animation-delay:calc(1*150ms)]',
      ],
      [
        'routerLink',
        '/destination',
        'routerLinkActive',
        'active',
        1,
        'appear',
        '[animation-delay:calc(2*150ms)]',
      ],
      [
        'routerLink',
        '/propos',
        'routerLinkActive',
        'active',
        1,
        'appear',
        '[animation-delay:calc(3*150ms)]',
      ],
      [1, 'flex', 'gap-3', 'appear'],
      ['type', 'button', 'routerLink', '/form', 1, 'text-white'],
      ['type', 'button', 'routerLink', '/form', 1, 'text-white', 'bg-red-700', 3, 'click'],
      [
        'type',
        'button',
        1,
        'text-white',
        'font-bold',
        'self-center',
        'cursor-pointer',
        3,
        'routerLink',
      ],
    ],
    template: function (t, r) {
      t & 1 &&
        (v(0, 'header', 0)(1, 'div', 1),
        N(2, 'img', 2),
        g(),
        v(3, 'nav', 3)(4, 'p', 4),
        m(5, 'Acceuil'),
        g(),
        v(6, 'p', 5),
        m(7, 'Destinations'),
        g(),
        v(8, 'p', 6),
        m(9, 'A propos'),
        g()(),
        v(10, 'div', 7),
        Ce(11, CS, 4, 3)(12, bS, 2, 0, 'button', 8),
        g()(),
        N(13, 'router-outlet')),
        t & 2 && (D(11), be(r.name ? 11 : 12));
    },
    dependencies: [Ur, it, fh],
    styles: [
      `@layer properties;@layer theme,base,components,utilities;@layer theme{[_ngcontent-%COMP%]:root, [_nghost-%COMP%]{--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-500: oklch(63.7% .237 25.331);--color-red-600: oklch(57.7% .245 27.325);--color-red-700: oklch(50.5% .213 27.518);--color-gray-200: oklch(92.8% .006 264.531);--color-white: #fff;--spacing: .25rem;--text-xs: .75rem;--text-xs--line-height: calc(1 / .75);--text-sm: .875rem;--text-sm--line-height: calc(1.25 / .875);--text-lg: 1.125rem;--text-lg--line-height: calc(1.75 / 1.125);--text-xl: 1.25rem;--text-xl--line-height: calc(1.75 / 1.25);--text-2xl: 1.5rem;--text-2xl--line-height: calc(2 / 1.5);--text-3xl: 1.875rem;--text-3xl--line-height: 1.2 ;--font-weight-semibold: 600;--font-weight-bold: 700;--tracking-wide: .025em;--radius-xs: .125rem;--radius-md: .375rem;--radius-lg: .5rem;--radius-xl: .75rem;--radius-2xl: 1rem;--default-transition-duration: .15s;--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);--default-font-family: var(--font-sans);--default-mono-font-family: var(--font-mono)}}@layer base{*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]::backdrop, [_ngcontent-%COMP%]::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid}html[_ngcontent-%COMP%], [_nghost-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings, normal);font-variation-settings:var(--default-font-variation-settings, normal);-webkit-tap-highlight-color:transparent}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings, normal);font-variation-settings:var(--default-mono-font-variation-settings, normal);font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}progress[_ngcontent-%COMP%]{vertical-align:baseline}summary[_ngcontent-%COMP%]{display:list-item}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], [_ngcontent-%COMP%]::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]{font-weight:bolder}:where(select[_ngcontent-%COMP%]:is([multiple],[size]))   optgroup[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]{padding-inline-start:20px}[_ngcontent-%COMP%]::file-selector-button{margin-inline-end:4px}[_ngcontent-%COMP%]::placeholder{opacity:1}@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px){[_ngcontent-%COMP%]::placeholder{color:currentcolor}@supports (color: color-mix(in lab,red,red)){{%BLOCK%}}}textarea[_ngcontent-%COMP%]{resize:vertical}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}[_ngcontent-%COMP%]::-webkit-datetime-edit{display:inline-flex}[_ngcontent-%COMP%]::-webkit-datetime-edit-fields-wrapper{padding:0}[_ngcontent-%COMP%]::-webkit-datetime-edit, [_ngcontent-%COMP%]::-webkit-datetime-edit-year-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-month-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-day-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-hour-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-minute-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-second-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-millisecond-field, [_ngcontent-%COMP%]::-webkit-datetime-edit-meridiem-field{padding-block:0}[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{line-height:1}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]:where([type=button],[type=reset],[type=submit]), [_ngcontent-%COMP%]::file-selector-button{appearance:button}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[hidden][_ngcontent-%COMP%]:where(:not([hidden=until-found])){display:none!important}}@layer utilities{.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.static[_ngcontent-%COMP%]{position:static}.top-0[_ngcontent-%COMP%]{top:calc(var(--spacing) * 0)}.top-4[_ngcontent-%COMP%]{top:calc(var(--spacing) * 4)}.top-9[_ngcontent-%COMP%]{top:calc(var(--spacing) * 9)}.top-\\__ph-0__[_ngcontent-%COMP%]{top:30px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:33px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:80px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:90px}.top-\\__ph-0__[_ngcontent-%COMP%]{top:100px}.right-2[_ngcontent-%COMP%]{right:calc(var(--spacing) * 2)}.left-0[_ngcontent-%COMP%]{left:calc(var(--spacing) * 0)}.left-32[_ngcontent-%COMP%]{left:calc(var(--spacing) * 32)}.left-48[_ngcontent-%COMP%]{left:calc(var(--spacing) * 48)}.left-\\__ph-0__[_ngcontent-%COMP%]{left:33px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:120px}.left-\\__ph-0__[_ngcontent-%COMP%]{left:143px}.my-10[_ngcontent-%COMP%]{margin-block:calc(var(--spacing) * 10)}.mb-4[_ngcontent-%COMP%]{margin-bottom:calc(var(--spacing) * 4)}.flex[_ngcontent-%COMP%]{display:flex}.grid[_ngcontent-%COMP%]{display:grid}.inline[_ngcontent-%COMP%]{display:inline}.h-\\__ph-0__[_ngcontent-%COMP%]{height:30%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:40vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60%}.h-\\__ph-0__[_ngcontent-%COMP%]{height:60px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:65vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80}.h-\\__ph-0__[_ngcontent-%COMP%]{height:80px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:90vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:100vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:110vh}.h-\\__ph-0__[_ngcontent-%COMP%]{height:250px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:300px}.h-\\__ph-0__[_ngcontent-%COMP%]{height:400px}.h-fit[_ngcontent-%COMP%]{height:fit-content}.h-full[_ngcontent-%COMP%]{height:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:40%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:50%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:70%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:80%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:100%}.w-\\__ph-0__[_ngcontent-%COMP%]{width:250px}.w-\\__ph-0__[_ngcontent-%COMP%]{width:350px}.w-fit[_ngcontent-%COMP%]{width:fit-content}.w-full[_ngcontent-%COMP%]{width:100%}.-translate-x-3[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -3);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-x-28[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * -28);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-15[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 15);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-16[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-x-50[_ngcontent-%COMP%]{--tw-translate-x: calc(var(--spacing) * 50);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-2\\.5[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -2.5);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-8[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -8);translate:var(--tw-translate-x) var(--tw-translate-y)}.-translate-y-10[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * -10);translate:var(--tw-translate-x) var(--tw-translate-y)}.translate-y-16[_ngcontent-%COMP%]{--tw-translate-y: calc(var(--spacing) * 16);translate:var(--tw-translate-x) var(--tw-translate-y)}.transform[_ngcontent-%COMP%]{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.grid-cols-2[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-rows-3[_ngcontent-%COMP%]{grid-template-rows:repeat(3,minmax(0,1fr))}.flex-col[_ngcontent-%COMP%]{flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-around[_ngcontent-%COMP%]{justify-content:space-around}.justify-between[_ngcontent-%COMP%]{justify-content:space-between}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-0[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 0)}.gap-1[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1)}.gap-1\\.5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 1.5)}.gap-2[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 2)}.gap-3[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 3)}.gap-4[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 4)}.gap-5[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 5)}.gap-6[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 6)}.gap-7[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 7)}.gap-10[_ngcontent-%COMP%]{gap:calc(var(--spacing) * 10)}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:5vw}.gap-\\__ph-0__[_ngcontent-%COMP%]{gap:20px}.self-center[_ngcontent-%COMP%]{align-self:center}.self-end[_ngcontent-%COMP%]{align-self:flex-end}.self-start[_ngcontent-%COMP%]{align-self:flex-start}.justify-self-start[_ngcontent-%COMP%]{justify-self:flex-start}.rounded-2xl[_ngcontent-%COMP%]{border-radius:var(--radius-2xl)}.rounded-lg[_ngcontent-%COMP%]{border-radius:var(--radius-lg)}.rounded-md[_ngcontent-%COMP%]{border-radius:var(--radius-md)}.rounded-xs[_ngcontent-%COMP%]{border-radius:var(--radius-xs)}.rounded-tl-lg[_ngcontent-%COMP%]{border-top-left-radius:var(--radius-lg)}.rounded-r-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg);border-bottom-right-radius:var(--radius-lg)}.rounded-tr-lg[_ngcontent-%COMP%]{border-top-right-radius:var(--radius-lg)}.rounded-br-lg[_ngcontent-%COMP%]{border-bottom-right-radius:var(--radius-lg)}.rounded-bl-lg[_ngcontent-%COMP%]{border-bottom-left-radius:var(--radius-lg)}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#2d5b75}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#15445f}.bg-\\__ph-0__[_ngcontent-%COMP%]{background-color:#123249}.bg-red-700[_ngcontent-%COMP%]{background-color:var(--color-red-700)}.from-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-from: #123249;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.to-\\__ph-0__[_ngcontent-%COMP%]{--tw-gradient-to: #2D5B75;--tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))}.object-cover[_ngcontent-%COMP%]{object-fit:cover}.p-2[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 2)}.p-3[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 3)}.p-4[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 4)}.p-5[_ngcontent-%COMP%]{padding:calc(var(--spacing) * 5)}.px-5[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 5)}.px-6[_ngcontent-%COMP%]{padding-inline:calc(var(--spacing) * 6)}.text-center[_ngcontent-%COMP%]{text-align:center}.font-sans[_ngcontent-%COMP%]{font-family:var(--font-sans)}.text-2xl[_ngcontent-%COMP%]{font-size:var(--text-2xl);line-height:var(--tw-leading, var(--text-2xl--line-height))}.text-3xl[_ngcontent-%COMP%]{font-size:var(--text-3xl);line-height:var(--tw-leading, var(--text-3xl--line-height))}.text-lg[_ngcontent-%COMP%]{font-size:var(--text-lg);line-height:var(--tw-leading, var(--text-lg--line-height))}.text-xl[_ngcontent-%COMP%]{font-size:var(--text-xl);line-height:var(--tw-leading, var(--text-xl--line-height))}.text-xs[_ngcontent-%COMP%]{font-size:var(--text-xs);line-height:var(--tw-leading, var(--text-xs--line-height))}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:10px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:13px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:20px}.text-\\__ph-0__[_ngcontent-%COMP%]{font-size:33px}.leading-9[_ngcontent-%COMP%]{--tw-leading: calc(var(--spacing) * 9);line-height:calc(var(--spacing) * 9)}.font-bold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-semibold[_ngcontent-%COMP%]{--tw-font-weight: var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide[_ngcontent-%COMP%]{--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-\\__ph-0__[_ngcontent-%COMP%]{color:#447794}.text-\\__ph-0__\\/85[_ngcontent-%COMP%]{color:color-mix(in oklab,#e6e6e6 85%,transparent)}.text-white[_ngcontent-%COMP%]{color:var(--color-white)}.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 70%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/70[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 70%,transparent)}}.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 80%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/80[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.text-white\\/90[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}.shadow-lg[_ngcontent-%COMP%]{--tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-md[_ngcontent-%COMP%]{--tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / .1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / .1));box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.blur[_ngcontent-%COMP%]{--tw-blur: blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter[_ngcontent-%COMP%]{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition[_ngcontent-%COMP%]{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease, var(--default-transition-timing-function));transition-duration:var(--tw-duration, var(--default-transition-duration))}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.15s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:.3s}.\\__ph-0__[_ngcontent-%COMP%]{animation-delay:calc(3 * .15s)}@media (hover: hover){.hover\\:bg-\\__ph-0__[_ngcontent-%COMP%]:hover{background-color:#061222}}@media (hover: hover){.hover\\:bg-red-600[_ngcontent-%COMP%]:hover{background-color:var(--color-red-600)}}@media (hover: hover){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right;background-image:linear-gradient(var(--tw-gradient-stops))}@supports (background-image: linear-gradient(in lab,red,red)){.hover\\:bg-linear-to-r[_ngcontent-%COMP%]:hover{--tw-gradient-position: to right in oklab}}}@media (hover: hover){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in srgb,#fff 90%,transparent)}@supports (color: color-mix(in lab,red,red)){.hover\\:text-white\\/90[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,var(--color-white) 90%,transparent)}}}}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{font-family:sans-serif}@layer base{button[_ngcontent-%COMP%]{cursor:pointer;border-radius:var(--radius-2xl);border-style:var(--tw-border-style);border-width:1px;border-color:#447794;padding-inline:calc(var(--spacing) * 5);padding-block:calc(var(--spacing) * 2);color:#447794;--tw-duration: .2s;transition-duration:.2s}@media (hover: hover){button[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}p[_ngcontent-%COMP%]{cursor:pointer;--tw-tracking: var(--tracking-wide);letter-spacing:var(--tracking-wide);color:color-mix(in srgb,#fff 80%,transparent);opacity:0%;--tw-duration: .1s;transition-duration:.1s}@supports (color: color-mix(in lab,red,red)){p[_ngcontent-%COMP%]{color:color-mix(in oklab,var(--color-white) 80%,transparent)}}@media (hover: hover){p[_ngcontent-%COMP%]:hover{--tw-translate-y: calc(var(--spacing) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}}@media (hover: hover){p[_ngcontent-%COMP%]:hover{border-bottom-style:var(--tw-border-style);border-bottom-width:2px}}@media (hover: hover){p[_ngcontent-%COMP%]:hover{color:color-mix(in oklab,#447794 80%,transparent)}}}@keyframes _ngcontent-%COMP%_appear{0%{opacity:0;transform:translateY(-330px)}to{opacity:1;transform:translateY(0)}}@layer components{.appear[_ngcontent-%COMP%]{animation-name:appear;animation-duration:1s;animation-iteration-count:1;animation-timing-function:ease-in-out;animation-fill-mode:forwards}.active[_ngcontent-%COMP%]{border-bottom-style:var(--tw-border-style);border-bottom-width:2px;color:color-mix(in oklab,#447794 80%,transparent)}}@property --tw-translate-x{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-y{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-translate-z{syntax: "*"; inherits: false; initial-value: 0;}@property --tw-rotate-x{syntax: "*"; inherits: false;}@property --tw-rotate-y{syntax: "*"; inherits: false;}@property --tw-rotate-z{syntax: "*"; inherits: false;}@property --tw-skew-x{syntax: "*"; inherits: false;}@property --tw-skew-y{syntax: "*"; inherits: false;}@property --tw-gradient-position{syntax: "*"; inherits: false;}@property --tw-gradient-from{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-via{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-to{syntax: "<color>"; inherits: false; initial-value: #0000;}@property --tw-gradient-stops{syntax: "*"; inherits: false;}@property --tw-gradient-via-stops{syntax: "*"; inherits: false;}@property --tw-gradient-from-position{syntax: "<length-percentage>"; inherits: false; initial-value: 0%;}@property --tw-gradient-via-position{syntax: "<length-percentage>"; inherits: false; initial-value: 50%;}@property --tw-gradient-to-position{syntax: "<length-percentage>"; inherits: false; initial-value: 100%;}@property --tw-leading{syntax: "*"; inherits: false;}@property --tw-font-weight{syntax: "*"; inherits: false;}@property --tw-tracking{syntax: "*"; inherits: false;}@property --tw-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-shadow-color{syntax: "*"; inherits: false;}@property --tw-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-inset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-shadow-color{syntax: "*"; inherits: false;}@property --tw-inset-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-ring-color{syntax: "*"; inherits: false;}@property --tw-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-inset-ring-color{syntax: "*"; inherits: false;}@property --tw-inset-ring-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-ring-inset{syntax: "*"; inherits: false;}@property --tw-ring-offset-width{syntax: "<length>"; inherits: false; initial-value: 0px;}@property --tw-ring-offset-color{syntax: "*"; inherits: false; initial-value: #fff;}@property --tw-ring-offset-shadow{syntax: "*"; inherits: false; initial-value: 0 0 #0000;}@property --tw-blur{syntax: "*"; inherits: false;}@property --tw-brightness{syntax: "*"; inherits: false;}@property --tw-contrast{syntax: "*"; inherits: false;}@property --tw-grayscale{syntax: "*"; inherits: false;}@property --tw-hue-rotate{syntax: "*"; inherits: false;}@property --tw-invert{syntax: "*"; inherits: false;}@property --tw-opacity{syntax: "*"; inherits: false;}@property --tw-saturate{syntax: "*"; inherits: false;}@property --tw-sepia{syntax: "*"; inherits: false;}@property --tw-drop-shadow{syntax: "*"; inherits: false;}@property --tw-drop-shadow-color{syntax: "*"; inherits: false;}@property --tw-drop-shadow-alpha{syntax: "<percentage>"; inherits: false; initial-value: 100%;}@property --tw-drop-shadow-size{syntax: "*"; inherits: false;}@property --tw-border-style{syntax: "*"; inherits: false; initial-value: solid;}@property --tw-duration{syntax: "*"; inherits: false;}@layer properties{@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]::backdrop{--tw-translate-x: 0;--tw-translate-y: 0;--tw-translate-z: 0;--tw-rotate-x: initial;--tw-rotate-y: initial;--tw-rotate-z: initial;--tw-skew-x: initial;--tw-skew-y: initial;--tw-gradient-position: initial;--tw-gradient-from: #0000;--tw-gradient-via: #0000;--tw-gradient-to: #0000;--tw-gradient-stops: initial;--tw-gradient-via-stops: initial;--tw-gradient-from-position: 0%;--tw-gradient-via-position: 50%;--tw-gradient-to-position: 100%;--tw-leading: initial;--tw-font-weight: initial;--tw-tracking: initial;--tw-shadow: 0 0 #0000;--tw-shadow-color: initial;--tw-shadow-alpha: 100%;--tw-inset-shadow: 0 0 #0000;--tw-inset-shadow-color: initial;--tw-inset-shadow-alpha: 100%;--tw-ring-color: initial;--tw-ring-shadow: 0 0 #0000;--tw-inset-ring-color: initial;--tw-inset-ring-shadow: 0 0 #0000;--tw-ring-inset: initial;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-offset-shadow: 0 0 #0000;--tw-blur: initial;--tw-brightness: initial;--tw-contrast: initial;--tw-grayscale: initial;--tw-hue-rotate: initial;--tw-invert: initial;--tw-opacity: initial;--tw-saturate: initial;--tw-sepia: initial;--tw-drop-shadow: initial;--tw-drop-shadow-color: initial;--tw-drop-shadow-alpha: 100%;--tw-drop-shadow-size: initial;--tw-border-style: solid;--tw-duration: initial}}}

`,
    ],
  });
};
var su = class e {
  title = dt('Projet_Mohamed_Youssef_Masmoudi');
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = U({
    type: e,
    selectors: [['app-root']],
    decls: 2,
    vars: 0,
    template: function (t, r) {
      t & 1 && N(0, 'app-header')(1, 'router-outlet');
    },
    dependencies: [Ur, iu],
    encapsulation: 2,
  });
};
jp(su, C0).catch((e) => console.error(e));
