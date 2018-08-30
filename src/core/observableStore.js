
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/internal/operators/filter';


export default () => {
  const _actionsSubject = new Subject();

  const proxy = new Proxy({}, {
    set(obj, prop, value) {
      if (prop === 'observer') {
        throw new Error('observer is a function');
      }
      const res = Reflect.set(obj, prop, value);
      _actionsSubject.next({ property: prop, value });
      return res;
    },
    get(target, name, receiver) {
      if (name === 'observer') {
        return property => _actionsSubject.pipe(filter(res => res.property.match(property)));
      }
      return Reflect.get(target, name, receiver);
    },
  });
  return proxy;
};
