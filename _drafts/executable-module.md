---
layout: post
title: Executable module
---
```todo
- replace a and b with better names.
- add some links when having access to interwebs.
- add emojis!!!!!
```

I love small classes that do a specific task. Easier to read, easier to test and overall just less headaches.
These small classes usually only have 1 public method that I like to call `execute`, although `call` is also a popular
name for it. Using such a class usually looks like:

```rb
class Multiplier
  def initialize(a, b)
    @a = a
    @b = b
  end

  def execute
    a * b
  end

  private

  attr_reader :a, :b
end

Multiplier.new(5, 6).execute # => 30
```

So you initialize to instantly execute/call your instance.
As we are very lazy people, we want to shorten this!

```rb
class Multiplier
  def initialize(a, b)
    @a = a
    @b = b
  end

  def execute
    a * b
  end

  def self.execute(a, b)
    new(a, b).execute
  end

  private

  attr_reader :a, :b
end

Multiplier.execute(5, 6) # => 30
```

Perfect! Except now we have to write a class method for every such class we make...
What about extracting it into a reusable module? But not every class we want to execute
will have an `a` and a `b`, so we need to fix that first.

```rb
def self.execute(*params)
  new(*params).execute
end
```

If you want to know more about `*` check this [page]().


So how will this look with a module?
```rb
module Executable
  def execute(*params)
    new(*params).execute
  end
end

class Multiplier
  extend Executable

  def initialize(a, b)
    @a = a
    @b = b
  end

  def execute
    a * b
  end

  private

  attr_reader :a, :b
end

Multiplier.execute(5, 6) # => 30
```
By extending our `Executable` module in our `Multiplier` class we add the `execute` method on
the `Multiplier` class level (same as `self.execute`).

Finally there is 1 more thing we could consider and that is [blocks](). In our initializer we don't
want to do anything more than initializing, so we should pass the given block to our execute method
as that is where we actually execute our logic.

```rb
module Executable
  def execute(*params, &block)
    new(*params).execute(&block)
  end
end

class Multiplier
  extend Executable

  def initialize(a, b)
    @a = a
    @b = b
  end

  def execute
    result = a * b
    result = yield(result) if block_given?
    result
  end

  private

  attr_reader :a, :b
end

Multiplier.execute(5, 6) { |result| result + 1 } # => 31
```

In this case you could just have done `Multiplier.execute(5, 6) + 1` or even just `5 * 6 + 1`,
but hey this is way cooler isn't it :sunglasses:.
