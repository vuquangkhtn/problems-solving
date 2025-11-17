# TypeScript

[[toc]]

### Generic Type

<!-- id: wU[uW_$?r~, noteType: Basic-66869 -->

Generics let you parameterize types so they can be reused across different shapes.

Common generic utilities and examples:

- `Array<ItemType>`
- `Promise<ReturnedType>`
- `Readonly<T>`
- `Partial<T>`
- `Record<KeyType, ValueType>`

Example:

```ts
function wrap<T>(value: T): { data: T } {
  return { data: value };
}

const r1 = wrap<string>('hello');
const r2 = wrap(123); // T is inferred as number
```

### What are the primitive types in TypeScript?

<!-- id: O.YxF`&i?., noteType: Basic-66869 -->

- `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`.

### What is any type, and when to use it?

<!-- id: kn8xBaO07(, noteType: Basic-66869 -->

- `any` disables type checking for a value. Use sparingly.
- Implicit `any` can occur when the compiler cannot infer a type and no annotation is provided.
- Prefer `unknown` or specific types to keep safety.

### What is void, and when to use the void type?

<!-- id: K&oN:86Sv&, noteType: Basic-66869 -->

- `void` indicates a function returns no value.

```ts
function log(msg: string): void {
  console.log(msg);
}
```

### What is an unknown type, and when to use it in TypeScript?

<!-- id: hht^kbbi|a, noteType: Basic-66869 -->

- `unknown` is a type-safe counterpart of `any`.
- You can assign anything to `unknown`, but you must narrow it before using it.

```ts
function handle(input: unknown) {
  if (typeof input === 'string') {
    // narrowed to string
    console.log(input.toUpperCase());
  }
}
```

### Note to Create Strongly typed Component Events and Event Handlers

<!-- id: d,FQ@[~uaq, noteType: Basic-66869 -->

- Inline event handlers often infer correct types automatically.
- Named handlers may require explicit annotations.
- Tip: hover handlers in your editor to see inferred types.

```tsx
function Input() {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
  };

  return <input type="text" onKeyDown={onKeyDown} />;
}
```

### "<input type=""text"" onKeyDown={e:React.KeyboardEvent<HTMLInputElement> => console.log(e.key)} /> What is wrong?"

<!-- id: q+B]J_`xvE, noteType: Basic-66869 -->

You must wrap the parameter and annotation in parentheses.

Correct:

```tsx
<input type="text" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => console.log(e.key)} />
```

### declare type for actions and dispatchs of redux-thunk

<!-- id: dsd,r&{3eh, noteType: Basic-66869 -->

```ts
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

type AppState = {
  /* ... */
};

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;

export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>;
```

### declare enum type

<!-- id: BLXGnxR].3, noteType: Basic-66869 -->

```ts
enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

function setStatus(s: Status) {}

setStatus(Status.Loading);
```

### TypeScript configurations

<!-- id: z|37yN*TyO, noteType: Basic-66869 -->
