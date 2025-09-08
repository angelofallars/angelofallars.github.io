---
layout: "../../layouts/BlogPost.astro"
title: "Modeling sum types in Python"
pubDate: "Sep 09, 2025"
---

Did you know that [sum types](https://en.wikipedia.org/wiki/Tagged_union) in Python can be implemented, similar to [Rust enums](https://doc.rust-lang.org/rust-by-example/custom_types/enum.html)
with all the associated type safety and pattern matching?

This article will explain a few methods to model sum types in modern Python.

Whether you are new to Python type hints or looking for more creative and fun ways to use them, feel free to read along!

With static type-checking tools like [Pyright](https://microsoft.github.io/pyright/#/) and its fork [Basedpyright](https://docs.basedpyright.com/),
your editor (including VS Code) and CI/CD pipeline can check and tell you if any defined sum types are used correctly.

## What are sum types?

A quick rundown: sum types represent a value that can be *only one* of several possible types.

Sum types first became prominent in functional programming languages like Haskell, but modern languages
like Rust and TypeScript have made it possible to use sum types.

It turns out many concepts can be modeled as sum types, detailed in the later sections below.

## Method 1: Simple enums with `typing.Literal`

We can use the [`typing.Literal`](https://docs.python.org/3/library/typing.html#typing.Literal)
type to define a simple type with a limited amount of possible values.

Let's define a type `Color` that has four variants:
all strings with a value of either `"Red"`, `"Green"`, `"Blue"` or `"Yellow"`.

```python
from typing import Literal

# The 'type' statement was added in Python 3.12.
type Color = Literal["Red", "Green", "Blue", "Yellow"]

# For versions earlier than 3.12, you can use this syntax:
# Color = Literal["Red", "Green", "Blue", "Yellow"]
```

We can then implement instances of the type `Color` like this:

```python
red: Color = "Red"
green: Color = "Green"
blue: Color = "Blue"
yellow: Color = "Yellow"

# Invalid color
invalid: Color = "Purple"
# Results in this Pyright error:
#     Expression of type "Literal['Purple']" cannot be assigned \
#     to declared type "Color"
```

With an enum of this type, we can write a function that accepts
this enum and returns different values depending on the variant.

For example, this `color_to_hex` function returns the corresponding
hex color code for a color:

```python
def color_to_hex(color: Color) -> str:
    match color:
        case "Red":
            return "#FF0000"
        case "Green":
            return "#00FF00"
        case "Blue":
            return "#0000FF"
        case "Yellow":
            return "#FFFF00"


print(color_to_hex("Red"))
# "#FF0000"
print(color_to_hex("Blue"))
# "#0000FF"
print(color_to_hex("Yellow"))
# "#FFFF00"
```

The [`match`](https://docs.python.org/3/tutorial/controlflow.html#match-statements) statement, introduced in Python 3.10, allows
us to compare a value against several other cases. This is similar to a switch statement in other languages, but
it has so much more extensive features akin to Rust pattern matching, which is out of scope of this blog post.

If we forget to handle all variants of the enum in the `match` statement, e.g.
left out the `'Blue'` case, Pyright/Basedpyright can warn us about the
missing case:

```python
def color_to_hex(color: Color) -> str:
    match color:
        case "Red":
            return "#ff0000"
        case "Green":
            return "#00ff00"
        # case "Blue":
        #      return "#0000FF"
        case "Yellow":
            return "#FFFF00"
```

With the above code, my editor set up with Basedpyright shows this warning:

```
Cases within match statement do not exhaustively handle all values
  Unhandled type: "Literal['Blue']"
  If exhaustive handling is not intended, add "case _: pass"
```

### Use cases of `typing.Literal`

When we are dealing with only a limited amount of values that we know
ahead of time, we can use a simple `Literal` enum. Examples include:

- Days of the week
- Traffic lights (red, yellow, green)
- Directions (up/down/left/right or north/south/west/east)
- Bank card type (debit, credit, prepaid, ATM)
- Type of financial transaction (e.g. purchase, refund, credit, withdrawal, charge)
- Valid HTML element names (this enum will be very long though!)

### Why not `enum.Enum?`

[`enum.Enum`](https://docs.python.org/3/library/enum.html#enum.Enum)
is an old Python feature made when Python did not yet focus on type hints.
It suffers from performance issues and has (in my opinion) a less elegant syntax.

Meanwhile, `Literal` enums are just comprised of simple runtime types, such as strings.
This makes it simpler to implement and faster to do pattern matching on.

## Method 2: Tagged union with `dataclass`

What if we want to associate different data with each variant? We can create
[data classes](https://docs.python.org/3/library/dataclasses.html) that will function
as variants of a sum type, each with their own data fields.

### Naïve implementation

We'll create an ice cream type that has three possible flavors, all delicious:
cookies and cream, coffee, and chocolate.

```python
from dataclasses import dataclass, field
from typing import Literal

# We define the 'IceCream' type as a union type that can be any
# of the three ice cream types we defined, with the pipe '|' syntax.
type IceCream = (
    CookiesAndCreamIceCream | CoffeeIceCream | MintIceCream
)


@dataclass
# My favorite type of ice cream by the way :)
class CookiesAndCreamIceCream:
    volume_ml: int
    cookies_count: int


@dataclass
class CoffeeIceCream:
    volume_ml: int
    caffeine_mg: int


@dataclass
class ChocolateIceCream:
    volume_ml: int
    is_fudge: bool
```

We can then create a `calculate_tastiness` function that accepts an `IceCream`
and returns its tastiness level represented with a `float`. To determine the
type of ice cream, for now we will check the type of the entire data structure:

```python
def calculate_tastiness(ice_cream: IceCream) -> float:
    match ice_cream:
        case CookiesAndCreamIceCream():
            volume_tastiness = ice_cream.volume_ml * 0.5
            cookies_tastiness = ice_cream.cookies_count * 1.5
            return volume_tastiness + cookies_tastiness
            # In up-to-date editors, the Python type checker
            # smartly narrows down the type of 'ice_cream'
            # in this match case to 'CookiesAndCreamIceCream',
            # giving us autocomplete on the variant-exclusive
            # field `cookies_count`.
        case CoffeeIceCream():
            volume_tastiness = ice_cream.volume_ml * 0.15
            caffeine_tastiness = ice_cream.caffeine_mg * 0.05
            return volume_tastiness + caffeine_tastiness
        case ChocolateIceCream():
            volume_tastiness = ice_cream.volume_ml * 0.20
            fudge_bonus = 0
            if ice_cream.is_fudge:
                fudge_bonus = 25
            return volume_tastiness + fudge_bonus


cookies_and_cream = (
    CookiesAndCreamIceCream(volume_ml=110, cookies_count=3)
)
print(calculate_tastiness(cookies_and_cream))
# 59.5

coffee = CoffeeIceCream(volume_ml=110, caffeine_mg=40)
print(calculate_tastiness(coffee))
# 18.5

chocolate = ChocolateIceCream(volume_ml=110, is_fudge=True)
print(calculate_tastiness(chocolate))
# 47.0
```

These match cases check the object's type. All these
match cases actually use `isinstance()` under the hood. At a small scale, this
might be acceptable. However, as the number of variants grow, the less performant will
matching on a sum type be.

### Improved implementation with a tag field

To demonstrate the "tag" in "tagged union", we'll add a new field
to each class that represents its variant. In this example, we'll
name the tag field `flavor`, but it easily could have been `tag`, `kind`, or `discriminant` (like in discriminated
union).

```python
from dataclasses import dataclass, field
from typing import Literal

type IceCream = (
    CookiesAndCreamIceCream | CoffeeIceCream | ChocolateIceCream
)


@dataclass
class CookiesAndCreamIceCream:
    flavor: Literal["CookiesAndCream"] = (
        field(default="CookiesAndCream", init=False)
    )
    volume_ml: int
    cookies_count: int


@dataclass
class CoffeeIceCream:
    flavor: Literal["Coffee"] = (
        field(default="Coffee", init=False)
    )
    volume_ml: int
    caffeine_mg: int


@dataclass
class ChocolateIceCream:
    flavor: Literal["Chocolate"] = (
        field(default="Chocolate", init=False)
    )
    volume_ml: int
    is_fudge: bool
```

Each variant has its own `flavor` represented as a field in the dataclass.

On the [`field()`](https://docs.python.org/3/library/dataclasses.html#dataclasses.field)
function, the `default` parameter specifies the default value of the field to use
on initialization, and `init=False` prevents the field from being a parameter of the `__init__()` method. These two arguments make `flavor` a practically constant value.

We will then update the `calculate_tastiness()` function to instead
match against the `flavor` field in the match statement:

```python
def calculate_tastiness(ice_cream: IceCream) -> float:
    match ice_cream.flavor:
        case "CookiesAndCream":
            volume_tastiness = ice_cream.volume_ml * 0.5
            cookies_tastiness = ice_cream.cookies_count * 1.5
            return volume_tastiness + cookies_tastiness
        case "Coffee":
            volume_tastiness = ice_cream.volume_ml * 0.15
            caffeine_tastiness = ice_cream.caffeine_mg * 0.05
            return volume_tastiness + caffeine_tastiness
        case "Chocolate":
            volume_tastiness = ice_cream.volume_ml * 0.20
            fudge_bonus = 0
            if ice_cream.is_fudge:
                fudge_bonus = 25
            return volume_tastiness + fudge_bonus


# Still the same output
cookies_and_cream = (
    CookiesAndCreamIceCream(volume_ml=110, cookies_count=3)
)
print(calculate_tastiness(cookies_and_cream))
# 59.5

coffee = CoffeeIceCream(volume_ml=110, caffeine_mg=40)
print(calculate_tastiness(coffee))
# 18.5

chocolate = ChocolateIceCream(volume_ml=110, is_fudge=True)
print(calculate_tastiness(chocolate))
# 47.0
```

Checking only a single string field to determine the variant improves performance,
especially for sum types with significantly more variants. As an important bonus, the variant tag is also
retained as a key-value pair when the dataclass instance is serialized into a dictionary
or into JSON.

```python
from dataclasses import asdict

print(asdict(chocolate))
# {'flavor': 'Chocolate', 'volume_ml': 110, 'is_fudge': True}
```

This is similar to how pattern matching
for sum types is done in compiled languages like Rust: they compare the value's
tag/discriminant (internally an integer) to the tags of the sum type variants to determine the
value's variant.

## Method 3: Pydantic tagged unions

The [Pydantic](https://docs.pydantic.dev/latest/) data validation library
has official support for [tagged unions](https://docs.pydantic.dev/latest/concepts/unions/#discriminated-unions),
functioning similarly to the example above.

For production systems, I recommend implementing tagged unions with this library.
You will be able to reap the benefits of Pydantic's blazingly-fast (thanks to Rust)
runtime data validation, easy JSON serialization, and integration with popular
libraries like [FastAPI](https://fastapi.tiangolo.com/), [Polars](https://docs.pola.rs/) and [SQLModel](https://sqlmodel.tiangolo.com/).

The ice cream types can be represented using Pydantic's [`BaseModel`](https://docs.pydantic.dev/latest/api/base_model/) and [`RootModel`](https://docs.pydantic.dev/latest/api/root_model/) classes like this:

```python
from typing import Literal

from pydantic import BaseModel, Field, RootModel


class CookiesAndCreamIceCream(BaseModel):
    flavor: Literal["CookiesAndCream"] = (
        Field(default="CookiesAndCream", init=False)
    )
    volume_ml: int
    cookies_count: int


class CoffeeIceCream(BaseModel):
    flavor: Literal["Coffee"] = (
        Field(default="Coffee", init=False)
    )
    volume_ml: int
    caffeine_mg: int


class ChocolateIceCream(BaseModel):
    flavor: Literal["Chocolate"] = (
        Field(default="Chocolate", init=False)
    )
    volume_ml: int
    is_fudge: bool


class IceCream(
    RootModel[
        CookiesAndCreamIceCream | CoffeeIceCream | ChocolateIceCream
    ]
):
    pass


def calculate_tastiness(ice_cream: IceCream) -> float:
    data = ice_cream.root
    match data.flavor:
        case "CookiesAndCream":
            volume_tastiness = data.volume_ml * 0.5
            cookies_tastiness = data.cookies_count * 1.5
            return volume_tastiness + cookies_tastiness
        case "Coffee":
            volume_tastiness = data.volume_ml * 0.15
            caffeine_tastiness = data.caffeine_mg * 0.05
            return volume_tastiness + caffeine_tastiness
        case "Chocolate":
            volume_tastiness = data.volume_ml * 0.20
            fudge_bonus = 0
            if data.is_fudge:
                fudge_bonus = 25
            return volume_tastiness + fudge_bonus


cookies_and_cream = (
    IceCream(CookiesAndCreamIceCream(volume_ml=80, cookies_count=9))
)
print(calculate_tastiness(cookies_and_cream))
# 53.5

coffee = IceCream(CoffeeIceCream(volume_ml=85, caffeine_mg=10))
print(calculate_tastiness(coffee))
# 13.25

chocolate = IceCream(ChocolateIceCream(volume_ml=90, is_fudge=False))
print(calculate_tastiness(chocolate))              # no fudge :(
# 18.0
```

## Note on Pyright pattern matching

Because [Basedpyright](https://docs.basedpyright.com/)
is strict by default, the type checker already warns you if you haven't exhaustively handled all sum type cases in a `match` statement.

However, the default unconfigured setup on [Pyright](https://microsoft.github.io/pyright/#/) will not warn about
this. If you're using VS Code, the [official Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
uses Pylance, which uses Pyright under the hood.

You need to either enable strict mode in Pyright, or set the `reportMatchNotExhaustive` setting to `"error"`
[(reference)](https://microsoft.github.io/pyright/#/configuration?id=type-check-rule-overrides),
which by default is `"none"`.

An easy way to enable exhaustive match checking on Pyright is to add this snippet
to your Python project's `pyproject.toml` file:

```toml
[tool.pyright]
reportMatchNotExhaustive = "error"
```

Or, if you use `pyrightconfig.json`, add this key-value pair to the configuration file:

```json
{
  "reportMatchNotExhaustive": "error"
}
```

## Conclusion

Ever since I first learned about Rust enums, I have been very intrigued
and enthusiastic about sum types. That's why I'm happy that I can get to
implement sum types in some way in Python. [Looking at you, Go!](https://github.com/golang/go/issues/57644)

When used correctly, sum types in Python allow you to [**make invalid states
unrepresentable**](https://geeklaunch.io/blog/make-invalid-states-unrepresentable/).
