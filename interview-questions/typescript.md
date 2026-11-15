# TypeScript

[[toc]]

### What are generics?

<!-- id: wU[uW_$?r~, noteType: Basic-66869 -->

- **Generics** let you write reusable code while preserving the relationship between input and output types.
- Use a type parameter such as `T` when the exact type is supplied by the caller.
- TypeScript can often infer `T`, so explicit type arguments are usually optional.

```ts
function wrap<T>(value: T): { data: T } {
  return { data: value };
}

const text = wrap('hello'); // { data: string }
const count = wrap(123);    // { data: number }
```

Common generic types:

- `Array<Item>` or `Item[]`
- `Promise<Result>`
- `Readonly<T>`
- `Partial<T>`
- `Record<Key, Value>`

### What are the primitive types in TypeScript?

<!-- id: O.YxF`&i?., noteType: Basic-66869 -->

- `string` — text
- `number` — integers and floating-point values; there is no separate `int` type
- `boolean` — `true` or `false`
- `bigint` — arbitrarily large integers
- `symbol` — unique identifiers
- `null` — intentional absence of a value
- `undefined` — a value has not been assigned

> `object`, arrays, and functions are non-primitive types.

### What is `any`, and when should it be used?

<!-- id: kn8xBaO07(, noteType: Basic-66869 -->

- `any` opts a value out of TypeScript's type checking.
- You can read properties, call it, or assign it to another type without compiler errors.
- Use it only at an unavoidable boundary, such as gradually migrating legacy JavaScript.
- Prefer a specific type, a generic, or `unknown` whenever possible.
- Enable `noImplicitAny` to catch parameters that would otherwise become implicit `any`.

```ts
const value: any = 'hello';
value.notARealMethod(); // TypeScript does not protect you
```

### What is `void`?

<!-- id: K&oN:86Sv&, noteType: Basic-66869 -->

- `void` is commonly used as the return type of a function whose result is ignored.
- It does not mean that the function cannot execute a `return` statement; it means callers should not use a returned value.

```ts
function log(message: string): void {
  console.log(message);
}
```

### What is `unknown`, and when should it be used?

<!-- id: hht^kbbi|a, noteType: Basic-66869 -->

- `unknown` can hold any value, like `any`.
- Unlike `any`, it must be narrowed before you read properties, call it, or use it in most operations.
- Use it for untrusted input such as API responses, parsed JSON, or errors caught in a `catch` block.

```ts
function handle(input: unknown): void {
  if (typeof input === 'string') {
    console.log(input.toUpperCase()); // narrowed to string
  }
}
```

### How do you strongly type React component events and handlers?

<!-- id: d,FQ@[~uaq, noteType: Basic-66869 -->

- Inline handlers are often inferred automatically by JSX.
- For named handlers, annotate the event with the appropriate React event and element types.
- Common examples:
  - `React.ChangeEvent<HTMLInputElement>` for input changes
  - `React.FormEvent<HTMLFormElement>` for form submission
  - `React.MouseEvent<HTMLButtonElement>` for button clicks
  - `React.KeyboardEvent<HTMLInputElement>` for keyboard events

```tsx
function Input() {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
  };

  return <input type="text" onKeyDown={onKeyDown} />;
}
```

### What is wrong with this JSX event handler?

<!-- id: q+B]J_`xvE, noteType: Basic-66869 -->

```tsx
<input onKeyDown={e: React.KeyboardEvent<HTMLInputElement> => console.log(e.key)} />
```

- A typed arrow-function parameter must be wrapped in parentheses.
- The event annotation belongs inside the function expression.

Correct:

```tsx
<input
  type="text"
  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => console.log(e.key)}
/>
```

### How do you type Redux Toolkit thunk actions and dispatch?

<!-- id: dsd,r&{3eh, noteType: Basic-66869 -->

- With Redux Toolkit, derive types from the store instead of manually using `AnyAction` where possible.
- `RootState` describes the state returned by `store.getState()`.
- `AppDispatch` describes `store.dispatch`, including thunk support.
- Use typed hooks so components get correct state and dispatch types.

```ts
// store.ts
export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks.ts
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

> Older `redux-thunk` code may use `ThunkAction` and `ThunkDispatch`, but Redux Toolkit's inferred types are usually simpler and safer.

### How do you declare an enum?

<!-- id: BLXGnxR].3, noteType: Basic-66869 -->

```ts
enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

function setStatus(status: Status): void {}

setStatus(Status.Loading);
```

- String enum members have explicit, readable runtime values.
- For many application types, a string-literal union is lighter and avoids enum runtime behavior:

```ts
type Status = 'idle' | 'loading' | 'success' | 'error';

function setStatus(status: Status): void {}
setStatus('loading');
```

### Which TypeScript compiler options matter most?

<!-- id: z|37yN*TyO, noteType: Basic-66869 -->

- `strict: true` — enables the strict type-checking family; use this as the baseline.
- `noImplicitAny: true` — reports parameters or variables that silently become `any`.
- `strictNullChecks: true` — makes `null` and `undefined` distinct types.
- `noUncheckedIndexedAccess: true` — adds `undefined` when an indexed value may not exist.
- `exactOptionalPropertyTypes: true` — distinguishes an omitted optional property from one explicitly set to `undefined`.
- `noUnusedLocals` and `noUnusedParameters` — catch dead code and unused parameters.
- `target` — selects the JavaScript language level emitted by the compiler.
- `module` and `moduleResolution` — control module output and import resolution.

Example baseline:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```
