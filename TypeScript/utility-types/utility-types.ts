// Partial<T>
{
    interface Todo {
        title: string;
        description: string;
    }

    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
        return {...todo, ...fieldsToUpdate};
    }
}

{
    const todo1 = {
        title: 'organize desk',
        description: 'clear clutter',
    };

    const todo2 = updateTodo(todo1, {
        description: 'throw out trash',
    });
}

// Readonly<T>

{
    interface Todo {
        title: string;
    }

    const todo: Readonly<Todo> = {
        title: 'Delete inactive users',
    };

    todo.title = 'Hello'; // Error: cannot reassign a readonly property
}

// Record<K,T>

{
    interface PageInfo {
        title: string;
    }

    type Page = 'home' | 'about' | 'contact';

    const x: Record<Page, PageInfo> = {
        about: {title: 'about'},
        contact: {title: 'contact'},
        home: {title: 'home'},
    };
}

// Pick<T,K>

{
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type TodoPreview = Pick<Todo, 'title' | 'completed'>;

    const todo: TodoPreview = {
        title: 'Clean room',
        completed: false,
    };
}

// Omit<T,K>

{
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type TodoPreview = Omit<Todo, 'description'>;

    const todo: TodoPreview = {
        title: 'Clean room',
        completed: false,
    };
}

// Exclude<T,U>

{
    type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
    type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"
    type T2 = Exclude<string | number | (() => void), Function>;  // string | number
}

// Extract<T,U>

{
    type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
    type T1 = Extract<string | number | (() => void), Function>;  // () => void
}

// NonNullable<T>

{
    type T0 = NonNullable<string | number | undefined>;  // string | number
    type T1 = NonNullable<string[] | null | undefined>;  // string[]
}

// Parameters<T>

{
    let p = (arg: { a: number, b: string }): void
        => {
    };

    type T0 = Parameters<() => string>;  // []
    type T1 = Parameters<(s: string) => void>;  // [string]
    type T2 = Parameters<(<T>(arg: T) => T)>;  // [unknown]
    type T4 = Parameters<typeof p>;  // [{ a: number, b: string }]
    type T5 = Parameters<any>;  // unknown[]
    type T6 = Parameters<never>;  // never
    type T7 = Parameters<string>;  // Error
    type T8 = Parameters<Function>;  // Error
}

// ConstructorParameters<T>

{
    type T0 = ConstructorParameters<ErrorConstructor>;  // [(string | undefined)?]
    type T1 = ConstructorParameters<FunctionConstructor>;  // string[]
    type T2 = ConstructorParameters<RegExpConstructor>;  // [string, (string | undefined)?]
}

// ReturnType<T>

{
    let p = (): { a: number, b: string }
    {
        return {a: 1, b: 'foo'}
    }

    type T0 = ReturnType<() => string>;  // string
    type T1 = ReturnType<(s: string) => void>;  // void
    type T2 = ReturnType<(<T>() => T)>;  // {}
    type T3 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
    type T4 = ReturnType<typeof p>;  // { a: number, b: string }
    type T5 = ReturnType<any>;  // any
    type T6 = ReturnType<never>;  // any
    type T7 = ReturnType<string>;  // Error
    type T8 = ReturnType<Function>;  // Error
}

// InstanceType<T>

{
    class C {
        x = 0;
        y = 0;
    }

    type T0 = InstanceType<typeof C>;  // C
    type T1 = InstanceType<any>;  // any
    type T2 = InstanceType<never>;  // any
    type T3 = InstanceType<string>;  // Error
    type T4 = InstanceType<Function>;  // Error
}

// Required<T>

{
    interface Props {
        a?: number;
        b?: string;
    };

    const obj: Props = {a: 5}; // OK

    const obj2: Required<Props> = {a: 5}; // Error: property 'b' missing
}

// ThisParameterType

{
    function toHex(this: Number) {
        return this.toString(16);
    }

    function numberToString(n: ThisParameterType<typeof toHex>) {
        return toHex.apply(n);
    }
}
